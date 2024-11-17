const RoomsModel = require('../models/Room');
const Facilities = require('../models/Facility');

const roomController = {
  
    async createRoom(req, res) {
        const { schedule, facility, name, price_perhour } = req.body;

        try {
            const foundFacility = await Facilities.findById(Facilities);
            if (!foundFacility) {
                return res.status(404).json({ message: 'Facility not found' });
            }
  
            const newRoom = await RoomsModel.create({
                ...req.body,
                userId: req.user._id, 
            });

            return res.status(201).json({
                message: 'Room created successfully',
                data: newRoom,
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
          ResponseAPI.success(res, rooms);
      } catch (error) {
          ResponseAPI.serverError(res, error);
      }
  },

    async getAllRooms(req, res) {
        try {
            const rooms = await RoomsModel.findOne({
              _id: req.params.id,
                userId: req.user._id 
            });

            if (!rooms) {
              return res.status(404).json({ message: 'Rooms not found' });
          }

            return res.status(200).json({
                data: rooms,
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // async getDetailRoom(req, res) {
    //     const roomId = req.params.id;
    //     const room = await RoomsModel.findById(roomId);
    //     return res.status(200).json({
    //       data: room,
    //     });
    // },

   async updateRoom(req, res) {
    try {
        const room = await RoomsModel.findOne({
            _id: req.params.id,
            userId: req.user._id 
        });

        if (!room) {
            return res.status(404).json({
                message: 'Room not found',
            });
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
          const room = await RoomsModel.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user._id 
          });
          
          if (!room) {
            return res.status(404).json({
              message: 'Room tidak ditemukan',
            });
          }
          return res.status(200).json({
            message: 'Data berhasil dihapus',
          });
        } catch (error) {
          return res.status(500).json({
            message: error.message,
          });
        }
    }

};

module.exports = roomController;
