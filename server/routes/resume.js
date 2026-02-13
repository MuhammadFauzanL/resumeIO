const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Create Resume
router.post('/', async (req, res) => {
    try {
        const newResume = new Resume({
            user: req.user ? req.user.id : null, // Handle guest user
            title: req.body.title,
            personalInfo: req.body.personalInfo,
            experience: req.body.experience,
            education: req.body.education,
            skills: req.body.skills,
            summary: req.body.summary,
            template: req.body.template,
        });
        const resume = await newResume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get User Resumes (Keep auth here as it's specific to user dashboard)
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Single Resume (Public/Guest Access)
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ msg: 'Resume not found' });
        // Removed ownership check for guest mode
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Resume not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Update Resume (Public/Guest Access)
router.put('/:id', async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ msg: 'Resume not found' });
        // Removed ownership check for guest mode

        resume = await Resume.findByIdAndUpdate(req.params.id, { $set: req.body, updatedAt: Date.now() }, { new: true });
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete Resume
router.delete('/:id', auth, async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ msg: 'Resume not found' });
        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Resume.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Resume removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PDF Export (Mock for now, could integrate server-side generation later)
router.post('/export/pdf', auth, (req, res) => {
    // In this architecture, we'll handle PDF generation on client-side mostly
    // or use a headless browser like Puppeteer here if needed.
    // implementing client-side jsPDF as requested.
    res.json({ msg: 'Use client-side PDF generation' });
});

// AI Suggestion (Mock)
router.post('/ai-suggest', auth, async (req, res) => {
    const { jobTitle, section } = req.body;

    // Mock suggestions based on job title
    const suggestions = [
        `Experienced ${jobTitle} with a proven track record.`,
        `Led a team of developers to build scalable applications.`,
        `Optimized performance by 30% through code refactoring.`,
        `Implemented CI/CD pipelines to streamline deployment.`,
    ];

    res.json({ suggestions });
});

module.exports = router;
