import Image from 'next/image';
import Link from 'next/link';
import { RECOMMENDED_HOTELS, NEARBY_HOTELS } from '@/data/mockHotels';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { FiChevronDown, FiBell, FiSearch, FiHeart } from 'react-icons/fi';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white pb-24 font-sans text-restify-text-dark">
            {/* Header: Lokasi dan Notifikasi */}
            <header className="flex items-center justify-between p-6 pt-10">
                <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-3xl text-restify-olive" />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <h2 className="text-xl font-bold">Bandung</h2>
                        <FiChevronDown className="text-xl text-blue-900" />
                    </div>
                </div>
                <button className="relative p-2">
                    <FiBell className="text-3xl text-restify-olive font-bold" style={{ fill: '#4a5b42', strokeWidth: 1.5 }} />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-restify-olive border-2 border-white text-white text-[10px] flex items-center justify-center font-bold rounded-full">
                        +
                    </span>
                </button>
            </header>

            {/* Search Bar */}
            <section className="px-6 mb-8">
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-restify-olive text-lg" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-restify-cream rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-restify-text-dark placeholder-gray-400 outline-none focus:ring-2 focus:ring-restify-olive transition-all"
                    />
                </div>
            </section>

            {/* Recommended Hotels */}
            <section className="mb-8">
                <div className="flex items-center justify-between px-6 mb-5">
                    <h3 className="text-lg font-bold">Recommended Hotel</h3>
                    <Link href="/home" className="text-sm text-restify-olive font-semibold hover:underline">
                        Lihat semua
                    </Link>
                </div>

                <div className="flex gap-4 overflow-x-auto px-6 pb-4 -mb-4 scrollbar-hide">
                    {RECOMMENDED_HOTELS.map((hotel) => (
                        <div key={hotel.id} className="flex-shrink-0 w-60 bg-white border border-gray-100 rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
                                <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" />
                                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-400 shadow-sm hover:text-red-500 transition-colors">
                                    <FiHeart className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="px-1">
                                <div className="flex items-center justify-between text-[11px] mb-1.5 font-semibold">
                                    <span className="text-gray-400">{hotel.discountPercentage}% Off</span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar className="w-3 h-3" />
                                        <span>{hotel.rating}</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-[15px] mb-1">{hotel.name}</h4>
                                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                                    <FaMapMarkerAlt className="w-3 h-3" />
                                    <span>{hotel.location}</span>
                                </div>
                                <p className="text-restify-olive font-bold text-[15px]">
                                    ${hotel.pricePerDay}<span className="text-xs text-gray-400 font-normal"> /Day</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Nearby Hotels */}
            <section className="px-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold">Nearby Hotel</h3>
                    <Link href="/home" className="text-xs text-gray-500 font-medium hover:underline">
                        See all
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    {NEARBY_HOTELS.map((hotel) => (
                        <div key={hotel.id} className="flex w-full bg-white border border-gray-100 rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                            {/* Kiri: Gambar */}
                            <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                                <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" />
                                <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
                                    <FiHeart className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Kanan: Info */}
                            <div className="flex flex-col justify-center px-3 py-1 flex-grow">
                                <div className="flex items-center justify-between text-[10px] mb-1 font-semibold">
                                    <span className="text-gray-400">{hotel.discountPercentage}% Off</span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar className="w-2.5 h-2.5" />
                                        <span>{hotel.rating}</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-[14px] mb-1">{hotel.name}</h4>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-2">
                                    <FaMapMarkerAlt className="w-2.5 h-2.5" />
                                    <span>{hotel.location}</span>
                                </div>
                                <p className="text-restify-olive font-bold text-[15px] mt-auto">
                                    ${hotel.pricePerDay}<span className="text-[10px] text-gray-400 font-normal"> /Day</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}