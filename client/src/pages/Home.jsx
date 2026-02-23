import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Send, PenTool, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-400',
        purple: 'bg-purple-500/10 text-purple-400',
        pink: 'bg-pink-500/10 text-pink-400',
        emerald: 'bg-emerald-500/10 text-emerald-400',
    };

    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colorClasses[color]}`}>
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
};

const Home = () => {
    return (
        <div className="min-h-screen bg-[#0a0f1c] text-white font-sans overflow-hidden selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 border-b border-white/10 bg-[#0a0f1c]/80 backdrop-blur-md sticky top-0">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-bold text-xl drop-shadow-md">P</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            ProResume
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <a href="#features" className="hover:text-white transition-colors">Fitur</a>
                        <Link to="/builder" className="hover:text-white transition-colors">Buat CV</Link>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <Link to="/builder" className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Mulai Sekarang
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
                            <Sparkles size={16} />
                            <span>Bikin CV ATS-Friendly Mudah & Cepat</span>
                        </div>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                        Dapatkan pekerjaan impianmu <br className="hidden lg:block" />
                        dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                            CV yang profesional.
                        </span>
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Nggak perlu ribet mikirin desain. Tinggal masukin data kamu, pilih template yang keren, rapihin isi CV, dan langsung download versi PDF-nya gratis!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/builder" className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-300">
                            Bikin CV Sekarang
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#features" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full font-semibold text-gray-300 border border-gray-700 hover:bg-white/5 transition-all">
                            Lihat Fitur
                        </a>
                    </div>
                </div>

                {/* Dashboard / Preview Mockup */}
                <div className="mt-24 relative mx-auto max-w-5xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30" />
                    <div className="relative rounded-2xl bg-[#0f172a] border border-gray-800 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center p-4 sm:p-8">
                        <div className="w-full h-full bg-[#1e293b] rounded-lg border border-gray-700 p-4 sm:p-6 flex gap-4 sm:gap-6">
                            <div className="w-[30%] hidden sm:flex flex-col gap-4">
                                <div className="h-4 w-1/2 bg-gray-600 rounded" />
                                <div className="h-10 w-full bg-gray-700 rounded border border-gray-600" />
                                <div className="h-10 w-full bg-gray-700 rounded border border-gray-600" />
                                <div className="h-10 w-full bg-blue-600/20 border border-blue-500/50 rounded" />
                                <div className="h-10 w-full bg-gray-700 rounded border border-gray-600 opacity-50" />
                            </div>
                            <div className="flex-1 bg-white rounded flex justify-center py-6 shadow-inner relative overflow-hidden">
                                <div className="w-4/5 sm:w-2/3 h-full bg-gray-50 rounded border border-gray-200 p-4 sm:p-6 mx-auto relative shadow-sm">
                                    <div className="h-6 w-1/3 bg-gray-800 rounded mb-4" />
                                    <div className="h-2 w-full bg-gray-300 rounded mb-2" />
                                    <div className="h-2 w-full bg-gray-300 rounded mb-2" />
                                    <div className="h-2 w-2/3 bg-gray-300 rounded mb-8" />

                                    <div className="h-4 w-1/4 bg-blue-600 rounded mb-3" />
                                    <div className="h-2 w-full bg-gray-300 rounded mb-2" />
                                    <div className="h-2 w-full bg-gray-300 rounded mb-2" />
                                    <div className="h-2 w-4/5 bg-gray-300 rounded mb-2" />

                                    <div className="mt-8 border-t border-gray-200 pt-6"></div>
                                    <div className="h-4 w-1/4 bg-blue-600 rounded mb-3" />
                                    <div className="h-2 w-full bg-gray-300 rounded mb-2" />
                                    <div className="h-2 w-3/4 bg-gray-300 rounded mb-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="relative z-10 bg-black/40 border-t border-white/5 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-4">Semua yang kamu butuhkan</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Fitur simpel tapi lengkap buat bantu kamu lolos screening HRD dan dapet panggilan interview.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={FileText}
                            title="Desain Keren"
                            description="Tinggal pilih template resume yang profesional, modern, dan tentunya ATS-friendly."
                            color="blue"
                        />
                        <FeatureCard
                            icon={Sparkles}
                            title="Penyesuaian Mudah"
                            description="Ganti font, warna, bentuk foto, sampai urutan posisi section sesuka hati kamu."
                            color="purple"
                        />
                        <FeatureCard
                            icon={PenTool}
                            title="Cover Letter"
                            description="Punya template surat lamaran yang bisa kamu cocokan biar lebih stand-out."
                            color="pink"
                        />
                        <FeatureCard
                            icon={Send}
                            title="Langsung Download"
                            description="Gak perlu nunggu lama, isi data komplit langsung bisa kamu simpan bentuk PDF."
                            color="emerald"
                        />
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="relative z-10 py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">6+</div>
                            <div className="text-gray-400 text-sm">Pilihan Template</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">100%</div>
                            <div className="text-gray-400 text-sm">Standar ATS</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">1-Click</div>
                            <div className="text-gray-400 text-sm">Format PDF</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">Gratis</div>
                            <div className="text-gray-400 text-sm">Langsung Pakai</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">Udah siap buat dilirik HRD?</h2>
                    <p className="text-xl text-gray-400 mb-10">Bikin langkah pertamamu nyari kerja makin gampang mulai dari sini.</p>
                    <Link to="/builder" className="inline-flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        Gas Bikin CV Sekarang
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-[#0a0f1d] py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm drop-shadow-md">P</span>
                        </div>
                        <span className="text-xl font-bold text-white">ProResume</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} ProResume. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
