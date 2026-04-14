'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiTrash2, FiEyeOff } from 'react-icons/fi';

export default function ReservationPage() {
    const router = useRouter();
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedRes, setSelectedRes] = useState<any>(null);

    const MOCK_RESERVATIONS = [
        { id: 1, name: "Username", dateRange: "06-jan-2026 - 10-jan-2026", status: "Sudah Check-in" },
        { id: 2, name: "Username", dateRange: "10-jan-2026 - 13-jan-2026", status: "Belum Dikonfirmasi" },
        { id: 3, name: "Username", dateRange: "30-jan-2026 - 03-feb-2026", status: "Di Tolak" },
        { id: 4, name: "Username", dateRange: "30-apr-2026 - 03-mei-2026", status: "Selesai" },
    ];

    const handleBack = () => {
        if (view === 'list') {
            router.push('/receptionist');
        } else {
            setView('list');
            setSelectedRes(null);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-12">
            
            {/* ================= HEADER ================= */}
            <header className="w-full border-b border-gray-200">
               <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                   {/* Left */}
                   <div className="w-1/3">
                        <button 
                            onClick={handleBack}
                            className="bg-[#FF4500] text-white font-bold text-[15px] px-10 py-2 rounded-full hover:bg-red-600 shadow-sm"
                        >
                            Kembali
                        </button>
                   </div>
                   {/* Center */}
                   <div className="w-1/3 flex flex-col items-center">
                       <div className="relative w-36 h-12 mb-2">
                            <Image src="/images/logo-putih.png" alt="Restify Logo" fill className="object-contain opacity-90" priority />
                       </div>
                       <h1 className="text-[22px] font-medium tracking-wide">
                           {view === 'list' ? 'Daftar Reservasi' : `Reservasi "${selectedRes?.name || 'Username'}"`}
                       </h1>
                   </div>
                   {/* Right */}
                   <div className="w-1/3"></div>
               </div>
            </header>

            {/* ================= MAIN CONTENT ================= */}
            <main className="max-w-5xl mx-auto py-8 px-6">
                
                {/* ----------------- VIEW 1: DATA RESERVASI LIST ----------------- */}
                {view === 'list' && (
                    <div className="w-full flex justify-center animate-fade-in">
                        <div className="w-full max-w-[900px]">
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="border-b border-gray-200 text-center">
                                        <th className="border-r border-gray-200 py-4 text-xl font-bold w-[10%]">No.</th>
                                        <th className="border-r border-gray-200 py-4 text-xl font-bold w-[20%]">Nama</th>
                                        <th className="border-r border-gray-200 py-4 text-xl font-bold w-[35%]">Durasi</th>
                                        <th className="border-r border-gray-200 py-4 text-xl font-bold w-[20%]">Status</th>
                                        <th className="py-4 text-xl font-bold w-[15%]">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_RESERVATIONS.map((res, idx) => (
                                        <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="border-r border-gray-200 py-6 text-center font-bold text-lg">{res.id}</td>
                                            <td className="border-r border-gray-200 py-6 pl-8 font-bold text-lg">{res.name}</td>
                                            <td className="border-r border-gray-200 py-6 text-center font-bold text-sm">{res.dateRange}</td>
                                            <td className="border-r border-gray-200 py-6 text-center font-bold text-base">{res.status}</td>
                                            <td className="py-6">
                                                <div className="flex justify-center gap-3">
                                                    <button 
                                                        onClick={() => { setSelectedRes(res); setView('detail'); }}
                                                        className="w-8 h-8 bg-[#1A2E63] text-white rounded flex items-center justify-center shadow-sm hover:opacity-80"
                                                    >
                                                        <FiSearch className="text-sm font-bold" />
                                                    </button>
                                                    <button className="w-8 h-8 bg-[#E85D57] text-white rounded flex items-center justify-center shadow-sm hover:opacity-80">
                                                        <FiTrash2 className="text-sm" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ----------------- VIEW 2: RESERVASI DETAIL ----------------- */}
                {view === 'detail' && (
                    <div className="w-full flex flex-col items-center animate-fade-in">
                        <h2 className="text-[20px] font-medium tracking-wide mb-6">Data Reservasi</h2>

                        {/* Box Data */}
                        <div className="w-full max-w-[850px] bg-[#F4F5F6] border border-gray-400 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm min-h-[300px]">
                            
                            {/* Kiri */}
                            <div className="flex-1 flex flex-col gap-4">
                                {/* Input Nama */}
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Nama</label>
                                    <input type="text" readOnly value="Nama" className="w-full border border-gray-400 rounded-md px-3 py-2.5 text-xs bg-white text-gray-400 outline-none" />
                                </div>
                                {/* Input Tipe Kamar */}
                                <div className="mb-2">
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Tipe kamar</label>
                                    <input type="text" readOnly value="Kamar" className="w-full border border-gray-400 rounded-md px-3 py-2.5 text-xs bg-white text-gray-400 outline-none" />
                                </div>

                                {/* Informasi Tamu & Durasi */}
                                <div className="flex w-full mt-2">
                                    {/* Kolom Durasi */}
                                    <div className="w-[55%] pr-4 border-r border-gray-300">
                                        <label className="block text-[11px] font-bold text-gray-800 mb-2">Durasi Tinggal</label>
                                        
                                        <div className="flex flex-col gap-1 mt-1">
                                            <span className="font-bold text-[15px] tracking-wide">06 - Januari - 2026</span>
                                            <span className="text-[11px] text-gray-800 my-1 font-semibold">Sampai</span>
                                            <span className="font-bold text-[15px] tracking-wide">10 - Januari - 2026</span>
                                        </div>
                                    </div>

                                    {/* Kolom Tamu */}
                                    <div className="w-[45%] pl-6 flex flex-col mt-0">
                                        <label className="block text-[11px] font-bold text-gray-800 mb-2">Jumlah Tamu</label>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="font-bold text-[16px]">=</span>
                                            <span className="font-bold text-[16px]">2</span>
                                        </div>

                                        <label className="block text-[11px] font-bold text-gray-800 mb-2 mt-1">Tempat Tidur Ekstra</label>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[16px]">=</span>
                                            <span className="font-bold text-[16px]">1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Catatan</label>
                                    <textarea 
                                        readOnly 
                                        value="....." 
                                        className="w-full border border-gray-400 rounded-md px-3 py-3 text-sm bg-white text-gray-400 h-[170px] outline-none resize-none mb-4"
                                    />
                                </div>
                                <div className="mt-auto">
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Kode Transaksi</label>
                                    <div className="relative w-[60%]">
                                        <input 
                                            type="password" 
                                            readOnly 
                                            value="123456" 
                                            className="w-full border border-gray-400 rounded-md px-4 py-2.5 text-lg tracking-[0.3em] font-normal bg-white text-gray-800 outline-none" 
                                        />
                                        <FiEyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 text-lg cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons Bawah */}
                        <div className="w-full max-w-[850px] mt-8 flex justify-between px-10">
                            {/* Kiri Bawah (Konfirmasi & Tolak) */}
                            <div className="flex gap-4">
                                <button className="bg-[#4CAF50] text-white px-8 py-2 rounded-full font-medium shadow-sm hover:opacity-90">
                                    Konfirmasi
                                </button>
                                <button className="bg-[#FF3300] text-white px-8 py-2 rounded-full font-medium shadow-sm hover:bg-red-600">
                                    Tolak
                                </button>
                            </div>

                            {/* Kanan Bawah (Check In & Out) */}
                            <div className="flex gap-4">
                                <button className="bg-[#A4D5AA] text-white px-8 py-2 rounded-full font-medium shadow-sm hover:opacity-90 transition-all">
                                    Check In
                                </button>
                                <button className="bg-[#F89D84] text-white px-8 py-2 rounded-full font-medium shadow-sm hover:opacity-90 transition-all">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
            </main>
        </div>
    );
}
