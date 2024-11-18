const RoomsModel = require('../models/Room');
const FacilitiesModel = require('../models/Facility');

const roomController = {

    async createRoom(req, res) {
        const { schedule, facilities, name, price_perhour } = req.body;
    
        try {
            // Validasi semua `facility_id`
            const facilityIds = facilities.map(f => f.facility_id);
            const foundFacilities = await FacilitiesModel.find({ _id: { $in: facilityIds } });
    
            if (foundFacilities.length !== facilities.length) {
                return res.status(404).json({ message: 'One or more facilities not found' });
            }
    
            // Buat Room baru
            const newRoom = await RoomsModel.create({
                schedule,
                facilities,
                name,
                price_perhour,
            });
    
            // Populate fasilitas
            const populatedRoom = await RoomsModel.findById(newRoom._id)
                .populate('facilities.facility_id', 'name unit'); // Populate hanya `name` dan `unit`
    
            return res.status(201).json({
                message: 'Room created successfully',
                data: populatedRoom,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },    

    async getUserRooms(req, res) {
        try {
            const rooms = await RoomsModel.find({ userId: req.user._id });
            return res.status(200).json({ data: rooms });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    async getDetailRoom(req, res) {
        try {
            const room = await RoomsModel.findById(req.params.id)
                .populate('facilities.facility_id', 'name unit'); 

            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            return res.status(200).json({ data: room });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    async updateRoom(req, res) {
        try {
            const room = await RoomsModel.findOne({
                _id: req.params.id,
                userId: req.user._id,
            });

            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            if (req.body.facilities) {
                const facilityIds = req.body.facilities.map(facility => facility.facility_id);
                const foundFacilities = await FacilitiesModel.find({ _id: { $in: facilityIds } });

                if (foundFacilities.length !== req.body.facilities.length) {
                    return res.status(404).json({ message: 'One or more facilities not found' });
                }
            }

            Object.assign(room, req.body);
            await room.save();

            return res.status(200).json({
                message: 'Room updated successfully',
                data: room,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    async deleteRoomById(req, res) {
        try {
            const room = await RoomsModel.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id,
            });

            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            return res.status(200).json({ message: 'Room deleted successfully' });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    async getAllRooms(req, res) {
        try {
            const rooms = await RoomsModel.find().populate('facilities.facility_id', 'name unit');
            return res.status(200).json({ data: rooms });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

};

module.exports = roomController;