import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../ui/Input';
import { INDONESIAN_CITIES } from '../../data/indonesianCities';
import { Camera, X } from 'lucide-react';

const PersonalDetailsForm = () => {
    const { resumeData, updateResumeData } = useResume();
    const { personalInfo } = resumeData || {};
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateResumeData({
            personalInfo: {
                ...personalInfo,
                [name]: value
            }
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Photo must be less than 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            updateResumeData({
                personalInfo: {
                    ...personalInfo,
                    photoUrl: ev.target.result
                }
            });
        };
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        updateResumeData({
            personalInfo: {
                ...personalInfo,
                photoUrl: ''
            }
        });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Details</h3>

            {/* Photo Upload */}
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="relative">
                    {personalInfo?.photoUrl ? (
                        <div className="relative">
                            <img
                                src={personalInfo.photoUrl}
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                            />
                            <button
                                onClick={removePhoto}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                title="Remove photo"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors border-2 border-dashed border-gray-400"
                        >
                            <Camera className="w-5 h-5 text-gray-500" />
                        </div>
                    )}
                </div>
                <div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        {personalInfo?.photoUrl ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    <p className="text-xs text-gray-400 mt-0.5">JPG/PNG, max 2MB</p>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Job Title"
                    name="jobTitle"
                    value={personalInfo?.jobTitle || ''}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                />
                <div className="md:col-span-2 flex space-x-2">
                    { }
                </div>
                <Input
                    label="First Name"
                    name="firstName"
                    value={personalInfo?.firstName || ''}
                    onChange={handleChange}
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={personalInfo?.lastName || ''}
                    onChange={handleChange}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={personalInfo?.email || ''}
                    onChange={handleChange}
                />
                <Input
                    label="Phone"
                    name="phone"
                    value={personalInfo?.phone || ''}
                    onChange={handleChange}
                />
                <Input
                    label="Country"
                    name="country"
                    value={personalInfo?.country || ''}
                    onChange={handleChange}
                />
                <Input
                    label="City"
                    name="city"
                    value={personalInfo?.city || ''}
                    onChange={handleChange}
                    list="indonesian-cities"
                />
                <datalist id="indonesian-cities">
                    {INDONESIAN_CITIES.map((city) => (
                        <option key={city} value={city} />
                    ))}
                </datalist>
            </div>
        </div>
    );
};
export default PersonalDetailsForm;