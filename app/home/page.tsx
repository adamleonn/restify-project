'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RECOMMENDED_HOTELS, NEARBY_HOTELS } from '@/data/mockHotels';
import { MOCK_NOTIFICATIONS } from '@/data/mockNotifications';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { FiChevronDown, FiBell, FiSearch, FiFilter } from 'react-icons/fi';
import NotificationPanel from '@/app/components/NotificationPanel';


export default function HomePage() {
    // State untuk Search Bar (input aktif vs kata kunci yang sudah ditekan)
    const [searchInput, setSearchInput] = useState('');
    const [appliedSearchQuery, setAppliedSearchQuery] = useState('');

    // State untuk Filter Modal
    const [showFilter, setShowFilter] = useState(false);

    // State untuk panel notifikasi
    const [showNotif, setShowNotif] = useState(false);
    const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    
    // State terpisah untuk menyimpan filter yang sudah "Diterapkan"
    const [appliedMin, setAppliedMin] = useState<number | null>(null);
    const [appliedMax, setAppliedMax] = useState<number | null>(null);

    // Jalankan pencarian saat tombol "Enter" atau disubmit
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearchQuery(searchInput);
        // Reset filter setiap kali melakukan pencarian baru (opsional)
        if (searchInput.trim() === '') {
            setAppliedMin(null);
            setAppliedMax(null);
            setMinPrice('');
            setMaxPrice('');
        }
    };

    const handleApplyFilter = () => {
        setAppliedMin(minPrice ? parseInt(minPrice, 10) : null);
        setAppliedMax(maxPrice ? parseInt(maxPrice, 10) : null);
        setShowFilter(false);
    };

    const isSearching = appliedSearchQuery.trim() !== '';

    // Gabungkan seluruh hotel untuk Hasil Pencarian
    const allHotels = [...RECOMMENDED_HOTELS, ...NEARBY_HOTELS];
    const uniqueHotelsMap = new Map();
    allHotels.forEach(h => uniqueHotelsMap.set(h.name, h)); // Gunakan name sbg ID unik sementara agar tidak duplikat
    const uniqueAllHotels = Array.from(uniqueHotelsMap.values());

    const searchResults = uniqueAllHotels.filter((hotel) => {
        if (appliedMin !== null && hotel.pricePerDay < appliedMin) return false;
        if (appliedMax !== null && hotel.pricePerDay > appliedMax) return false;

        if (isSearching) {
            const q = appliedSearchQuery.toLowerCase();
            const matchName = hotel.name.toLowerCase().includes(q);
            const matchLoc = hotel.location.toLowerCase().includes(q);
            if (!matchName && !matchLoc) return false;
        }

        return true;
    });

    return (
        <>
        <main className="min-h-screen bg-white pb-10 text-restify-text-dark font-sans">
            {/* Header: Lokasi, Logo, dan Notifikasi */}
            <header className="flex items-center justify-between py-6">
                <div className="flex items-center gap-3 relative z-10">
                    <FaMapMarkerAlt className="text-3xl text-restify-olive" />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <h2 className="text-xl font-bold">Bandung</h2>
                        <FiChevronDown className="text-xl text-blue-900" />
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                    <div className="relative w-48 h-12">
                        <Image src="/images/logo-putih.png" alt="Restify Logo" fill className="object-contain" priority />
                    </div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <button className="flex items-center justify-center w-10 h-10 border-[1.5px] border-[#5E6B52] rounded-full text-[#5E6B52] font-semibold text-[13px] hover:bg-gray-50 transition-colors">
                        AI
                    </button>
                    {/* Tombol notifikasi dengan badge */}
                    <button
                        id="btn-notification"
                        onClick={() => setShowNotif(true)}
                        className="relative flex items-center justify-center w-10 h-10 border-[1.5px] border-[#5E6B52] rounded-full hover:bg-gray-50 transition-colors"
                        aria-label="Buka notifikasi"
                    >
                        <FiBell className="text-[22px] text-[#5E6B52]" style={{ strokeWidth: 1.5 }} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#E34A42] rounded-full border-2 border-white" />
                        )}
                    </button>
                </div>
            </header>

            {/* Search Bar - Sekarang butuh Enter untuk submit */}
            <section className="mb-6 relative z-10">
                <form onSubmit={handleSearch} className="relative mb-2">
                    <button type="submit" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-800 hover:text-restify-olive transition-colors">
                        <FiSearch className="text-lg font-bold" style={{ strokeWidth: 2.5 }} />
                    </button>
                    <input
                        type="text"
                        placeholder="Cari Hotel"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-[#FFFDF0] rounded-2xl py-3.5 pl-12 pr-4 text-[15px] font-medium text-restify-text-dark placeholder-gray-800 outline-none focus:ring-2 focus:ring-restify-olive transition-all"
                    />
                </form>
            </section>

            {/* Tampilan Dinamis Berdasarkan State isSearching */}
            {isSearching ? (
                // ==========================================
                // VIEW PENCARIAN (GRID KUMPULAN + FILTER BOX)
                // ==========================================
                <section className="mb-10 mt-2 relative z-50">
                    <div className="flex items-center justify-between mb-5 relative">
                        <h3 className="text-[19px] font-bold">Hasil Pencarian "{appliedSearchQuery}"</h3>
                        
                        <div className="relative">
                            <button 
                                onClick={() => setShowFilter(!showFilter)}
                                className={`flex items-center gap-2 text-[#5E6B52] font-semibold bg-white px-4 py-2 hover:bg-[#F9F7E8] transition-all
                                           ${showFilter ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            >
                                <FiFilter className="text-lg" /> Filter <FiChevronDown className="text-lg" />
                            </button>

                            {/* Popover Box Filter */}
                            {showFilter && (
                                <div className="absolute right-0 top-0 w-64 bg-[#FFFDF0] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#F0EDD8] overflow-hidden flex flex-col animate-fade-in origin-top-right z-50">
                                    <button 
                                        onClick={() => setShowFilter(false)} 
                                        className="flex items-center justify-end gap-2 text-[#5E6B52] font-semibold px-4 pt-3 pb-2 hover:opacity-80"
                                    >
                                        <FiFilter className="text-lg" /> Filter <FiChevronDown className="text-lg rotate-180 transition-transform" />
                                    </button>
                                    
                                    <div className="px-5 pb-5 pt-1">
                                        <label className="block text-xs font-bold text-gray-800 mb-1">Minimum Harga :</label>
                                        <input 
                                            type="number" 
                                            placeholder="RP..." 
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-xs mb-3 outline-none focus:border-[#5E6B52]" 
                                        />
                                        
                                        <label className="block text-xs font-bold text-gray-800 mb-1">Maksimal Harga :</label>
                                        <input 
                                            type="number" 
                                            placeholder="RP..." 
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-xs mb-4 outline-none focus:border-[#5E6B52]" 
                                        />

                                        <div className="flex justify-center">
                                            <button 
                                                onClick={handleApplyFilter}
                                                className="bg-[#5E6B52] text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all active:scale-95 shadow-sm"
                                            >
                                                Terapkan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {searchResults.length > 0 ? (
                            searchResults.map((hotel) => (
                                <div key={hotel.id} className="flex w-full bg-white border border-gray-100 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md transition-shadow">
                                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                        <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center px-4 py-1 flex-grow">
                                        <div className="flex items-center justify-end text-[10px] mb-1.5 font-semibold">
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <FaStar className="w-3 h-3" />
                                                <span>{hotel.rating}</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[15px] leading-snug mb-1 line-clamp-2">{hotel.name}</h4>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2">
                                            <FaMapMarkerAlt className="w-3 h-3" />
                                            <span>{hotel.location}</span>
                                        </div>
                                        <p className="font-bold text-[15px] mt-auto">
                                            Rp. {hotel.pricePerDay.toLocaleString('id-ID')} <span className="text-[11px] text-gray-400 font-normal">/ Malam</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic px-2 col-span-full">Tidak ada hotel yang sesuai dengan pencarian Anda.</p>
                        )}
                    </div>
                </section>
            ) : (
                // ==========================================
                // VIEW NORMAL (REKOMENDASI + TERDEKAT)
                // ==========================================
                <>
                    {/* Rekomendasi Hotel */}
                    <section className="mb-10 mt-2 relative z-10">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-[19px] font-bold">Rekomendasi Hotel</h3>
                            <Link href="/home" className="text-[15px] text-[#5E6B52] font-semibold hover:underline">
                                Lihat semua
                            </Link>
                        </div>

                        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#5E6B52]/70 scrollbar-track-[#F0EDD8] scrollbar-thumb-rounded-full">
                            {RECOMMENDED_HOTELS.map((hotel) => (
                                <Link key={hotel.id}
                                    href={{
                                        pathname: "/detail",
                                        query: {
                                        name: hotel.name,
                                        price: hotel.pricePerDay,
                                        image: hotel.imageUrl,
                                        rating: hotel.rating,
                                        location: hotel.location,
                                        },
                                    }}
                                >
                                    <div className="flex-shrink-0 w-[260px] bg-white border border-gray-100 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                        <div className="relative w-full h-[150px] rounded-2xl overflow-hidden mb-4">
                                            <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" />
                                        </div>
                                        
                                        <div className="px-1 pb-1">
                                            <div className="flex items-center justify-end text-[11px] mb-2 font-semibold">
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <FaStar className="w-3 h-3" />
                                                    <span>{hotel.rating}</span>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-[14px] leading-snug mb-1 line-clamp-2 min-h-[42px]">{hotel.name}</h4>
                                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
                                                <FaMapMarkerAlt className="w-3 h-3" />
                                                <span>{hotel.location}</span>
                                            </div>
                                            <p className="font-bold text-[14px]">
                                                Rp. {hotel.pricePerDay.toLocaleString('id-ID')} <span className="text-[11px] text-gray-400 font-normal">/ Malam</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Hotel Terdekat */}
                    <section className="mb-6 relative z-10">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-[19px] font-bold">Hotel Terdekat</h3>
                            <Link href="/home" className="text-[13px] text-gray-400 font-medium hover:underline">
                                Lihat semua
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {NEARBY_HOTELS.map((hotel) => (
                                <Link key={hotel.id}
                                    href={{
                                        pathname: "/detail",
                                        query: {
                                        name: hotel.name,
                                        price: hotel.pricePerDay,
                                        image: hotel.imageUrl,
                                        rating: hotel.rating,
                                        location: hotel.location,
                                        },
                                    }}
                                >
                                <div className="flex w-full bg-white border border-gray-100 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md transition-shadow">
                                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                        <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center px-4 py-1 flex-grow">
                                        <div className="flex items-center justify-end text-[10px] mb-1.5 font-semibold">
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <FaStar className="w-3 h-3" />
                                                <span>{hotel.rating}</span>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[15px] leading-snug mb-1 line-clamp-2">{hotel.name}</h4>
                                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2">
                                            <FaMapMarkerAlt className="w-3 h-3" />
                                            <span>{hotel.location}</span>
                                        </div>
                                        <p className="font-bold text-[15px] mt-auto">
                                            Rp. {hotel.pricePerDay.toLocaleString('id-ID')} <span className="text-[11px] text-gray-400 font-normal">/ Malam</span>
                                        </p>
                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </main>
        {/* Panel Notifikasi (slide-in dari kanan) */}
        <NotificationPanel isOpen={showNotif} onClose={() => setShowNotif(false)} />
        </>
    );
}