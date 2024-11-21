const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const cron = require('node-cron');
const bookingController = require('./controllers/bookingController');
const router = require('./routes');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json()); 

connectDB();

app.get('/', (req, res) => {
    res.send('Selamat datang di API Studio Musik Rental!');
});

// route
app.use('/api', router)

app.use(errorHandler)

cron.schedule('* * * * *', async () => { // Cron berjalan setiap menit
    console.log('Memeriksa booking yang kedaluwarsa...');
    await bookingController.cancelExpiredBookings();
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
