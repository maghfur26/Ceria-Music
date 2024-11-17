const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database'); // Path ke database.js
const { port } = require('./config/env'); // Path ke env.js
const userRoute = require('./routes/userRoute');
const facilityRoute = require('./routes/facilityRoute');
require('dotenv').config(); // Memastikan dotenv dipanggil

// Inisialisasi aplikasi
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Untuk mem-parsing request body dalam format JSON

// Connect ke database
connectDB();

// Routing dasar (sementara)
app.get('/', (req, res) => {
    res.send('Selamat datang di API Studio Musik Rental!');
});

// Routing kumpulkan disini
app.use('/api/user', userRoute)
app.use('/api/facility', facilityRoute)

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
