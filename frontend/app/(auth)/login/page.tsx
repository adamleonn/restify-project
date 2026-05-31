'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { notify } from '@/lib/notifications';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // ─── BE: API call di sini
        
            // MOCK sementara 
            await new Promise((r) => setTimeout(r, 800));
            const role = 'user' as 'user' | 'admin' | 'receptionist'; // ganti dengan data.role dari API

            // Notif sukses otomatis sesuai role:
            notify.auth.loginSuccess(role);

            // Redirect otomatis sesuai role:
            if (role === 'admin')             router.push('/admin');
            else if (role === 'receptionist') router.push('/receptionist');
            else                             router.push('/home');

        } catch {
            notify.api.serverError();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-800">
            <div className="w-full max-w-md flex flex-col justify-between min-h-[85vh]">

                {/* Header */}
                <div className="flex-grow">
                    <div className="text-center mt-6 mb-12">
                        <h1 className="text-4xl font-semibold mb-3 tracking-wide">Masuk</h1>
                        <p className="text-[#A7A7A7] text-[13px] font-medium tracking-wide">
                            Selamat datang! Lanjutkan untuk masuk
                        </p>
                    </div>

                    <form className="w-full" onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="mb-5">
                            <label htmlFor="login-email" className="block text-xs font-bold text-gray-800 mb-2">
                                Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="email@contoh.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-sm text-gray-800 outline-none placeholder-gray-400 focus:ring-1 focus:ring-[#9FA682] transition-all"
                                required
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4 relative">
                            <label htmlFor="login-password" className="block text-xs font-bold text-gray-800 mb-2">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="*************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-[12px] text-sm text-gray-800 outline-none placeholder-gray-300 focus:ring-1 focus:ring-[#9FA682] transition-all"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg cursor-pointer focus:outline-none"
                                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                >
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </button>
                            </div>
                        </div>

                        {/* Lupa Kata Sandi */}
                        <div className="text-right mb-8">
                            <Link
                                href="/forgot-password"
                                className="text-[11px] font-semibold text-[#D4AF8B] hover:text-[#b89574] transition-colors underline underline-offset-2"
                            >
                                Lupa Kata Sandi?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#9DA884] text-white font-bold text-sm py-4 rounded-xl hover:bg-[#86926e] transition-shadow shadow-sm active:scale-[0.99] mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Memuat...' : 'Masuk'}
                        </button>

                        <div className="text-center text-xs font-bold text-black">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-[#D4AF8B] hover:underline underline-offset-2 ml-1">
                                Daftar
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Logo */}
                <div className="flex justify-center items-end mt-12 pb-4">
                    <div className="relative w-72 h-16 opacity-90">
                        <Image
                            src="/images/logo-putih.png"
                            alt="Restify Logo"
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