import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Plus, X } from 'lucide-react';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const SkillsForm = () => {
    const { resumeData, updateResumeData } = useResume();
    const { skills = [] } = resumeData || {};

    const handleAdd = () => {
        const newSkill = {
            id: generateId(),
            name: '',
            level: 'Expert'
        };
        updateResumeData({ skills: [...skills, newSkill] });
    };

    const handleRemove = (id) => {
        updateResumeData({ skills: skills.filter(s => s.id !== id) });
    };

    const handleChange = (id, field, value) => {
        const newSkills = skills.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        );
        updateResumeData({ skills: newSkills });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <Button onClick={handleAdd} size="sm" className="text-sm py-1 px-3">
                    <Plus className="w-4 h-4 mr-1" /> Add Skill
                </Button>
            </div>

            <div className="space-y-3">
                {skills.length === 0 && (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm">Add skills to highlight your expertise.</p>
                    </div>
                )}

                {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2 animate-fadeIn">
                        <div className="flex-grow">
                            <Input
                                placeholder="Skill (e.g. React.js)"
                                value={skill.name}
                                onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                                className="mb-0"
                            />
                        </div>
                        <div className="w-1/3">
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                                value={skill.level}
                                onChange={(e) => handleChange(skill.id, 'level', e.target.value)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                        <Button variant="ghost" onClick={() => handleRemove(skill.id)} className="text-gray-400 hover:text-red-500">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsForm;
