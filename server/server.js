const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Resume.io Clone API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
