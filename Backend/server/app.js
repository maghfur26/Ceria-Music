const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const cron = require('node-cron');
const bookingController = require('./controllers/bookingController');
const router = require('./routes');
require('dotenv').config(); 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(express.json()); 

connectDB();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vocatask Task Management API',
            version: '1.0.0',
            description: 'API documentation for Task Management System'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Facility: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID of the facility'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the facility'
                        },
                        unit: {
                            type: 'number',
                            description: 'Unit of the facility'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation date of the facility'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update date of the facility'
                        }
                    },
                    required: ['name', 'unit']
                }
            }
        }
    },
    apis: ['./server/routes/*.js']  // Ensure this path includes your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Selamat datang di API Studio Musik Rental!');
});

// route
app.use('/api', router)

app.use(errorHandler)

cron.schedule('* * * * *', async () => { // Cron berjalan setiap menit
    // console.log('Memeriksa booking yang kedaluwarsa...');
    await bookingController.cancelExpiredBookings();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});
