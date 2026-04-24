'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Jika "Iya" diklik bisa redirect ke login

export default function ProfilePage() {
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState<'profil' | 'riwayat' | 'logout'>('profil');
  const router = useRouter();

  const handleLogout = () => {
    // Aksi logout, bisa menghapus token lalu redirect
    router.push('/login');
  };

  return (
    // Diberi margin atas dan bawah agar tidak terpotong header/footer dan ada ruang bernapas
    // Background di-set abu-abu sebagai fallback jika gambar doodle belum tersedia
    <div className="w-full relative min-h-[calc(100vh-140px)] flex items-center justify-center p-4 py-8 mb-10 overflow-hidden">
      
      {/* Background Doodle dari file yang bapak/ibu berikan */}
      <div 
        className="absolute inset-0 z-0 opacity-25 bg-center bg-cover bg-no-repeat" 
        style={{
          backgroundImage: `url('/images/bg-doodles.jpg')`
        }}
      ></div>

      {/* Container Utama Putih */}
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden min-h-[550px] relative z-10 border border-gray-50">
        
        {/* ================================== */}
        {/* SIDEBAR KIRI (Menu Navigasi)       */}
        {/* ================================== */}
        <div className="w-full md:w-[35%] bg-[#FFFDF0] p-8 flex flex-col items-center">
            {/* Logo */}
            <div className="mb-4 mt-2">
                <Image src="/images/logo-putih.png" alt="Restify Logo" width={160} height={45} className="object-contain" priority />
            </div>
            
            {/* Divider Line */}
            <div className="w-full h-px bg-gray-300/60 mb-10 mt-2"></div>

            {/* Menu Buttons */}
            <div className="flex flex-col gap-5 w-full px-2">
                <button 
                  onClick={() => setActiveTab('profil')}
                  className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-all shadow-sm
                    ${activeTab === 'profil' ? 'bg-[#5E6B52] text-white hover:bg-opacity-90' : 'bg-[#ACB5A4] text-white hover:bg-[#8f9888]'}`}
                >
                  Profil Saya
                </button>
                <button 
                  onClick={() => setActiveTab('riwayat')}
                  className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-all shadow-sm
                    ${activeTab === 'riwayat' ? 'bg-[#5E6B52] text-white hover:bg-opacity-90' : 'bg-[#ACB5A4] text-white hover:bg-[#8f9888]'}`}
                >
                  Riwayat Pembelian
                </button>
                <button 
                  onClick={() => setActiveTab('logout')}
                  className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-all shadow-sm
                    ${activeTab === 'logout' ? 'bg-[#E34A42] text-white hover:bg-red-700' : 'bg-[#F2A299] text-white hover:bg-[#de8478]'}`}
                >
                  Logout
                </button>
            </div>
        </div>

        {/* ================================== */}
        {/* AREA KONTEN KANAN                  */}
        {/* ================================== */}
        <div className="w-full md:w-[65%] p-10 flex flex-col justify-center">
            
            {/* Tampilan 1: PROFIL SAYA */}
            {activeTab === 'profil' && (
                <div className="w-full max-w-md mx-auto animate-fade-in pl-4">
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-800 mb-2.5">Nama</label>
                        <input type="text" value="nama" readOnly 
                            className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-xl text-sm font-medium text-gray-800 outline-none" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-800 mb-2.5">Email</label>
                        <input type="email" value="email@contoh.com" readOnly 
                            className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-xl text-sm font-medium text-gray-800 outline-none" />
                    </div>
                    <div className="mb-1">
                        <label className="block text-xs font-bold text-gray-800 mb-2.5">Kata Sandi</label>
                        <input type="password" value="*************" readOnly 
                            className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-xl text-lg font-medium text-gray-800 outline-none tracking-widest" />
                    </div>
                    <div className="flex justify-end mt-2">
                        <button className="text-[11px] text-red-500 font-medium hover:underline">
                            Ganti Password
                        </button>
                    </div>
                </div>
            )}

            {/* Tampilan 2: RIWAYAT PEMBELIAN */}
            {activeTab === 'riwayat' && (
                <div className="w-full h-full flex flex-col items-center animate-fade-in">
                    <h2 className="text-[25px] font-medium tracking-wide mb-8">Riwayat Pembelian</h2>
                    
                    {/* Area Scroll Riwayat */}
                    <div className="w-full max-w-md flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-4 scrollbar-thin scrollbar-thumb-[#5E6B52] scrollbar-track-transparent">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="w-full bg-[#9B9B9B] text-black font-semibold tracking-wide flex items-center justify-center py-10 rounded-[14px] text-[15px]">
                                INI DATA RIWAYAT
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tampilan 3: LOGOUT */}
            {activeTab === 'logout' && (
                <div className="w-full h-full flex flex-col items-center justify-center pb-10 animate-fade-in">
                    <h2 className="text-[26px] font-medium mb-12 text-center max-w-[350px] leading-snug">
                        Apakah anda yakin ingin keluar?
                    </h2>
                    <button 
                        onClick={handleLogout}
                        className="bg-[#E34A42] text-white font-medium text-lg px-20 py-2.5 rounded-2xl hover:bg-red-700 transition-colors shadow-sm"
                    >
                        Iya
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
