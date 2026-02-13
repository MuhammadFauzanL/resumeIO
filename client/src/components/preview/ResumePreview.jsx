import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import Button from '../ui/Button';

const ResumePreview = () => {
    const { resumeData, updateResumeData } = useResume();
    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    if (!resumeData) return null;

    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
        updateResumeData({ template }); // Ideally save this to backend too
    };

    const TemplateComponent = selectedTemplate === 'professional' ? ProfessionalTemplate : ModernTemplate;

    return (
        <div className="flex flex-col items-center space-y-4 print:block print:space-y-0">
            {/* Template Switcher - Hidden in Print */}
            <div className="bg-white p-2 rounded-md shadow-sm flex space-x-2 print:hidden z-10 sticky top-0">
                <span className="text-sm font-medium text-gray-700 self-center mr-2">Template:</span>
                <Button
                    variant={selectedTemplate === 'modern' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => handleTemplateChange('modern')}
                    className="text-xs py-1 px-3"
                >
                    Modern
                </Button>
                <Button
                    variant={selectedTemplate === 'professional' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => handleTemplateChange('professional')}
                    className="text-xs py-1 px-3"
                >
                    Professional
                </Button>
            </div>

            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top transform scale-75 md:scale-90 lg:scale-100 transition-transform duration-300 print:shadow-none print:transform-none print:w-full print:m-0">
                <TemplateComponent data={resumeData} />
            </div>
        </div>
    );
};

export default ResumePreview;
