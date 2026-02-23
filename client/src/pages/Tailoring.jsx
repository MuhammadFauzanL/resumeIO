import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Sparkles, Copy, CheckCircle, ChevronDown, ChevronUp, Lightbulb, Target, FileText } from 'lucide-react';

const KEYWORDS_BY_INDUSTRY = {
    tech: ['agile', 'scrum', 'leadership', 'collaboration', 'problem-solving', 'analytical', 'communication', 'innovation', 'cloud', 'API', 'CI/CD', 'data-driven'],
    finance: ['financial analysis', 'budgeting', 'forecasting', 'risk management', 'compliance', 'reporting', 'stakeholder management', 'strategic planning'],
    marketing: ['brand management', 'SEO', 'content strategy', 'campaign management', 'analytics', 'ROI', 'CRM', 'social media', 'lead generation'],
    hr: ['talent acquisition', 'employee engagement', 'performance management', 'HRIS', 'onboarding', 'training & development', 'organizational development'],
    engineering: ['project management', 'technical design', 'cross-functional', 'quality assurance', 'process improvement', 'lean', 'six sigma'],
};

const TailoringPage = () => {
    const { resumeData } = useResume();
    const [jobDesc, setJobDesc] = useState('');
    const [industry, setIndustry] = useState('tech');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [expandedTip, setExpandedTip] = useState(null);

    const analyzeJobDesc = () => {
        setLoading(true);
        setTimeout(() => {
            const words = jobDesc.toLowerCase().split(/\s+/);
            const industryKws = KEYWORDS_BY_INDUSTRY[industry] || KEYWORDS_BY_INDUSTRY.tech;

            // Find keywords present in job desc but maybe missing from resume
            const resumeText = JSON.stringify(resumeData).toLowerCase();
            const foundInJD = industryKws.filter(kw => jobDesc.toLowerCase().includes(kw.toLowerCase()));
            const missingInResume = foundInJD.filter(kw => !resumeText.includes(kw.toLowerCase()));
            const alreadyPresent = foundInJD.filter(kw => resumeText.includes(kw.toLowerCase()));

            // Calculate match score
            const score = Math.min(100, Math.round(
                (alreadyPresent.length / Math.max(foundInJD.length, 1)) * 60 +
                (resumeData.experience?.length || 0) * 5 +
                (resumeData.skills?.length || 0) * 3 +
                (resumeData.summary?.length > 50 ? 20 : 5)
            ));

            // Generate suggestions
            const suggestions = [];
            if (!resumeData.summary || resumeData.summary.length < 80) {
                suggestions.push({
                    type: 'warning',
                    title: 'Tambahkan Professional Summary',
                    desc: 'Resume Anda belum memiliki profesional summary yang kuat. Tambahkan paragraf pembuka yang mencerminkan skill yang relevan dengan posisi ini.'
                });
            }
            if (missingInResume.length > 0) {
                suggestions.push({
                    type: 'error',
                    title: 'Keyword Penting Belum Ada di Resume',
                    desc: `Kata-kata kunci berikut ada di job description tapi belum terdeteksi di resume Anda: ${missingInResume.slice(0, 5).join(', ')}. Pertimbangkan untuk menambahkannya secara natural.`
                });
            }
            if ((resumeData.skills?.length || 0) < 5) {
                suggestions.push({
                    type: 'warning',
                    title: 'Tambahkan Lebih Banyak Skills',
                    desc: 'Resume Anda memiliki kurang dari 5 skill. Tambahkan skill teknis dan soft skill yang relevan dengan posisi yang dilamar.'
                });
            }
            if ((resumeData.experience?.length || 0) === 0) {
                suggestions.push({
                    type: 'error',
                    title: 'Tidak Ada Experience',
                    desc: 'Tambahkan pengalaman kerja atau internship yang relevan.'
                });
            }
            if (alreadyPresent.length > 0) {
                suggestions.push({
                    type: 'success',
                    title: 'Keyword yang Sudah Cocok',
                    desc: `Bagus! Keyword ini sudah ada di resume Anda: ${alreadyPresent.slice(0, 5).join(', ')}.`
                });
            }

            setResult({ score, missingInResume, alreadyPresent, foundInJD, suggestions });
            setLoading(false);
        }, 1500);
    };

    const scoreColor = result
        ? result.score >= 75 ? '#16a34a' : result.score >= 50 ? '#d97706' : '#dc2626'
        : '#6b7280';

    const scoreLabel = result
        ? result.score >= 75 ? 'Great Match!' : result.score >= 50 ? 'Moderate Match' : 'Low Match'
        : '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-10 text-white">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white bg-opacity-20">
                            <Target className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold">Resume Tailoring</h1>
                    </div>
                    <p className="text-white text-opacity-80 text-sm leading-relaxed">
                        Analisis kecocokan resume Anda dengan deskripsi pekerjaan. Dapatkan skor ATS dan saran keyword yang harus ditambahkan untuk meningkatkan peluang lolos seleksi.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Industri / Bidang Pekerjaan</label>
                        <select
                            value={industry}
                            onChange={e => setIndustry(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="tech">Technology / IT</option>
                            <option value="finance">Finance / Accounting</option>
                            <option value="marketing">Marketing / Digital</option>
                            <option value="hr">Human Resources</option>
                            <option value="engineering">Engineering</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Paste Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={jobDesc}
                            onChange={e => setJobDesc(e.target.value)}
                            placeholder="Paste deskripsi pekerjaan dari LinkedIn, JobStreet, Kalibrr, atau platform lainnya di sini..."
                            rows={7}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                        <div className="text-xs text-gray-400 mt-1">{jobDesc.length} karakter</div>
                    </div>
                    <button
                        onClick={analyzeJobDesc}
                        disabled={!jobDesc.trim() || loading}
                        className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Menganalisis...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Analisis Resume Sekarang
                            </>
                        )}
                    </button>
                </div>

                {/* Result Section */}
                {result && (
                    <div className="space-y-4">
                        {/* Score Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-6">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="10"
                                        strokeDasharray={`${result.score * 2.51} 251`} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold" style={{ color: scoreColor }}>{result.score}</span>
                                    <span className="text-xs text-gray-400">/ 100</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xl font-bold mb-1" style={{ color: scoreColor }}>{scoreLabel}</div>
                                <p className="text-sm text-gray-600">
                                    {result.alreadyPresent.length} dari {result.foundInJD.length} keyword kunci sudah ada di resume Anda.
                                    {result.missingInResume.length > 0 && ` ${result.missingInResume.length} keyword perlu ditambahkan.`}
                                </p>
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                Saran Perbaikan
                            </h2>
                            <div className="space-y-3">
                                {result.suggestions.map((tip, i) => {
                                    const colors = {
                                        success: { bg: '#f0fdf4', border: '#86efac', icon: '✅', text: '#166534' },
                                        warning: { bg: '#fffbeb', border: '#fcd34d', icon: '⚠️', text: '#92400e' },
                                        error: { bg: '#fef2f2', border: '#fca5a5', icon: '❌', text: '#991b1b' },
                                    };
                                    const c = colors[tip.type] || colors.warning;
                                    return (
                                        <div key={i} className="rounded-xl p-4 cursor-pointer"
                                            style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                                            onClick={() => setExpandedTip(expandedTip === i ? null : i)}>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-sm flex items-center gap-2" style={{ color: c.text }}>
                                                    {c.icon} {tip.title}
                                                </span>
                                                {expandedTip === i ? <ChevronUp className="w-4 h-4" style={{ color: c.text }} /> : <ChevronDown className="w-4 h-4" style={{ color: c.text }} />}
                                            </div>
                                            {expandedTip === i && (
                                                <p className="text-sm mt-2" style={{ color: c.text }}>{tip.desc}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Missing Keywords */}
                        {result.missingInResume.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h2 className="font-bold text-gray-800 mb-3">🎯 Keyword Yang Harus Ditambahkan</h2>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingInResume.map((kw, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-3">💡 Tambahkan keyword ini secara natural di bagian summary, experience, atau skills.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TailoringPage;
