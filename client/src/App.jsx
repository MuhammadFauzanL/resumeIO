import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder'; // Import actual Builder component

const Home = () => <Navigate to="/builder" />;

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/builder" replace />} />
            <Route path="/builder" element={<Builder />} />
            {/* Kept dashboard if user really wants to login, but not primary flow anymore */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Navigate to="/builder" replace />} />
        </Routes>
    );
}

export default App;
