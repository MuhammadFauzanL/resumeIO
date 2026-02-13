import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or{' '}
                            <Link to="/register" className="font-medium text-primary hover:text-blue-500">
                                create a new account
                            </Link>
                        </p>
                    </div>
                    <Card>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <Input
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            <Button type="submit" className="w-full">
                                Sign in
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
