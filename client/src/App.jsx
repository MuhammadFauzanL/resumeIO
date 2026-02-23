import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Builder from './pages/Builder';
import Tailoring from './pages/Tailoring';
import Distribution from './pages/Distribution';
import CoverLetter from './pages/CoverLetter';
import { ResumeProvider } from './context/ResumeContext';

import Home from './pages/Home';

// Wrap fitur baru dengan ResumeProvider agar bisa akses data resume
const WithResume = ({ children }) => (
    <ResumeProvider>{children}</ResumeProvider>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/tailoring" element={<WithResume><Tailoring /></WithResume>} />
            <Route path="/distribution" element={<WithResume><Distribution /></WithResume>} />
            <Route path="/cover-letter" element={<WithResume><CoverLetter /></WithResume>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Navigate to="/builder" replace />} />
            <Route path="*" element={<Navigate to="/builder" replace />} />
        </Routes>
    );
}

export default App;