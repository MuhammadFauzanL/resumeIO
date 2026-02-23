import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Plus, Trash } from 'lucide-react';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const LanguageForm = () => {
    const { resumeData, updateResumeData } = useResume();
    const languages = Array.isArray(resumeData?.languages) ? resumeData.languages : [];

    const handleAdd = () => {
        updateResumeData({ languages: [...languages, { id: generateId(), language: '', level: '' }] });
    };

    const handleRemove = (id) => {
        updateResumeData({ languages: languages.filter(l => l.id !== id) });
    };

    const handleChange = (id, field, value) => {
        const newLanguages = languages.map(l => l.id === id ? { ...l, [field]: value } : l);
        updateResumeData({ languages: newLanguages });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900">Languages</h3>
                <Button onClick={handleAdd} size="sm" className="text-sm py-1 px-3">
                    <Plus className="w-4 h-4 mr-1" /> Add Language
                </Button>
            </div>
            <div className="space-y-4">
                {languages.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No languages added.</p>}
                {languages.filter(l => l && l.id).map((lang) => (
                    <div key={lang.id} className="flex items-end space-x-2">
                        <div className="flex-grow">
                            <Input label="Language" value={lang.language || ''} onChange={(e) => handleChange(lang.id, 'language', e.target.value)} placeholder="e.g. English" />
                        </div>
                        <div className="flex-grow">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lang.level || ''}
                                onChange={(e) => handleChange(lang.id, 'level', e.target.value)}
                            >
                                <option value="">Select Level</option>
                                <option value="Native speaker">Native speaker</option>
                                <option value="Highly proficient">Highly proficient</option>
                                <option value="Very good command">Very good command</option>
                                <option value="Good working knowledge">Good working knowledge</option>
                                <option value="Working knowledge">Working knowledge</option>
                            </select>
                        </div>
                        <Button variant="ghost" className="mb-0.5 text-red-500 hover:bg-red-50" onClick={() => handleRemove(lang.id)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default LanguageForm;