const BookingModel = require('../models/Booking');
const PaymentModel = require('../models/Payment');
const RoomsModel = require('../models/Room');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const ResponseAPI = require('../utils/response');

const bookingController = {
    // createBooking: async (req, res) => {
    //     try {
    //         const { room_id, name, phoneNumber, date, startTime, endTime } = req.body;

    //         const today = new Date();
    //         const bookingDate = new Date(date).setHours(0, 0, 0, 0);

    //         // Validasi tanggal pemesanan
    //         if (bookingDate < today.setHours(0, 0, 0, 0)) {
    //             return res.status(400).json({ message: 'Booking date cannot be in the past.' });
    //         }

    //         const startTimeDate = new Date(startTime);
    //         const endTimeDate = new Date(endTime);

    //         // Validasi waktu mulai dan akhir
    //         if (startTimeDate < today || endTimeDate < today) {
    //             return res.status(400).json({ message: 'Booking time cannot be in the past.' });
    //         }

    //         if (startTimeDate >= endTimeDate) {
    //             return res.status(400).json({ message: 'Start time must be before end time.' });
    //         }

    //         // Cek pemesanan yang tumpang tindih
    //         const overlappingBooking = await BookingModel.findOne({
    //             room_id,
    //             date,
    //             status: { $in: ['Pending', 'Confirmed'] }, // Hanya cek status aktif
    //             $or: [
    //                 { startTime: { $lt: endTime }, endTime: { $gt: startTime } } // Rentang waktu tumpang tindih
    //             ]
    //         });

    //         if (overlappingBooking) {
    //             return res.status(400).json({
    //                 message: 'Room is already booked for the selected date and time range.'
    //             });
    //         }


    //         const totalHours = (endTimeDate - startTimeDate) / 3600000;
    //         const room = await RoomsModel.findById(room_id);
    //         if (!room) return res.status(404).json({ message: 'Room not found' });

    //         const totalAmount = totalHours * room.price_perhour;

    //         const booking = await BookingModel.create({
    //             room_id,
    //             name,
    //             phoneNumber,
    //             date,
    //             startTime,
    //             endTime
    //         });

    //         const paymentCode = Array.from(crypto.randomBytes(8)) // 4 bytes untuk 8 karakter
    //             .map((byte) => (byte % 36).toString(36).toUpperCase()) // Konversi ke base36
    //             .join('');
    //         const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

    //         const payment = await PaymentModel.create({
    //             booking_id: booking._id,
    //             total_amount: totalAmount,
    //             payment_status: 'Pending',
    //             payment_code: paymentCode,
    //             payment_code_expiry: expiryTime,
    //             receipt_status: 'Pending',
    //             receipt_path: null
    //         });

    //         const pdfPath = await bookingController.generateReceipt(booking._id);

    //         payment.receipt_path = pdfPath;
    //         payment.receipt_status = 'Pending';
    //         await payment.save();

    //         return res.status(201).json({
    //             message: 'Booking created successfully',
    //             booking,
    //             payment
    //         });
    //     } catch (error) {
    //         return res.status(500).json({ message: error.message });
    //     }
    // },

    createBooking: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { room_id, name, phoneNumber, date, startTime, endTime } = req.body;

            // Validasi input
            if (!room_id || !name || !phoneNumber || !date || !startTime || !endTime) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Pastikan waktu diubah menjadi objek Date
            const start = new Date(startTime);
            const end = new Date(endTime);

            // Validasi waktu tidak di masa lalu
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Mengatur waktu ke tengah malam

            if (start < today) {
                return res.status(400).json({ message: 'Booking cannot be made for a past date' });
            }

            // Validasi endTime lebih besar dari startTime
            if (start >= end) {
                return res.status(400).json({ message: 'End time must be after start time' });
            }

            // Validasi overlapping booking
            const overlappingBookings = await BookingModel.find({
                room_id,
                status: { $ne: 'Cancelled' },
                $or: [
                    { startTime: { $lt: end }, endTime: { $gt: start } },
                ],
            });

            if (overlappingBookings.length > 0) {
                return res.status(400).json({ message: 'This room is already booked for the selected time range' });
            }

            // Buat booking baru
            const newBooking = new BookingModel({
                room_id,
                name,
                phoneNumber,
                date,
                startTime: start,
                endTime: end,
                status: 'Waiting',
            });

            const savedBooking = await newBooking.save({ session });
            console.log('Booking saved successfully:', savedBooking);

            // Generate kode pembayaran unik
            const paymentCode = Array.from(crypto.randomBytes(8))
                .map((byte) => (byte % 36).toString(36).toUpperCase())
                .join('');
            const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

            // Hitung durasi dalam jam
            const totalHours = (end - start) / 3600000;

            // Ambil data room
            const room = await RoomsModel.findById(room_id);
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            if (typeof room.price_perhour !== 'number' || isNaN(room.price_perhour)) {
                return res.status(500).json({ message: 'Invalid room price' });
            }

            // Hitung total harga
            const totalAmount = totalHours * room.price_perhour;
            if (isNaN(totalAmount) || totalAmount <= 0) {
                return res.status(400).json({ message: 'Invalid total amount' });
            }

            // Buat payment baru
            const newPayment = new PaymentModel({
                booking_id: savedBooking._id,
                total_amount: totalAmount,
                payment_status: 'Pending',
                payment_date: null,
                payment_code: paymentCode,
                payment_code_expiry: expiryTime,
                receipt_path: null,
                receipt_status: 'Pending',
            });

            const savedPayment = await newPayment.save({ session });
            console.log('Payment saved successfully:', savedPayment);

            // Commit transaksi setelah semua operasi berhasil
            await session.commitTransaction();

            // Generate receipt
            const pdfPath = await bookingController.generateReceipt(savedBooking._id);

            savedPayment.receipt_path = pdfPath;
            savedPayment.receipt_status = 'Pending';
            await savedPayment.save();

            // Kirim respon sukses dengan detail booking dan payment
            return res.status(200).json({
                message: 'Booking created successfully',
                newBooking: {
                    ...savedBooking._doc,
                    startTime: moment(savedBooking.startTime).tz('Asia/Jakarta').format(),
                    endTime: moment(savedBooking.endTime).tz('Asia/Jakarta').format(),
                },
                newPayment: savedPayment,
            });
        } catch (error) {
            // Rollback transaksi jika terjadi error
            await session.abortTransaction();
            console.error(error.message);
            return res.status(500).json({ message: 'Error creating booking' });
        } finally {
            session.endSession(); // Tutup session setelah selesai
        }
    },

    generateReceipt: async (bookingId) => {
        try {
            const booking = await BookingModel.findById(bookingId).populate('room_id');
            if (!booking) throw new Error('Booking not found');

            const payment = await PaymentModel.findOne({ booking_id: bookingId });
            if (!payment) throw new Error('Payment not found');

            const room = booking.room_id;
            const receiptsDir = path.join('receipts');

            if (!fs.existsSync(receiptsDir)) {
                fs.mkdirSync(receiptsDir, { recursive: true });
            }

            const pdfPath = path.posix.join(receiptsDir, `receipt-${payment._id}.pdf`);
            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(pdfPath);

            doc.pipe(writeStream);

            // Set font for the document (use Helvetica as an example)
            doc.fontSize(18).font('Helvetica').text('Music Studio Rental Receipt', { align: 'center' });
            doc.moveDown();

            doc.fontSize(14).font('Helvetica').text(`Receipt ID: ${payment._id}`);
            doc.text(`Booking ID: ${booking._id}`);
            doc.text(`Name: ${booking.name}`);
            doc.text(`Phone Number: ${booking.phoneNumber}`);
            doc.text(`Date: ${new Date(booking.date).toLocaleDateString()}`);
            doc.text(`Start Time: ${new Date(booking.startTime).toLocaleTimeString()}`);
            doc.text(`End Time: ${new Date(booking.endTime).toLocaleTimeString()}`);
            doc.moveDown();
            doc.text(`Room Name: ${room.name}`);
            doc.text(`Price per Hour: ${room.price_perhour}`);
            doc.moveDown();
            doc.text(`Total Amount: ${payment.total_amount}`);
            doc.text(`Payment Code: ${payment.payment_code}`);
            doc.text(`Payment Status: ${payment.payment_status}`);
            doc.text(`Payment Date: ${payment.payment_date || '-'}`);
            doc.moveDown();
            doc.text('Thank you for booking with us!', { align: 'center' });

            doc.end();

            return new Promise((resolve, reject) => {
                writeStream.on('finish', () => resolve(pdfPath));
                writeStream.on('error', reject);
            });
        } catch (error) {
            console.error('Error in generateReceipt:', error.message);
            throw error;
        }
    },

    async getBookingDetails(req, res) {
        try {
            const { id } = req.params;

            // Cek apakah pembayaran terkait sudah kedaluwarsa dan pesanan dibatalkan
            const payment = await PaymentModel.findOne({ booking_id: id });
            if (payment.payment_status === 'Failed') {
                return res.status(404).json({
                    message: "Your booking has been canceled by the system due to expired payment."
                });
            }

            const booking = await BookingModel.findById(id).populate('room_id');
            if (!booking) {
                return res.status(404).json({
                    message: "Your booking has been canceled by the system due to expired payment."
                });
            }

            return res.status(200).json({ booking, payment });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getAllBookings: async (req, res) => {
        try {
            // Ambil semua data booking dari database
            const bookings = await BookingModel.find();

            // Jika tidak ada data booking
            if (!bookings || bookings.length === 0) {
                return res.status(404).json({ message: 'No bookings found' });
            }

            // Kirim respon dengan data booking
            return res.status(200).json({
                message: 'Bookings retrieved successfully',
                bookings
            });
        } catch (error) {
            // Tangani error dan kirim respon error
            console.error(error.message);
            return res.status(500).json({ message: 'Error retrieving bookings' });
        }
    },

    async cancelExpiredBookings() {
        try {
            const now = new Date();

            // Cari semua pembayaran yang kedaluwarsa
            const expiredPayments = await PaymentModel.find({
                payment_status: 'Pending',
                payment_code_expiry: { $lte: now }
            });

            for (const payment of expiredPayments) {
                // Perbarui status pembayaran
                payment.payment_status = 'Failed';
                await payment.save();

                // Perbarui status pemesanan terkait
                const booking = await BookingModel.findById(payment.booking_id);
                if (booking) {
                    booking.status = 'Cancelled'; // Tambahkan field "status" di model Booking
                    await booking.save();
                }

                // Hapus file PDF jika ada
                if (payment.receipt_path) {
                    const pdfPath = path.join(payment.receipt_path);
                    if (fs.existsSync(pdfPath)) {
                        fs.unlink(pdfPath, (err) => {
                            if (err) {
                                console.error(`Error deleting PDF for payment ${payment._id}:`, err.message);
                            } else {
                                console.log(`PDF for payment ${payment._id} has been deleted.`);
                            }
                        });
                    }
                }

                console.log(`Booking ${payment.booking_id} and payment ${payment._id} have been marked as expired.`);
            }
        } catch (error) {
            console.error('Error canceling expired bookings:', error.message);
        }
    },

    async searchByName(req, res) {
        try {
            const booking = await BookingModel.find({
                name: { $regex: req.query.name, $options: 'i' },
                userId: req.user._id
            });

            if (booking.length === 0) {
                return ResponseAPI.notFound(res, 'booking not found');
            }

            ResponseAPI.success(res, booking);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

module.exports = bookingController