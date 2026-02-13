import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const SummaryForm = () => {
    const { resumeData, updateResumeData } = useResume();
    const { summary, personalInfo } = resumeData || {};
    const [generating, setGenerating] = useState(false);

    const handleChange = (e) => {
        updateResumeData({ summary: e.target.value });
    };

    // Mock AI Generation
    const handleAIGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            const jobTitle = personalInfo?.jobTitle || 'Professional';
            const suggestion = `Motivated ${jobTitle} with proven experience in delivering high-quality results. Skilled in problem-solving and collaboration, with a strong focus on efficiency and innovation. Committed to continuous learning and contributing to team success.`;
            updateResumeData({ summary: suggestion });
            setGenerating(false);
        }, 1000);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
                <Button variant="outline" size="sm" onClick={handleAIGenerate} disabled={generating} className="text-xs py-1 px-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {generating ? 'Generating...' : 'AI Suggest'}
                </Button>
            </div>
            <p className="text-sm text-gray-500">Include 2-3 clear sentences about your overall experience.</p>
            <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                placeholder="e.g. Passionate Software Engineer with 5+ years of experience..."
                value={summary || ''}
                onChange={handleChange}
            />
        </div>
    );
};

export default SummaryForm;
