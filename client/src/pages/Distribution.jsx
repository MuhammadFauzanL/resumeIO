import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Send, Copy, Check, Briefcase, Mail, Linkedin, Globe, FileText, Sparkles, Building2 } from 'lucide-react';

const PLATFORMS = [
    { id: 'linkedin', name: 'LinkedIn', icon: '🔗', color: '#0077B5', desc: 'Kirim langsung via LinkedIn Easy Apply' },
    { id: 'jobstreet', name: 'JobStreet', icon: '💼', color: '#e60028', desc: 'Platform lowongan terbesar di Asia Tenggara' },
    { id: 'kalibrr', name: 'Kalibrr', icon: '🎯', color: '#4F46E5', desc: 'Smart job matching platform' },
    { id: 'glints', name: 'Glints', icon: '⚡', color: '#FF6B2B', desc: 'Platform karir untuk fresh graduate & profesional' },
    { id: 'indeed', name: 'Indeed', icon: '🌐', color: '#003A9B', desc: 'Job search engine terbesar di dunia' },
    { id: 'email', name: 'Email Langsung', icon: '✉️', color: '#6B7280', desc: 'Kirim resume langsung ke HR/recruiter' },
];

const CHECKLIST = [
    { id: 'photo', label: 'Foto profil professional (opsional)' },
    { id: 'format', label: 'Format PDF sudah siap (bukan DOC/DOCX)' },
    { id: 'size', label: 'Ukuran file < 2MB' },
    { id: 'filename', label: 'Nama file menggunakan format: NamaAnda_Resume.pdf' },
    { id: 'contact', label: 'Email dan nomor telepon aktif tercantum' },
    { id: 'linkedin_url', label: 'URL LinkedIn di-custom (linkedin.com/in/nama-anda)' },
    { id: 'ats', label: 'Resume sudah dioptimasi untuk ATS (no table/chart)' },
    { id: 'proofreading', label: 'Sudah proofreading & tidak ada typo' },
];

