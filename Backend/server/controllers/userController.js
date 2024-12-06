const userController = {};
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const ResponseAPI = require('../utils/response');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Bisa diganti dengan SMTP lain
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

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

userController.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return ResponseAPI.error(res, 'Email harus diisi');
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return ResponseAPI.error(res, 'User tidak ditemukan', 404);
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expired after 1 hour

        // Simpan token dan expired time di database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        // Kirim email reset password
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Reset Password',
            html: `<p>Klik tautan berikut untuk mengatur ulang password Anda:</p><a href="${resetLink}">${resetLink}</a>`,
        });

        ResponseAPI.success(res, null, 'Email reset password telah dikirim');
    } catch (error) {
        ResponseAPI.serverError(res, error);
    }
};

userController.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return ResponseAPI.error(res, 'Token dan password baru harus diisi');
    }

    try {
        // Cari user dengan token reset
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiry: { $gt: Date.now() } });
        if (!user) {
            return ResponseAPI.error(res, 'Token tidak valid atau sudah kadaluarsa', 400);
        }

        // Hash password baru
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password dan reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Hapus token reset
        user.resetPasswordExpiry = undefined; // Hapus expiry
        await user.save();

        ResponseAPI.success(res, null, 'Password berhasil diperbarui');
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
                const oldPhotoPath = path.join(user.photo.replace(/\\/g, '/'));
                // console.log('Old photo path:', oldPhotoPath); 

                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                    // console.log('Old photo deleted'); 
                } else {
                    // console.log('Old photo does not exist');
                }
            }

            updateData.photo = req.file.path.replace(/\\/g, '/');
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
