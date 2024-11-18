const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const userRoute = require('./routes/userRoute');
const facilityRoute = require('./routes/facilityRoute');
const errorHandler = require('./middleware/errorHandler');
const roomRoute = require('./routes/roomRoute');
const bookingRoute = require('./routes/bookingRoute');
const paymentRoute = require('./routes/paymentRoute');
const cron = require('node-cron');
const bookingController = require('./controllers/bookingController');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json()); 

connectDB();

app.get('/', (req, res) => {
    res.send('Selamat datang di API Studio Musik Rental!');
});

app.use('/api', userRoute)
app.use('/api', facilityRoute)
app.use('/api', roomRoute)
app.use('/api', bookingRoute)
app.use('/api', paymentRoute)

app.use(errorHandler)

cron.schedule('* * * * *', async () => { // Cron berjalan setiap menit
    console.log('Memeriksa booking yang kedaluwarsa...');
    await bookingController.cancelExpiredBookings();
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
