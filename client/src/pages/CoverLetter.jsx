import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { FileText, Copy, Check, Download, Sparkles, RefreshCw, ChevronDown } from 'lucide-react';

const TONES = [
    { id: 'formal', label: 'Formal & Profesional', emoji: '👔' },
    { id: 'friendly', label: 'Ramah & Hangat', emoji: '😊' },
    { id: 'confident', label: 'Percaya Diri & Tegas', emoji: '💪' },
    { id: 'creative', label: 'Kreatif & Unik', emoji: '🎨' },
];

const OPENINGS = {
    formal: (name, pos, company) =>
        `Kepada Yth.\nHR Manager / Tim Rekrutmen\n${company || '[Nama Perusahaan]'}\n\nDengan hormat,\n\nMelalui surat lamaran ini, saya ${name}, mengajukan permohonan untuk bergabung sebagai ${pos || '[Posisi]'} di ${company || 'perusahaan yang Bapak/Ibu pimpin'}.`,
    friendly: (name, pos, company) =>
        `Kepada Tim Rekrutmen ${company || '[Nama Perusahaan]'},\n\nHalo! Perkenalkan, saya ${name}. Saya sangat antusias untuk melamar posisi ${pos || '[Posisi]'} di ${company || 'perusahaan Anda'} karena...`,
    confident: (name, pos, company) =>
        `Kepada Yth. Tim Rekrutmen ${company || '[Nama Perusahaan]'},\n\nSaya ${name}, profesional dengan rekam jejak yang terbukti, dan saya yakin dapat memberikan dampak nyata sebagai ${pos || '[Posisi]'} di ${company || 'perusahaan Anda'}.`,
    creative: (name, pos, company) =>
        `Halo Tim ${company || '[Nama Perusahaan]'} yang luar biasa!\n\nSaya ${name}, dan bukan kebetulan jika saya menemukan lowongan ${pos || '[Posisi]'} ini — saya percaya inilah kesempatan yang tepat untuk menghadirkan perspektif segar dan semangat inovasi ke tim Anda.`,
};

const SKILL_PARAGRAPHS = {
    formal: (skills, exp) =>
        `Selama perjalanan karir saya, saya telah mengembangkan keahlian di bidang ${skills}${exp ? `, termasuk pengalaman di ${exp}` : ''}. Saya percaya kombinasi hard skill dan soft skill yang saya miliki dapat menjadi aset berharga bagi tim Anda.`,
    friendly: (skills, exp) =>
        `Saya senang berbagi bahwa saya memiliki keahlian dalam ${skills}${exp ? ` dan pernah berkontribusi di ${exp}` : ''}. Saya seseorang yang suka belajar hal baru dan bekerja sama dalam tim yang dinamis!`,
    confident: (skills, exp) =>
        `Keahlian inti saya mencakup ${skills}${exp ? `, didukung pengalaman langsung di ${exp}` : ''}. Saya tidak hanya memenuhi kualifikasi — saya siap melampaui ekspektasi dan membawa hasil nyata.`,
    creative: (skills, exp) =>
        `Dengan keahlian di ${skills}${exp ? ` dan latar belakang di ${exp}` : ''}, saya membawa perspektif yang unik: saya memadukan pendekatan analitis dengan sentuhan kreativitas yang menghasilkan solusi inovatif.`,
};

const CLOSINGS = {
    formal: (name, email, phone) =>
        `Demikian surat lamaran ini saya sampaikan. Saya berharap mendapat kesempatan untuk berdiskusi lebih lanjut mengenai kontribusi yang dapat saya berikan.\n\nHormat saya,\n${name}\n${email || '[Email]'} | ${phone || '[Telepon]'}`,
    friendly: (name, email, phone) =>
        `Saya sangat berharap bisa bicara lebih jauh dengan tim Anda! Terima kasih sudah meluangkan waktu membaca surat ini.\n\nSalam hangat,\n${name}\n${email || '[Email]'} | ${phone || '[Telepon]'}`,
    confident: (name, email, phone) =>
        `Saya siap untuk wawancara dan dapat segera memulai. Terima kasih atas pertimbangannya.\n\nHormat saya,\n${name}\n${email || '[Email]'} | ${phone || '[Telepon]'}`,
    creative: (name, email, phone) =>
        `Saya tidak sabar untuk bertemu dan bertukar ide dengan tim Anda. Mari kita ciptakan sesuatu yang luar biasa bersama!\n\nDengan antusias,\n${name}\n${email || '[Email]'} | ${phone || '[Telepon]'}`,
};

