const PaymentModel = require('../models/Payment');
const BookingModel = require('../models/Booking');

const paymentController = {
    async processPayment(req, res) {
        try {
            const { payment_code, amount } = req.body;

            // Cari payment berdasarkan payment_code
            const payment = await PaymentModel.findOne({ payment_code });
            if (!payment) {
                return res.status(404).json({ message: 'Payment code not found' });
            }

            // Cek apakah payment_code sudah kadaluarsa
            const now = new Date();
            if (payment.payment_code_expiry <= now) {
                // Jika kadaluarsa, batalkan booking dan pembayaran terkait
                await BookingModel.findByIdAndDelete(payment.booking_id);
                await PaymentModel.findByIdAndDelete(payment._id);
                return res.status(400).json({ message: 'Payment code expired. Booking has been canceled.' });
            }

            // Verifikasi jumlah pembayaran sesuai dengan total_amount
            if (amount !== payment.total_amount) {
                return res.status(400).json({ message: 'Invalid payment amount. Payment must be exact.' });
            }

            // Update status pembayaran menjadi 'Paid'
            payment.payment_status = 'Paid';
            payment.payment_date = now;
            await payment.save();

            // Update status booking jika diperlukan (misalnya jika ada field status)
            const booking = await BookingModel.findById(payment.booking_id);
            if (booking) {
                // Booking sudah dibayar, bisa update status booking jika ada field status
                booking.status = 'Confirmed'; // Pastikan field status sesuai dengan model Booking
                await booking.save();
            }

            return res.status(200).json({
                message: 'Payment processed successfully',
                payment
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = paymentController;
