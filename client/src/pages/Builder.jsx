import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ResumeProvider, useResume } from '../context/ResumeContext';
import FormEditor from '../components/editor/FormEditor';
import ResumePreview from '../components/preview/ResumePreview';
import { Download, Trash2, Target, Send, FileText, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuilderContent = () => {
    const { resumeData, loading, resetResume } = useResume();
    const [editorWidth, setEditorWidth] = useState(45); // percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const [saveIndicator, setSaveIndicator] = useState(false);

    // Show save indicator when data changes
    useEffect(() => {
        if (resumeData && !loading) {
            setSaveIndicator(true);
            const timer = setTimeout(() => setSaveIndicator(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [resumeData]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        setEditorWidth(Math.max(20, Math.min(70, newWidth)));
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <div className="text-gray-500">Loading builder...</div>
            </div>
        </div>
    );
    if (!resumeData) return <div className="p-10 text-center">Initializing...</div>;

    const handleDownload = () => { window.print(); };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center shadow-sm z-20 print:hidden">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>P</div>
                        <span className="font-bold text-gray-800 hidden sm:block">Pro<span className="text-blue-500">Resume</span></span>
                    </div>

                    {/* Nav Pills */}
                    <div className="hidden md:flex items-center gap-1 ml-4">
                        <Link to="/tailoring"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                            <Target className="w-3.5 h-3.5" />
                            Resume Tailoring
                        </Link>
                        <Link to="/distribution"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <Send className="w-3.5 h-3.5" />
                            Distribution
                        </Link>
                        <Link to="/cover-letter"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                            <FileText className="w-3.5 h-3.5" />
                            Cover Letter
                        </Link>
                    </div>
                </div>

                {/* Current Resume Title + Save indicator */}
                <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-gray-700 truncate max-w-[180px] hidden sm:block">
                        {resumeData.personalInfo?.firstName
                            ? `${resumeData.personalInfo.firstName}'s Resume`
                            : 'My Resume'}
                    </div>
                    {saveIndicator && (
                        <div className="flex items-center gap-1 text-xs text-green-600 animate-pulse">
                            <Save className="w-3 h-3" />
                            <span className="hidden sm:inline">Saved</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Mobile feature links */}
                    <div className="flex md:hidden gap-1">
                        <Link to="/tailoring" title="Resume Tailoring">
                            <button className="p-2 rounded-lg text-purple-600 hover:bg-purple-50">
                                <Target className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link to="/cover-letter" title="Cover Letter">
                            <button className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50">
                                <FileText className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    <button
                        onClick={resetResume}
                        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Clear</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-lg text-white font-semibold transition-colors"
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Download PDF</span>
                        <span className="sm:hidden">PDF</span>
                    </button>
                </div>
            </header>

            {/* Feature Banner - compact */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-center gap-8 print:hidden">
                {[
                    { to: '/tailoring', icon: Target, label: 'Resume Tailoring', color: 'text-slate-300 hover:text-white' },
                    { to: '/distribution', icon: Send, label: 'Distribution Hub', color: 'text-slate-300 hover:text-white' },
                    { to: '/cover-letter', icon: FileText, label: 'Cover Letter', color: 'text-slate-300 hover:text-white' },
                ].map(item => (
                    <Link key={item.to} to={item.to}
                        className={`text-sm font-medium transition-colors ${item.color} flex items-center gap-2`}>
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Main Builder Area - Resizable */}
            <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
                {/* Editor Panel */}
                <div
                    className="overflow-y-auto bg-white border-r border-gray-200 p-6 shadow-xl z-0 flex-shrink-0 print:hidden"
                    style={{ width: `${editorWidth}%` }}
                >
                    <FormEditor />
                </div>

                {/* Drag Handle */}
                <div
                    className="w-2 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-colors flex items-center justify-center z-10 print:hidden flex-shrink-0"
                    onMouseDown={handleMouseDown}
                    style={{ backgroundColor: isDragging ? '#3b82f6' : undefined }}
                >
                    <div className="flex flex-col gap-1">
                        <div className="w-0.5 h-1 bg-gray-400 rounded-full" />
                        <div className="w-0.5 h-1 bg-gray-400 rounded-full" />
                        <div className="w-0.5 h-1 bg-gray-400 rounded-full" />
                        <div className="w-0.5 h-1 bg-gray-400 rounded-full" />
                        <div className="w-0.5 h-1 bg-gray-400 rounded-full" />
                    </div>
                </div>

                {/* Preview Panel - uses flex-1 to properly fill remaining space */}
                <div
                    className="bg-gray-100 overflow-y-auto overflow-x-auto flex-1 min-w-0 print:overflow-visible"
                    id="resume-preview-panel"
                >
                    <div className="p-6 flex justify-center print:p-0">
                        <ResumePreview />
                    </div>
                </div>
            </div>

            {/* Print CSS - comprehensive */}
            <style>{`
                @media print {
                    /* Hide everything first */
                    body * {
                        visibility: hidden;
                    }
                    /* Show only the resume preview */
                    #resume-preview-panel,
                    #resume-preview-panel * {
                        visibility: visible !important;
                    }
                    /* Position the preview to fill the page */
                    #resume-preview-panel {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        z-index: 99999 !important;
                    }
                    #resume-preview-panel > div {
                        padding: 0 !important;
                        display: block !important;
                    }
                    /* A4 page setup */
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    /* The resume paper element */
                    .resume-paper {
                        width: 100% !important;
                        min-height: auto !important;
                        max-width: 100% !important;
                        box-shadow: none !important;
                        transform: none !important;
                        margin: 0 !important;
                        page-break-after: auto;
                    }
                    /* Preserve colors */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
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