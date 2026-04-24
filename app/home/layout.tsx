'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiHome5Fill, RiUser3Line } from 'react-icons/ri';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full max-w-[1400px] mx-auto relative min-h-screen bg-white px-6 md:px-12 lg:px-20 pb-20">
        {/* Konten halaman */}
        {children}

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-50">
          <div className="w-full max-w-[1400px] mx-auto flex justify-center gap-32 items-center px-8 md:px-16 lg:px-20 py-3 pb-6">
            <Link href="/home" className="flex flex-col items-center gap-1">
              <RiHome5Fill className={`text-2xl ${pathname === '/home' ? 'text-[#c68a47]' : 'text-gray-400'}`} />
              <span className={`text-[12px] font-bold ${pathname === '/home' ? 'text-[#c68a47]' : 'text-gray-400'}`}>Beranda</span>
            </Link>
            
            <Link href="/home/profile" className="flex flex-col items-center gap-1">
              <RiUser3Line className={`text-2xl ${pathname === '/home/profile' ? 'text-[#c68a47]' : 'text-gray-400'}`} />
              <span className={`text-[12px] font-bold ${pathname === '/home/profile' ? 'text-[#c68a47]' : 'text-gray-400'}`}>Profil</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
