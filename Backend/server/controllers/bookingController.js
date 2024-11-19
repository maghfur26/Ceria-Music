const BookingModel = require('../models/Booking');
const PaymentModel = require('../models/Payment');
const RoomsModel = require('../models/Room');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const bookingController = {
    createBooking: async (req, res) => {
        try {
            const { room_id, name, phoneNumber, date, startTime, endTime } = req.body;
    
            const today = new Date().setHours(0, 0, 0, 0);
            const bookingDate = new Date(date).setHours(0, 0, 0, 0);
            if (bookingDate < today) {
                return res.status(400).json({ message: 'Booking date cannot be in the past.' });
            }
    
            const overlappingBooking = await BookingModel.findOne({
                room_id,
                date,
                $or: [
                    { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
                ]
            });
    
            if (overlappingBooking) {
                return res.status(400).json({
                    message: 'Room is already booked for the selected date and time range.'
                });
            }
    
            const totalHours = (new Date(endTime) - new Date(startTime)) / 3600000;
            const room = await RoomsModel.findById(room_id);
            if (!room) return res.status(404).json({ message: 'Room not found' });
    
            const totalAmount = totalHours * room.price_perhour;
    
            const booking = await BookingModel.create({
                room_id,
                name,
                phoneNumber,
                date,
                startTime,
                endTime
            });
    
            const paymentCode = crypto.randomBytes(4).toString('hex');
            const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
    
            const payment = await PaymentModel.create({
                booking_id: booking._id,
                total_amount: totalAmount,
                payment_status: 'Pending',
                payment_code: paymentCode,
                payment_code_expiry: expiryTime,
                receipt_status: 'Pending',
                receipt_path: null
            });
    
            const pdfPath = await bookingController.generateReceipt(booking._id);
    
            payment.receipt_path = pdfPath;
            payment.receipt_status = 'Pending'; 
            await payment.save();
    
            return res.status(201).json({
                message: 'Booking created successfully',
                booking,
                payment
            });
        } catch (error) {
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
    
            const pdfPath = path.join(receiptsDir, `receipt-${payment._id}.pdf`);
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
            const booking = await BookingModel.findById(id).populate('room_id');
            if (!booking) return res.status(404).json({ message: 'Booking not found' });

            const payment = await PaymentModel.findOne({ booking_id: booking._id });
            return res.status(200).json({ booking, payment });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async cancelExpiredBookings() {
        try {
            const now = new Date();

            const expiredPayments = await PaymentModel.find({
                payment_status: 'Pending',
                payment_code_expiry: { $lte: now }
            });

            for (const payment of expiredPayments) {
                await BookingModel.findByIdAndDelete(payment.booking_id);

                await PaymentModel.findByIdAndDelete(payment._id);

                console.log(`Booking ${payment.booking_id} dan pembayaran ${payment._id} dibatalkan.`);
            }
        } catch (error) {
            console.error('Error canceling expired bookings:', error.message);
        }
    }
};

module.exports = bookingController