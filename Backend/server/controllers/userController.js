const userController = {}
const User = require('../models/User');
const fs = require('fs');
const ResponseAPI = require('../utils/response');
const bcrypt = require('bcryptjs');

// Controller untuk login
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

        // Periksa apakah password cocok
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ResponseAPI.unauthorized(res, 'Password salah');
        }

        const token = user.generateAuthToken();

        ResponseAPI.success(res, { token }, 'Login berhasil');
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