import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import { LogOut, FileText } from 'lucide-react';
const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <FileText className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-gray-900">ProResume</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/builder" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Buat Resume
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;