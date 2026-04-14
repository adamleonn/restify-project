import Link from 'next/link';
import Image from 'next/image';
import { FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-800">
            <div className="w-full max-w-md flex flex-col justify-between min-h-[85vh]">
                
                {/* Bagian Atas: Header & Form */}
                <div className="flex-grow">
                    {/* Header */}
                    <div className="text-center mt-6 mb-12">
                        <h1 className="text-4xl font-semibold mb-3 tracking-wide">Masuk</h1>
                        <p className="text-[#A7A7A7] text-[13px] font-medium tracking-wide">
                            Selamat datang! Lanjutkan untuk masuk
                        </p>
                    </div>

                    {/* Form Section */}
                    <form className="w-full">
                        {/* Email Input */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-gray-800 mb-2">Email</label>
                            <input 
                                type="email" 
                                placeholder="email@contoh.com"
                                className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-sm text-gray-800 outline-none placeholder-gray-400 focus:ring-1 focus:ring-[#9FA682] transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4 relative">
                            <label className="block text-xs font-bold text-gray-800 mb-2">Kata Sandi</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    placeholder="*************"
                                    className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-lg font-medium text-gray-800 outline-none placeholder-gray-300 tracking-widest focus:ring-1 focus:ring-[#9FA682] transition-all"
                                />
                                <FiEyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg cursor-pointer" />
                            </div>
                        </div>

                        {/* Lupa Kata Sandi */}
                        <div className="text-right mb-8">
                            <Link href="/forgot-password" className="text-[11px] font-semibold text-[#D4AF8B] hover:text-[#b89574] transition-colors underline underline-offset-2">
                                Lupa Kata Sandi?
                            </Link>
                        </div>

                        {/* Tombol Masuk */}
                        <Link href="/home" className="w-full block">
                            <button 
                                type="button" 
                                className="w-full bg-[#9DA884] text-white font-bold text-sm py-4 rounded-xl hover:bg-[#86926e] transition-shadow shadow-sm active:scale-[0.99] mb-8"
                            >
                                Masuk
                            </button>
                        </Link>
                        
                        {/* Teks Daftar */}
                        <div className="text-center text-xs font-bold text-black">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-[#D4AF8B] hover:underline underline-offset-2 ml-1">
                                Daftar
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Bagian Bawah: Logo Besar */}
                <div className="flex justify-center items-end mt-12 pb-4">
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