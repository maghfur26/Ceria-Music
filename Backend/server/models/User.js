const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Skema untuk model User
const userSchema = new mongoose.Schema({
    // ID secara otomatis dibuat oleh MongoDB sebagai primary key
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: '', // Token bisa diset default sebagai string kosong dulu
    },
}, {
    timestamps: true, // Menambahkan timestamps (created_at dan updated_at) secara otomatis
});

// Enkripsi password sebelum menyimpan ke database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();  // Hanya enkripsi jika password diubah

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Metode untuk mencocokkan password saat login
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Menghasilkan token JWT
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
    this.token = token; // Simpan token ke model User
    this.save();  // Simpan token yang baru ke database
    return token;
};

module.exports = mongoose.model('User', userSchema);
