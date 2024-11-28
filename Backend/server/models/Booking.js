const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rooms', required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Waiting', 'Confirmed','Cancelled'],
        default: 'Waiting',
    },    
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
}, {
    timestamps: true
});

// Definisikan virtual field untuk relasi ke Payment
bookingSchema.virtual('payment', {
    ref: 'Payments', // Nama model Payment
    localField: '_id', // Field di Booking yang jadi referensi
    foreignField: 'booking_id', // Field di Payment yang menunjuk ke Booking
});

// Aktifkan virtual field di output JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

const BookingModel = mongoose.model('Bookings', bookingSchema);
module.exports = BookingModel;