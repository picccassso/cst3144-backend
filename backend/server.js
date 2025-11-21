// Express.js Backend Server for After School Classes
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const mongoURL = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/';
const dbName = 'afterschool-classes';
let db;

// Connect to MongoDB
MongoClient.connect(mongoURL)
    .then(client => {
        console.log('✅ Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Middleware - CORS (allow cross-origin requests)
app.use(cors());

// Middleware - JSON body parser
app.use(express.json());

// Middleware - Logger (logs all requests to console)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

    // Log response when finished
    res.on('finish', () => {
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    });

    next();
});

// Middleware - Static file server for lesson images
app.use('/images', (req, res, next) => {
    const imagePath = path.join(__dirname, 'public', 'images', req.url);

    // Check if file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`❌ Image not found: ${req.url}`);
            return res.status(404).json({
                error: 'Image not found',
                message: `The requested image "${req.url}" does not exist`
            });
        }

        // File exists, serve it
        console.log(`✅ Serving image: ${req.url}`);
        express.static(path.join(__dirname, 'public', 'images'))(req, res, next);
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'After School Classes API',
        version: '1.0.0',
        endpoints: {
            lessons: '/lessons',
            orders: '/orders',
            images: '/images/:filename'
        }
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        database: db ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Export db for use in routes
app.get('/db-status', (req, res) => {
    res.json({
        connected: !!db,
        database: dbName
    });
});

// ==================== REST API ROUTES ====================

// GET /lessons - Return all lessons as JSON
app.get('/lessons', async (req, res) => {
    try {
        const lessons = await db.collection('lessons').find({}).toArray();
        res.json(lessons);
    } catch (err) {
        console.error('Error fetching lessons:', err);
        res.status(500).json({
            error: 'Failed to fetch lessons',
            message: err.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start server
app.listen(port, () => {
    console.log('=================================');
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📍 http://localhost:${port}`);
    console.log('=================================');
});

// Export db for routes (will be used in next phase)
module.exports = { app, getDB: () => db };
