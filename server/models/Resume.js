const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // Make optional for Guest Mode
    },
    title: {
        type: String,
        default: 'Untitled Resume',
    },
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        jobTitle: String,
        website: String,
        linkedin: String,
    },
    summary: String,
    experience: [{
        id: String,
        jobTitle: String,
        employer: String,
        startDate: String,
        endDate: String,
        city: String,
        description: String,
    }],
    education: [{
        id: String,
        school: String,
        degree: String,
        startDate: String,
        endDate: String,
        city: String,
        description: String,
    }],
    skills: [{
        id: String,
        name: String,
        level: String, // e.g., Beginner, Intermediate, Expert
    }],
    organizations: [{
        id: String,
        role: String,
        organization: String,
        startDate: String,
        endDate: String,
        city: String,
        description: String,
    }],
    languages: [{
        id: String,
        language: String,
        level: String,
    }],
    courses: [{
        id: String,
        name: String,
        institution: String,
        startDate: String,
        endDate: String,
    }],
    references: [{
        id: String,
        name: String,
        company: String,
        phone: String,
        email: String,
    }],
    socialLinks: [{
        id: String,
        label: String,
        link: String,
    }],
    hobbies: String, // Simple text or array, let's keep it simple text for now based on screenshot "Skiing, Skydiving"
    certifications: [{
        id: String,
        name: String,
        issuer: String,
        date: String,
        description: String,
    }],
    template: {
        type: String,
        default: 'modern',
    },
    themeColor: {
        type: String,
        default: '#007BFF',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Resume', ResumeSchema);
