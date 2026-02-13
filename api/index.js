const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for now, or specify your Vercel frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// Routes
const authRoutes = require('../server/routes/auth');
const resumeRoutes = require('../server/routes/resume');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Database Connection (Cached for serverless)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB Connected (Serverless)');
    } catch (err) {
        console.log('MongoDB Connection Error:', err);
    }
};

// Connect to DB on every request (cached if already connected)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Basic Route
app.get('/', (req, res) => {
    res.send('Resume.io Clone API is running (Vercel)');
});

module.exports = app;
