'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiHome5Fill, RiCompass3Line, RiHeart3Line, RiUser3Line } from 'react-icons/ri';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full max-w-[1400px] mx-auto relative min-h-screen bg-white px-6 md:px-12 lg:px-20">
        {/* Konten halaman */}
        {children}

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-50">
          <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center px-8 md:px-16 lg:px-20 py-3 pb-6">
            <Link href="/home" className="flex flex-col items-center gap-1">
              <RiHome5Fill className={`text-2xl ${pathname === '/home' ? 'text-[#c68a47]' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-medium ${pathname === '/home' ? 'text-[#c68a47]' : 'text-gray-400'}`}>Home</span>
            </Link>
            <Link href="/home/explore" className="flex flex-col items-center gap-1">
              <RiCompass3Line className={`text-2xl ${pathname === '/home/explore' ? 'text-[#c68a47]' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-medium ${pathname === '/home/explore' ? 'text-[#c68a47]' : 'text-gray-400'}`}>Explore</span>
            </Link>
            <Link href="/home/favourite" className="flex flex-col items-center gap-1">
              <RiHeart3Line className={`text-2xl ${pathname === '/home/favourite' ? 'text-[#c68a47]' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-medium ${pathname === '/home/favourite' ? 'text-[#c68a47]' : 'text-gray-400'}`}>Favourite</span>
            </Link>
            <Link href="/home/profile" className="flex flex-col items-center gap-1">
              <RiUser3Line className={`text-2xl ${pathname === '/home/profile' ? 'text-[#c68a47]' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-medium ${pathname === '/home/profile' ? 'text-[#c68a47]' : 'text-gray-400'}`}>Profile</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
