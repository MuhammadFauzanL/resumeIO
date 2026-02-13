import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import Input from '../ui/Input';
import RichTextarea from '../ui/RichTextarea';
import Button from '../ui/Button';
import { Plus, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../ui/SortableItem';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const ExperienceForm = () => {
    const { resumeData, updateResumeData } = useResume();
    const { experience = [] } = resumeData || {};
    const [expandedIds, setExpandedIds] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = () => {
        const newExp = {
            id: generateId(),
            jobTitle: '',
            employer: '',
            startDate: '',
            endDate: '',
            city: '',
            description: ''
        };
        updateResumeData({ experience: [newExp, ...experience] });
        setExpandedIds([newExp.id, ...expandedIds]);
    };

    const handleRemove = (id) => {
        updateResumeData({ experience: experience.filter(exp => exp.id !== id) });
    };

    const handleChange = (id, field, value) => {
        const newExperience = experience.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        updateResumeData({ experience: newExperience });
    };

    const toggleExpand = (id) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter(eid => eid !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = experience.findIndex((exp) => exp.id === active.id);
            const newIndex = experience.findIndex((exp) => exp.id === over.id);
            updateResumeData({ experience: arrayMove(experience, oldIndex, newIndex) });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900">Employment History</h3>
                <Button onClick={handleAdd} size="sm" className="text-sm py-1 px-3">
                    <Plus className="w-4 h-4 mr-1" /> Add Employment
                </Button>
            </div>

            <div className="space-y-4">
                {experience.length === 0 && (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm">No employment history added yet.</p>
                    </div>
                )}

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={experience.map(exp => exp.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {experience.map((exp) => (
                            <SortableItem
                                key={exp.id}
                                id={exp.id}
                                onToggleExpand={() => toggleExpand(exp.id)}
                            >
                                {/* Header Content inside Sortable Item */}
                                <div className="flex justify-between items-center w-full">
                                    <div className="font-medium text-gray-700">
                                        {exp.jobTitle || '(Not specified)'} <span className="text-gray-400 font-normal">at {exp.employer || '(Not specified)'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" className="p-1 hover:bg-red-50 hover:text-red-600" onClick={(e) => { e.stopPropagation(); handleRemove(exp.id); }}>
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                        {expandedIds.includes(exp.id) ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                    </div>
                                </div>

                                {/* Expanded Content - rendered outside the drag handle area but inside the item container */}
                                {expandedIds.includes(exp.id) && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn cursor-default" onClick={(e) => e.stopPropagation()}>
                                        <Input
                                            label="Job Title"
                                            value={exp.jobTitle}
                                            onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)}
                                        />
                                        <Input
                                            label="Employer"
                                            value={exp.employer}
                                            onChange={(e) => handleChange(exp.id, 'employer', e.target.value)}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                label="Start Date"
                                                placeholder="MM/YYYY"
                                                value={exp.startDate}
                                                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                                            />
                                            <Input
                                                label="End Date"
                                                placeholder="MM/YYYY"
                                                value={exp.endDate}
                                                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                                            />
                                        </div>
                                        <Input
                                            label="City"
                                            value={exp.city}
                                            onChange={(e) => handleChange(exp.id, 'city', e.target.value)}
                                        />
                                        <div className="md:col-span-2">
                                            <RichTextarea
                                                label="Description"
                                                value={exp.description}
                                                onChange={(e) => handleChange(exp.id, 'description', e.target.value)} // RichTextarea returns a synthetic event object { target: { value } }
                                                rows={4}
                                                placeholder="Describe your role and achievements..."
                                            />
                                        </div>
                                    </div>
                                )}
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default ExperienceForm;
