const BookingModel = require('../models/Booking');
const PaymentModel = require('../models/Payment');
const RoomsModel = require('../models/Room');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const bookingController = {
    createBooking: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction(); // Memulai transaksi
        try {
            const { room_id, name, phoneNumber, date, startTime, endTime } = req.body;

            const today = new Date();
            const bookingDate = new Date(date).setHours(0, 0, 0, 0);

            // Validasi tanggal pemesanan
            if (bookingDate < today.setHours(0, 0, 0, 0)) {
                throw new Error('Booking date cannot be in the past.');
            }

            const startTimeDate = new Date(startTime);
            const endTimeDate = new Date(endTime);

            // Validasi waktu mulai dan akhir
            if (startTimeDate < today || endTimeDate < today) {
                throw new Error('Booking time cannot be in the past.');
            }

            if (startTimeDate >= endTimeDate) {
                throw new Error('Start time must be before end time.');
            }

            // Cek pemesanan yang tumpang tindih
            const overlappingBooking = await BookingModel.findOne({
                room_id,
                date,
                status: { $in: ['Pending', 'Confirmed'] }, // Hanya cek status aktif
                $or: [
                    { startTime: { $lt: endTime }, endTime: { $gt: startTime } } // Rentang waktu tumpang tindih
                ]
            }).session(session);

            if (overlappingBooking) {
                throw new Error('Room is already booked for the selected date and time range.');
            }

            // Hitung total biaya
            const totalHours = (endTimeDate - startTimeDate) / 3600000;
            const room = await RoomsModel.findById(room_id).session(session);
            if (!room) throw new Error('Room not found');

            const totalAmount = totalHours * room.price_perhour;

            // Buat booking
            const booking = await BookingModel.create([{
                room_id,
                name,
                phoneNumber,
                date,
                startTime,
                endTime
            }], { session });

            // Buat payment
            const paymentCode = Array.from(crypto.randomBytes(8))
                .map((byte) => (byte % 36).toString(36).toUpperCase())
                .join('');
            const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

            const payment = await PaymentModel.create([{
                booking_id: booking[0]._id,
                total_amount: totalAmount,
                payment_status: 'Pending',
                payment_code: paymentCode,
                payment_code_expiry: expiryTime,
                receipt_status: 'Pending',
                receipt_path: null
            }], { session });

            // Buat receipt PDF
            const pdfPath = await bookingController.generateReceipt(booking[0]._id);
            payment[0].receipt_path = pdfPath;
            payment[0].receipt_status = 'Pending';
            await payment[0].save({ session });

            await session.commitTransaction(); // Commit transaksi jika semua operasi berhasil
            session.endSession();

            return res.status(201).json({
                message: 'Booking created successfully',
                booking: booking[0],
                payment: payment[0]
            });
        } catch (error) {
            await session.abortTransaction(); // Rollback jika ada kesalahan
            session.endSession();
            return res.status(500).json({ message: error.message });
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

            const pdfPath = `receipts/receipt-${payment._id}.pdf`;
            const fullPath = path.join(pdfPath);
            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(fullPath);

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
                    message: `Your booking has been canceled by the system due to expired payment.`
                });
            }

            const booking = await BookingModel.findById(id).populate('room_id');
            if (booking.status === 'Cancelled') {
                return res.status(404).json({
                    message: `Your booking has been canceled by the system due to expired payment.`
                });
            }

            return res.status(200).json({ booking, payment });
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
    }
};

module.exports = bookingController