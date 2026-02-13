import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Ideally verify token with backend endpoint /me
                    // For now, assuming token presence is enough to hold state, 
                    // but on real app we'd fetch user data here.
                    // Let's implement a basic user decode or fetch if endpoint existed.
                    // For this MVP, we'll just set auth true if token exists.
                    setIsAuthenticated(true);

                    // Decode token simply or fetch user profile
                    // const res = await api.get('/auth/user');
                    // setUser(res.data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            // setUser(res.data.user); // if backend returned user
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.msg || 'Login failed'
            };
        }
    };

    const register = async (email, password) => {
        try {
            const res = await api.post('/auth/register', { email, password });
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.msg || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