const DistributionPage = () => {
    const { resumeData } = useResume();
    const [checklist, setChecklist] = useState({});
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [trackingData, setTrackingData] = useState([]);
    const [showAddApplication, setShowAddApplication] = useState(false);
    const [newApp, setNewApp] = useState({ company: '', role: '', platform: '', date: '', status: 'Applied' });
    const [copied, setCopied] = useState(false);

    const toggleCheck = (id) => setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
    const togglePlatform = (id) => setSelectedPlatforms(prev =>
        prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );

    const checkedCount = Object.values(checklist).filter(Boolean).length;

    const addApplication = () => {
        if (!newApp.company || !newApp.role) return;
        setTrackingData(prev => [...prev, { ...newApp, id: Date.now() }]);
        setNewApp({ company: '', role: '', platform: '', date: '', status: 'Applied' });
        setShowAddApplication(false);
    };

    const emailSubject = `Lamaran: ${resumeData?.personalInfo?.jobTitle || 'Posisi yang Tersedia'} – ${resumeData?.personalInfo?.firstName || ''} ${resumeData?.personalInfo?.lastName || ''}`;
    const emailBody = `Kepada Yth. Tim Rekrutmen,

Nama saya ${resumeData?.personalInfo?.firstName || '[Nama]'} ${resumeData?.personalInfo?.lastName || ''}, dan saya sangat tertarik untuk bergabung di perusahaan Anda sebagai ${resumeData?.personalInfo?.jobTitle || '[Posisi yang Dilamar]'}.

Terlampir saya kirimkan resume saya untuk pertimbangan Anda. Saya percaya pengalaman dan kemampuan saya dapat memberikan kontribusi yang berarti bagi tim Anda.

Terima kasih atas waktu dan perhatian Bapak/Ibu. Saya berharap dapat berdiskusi lebih lanjut.

Hormat saya,
${resumeData?.personalInfo?.firstName || '[Nama]'} ${resumeData?.personalInfo?.lastName || ''}
${resumeData?.personalInfo?.email || '[Email]'}
${resumeData?.personalInfo?.phone || '[Telepon]'}`;

    const copyEmail = () => {
        navigator.clipboard.writeText(emailBody);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusColors = {
        Applied: '#3b82f6', Interview: '#f59e0b', Offer: '#10b981', Rejected: '#ef4444', Pending: '#8b5cf6'
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-10 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white bg-opacity-20">
                            <Send className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold">Resume Distribution</h1>
                    </div>
                    <p className="text-white text-opacity-80 text-sm">
                        Kelola proses pengiriman resume ke berbagai platform lowongan kerja. Lacak aplikasi Anda dan pastikan resume sudah siap sebelum dikirim.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

                {/* Checklist */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Checklist Persiapan Resume
                        </h2>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full"
                            style={{ backgroundColor: checkedCount === CHECKLIST.length ? '#dcfce7' : '#dbeafe', color: checkedCount === CHECKLIST.length ? '#166534' : '#1d4ed8' }}>
                            {checkedCount}/{CHECKLIST.length} Selesai
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
                        <div className="h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(checkedCount / CHECKLIST.length) * 100}%`, backgroundColor: checkedCount === CHECKLIST.length ? '#16a34a' : '#3b82f6' }} />
                    </div>
                    <div className="space-y-2">
                        {CHECKLIST.map(item => (
                            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${checklist[item.id] ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-blue-400'}`}
                                    onClick={() => toggleCheck(item.id)}>
                                    {checklist[item.id] && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-sm ${checklist[item.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Platform Cards */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-cyan-500" />
                        Platform Pengiriman
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">Pilih platform mana saja yang ingin Anda gunakan untuk melamar kerja</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {PLATFORMS.map(p => (
                            <div key={p.id}
                                onClick={() => togglePlatform(p.id)}
                                className={`rounded-xl p-3 cursor-pointer border-2 transition-all ${selectedPlatforms.includes(p.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                                <div className="text-2xl mb-1">{p.icon}</div>
                                <div className="text-sm font-semibold text-gray-800">{p.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                                {selectedPlatforms.includes(p.id) && (
                                    <div className="mt-1.5 text-xs font-semibold" style={{ color: p.color }}>✓ Dipilih</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Template */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-green-500" />
                            Template Email Lamaran
                        </h2>
                        <button onClick={copyEmail}
                            className="text-sm flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                            {copied ? 'Disalin!' : 'Salin'}
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 font-mono leading-relaxed border border-gray-100">
                        <div className="mb-2 text-xs font-sans text-gray-500">
                            <strong>Subject:</strong> {emailSubject}
                        </div>
                        <div className="border-t border-gray-200 pt-2 whitespace-pre-line">{emailBody}</div>
                    </div>
                </div>

                {/* Application Tracker */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-500" />
                            Lacak Aplikasi
                        </h2>
                        <button onClick={() => setShowAddApplication(!showAddApplication)}
                            className="text-sm font-semibold px-4 py-2 rounded-lg text-white"
                            style={{ backgroundColor: '#7c3aed' }}>
                            + Tambah
                        </button>
                    </div>

                    {showAddApplication && (
                        <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-100">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input placeholder="Nama Perusahaan *" value={newApp.company} onChange={e => setNewApp(p => ({ ...p, company: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                <input placeholder="Posisi yang Dilamar *" value={newApp.role} onChange={e => setNewApp(p => ({ ...p, role: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                <select value={newApp.platform} onChange={e => setNewApp(p => ({ ...p, platform: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                                    <option value="">Pilih Platform</option>
                                    {PLATFORMS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                </select>
                                <input type="date" value={newApp.date} onChange={e => setNewApp(p => ({ ...p, date: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                <select value={newApp.status} onChange={e => setNewApp(p => ({ ...p, status: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                                    {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={addApplication} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: '#7c3aed' }}>Simpan</button>
                                <button onClick={() => setShowAddApplication(false)} className="px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50">Batal</button>
                            </div>
                        </div>
                    )}

                    {trackingData.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <Send className="w-10 h-10 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">Belum ada lamaran yang dicatat. Klik "+ Tambah" untuk mulai melacak.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {trackingData.map(app => (
                                <div key={app.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                                    <div>
                                        <div className="font-semibold text-sm text-gray-800">{app.company}</div>
                                        <div className="text-xs text-gray-500">{app.role} · {app.platform} · {app.date}</div>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                                        style={{ backgroundColor: statusColors[app.status] || '#6b7280' }}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DistributionPage;
