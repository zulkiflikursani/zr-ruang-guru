"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  GraduationCap,
  CheckCircle,
  Send,
  ArrowRight,
  Code,
  Bookmark,
  Layout,
  Monitor,
  Server,
  Zap,
  Award,
  BookOpen,
  ChevronRight,
  Play,
  Users,
  Database,
  Globe,
  Shield,
  Smartphone,
  Terminal,
  Cpu,
} from "lucide-react";

// Interface disesuaikan dengan RegisterRequestBody di Prisma API
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  level: string;
  subject: string;
}

interface Status {
  type: "success" | "error";
  message: string;
}

interface CurriculumItem {
  level: string;
  target: string;
  theme: "blue" | "indigo" | "purple" | "emerald";
  icon: React.ReactElement;
  description: string;
  modules: string[];
  standard: string;
}

interface StatItem {
  label: string;
  value: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    level: "SD (Junior Specialist)",
    subject: "Web Development Dasar",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Mengirim data ke API Route /api/register yang menggunakan Prisma
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message:
            "Pendaftaran Berhasil Disimpan! Mentor kami akan segera menghubungi Anda.",
        });
        // Reset form setelah berhasil
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          level: "SD (Junior Specialist)",
          subject: "Web Development Dasar",
        });
      } else {
        throw new Error(result.message || "Gagal mendaftar");
      }
    } catch (error: any) {
      setStatus({
        type: "error",
        message:
          error.message || "Terjadi kesalahan sistem. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  const curriculumDetails: CurriculumItem[] = [
    {
      level: "Level 1: Junior Specialist",
      target: "SD (Kelas 4-6)",
      theme: "blue",
      description:
        "Fokus pada Computational Thinking (Berpikir Komputasional) dan Literasi Digital dasar.",
      icon: <Monitor className="text-blue-600" />,
      modules: [
        "Pengenalan Pola & Algoritma Unplugged", // Khas Kurikulum Merdeka SD
        "Visual Programming dengan Scratch 3.0",
        "Literasi Digital & Etika Berinternet (Siber-aman)",
        "Olah Data Dasar & Visualisasi (Excel For Kids)",
        "Eksplorasi Kreatif: Digital Drawing & Presentasi",
      ],
      standard: "Fase B & C Kurikulum Merdeka",
    },
    {
      level: "Level 2: Intermediate",
      target: "SMP (Kelas 7-9)",
      theme: "indigo",
      description:
        "Transisi dari blok visual ke pemrograman tekstual dan analisis data otomatis.",
      icon: <Layout className="text-indigo-600" />,
      modules: [
        "Analisis Data & Fungsi Logika (Advanced Excel)",
        "Struktur Dasar Web (HTML5 & Semantic Tags)",
        "Styling & Layouting (CSS3 Flexbox/Grid)",
        "Logika Pemrograman Tekstual (Intro to JavaScript)",
        "Desain Solusi Digital (UI/UX Figma)",
      ],
      standard: "Fase D Kurikulum Merdeka",
    },
    {
      level: "Level 3: Expert Engineer",
      target: "SMA / SMK (Kelas 10-12)",
      theme: "purple",
      description:
        "Praktik Lintas Bidang: Membangun sistem informasi kompleks sesuai standar industri.",
      icon: <Server className="text-purple-600" />,
      modules: [
        "Arsitektur Backend & Clean Code (PHP 8.x)",
        "Manajemen Database Relasional (MySQL/PostgreSQL)",
        "Enterprise Framework (Laravel 11)",
        "Integrasi Sistem & RESTful API Development",
        "Kolaborasi Tim & Version Control (Git/GitHub)",
      ],
      standard: "Fase E & F Kurikulum Merdeka",
    },
  ];

  const stats: StatItem[] = [
    { label: "Siswa Aktif", value: "30+" },
    { label: "Mentor Ahli", value: "5" },
    { label: "Proyek Selesai", value: "10" },
    { label: "Rating Kepuasan", value: "~/5" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 px-6 lg:px-12 py-4 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-800">
              ZR-RUANG ILMU
            </span>
          </div>
          <div className="hidden md:flex gap-10 items-center text-[12px] font-black uppercase tracking-[0.2em]">
            <a
              href="#kurikulum"
              className="text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Kurikulum
            </a>
            <a
              href="#daftar"
              className="text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Daftar
            </a>
            <a
              href="#daftar"
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-95"
            >
              Mulai Belajar
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-linear-to-l from-indigo-50/40 to-transparent"></div>
        <div className="absolute top-40 -left-20 w-125 h-125 bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-600 text-xs font-black tracking-[0.15em] uppercase mb-10">
              <Zap size={14} className="fill-indigo-600" /> tingkatkan minat
              belajar
            </div>
            <h1 className="text-6xl lg:text-[100px] font-black text-slate-900 leading-[0.9] mb-10 tracking-tighter">
              Ubah{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-[200%_auto] animate-pulse">
                Logika
              </span>{" "}
              Jadi{" "}
              <span className="italic font-serif font-light text-indigo-500/80">
                Karya.
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-medium">
              Bimbingan IT eksklusif untuk generasi Z & Alpha. Kurikulum
              terstruktur dari pengolahan data Excel hingga pembuatan aplikasi
              web profesional berskala enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a
                href="#daftar"
                className="group bg-slate-900 text-white px-12 py-6 rounded-4xl font-black text-lg hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-indigo-200"
              >
                Daftar Sekarang{" "}
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </a>
              <button className="bg-white text-slate-700 border-2 border-slate-100 px-12 py-6 rounded-4xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-4">
                <Play size={20} className="fill-slate-700" /> Lihat Silabus
              </button>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-100 pt-12">
              {stats.map((s, i) => (
                <div key={i} className="group cursor-default">
                  <p className="text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {s.value}
                  </p>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl">
            <div className="relative z-10 bg-white p-6 rounded-[3.5rem] shadow-[0_80px_120px_-30px_rgba(0,0,0,0.18)] border border-slate-100 rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="bg-[#0F172A] rounded-[2.5rem] p-8 aspect-4/3 relative overflow-hidden shadow-inner font-mono text-sm leading-relaxed">
                <div className="flex gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  <span className="ml-4 text-[10px] text-slate-500 uppercase tracking-widest font-black">
                    Learn_Path.js
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-indigo-400">
                    {"const"} <span className="text-white">student</span> ={" "}
                    {"{"} <span className="text-slate-500">goal:</span>{" "}
                    <span className="text-emerald-400">'Mastering IT'</span>{" "}
                    {"};"}
                  </p>
                  <p className="text-indigo-400 mt-4">
                    {"function"}{" "}
                    <span className="text-blue-400">goToRuangIlmu</span>() {"{"}
                  </p>
                  <p className="pl-6 text-slate-400">{"return ["}</p>
                  <p className="pl-12 text-emerald-400">
                    {"'Level 1: Logic Foundation',"}
                  </p>
                  <p className="pl-12 text-emerald-400">
                    {"'Level 2: Web Intermediate',"}
                  </p>
                  <p className="pl-12 text-emerald-400">
                    {"'Level 3: Expert Laravel'"}
                  </p>
                  <p className="pl-6 text-slate-400">{"];"}</p>
                  <p className="text-indigo-400">{"}"}</p>

                  <div className="mt-8 pt-4 border-t border-white/5">
                    <p className="text-slate-500">{"// Status:"}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-emerald-400 animate-pulse">
                        {">"}
                      </span>
                      <span className="text-white font-black italic">
                        Siswa sedang bertransformasi...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-indigo-600 p-8 rounded-4xl shadow-2xl border border-indigo-500/30 hidden md:block">
              <div className="flex items-center gap-4 text-white">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Terminal size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">
                    ZR-SYSTEM
                  </p>
                  <p className="text-base font-black tracking-tight">
                    Verified Path
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -right-8 bg-white p-8 rounded-4xl shadow-2xl border border-slate-50 animate-bounce duration-3000 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Powered By
                  </p>
                  <p className="text-base font-black text-slate-800 tracking-tight">
                    ZR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section id="kurikulum" className="py-40 bg-slate-50/50 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 max-w-3xl mx-auto">
            <h2 className="text-[14px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-6">
              Peta Jalan Belajar
            </h2>
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
              Kurikulum Yang{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Presisi.
              </span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {curriculumDetails.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-4 flex flex-col"
              >
                <div
                  className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 bg-${item.theme}-50 border border-${item.theme}-100`}
                >
                  {React.cloneElement(item.icon, { size: 28 } as any)}
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2 leading-none">
                    {item.target}
                  </p>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                    {item.level}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="space-y-4 mb-6 grow">
                  {item.modules.map((mod, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-start text-slate-600 font-bold group/item"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 bg-${item.theme}-400 group-hover/item:scale-150 transition-all`}
                      ></div>
                      <span className="text-xs tracking-tight">{mod}</span>
                    </div>
                  ))}
                </div>

                {/* PENAMBAHAN STANDAR KURIKULUM TANPA MENGUBAH FONT */}
                <div className="mb-8 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Bookmark size={14} className="text-slate-400" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Akreditasi Program
                    </span>
                  </div>
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
                    {item.standard}
                  </p>
                </div>

                <a
                  href="#daftar"
                  className="w-full py-4 rounded-[1.2rem] border-2 border-slate-100 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                >
                  Daftar Kelas <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="daftar" className="py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-[#0F172A] rounded-[5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(15,23,42,0.4)] relative">
          <div className="flex-1 p-16 lg:p-24 text-white flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-indigo-600/20 to-transparent pointer-events-none"></div>
            <h2 className="text-5xl lg:text-[80px] font-black mb-10 leading-[0.9] tracking-tighter relative">
              Buka <span className="text-indigo-400">Peluang</span> Karier
              Digital Anda.
            </h2>
            <div className="space-y-12 relative">
              <div className="flex items-start gap-8">
                <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl">
                  <BookOpen size={32} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2 tracking-tight">
                    Data Aman & Terpusat
                  </h4>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Sistem pendaftaran kami terintegrasi langsung dengan
                    database profesional untuk menjamin keamanan data Anda.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10 shadow-xl">
                  <Users className="text-indigo-400" size={32} />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2 tracking-tight">
                    Respon Cepat
                  </h4>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Setelah mendaftar, sistem akan otomatis meneruskan data Anda
                    ke mentor yang tersedia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white p-16 lg:p-24 flex flex-col justify-center border-l border-white/5">
            <div className="mb-14">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                Formulir Pendaftaran
              </h3>
              <p className="text-slate-500 text-lg font-medium italic">
                Isi data dengan benar untuk sinkronisasi sistem.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group relative">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-600 transition-colors">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-b-2 border-slate-100 py-3 outline-none focus:border-indigo-600 transition-all text-lg font-bold bg-transparent placeholder:text-slate-200"
                    placeholder="Contoh: Andi Wijaya"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-600 transition-colors">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border-b-2 border-slate-100 py-3 outline-none focus:border-indigo-600 transition-all text-lg font-bold bg-transparent placeholder:text-slate-200"
                    placeholder="andi@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group relative">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-600 transition-colors">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border-b-2 border-slate-100 py-3 outline-none focus:border-indigo-600 transition-all text-lg font-bold bg-transparent placeholder:text-slate-200"
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="group relative">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-600 transition-colors">
                    Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-b-2 border-slate-100 py-3 outline-none focus:border-indigo-600 transition-all text-lg font-bold bg-transparent placeholder:text-slate-200"
                    placeholder="Contoh: Laravel Expert"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-indigo-600 transition-colors">
                  Level Pendidikan
                </label>
                <select
                  className="w-full border-b-2 border-slate-100 py-3 outline-none focus:border-indigo-600 transition-all text-lg font-bold bg-transparent appearance-none cursor-pointer"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                >
                  <option>SD (Junior Specialist)</option>
                  <option>SMP (Intermediate)</option>
                  <option>SMA (Expert Engineer)</option>
                  <option>Mahasiswa/Umum (Professional)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.4)] mt-6 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  "Memproses Database..."
                ) : (
                  <>
                    <Send size={18} /> Simpan Pendaftaran
                  </>
                )}
              </button>
            </form>

            {status && (
              <div
                className={`mt-8 p-5 ${status.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"} border-2 font-black rounded-3xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <CheckCircle size={20} />{" "}
                <span className="text-sm">{status.message}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                ZR-RUANG ILMU
              </span>
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-50 leading-relaxed text-center md:text-left">
              Academy of Technology and Software Engineering.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              Instagram @instagram
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              WhatsApp
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              LinkedIn
            </span>
          </div>
          <div className="text-slate-300 text-[10px] font-black uppercase tracking-widest">
            © {year} ZR-RUANG ILMU ACADEMY
          </div>
        </div>
      </footer>
    </div>
  );
}
