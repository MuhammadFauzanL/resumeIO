import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import api from '../utils/api';
import { Plus, FileText, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await api.get('/resume');
            setResumes(res.data);
        } catch (error) {
            console.error("Failed to fetch resumes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateResume = async () => {
        try {
            const res = await api.post('/resume', {
                title: 'New Resume',
                personalInfo: {},
                experience: [],
                education: [],
                skills: [],
                summary: '',
                template: 'modern'
            });
            // Navigate to the builder with the new resume ID
            navigate(`/builder/${res.data._id}`);
        } catch (error) {
            console.error("Failed to create resume", error);
        }
    };

    const handleDeleteResume = async (id) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                await api.delete(`/resume/${id}`);
                setResumes(resumes.filter(r => r._id !== id));
            } catch (error) {
                console.error("Failed to delete resume", error);
            }
        }
    };

    return (
        <Layout>
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <Button onClick={handleCreateResume}>
                        <Plus className="h-5 w-5 mr-2" />
                        Create New Resume
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new resume.</p>
                        <div className="mt-6">
                            <Button onClick={handleCreateResume}>
                                <Plus className="h-5 w-5 mr-2" />
                                Create New Resume
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resumes.map((resume) => (
                            <Card key={resume._id} className="hover:shadow-lg transition-shadow duration-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">
                                            {resume.title || 'Untitled Resume'}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link to={`/builder/${resume._id}`}>
                                            <Button variant="ghost" className="p-2">
                                                <Edit className="h-4 w-4 text-gray-600" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" className="p-2 text-red-600 hover:text-red-700" onClick={() => handleDeleteResume(resume._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 border-t pt-4">
                                    <Link to={`/builder/${resume._id}`}>
                                        <div className="bg-gray-100 h-32 rounded flex items-center justify-center text-gray-400">
                                            Preview Thumbnail
                                        </div>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
