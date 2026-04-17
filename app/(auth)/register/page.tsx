'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-800">
            <div className="w-full max-w-md flex flex-col justify-between min-h-[85vh]">
                
                {/* Bagian Atas: Header & Form */}
                <div className="flex-grow">
                    {/* Header */}
                    <div className="text-center mt-6 mb-10">
                        <h1 className="text-4xl font-semibold mb-3 tracking-wide">Daftar Akun</h1>
                        <p className="text-[#A7A7A7] text-[13px] font-medium tracking-wide">
                            Silahkan isi detail Anda di bawah ini!
                        </p>
                    </div>

                    {/* Form Section */}
                    <form className="w-full">
                        {/* Nama Input */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-gray-800 mb-2">Nama</label>
                            <input 
                                type="text" 
                                placeholder="nama"
                                className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-sm text-gray-800 outline-none placeholder-gray-300 focus:ring-1 focus:ring-[#9FA682] transition-all"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-gray-800 mb-2">Email</label>
                            <input 
                                type="email" 
                                placeholder="email@contoh.com"
                                className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-sm text-gray-800 outline-none placeholder-gray-300 focus:ring-1 focus:ring-[#9FA682] transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4 relative">
                            <label className="block text-xs font-bold text-gray-800 mb-2">Kata Sandi</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="*************"
                                    className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-sm text-gray-800 outline-none placeholder-gray-300 focus:ring-1 focus:ring-[#9FA682] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg cursor-pointer focus:outline-none"
                                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                        </div>

                        {/* Checkbox Syarat & Ketentuan */}
                        <div className="flex justify-end items-center mb-8">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-3.5 h-3.5 border-gray-300 rounded text-[#D4AF8B] focus:ring-[#D4AF8B] checked:bg-[#D4AF8B] cursor-pointer"
                                    defaultChecked
                                />
                                <span className="text-[11px] font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
                                    Setuju dengan <span className="text-[#D4AF8B] underline underline-offset-2">Syarat & Ketentuan</span>
                                </span>
                            </label>
                        </div>

                        {/* Tombol Daftar */}
                        <div className="w-full block mb-6">
                            <button 
                                type="button" 
                                className="w-full bg-[#9DA884] text-white font-bold text-sm py-4 rounded-xl hover:bg-[#86926e] transition-shadow shadow-sm active:scale-[0.99]"
                            >
                                Daftar
                            </button>
                        </div>
                        
                        {/* Teks Masuk */}
                        <div className="text-center text-[13px] font-bold text-black mt-2">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="text-[#D4AF8B] hover:underline underline-offset-2 ml-1">
                                Masuk
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Bagian Bawah: Logo Besar */}
                <div className="flex justify-center items-end pb-4 pt-10">
                    <div className="relative w-72 h-16 opacity-90">
                        <Image 
                            src="/images/logo-putih.png" 
                            alt="Restify Logo Besar" 
                            fill 
                            className="object-contain" 
                            priority 
                        />
                    </div>
                </div>   
            </div>
        </main>
    );
}
