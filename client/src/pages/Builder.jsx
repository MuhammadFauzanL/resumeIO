import React from 'react';
import { ResumeProvider, useResume } from '../context/ResumeContext';
import FormEditor from '../components/editor/FormEditor';
import ResumePreview from '../components/preview/ResumePreview';
import Button from '../components/ui/Button';
import { Download, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuilderContent = () => {
    const { resumeData, loading, resetResume } = useResume();

    if (loading) return <div className="p-10 text-center">Loading builder...</div>;

    // Safety check if resumeData isn't loaded yet (though context handles init)
    if (!resumeData) return <div className="p-10 text-center">Initializing...</div>;

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center">
                    <Link to="/" className="text-gray-500 hover:text-gray-800 mr-4">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-lg font-semibold text-gray-800 truncate max-w-xs">{resumeData.personalInfo.firstName || 'My Resume'}</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="secondary" onClick={resetResume} className="flex items-center text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Data
                    </Button>
                    <Button variant="primary" onClick={handleDownload} className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                    </Button>
                </div>
            </header>
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Section (Left) */}
                <div className="w-1/2 overflow-y-auto bg-white border-r border-gray-200 p-6 shadow-xl z-0">
                    <FormEditor />
                </div>

                {/* Preview Section (Right) */}
                <div className="w-1/2 bg-gray-200 p-8 overflow-y-auto flex justify-center print:w-full print:p-0 print:absolute print:top-0 print:left-0 print:bg-white print:z-50">
                    <ResumePreview />
                </div>
            </div>
            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print\\:w-full, .print\\:w-full * {
                        visibility: visible;
                    }
                    .print\\:absolute {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    @page {
                        margin: 0;
                        size: auto;
                    }
                }
            `}</style>
        </div>
    );
};

const Builder = () => (
    <ResumeProvider>
        <BuilderContent />
    </ResumeProvider>
);

export default Builder;
