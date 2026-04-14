"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonPrimary } from '@/components/ButtonPrimary';

export default function RootPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return (
      // PASTIKAN class 'bg-restify-olive' ini ada
      <main className="min-h-screen bg-restify-olive flex flex-col items-center justify-center p-6 transition-opacity duration-500">
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-4">
          <Image 
            src="/images/logo-restify.png" // Sesuaikan nama file logo Anda
            alt="Restify Logo"
            fill
            sizes="(max-width: 768px) 160px, 224px"
            className="object-contain"
            priority
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(107,127,96,0.3)] mb-12 border-4 border-white">
        <Image 
          src="/images/intro-hotel.jpg" 
          alt="Tempat menginap sempurna"
          fill
          sizes="(max-width: 768px) 288px, 384px"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-restify-text-dark max-w-sm mb-10 leading-snug">
        Temukan Tempat Menginap yang Sempurna untuk Anda!
      </h1>

      <div className="w-full max-w-sm">
        {/* PASTIKAN BLOK INI ADA UNTUK MENAMPILKAN TOMBOL */}
        <Link href="/login">
          <ButtonPrimary showArrow>
            Mulai
          </ButtonPrimary>
        </Link>
      </div>
    </main>
  );
}