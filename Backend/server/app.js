const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const userRoute = require('./routes/userRoute');
const facilityRoute = require('./routes/facilityRoute');
const errorHandler = require('./middleware/errorHandler');
const roomRoute = require('./routes/roomRoute');
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

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
