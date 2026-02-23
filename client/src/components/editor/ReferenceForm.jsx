import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Plus, Trash, ChevronDown, ChevronUp } from 'lucide-react';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const ReferenceForm = () => {
    const { resumeData, updateResumeData } = useResume();
    const references = Array.isArray(resumeData?.references) ? resumeData.references : [];
    const [expandedIds, setExpandedIds] = useState([]);

    const handleAdd = () => {
        const newRef = { id: generateId(), name: '', company: '', phone: '', email: '' };
        updateResumeData({ references: [newRef, ...references] });
        setExpandedIds([newRef.id, ...expandedIds]);
    };

    const handleRemove = (id) => {
        updateResumeData({ references: references.filter(r => r.id !== id) });
        setExpandedIds(expandedIds.filter(eid => eid !== id));
    };

    const handleChange = (id, field, value) => {
        const newRefs = references.map(r => r.id === id ? { ...r, [field]: value } : r);
        updateResumeData({ references: newRefs });
    };

    const toggleExpand = (id) => setExpandedIds(prev => prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]);

    const validRefs = references.filter(r => r && r.id);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900">References</h3>
                <Button onClick={handleAdd} size="sm" className="text-sm py-1 px-3">
                    <Plus className="w-4 h-4 mr-1" /> Add Reference
                </Button>
            </div>
            <div className="space-y-4">
                {validRefs.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No references added.</p>}
                {validRefs.map((ref) => (
                    <div key={ref.id} className="border border-gray-200 rounded-md bg-white overflow-hidden">
                        <div className="flex justify-between items-center px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100" onClick={() => toggleExpand(ref.id)}>
                            <div className="font-medium text-gray-700">{ref.name || '(Name)'} <span className="text-gray-400 text-sm">{ref.company ? `from ${ref.company}` : ''}</span></div>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" className="p-1 hover:bg-red-50 hover:text-red-600" onClick={(e) => { e.stopPropagation(); handleRemove(ref.id); }}>
                                    <Trash className="w-4 h-4" />
                                </Button>
                                {expandedIds.includes(ref.id) ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                        </div>
                        {expandedIds.includes(ref.id) && (
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                <Input label="Referent's Name" value={ref.name || ''} onChange={(e) => handleChange(ref.id, 'name', e.target.value)} />
                                <Input label="Company" value={ref.company || ''} onChange={(e) => handleChange(ref.id, 'company', e.target.value)} />
                                <Input label="Phone" value={ref.phone || ''} onChange={(e) => handleChange(ref.id, 'phone', e.target.value)} />
                                <Input label="Email" value={ref.email || ''} onChange={(e) => handleChange(ref.id, 'email', e.target.value)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ReferenceForm;