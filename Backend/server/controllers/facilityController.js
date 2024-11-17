const FacilitiesModel = require('../models/Facility');
const ResponseAPI = require('../utils/response');

const facilityController = {

    // Create a new facility
    async createFacility(req, res) {
        try {
            const facility = await FacilitiesModel.create({
                ...req.body,
                userId: req.user._id // Mengaitkan fasilitas dengan pengguna yang membuatnya
            });

            ResponseAPI.success(res, facility, 'Facility created successfully', 201);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    // Get all facilities for a user
    async getUserFacilities(req, res) {
        try {
            const facilities = await FacilitiesModel.find({ userId: req.user._id }); // Hanya fasilitas milik pengguna yang diautentikasi
            ResponseAPI.success(res, facilities);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    // Get a specific facility by ID
    async getFacility(req, res) {
        try {
            const facility = await FacilitiesModel.findOne({
                _id: req.params.id,
                userId: req.user._id // Memastikan hanya fasilitas milik pengguna yang ditemukan
            });

            if (!facility) {
                return ResponseAPI.notFound(res, 'Facility not found');
            }

            ResponseAPI.success(res, facility);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    // Update a facility
    async updateFacility(req, res) {
        try {
            const facility = await FacilitiesModel.findOne({
                _id: req.params.id,
                userId: req.user._id // Memastikan hanya fasilitas milik pengguna yang bisa diubah
            });

            if (!facility) {
                return ResponseAPI.notFound(res, 'Facility not found');
            }

            // Update fasilitas dengan data baru dari body request
            Object.assign(facility, req.body);
            await facility.save();

            ResponseAPI.success(res, facility, 'Facility updated successfully');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    // Delete a facility
    async deleteFacility(req, res) {
        try {
            const facility = await FacilitiesModel.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id // Memastikan hanya fasilitas milik pengguna yang bisa dihapus
            });

            if (!facility) {
                return ResponseAPI.notFound(res, 'Facility not found');
            }

            ResponseAPI.success(res, null, 'Facility deleted successfully');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

module.exports = facilityController;
