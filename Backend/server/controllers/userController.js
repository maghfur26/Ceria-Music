const userController = {}
const User = require('../models/User');
const fs = require('fs');
const ResponseAPI = require('../utils/response');
const bcrypt = require('bcryptjs');

userController.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return ResponseAPI.error(res, 'Email dan password harus diisi');
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return ResponseAPI.unauthorized(res, 'User tidak ditemukan');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ResponseAPI.unauthorized(res, 'Password salah');
        }

        const token = user.generateAuthToken();

        ResponseAPI.success(res, {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                photo: user.photo
            }
        });
    } catch (error) {
        ResponseAPI.serverError(res, error);
    }
};

userController.updateProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        const userId = req.user.id;

        const updateData = {};

        if (username) updateData.username = username;

        if (email) updateData.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updateData.password = hashedPassword;
        }

        if (req.file) {
            const user = await User.findById(userId);

            if (user.photo) {
                const oldPhotoPath = path.join(__dirname, '../', user.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }

            updateData.photo = req.file.path;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!user) {
            return ResponseAPI.error(res, 'User tidak ditemukan', 404);
        }

        ResponseAPI.success(res, user, 'Profil berhasil diperbarui');
    } catch (error) {
        ResponseAPI.serverError(res, error);
    }
};


userController.logout = async (req, res) => {
    try {
        ResponseAPI.success(res, null, 'Logout berhasil');
    } catch (error) {
        ResponseAPI.serverError(res, error);
    }
};

module.exports = userController;