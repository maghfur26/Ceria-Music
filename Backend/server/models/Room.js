const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    schedule: {
       type: String,
       required: true
    },
    facility : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Facilities', 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    price_perhour : {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

const RoomsModel = mongoose.model('Rooms', roomsSchema);
module.exports = RoomsModel;