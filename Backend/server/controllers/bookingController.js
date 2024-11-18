const BookingModel = require('../models/Booking');
const PaymentModel = require('../models/Payment');
const RoomsModel = require('../models/Room');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const bookingController = {
    async createBooking(req, res) {
        try {
            const { room_id, name, phoneNumber, date, startTime, endTime } = req.body;

            const room = await RoomsModel.findById(room_id);
            if (!room) return res.status(404).json({ message: 'Room not found' });

            const totalHours = (new Date(endTime) - new Date(startTime)) / 3600000; 
            const totalAmount = totalHours * room.price_perhour;

            const booking = await BookingModel.create({ room_id, name, phoneNumber, date, startTime, endTime });

            const payment = await PaymentModel.create({
                booking_id: booking._id,
                total_amount: totalAmount,
                payment_status: 'Pending'
            });

            return res.status(201).json({
                message: 'Booking created successfully',
                booking,
                payment
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async generateReceipt(req, res) {
        try {
            const bookingId = req.params.id;
    
            const booking = await BookingModel.findById(bookingId).populate('room_id');
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
    
            const payment = await PaymentModel.findOne({ booking_id: bookingId });
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
    
            const room = booking.room_id;
    
            console.log('Current working directory:', process.cwd());
    
            const receiptsDir = path.posix.join(__dirname, '../receipts');
            console.log('Receipts directory path:', receiptsDir);
    
            if (!fs.existsSync(receiptsDir)) {
                console.log('Receipts directory does not exist. Creating...');
                fs.mkdirSync(receiptsDir);
            }
    
            const pdfPath = path.posix.join(receiptsDir, `receipt-${bookingId}.pdf`);
            console.log('Generated PDF path:', pdfPath);
    
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(pdfPath));
    
            doc.fontSize(18).text('Music Studio Rental Receipt', { align: 'center' });
            doc.moveDown();
    
            doc.fontSize(14).text(`Receipt ID: ${payment._id}`);
            doc.text(`Booking ID: ${booking._id}`);
            doc.text(`Name: ${booking.name}`);
            doc.text(`Phone Number: ${booking.phoneNumber}`);
            doc.text(`Date: ${new Date(booking.date).toLocaleDateString()}`);
            doc.text(`Start Time: ${new Date(booking.startTime).toLocaleTimeString()}`);
            doc.text(`End Time: ${new Date(booking.endTime).toLocaleTimeString()}`);
            doc.moveDown();
    
            doc.fontSize(14).text(`Room Name: ${room.name}`);
            doc.text(`Price per Hour: ${room.price_perhour}`);
            doc.moveDown();
    
            doc.fontSize(14).text(`Total Amount: ${payment.total_amount}`);
            doc.text(`Payment Status: ${payment.payment_status}`);
            doc.text(`Payment Date: ${payment.payment_date || '-'}`);
            doc.moveDown();
    
            doc.text('Thank you for booking with us!', { align: 'center' });
    
            doc.end();
    
            fs.access(pdfPath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('PDF file does not exist:', err);
                    return res.status(500).json({ message: 'Error generating PDF file' });
                }
    
                console.log('Sending PDF file:', pdfPath);
                res.download(pdfPath, `receipt-${bookingId}.pdf`, (err) => {
                    if (err) {
                        console.error('Error sending file:', err.message);
                    } else {
                        console.log('File sent successfully');
                    }
                    fs.unlinkSync(pdfPath); 
                });
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
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
    }
};

module.exports = bookingController