const CoverLetterPage = () => {
    const { resumeData } = useResume();
    const [tone, setTone] = useState('formal');
    const [targetCompany, setTargetCompany] = useState('');
    const [targetPosition, setTargetPosition] = useState(resumeData?.personalInfo?.jobTitle || '');
    const [why, setWhy] = useState('');
    const [generated, setGenerated] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const pi = resumeData?.personalInfo || {};
    const name = `${pi.firstName || ''} ${pi.lastName || ''}`.trim() || '[Nama Anda]';
    const skills = (resumeData?.skills || []).slice(0, 4).map(s => s.name).filter(Boolean).join(', ') || 'berbagai bidang';
    const expName = (resumeData?.experience || [])[0]?.employer || '';

    const generate = () => {
        setLoading(true);
        setTimeout(() => {
            const opening = OPENINGS[tone](name, targetPosition, targetCompany);
            const skillPar = SKILL_PARAGRAPHS[tone](skills, expName);
            const whyPar = why
                ? `\n\n${tone === 'formal' || tone === 'confident'
                    ? `Alasan saya sangat tertarik untuk bergabung dengan ${targetCompany || 'perusahaan ini'} adalah ${why}.`
                    : `Yang membuat saya makin semangat? ${why}!`}`
                : '';
            const closing = CLOSINGS[tone](name, pi.email, pi.phone);
            setGenerated(`${opening}\n\n${skillPar}${whyPar}\n\n${closing}`);
            setLoading(false);
        }, 1200);
    };

    const copyText = () => {
        navigator.clipboard.writeText(generated);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadTxt = () => {
        const blob = new Blob([generated], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CoverLetter_${name.replace(' ', '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #f0fdf4 50%, #eff6ff 100%)' }}>
            {/* Hero */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-10 text-white">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white bg-opacity-20">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold">Cover Letter Crafting</h1>
                    </div>
                    <p className="text-white text-opacity-80 text-sm">
                        Generate cover letter profesional dalam hitungan detik. Data diambil otomatis dari resume Anda, dengan pilihan nada sesuai kepribadian dan budaya perusahaan.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8">

                {/* Data Preview */}
                <div className="bg-white rounded-2xl shadow-md p-5 mb-6 border-l-4 border-emerald-500">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">📋 Data diambil dari Resume Anda:</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <span>👤 {name}</span>
                        <span>📧 {pi.email || '—'}</span>
                        <span>📞 {pi.phone || '—'}</span>
                        <span>💼 {pi.jobTitle || '—'}</span>
                        <span>🛠️ Skills: {skills}</span>
                        <span>🏢 Exp: {expName || '—'}</span>
                    </div>
                </div>

                {/* Config Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h2 className="font-bold text-gray-800 mb-5">⚙️ Konfigurasi Cover Letter</h2>

                    {/* Tone Selection */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Nada / Tone Surat</label>
                        <div className="grid grid-cols-2 gap-2">
                            {TONES.map(t => (
                                <div key={t.id}
                                    onClick={() => setTone(t.id)}
                                    className={`rounded-xl p-3 cursor-pointer border-2 transition-all ${tone === t.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-300'}`}>
                                    <span className="text-lg mr-2">{t.emoji}</span>
                                    <span className={`text-sm font-medium ${tone === t.id ? 'text-emerald-700' : 'text-gray-700'}`}>{t.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Target Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Perusahaan</label>
                            <input
                                value={targetCompany}
                                onChange={e => setTargetCompany(e.target.value)}
                                placeholder="Contoh: PT Gojek Indonesia"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Posisi yang Dilamar</label>
                            <input
                                value={targetPosition}
                                onChange={e => setTargetPosition(e.target.value)}
                                placeholder="Contoh: Software Engineer"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Mengapa Anda Tertarik dengan Perusahaan Ini? <span className="text-gray-400 font-normal">(Opsional)</span>
                        </label>
                        <textarea
                            value={why}
                            onChange={e => setWhy(e.target.value)}
                            placeholder="Contoh: budaya inovasi yang kuat, dampak produk yang dirasakan jutaan orang, dll."
                            rows={3}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                        />
                    </div>

                    <button
                        onClick={generate}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                        style={{ background: 'linear-gradient(135deg, #059669, #0d9488)' }}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Membuat Cover Letter...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                {generated ? 'Buat Ulang' : 'Generate Cover Letter'}
                            </>
                        )}
                    </button>
                </div>

                {/* Result */}
                {generated && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-emerald-500" />
                                Cover Letter Anda
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={copyText}
                                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                                    {copied ? 'Disalin!' : 'Salin'}
                                </button>
                                <button onClick={downloadTxt}
                                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <Download className="w-4 h-4 text-gray-500" />
                                    Unduh .txt
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 whitespace-pre-line leading-relaxed border border-gray-100">
                            {generated}
                        </div>
                        <div className="mt-4 flex items-start gap-2 bg-amber-50 rounded-lg p-3 text-xs text-amber-700">
                            <span>💡</span>
                            <span>
                                <strong>Tips Pro:</strong> Sesuaikan paragraf "skill" dengan pengalaman spesifik Anda. Tambahkan contoh pencapaian konkret dengan angka/data untuk membuat cover letter lebih kuat.
                            </span>
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
                    <h2 className="font-bold text-gray-800 mb-4">📚 Tips Cover Letter yang Efektif</h2>
                    <div className="space-y-3">
                        {[
                            ['🎯 Personalisasi setiap surat', 'Jangan gunakan template yang sama untuk semua lamaran. Sesuaikan dengan nilai dan kebutuhan perusahaan.'],
                            ['📊 Gunakan angka dan data', 'Contoh: "Meningkatkan sales 35%" lebih kuat dari "Meningkatkan sales secara signifikan".'],
                            ['⚡ Singkat dan padat', 'Idealnya satu halaman (3-4 paragraf). HR biasanya hanya membaca 30 detik pertama.'],
                            ['🔍 Research perusahaan', 'Sebutkan nama perusahaan, produk, atau nilai spesifik untuk menunjukkan keseriusan Anda.'],
                        ].map(([title, desc], i) => (
                            <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 text-base">{title.split(' ')[0]}</div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">{title.slice(2)}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterPage;
