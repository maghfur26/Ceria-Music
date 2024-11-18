const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookings', required: true },
    total_amount: { type: Number, required: true },
    payment_status: { type: String, enum: ['Paid', 'Pending', 'Failed'], default: 'Pending' },
    payment_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const PaymentModel = mongoose.model('Payments', paymentSchema);
module.exports = PaymentModel;