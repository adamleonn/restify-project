'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEdit, FiTrash2, FiFileText, FiPlus, FiMinus, FiCheckCircle, FiImage } from 'react-icons/fi';

export default function AdminHotelsPage() {
    const router = useRouter();
    
    // View state manager
    type ViewState = 'list' | 'add' | 'edit' | 'room_list' | 'room_add' | 'room_edit';
    const [view, setView] = useState<ViewState>('list');
    
    // Trackers
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{id: number, name: string} | null>(null);
    const [selectedHotel, setSelectedHotel] = useState<{id: number, name: string} | null>(null);

    const MOCK_HOTELS = [
        { id: 1, name: "Nama Hotel" },
        { id: 2, name: "Nama Hotel" },
        { id: 3, name: "Nama Hotel" },
        { id: 4, name: "Nama Hotel" },
        { id: 5, name: "Nama Hotel" },
        { id: 6, name: "Nama Hotel" },
        { id: 7, name: "Nama Hotel" },
        { id: 8, name: "Nama Hotel" }
    ];

    const MOCK_ROOMS = [
        { id: 1, type: "Standard Room", qty: 11 },
        { id: 2, type: "Superior Room", qty: 5 },
        { id: 3, type: "Deluxe Room", qty: 7 },
        { id: 4, type: "Suite Room", qty: 2 },
    ];

    const handleBack = () => {
        if (view === 'list') {
            router.push('/admin');
        } else if (view === 'room_list') {
            setView('list');
            setSelectedHotel(null);
        } else if (view === 'room_add' || view === 'room_edit') {
            setView('room_list');
        } else {
            // add or edit
            setView('list');
            setDeleteId(null);
            setEditData(null);
        }
    };

    // Handler untuk judul dinamis di Header
    const getHeaderTitle = () => {
        if (view === 'edit') return `Data "${editData?.name || 'Nama Hotel'}"`;
        if (view === 'room_list' || view === 'room_add' || view === 'room_edit') {
            return `"${selectedHotel?.name || 'Nama Hotel'}"`;
        }
        return 'Data Hotel';
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-12">
            {/* ================= HEADER GLOBAL ================= */}
            <header className="w-full border-b border-gray-200">
               <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                   
                   {/* Left: Kembali */}
                   <div className="w-[30%]">
                        <button 
                            onClick={handleBack}
                            className="bg-[#FF4500] text-white font-semibold text-[15px] px-10 py-2 rounded-full hover:bg-red-600 shadow-sm"
                        >
                            Kembali
                        </button>
                   </div>

                   {/* Center: Title & Logo */}
                   <div className="w-[40%] flex flex-col items-center">
                       <div className="relative w-36 h-12 mb-2">
                            <Image src="/images/logo-putih.png" alt="Restify Logo" fill className="object-contain opacity-90" priority />
                       </div>
                       <h1 className="text-[22px] font-semibold">
                           {getHeaderTitle()}
                       </h1>
                   </div>

                   {/* Right: Tambah Button */}
                   <div className="w-[30%] flex justify-end">
                       {(view === 'list' || view === 'room_list') && (
                           <button 
                              onClick={() => {
                                  if (view === 'list') setView('add');
                                  if (view === 'room_list') setView('room_add');
                              }}
                              className="flex items-center justify-center gap-2 bg-[#1877F2] text-white font-semibold text-[15px] px-8 py-2 rounded-full hover:bg-blue-600 shadow-sm"
                           >
                               Tambah <FiPlus className="text-lg font-bold" />
                           </button>
                       )}
                   </div>

               </div>
            </header>

            {/* ================= MAIN CONTENT ================= */}
            <main className="max-w-5xl mx-auto py-8 px-6">
                
                {/* ----------------- VIEW 1: DATA HOTEL LIST ----------------- */}
                {view === 'list' && (
                    <div className="w-full max-h-[70vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-400">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 shadow-inner p-1">
                            {MOCK_HOTELS.map((hotel) => (
                                <div key={hotel.id} className="h-[120px]">
                                    {deleteId === hotel.id ? (
                                        <div className="w-full h-full bg-[#FFFDF0] border border-[#E1D1B6] rounded-xl flex flex-col justify-center items-center px-4 py-2 shadow-sm animate-fade-in">
                                            <p className="font-semibold text-lg mb-3 tracking-wide">Hapus data "{hotel.name}" ?</p>
                                            <div className="flex gap-10">
                                                <button onClick={() => setDeleteId(null)} className="bg-[#5E6B52] text-white px-8 py-1.5 rounded-full font-semibold shadow-sm hover:opacity-90">Tidak</button>
                                                <button onClick={() => setDeleteId(null)} className="bg-[#FF4500] text-white px-8 py-1.5 rounded-full font-semibold shadow-sm hover:bg-red-600">Ya</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-[#F4F6F8] border border-gray-300 rounded-xl flex flex-col justify-between items-center px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                            <h3 className="font-medium text-lg mt-1">{hotel.name}</h3>
                                            <div className="flex items-center gap-2 w-full justify-center mb-1">
                                                <button 
                                                    onClick={() => { setEditData(hotel); setView('edit'); }}
                                                    className="flex items-center justify-center gap-2 bg-[#5B95F9] text-white text-[11px] px-6 py-1.5 rounded-full font-semibold shadow-sm hover:opacity-90"
                                                >
                                                    <div className="bg-black/10 rounded p-[3px]"><FiEdit /></div> Ubah
                                                </button>
                                                <button 
                                                    onClick={() => router.push("/admin/daftarDataKamar")}
                                                    className="flex items-center justify-center gap-2 bg-[#ACB5A4] text-gray-900 border border-gray-300 text-[11px] px-4 py-1.5 rounded-full font-bold shadow-sm hover:opacity-90"
                                                >
                                                    <div className="bg-black/10 rounded p-[3px]"><FiFileText /></div> Data Kamar
                                                </button>
                                                <button 
                                                    onClick={() => setDeleteId(hotel.id)}
                                                    className="flex items-center justify-center gap-2 bg-[#FF4500] text-white text-[11px] px-5 py-1.5 rounded-full font-semibold shadow-sm hover:opacity-90"
                                                >
                                                    <div className="bg-black/10 rounded p-[3px]"><FiTrash2 /></div> Hapus
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ----------------- VIEW 2 & 3: TAMBAH / EDIT HOTEL ----------------- */}
                {(view === 'add' || view === 'edit') && (
                    <div className="w-full flex flex-col items-center mt-2 animate-fade-in">
                        <h2 className="text-xl font-semibold tracking-wide mb-6">
                            {view === 'add' ? 'Tambah Data Hotel' : 'Edit Data Hotel'}
                        </h2>
                        
                        <div className="w-full max-w-[850px] bg-[#F8F9FA] border border-gray-300 rounded-xl p-6 flex flex-col md:flex-row gap-8 shadow-sm">
                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-1.5">Nama Hotel</label>
                                    <input type="text" defaultValue={view === 'edit' ? "Hahahahah Hotel" : ""} placeholder="Nama Hotel" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white focus:border-[#5B95F9]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-1.5">Lokasi</label>
                                    <input type="text" defaultValue={view === 'edit' ? "WKWKWK Land" : ""} placeholder="Lokasi" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white focus:border-[#5B95F9]" />
                                </div>
                                <div className="mt-2 w-[75%] max-w-[200px] h-[110px] border border-gray-400 bg-[#E8EAE9] rounded-sm relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)" }}></div>
                                    <div className="text-5xl z-10 drop-shadow-md pb-2">📍</div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-1.5">Deskripsi</label>
                                    <textarea defaultValue={view === 'edit' ? "Anu" : ""} placeholder="Deskirpsi Hotel" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white h-[120px] resize-none focus:border-[#5B95F9]"></textarea>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-3 mt-4 mb-2">
                                    <button 
                                      className="flex items-center gap-3 bg-[#A8B39B] w-[240px] text-gray-900 border border-gray-400 px-6 py-2.5 rounded-full font-medium text-sm shadow-sm hover:opacity-90 transition-all"
                                    >
                                        <div className="border border-gray-900 rounded p-[2px]"><FiImage /></div> Tambah Gambar
                                    </button>
                                    <button 
                                      onClick={() => {
                                          setSelectedHotel(editData || {id: 0, name: 'Baru'});
                                          setView('room_add');
                                      }}
                                      className="flex items-center gap-3 bg-[#A8B39B] w-[240px] text-gray-900 border border-gray-400 px-6 py-2.5 rounded-full font-medium text-sm shadow-sm hover:opacity-90 transition-all"
                                    >
                                        <div className="border border-gray-900 rounded p-[2px]"><FiFileText /></div> Tambah Data Kamar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button className="bg-[#1A73E8] text-white font-medium text-lg px-24 py-2.5 rounded-full hover:bg-blue-600 shadow-sm transition-all">
                                {view === 'add' ? 'Tambah' : 'Simpan Pembaharuan'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ----------------- VIEW 4: DATA KAMAR LIST ----------------- */}
                {view === 'room_list' && (
                    <div className="w-full flex flex-col items-center mt-2 animate-fade-in pb-10">
                        <h2 className="text-xl font-medium tracking-wide mb-6 text-black">Data Kamar</h2>
                        
                        <div className="w-full max-w-[850px] border border-gray-200">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 border-b border-gray-200 pb-3 mb-4 mt-2 px-4">
                                <div className="font-bold text-[22px] text-center border-r border-gray-200">Tipe Kamar</div>
                                <div className="font-bold text-[22px] text-center border-r border-gray-200">Kamar Tersedia</div>
                                <div className="font-bold text-[22px] text-center">Perbarui</div>
                            </div>
                            
                            {/* Table Body */}
                            <div className="flex flex-col gap-6 px-4 pb-6 mt-6">
                                {MOCK_ROOMS.map(room => (
                                    <div key={room.id} className="grid grid-cols-3 items-center">
                                        <div className="font-bold text-[20px] text-center border-r border-gray-200 flex items-center justify-center min-h-[40px] pr-4">{room.type}</div>
                                        <div className="font-bold text-[22px] text-center border-r border-gray-200 flex items-center justify-center min-h-[40px]">{room.qty}</div>
                                        <div className="flex items-center justify-center gap-4">
                                            {/* Action Buttons */}
                                            <button className="w-7 h-7 bg-[#657657] text-white rounded flex items-center justify-center font-bold shadow-sm hover:opacity-80">
                                                <FiPlus />
                                            </button>
                                            <button className="w-7 h-7 bg-[#FFC107] text-white rounded flex items-center justify-center font-bold shadow-sm hover:opacity-80">
                                                <FiMinus />
                                            </button>
                                            <button className="w-7 h-7 bg-[#1A2E63] text-white rounded flex items-center justify-center shadow-sm hover:opacity-80">
                                                <FiEdit className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="w-7 h-7 bg-[#E85D57] text-white rounded flex items-center justify-center shadow-sm hover:opacity-80">
                                                <FiTrash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ----------------- VIEW 5: TAMBAH DATA KAMAR FORM ----------------- */}
                {(view === 'room_add' || view === 'room_edit') && (
                    <div className="w-full flex flex-col items-center mt-2 animate-fade-in">
                        <h2 className="text-[20px] font-medium tracking-wide mb-8">Tambah Data Kamar Hotel</h2>

                        <div className="w-full max-w-[850px] bg-[#F2F4F7] border border-gray-300 rounded-xl p-8 flex flex-col md:flex-row gap-10 shadow-sm">
                            
                            {/* Kiri */}
                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Tipe kamar</label>
                                    <input type="text" placeholder="Tipe kamar" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-xs outline-none bg-white focus:border-[#5B95F9]" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Harga per malam</label>
                                    <input type="text" placeholder="Rp.000" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-xs outline-none bg-white focus:border-[#5B95F9] text-gray-400" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Ukuran kamar</label>
                                    <input type="text" placeholder="Ukuran kamar" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-xs outline-none bg-white focus:border-[#5B95F9] text-gray-400" />
                                </div>
                                
                                {/* Kamar Tidur Stepper */}
                                <div className="flex items-center justify-between w-full border border-gray-400 bg-white rounded-md px-4 py-2.5 mb-1">
                                    <span className="text-[13px] font-bold">Kamar Tidur</span>
                                    <div className="flex items-center gap-3">
                                        <button className="w-5 h-5 rounded bg-[#4CAF50] text-white flex items-center justify-center font-bold text-xs"><FiMinus /></button>
                                        <span className="font-bold text-xs w-2 text-center">1</span>
                                        <button className="w-5 h-5 rounded bg-[#6592F7] text-white flex items-center justify-center font-bold text-xs"><FiPlus /></button>
                                    </div>
                                </div>
                                
                                {/* Kamar Mandi Stepper */}
                                <div className="flex items-center justify-between w-full border border-gray-400 bg-white rounded-md px-4 py-2.5">
                                    <span className="text-[13px] font-bold">Kamar Mandi</span>
                                    <div className="flex items-center gap-3">
                                        <button className="w-5 h-5 rounded bg-[#4CAF50] text-white flex items-center justify-center font-bold text-xs"><FiMinus /></button>
                                        <span className="font-bold text-xs w-2 text-center">1</span>
                                        <button className="w-5 h-5 rounded bg-[#6592F7] text-white flex items-center justify-center font-bold text-xs"><FiPlus /></button>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan */}
                            <div className="flex-1 flex flex-col pt-1">
                                <label className="block text-[11px] font-bold text-gray-800 mb-1.5">Deskripsi</label>
                                <textarea placeholder="Deskirpsi Hotel" className="w-full border border-gray-400 rounded-md px-3 py-3 text-xs outline-none bg-white h-[120px] resize-none focus:border-[#5B95F9] text-gray-400 mb-6"></textarea>
                                
                                {/* Fasilitas Group */}
                                <div className="flex items-center gap-2 mb-4">
                                    <h4 className="text-[18px] font-medium text-black">Fasilitas</h4>
                                    <FiCheckCircle className="text-gray-800" />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    {/* Makanan */}
                                    <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                        <span className="text-[11px] font-bold">Sarapan</span>
                                        <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                    </label>
                                    <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                        <span className="text-[11px] font-bold">Ekstra Bed</span>
                                        <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                    </label>
                                    <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                        <span className="text-[11px] font-bold">Makan Siang</span>
                                        <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                    </label>
                                    <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                        <span className="text-[11px] font-bold">Tv</span>
                                        <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                    </label>
                                    <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                        <span className="text-[11px] font-bold">Makan Malam</span>
                                        <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                    </label>
                                    <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                        <span className="text-[11px] font-bold">AC</span>
                                        <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                    </label>
                                    <div className="col-start-2">
                                        <label className="flex items-center justify-between border border-gray-400 rounded bg-white px-3 py-1 cursor-pointer hover:border-gray-600">
                                            <span className="text-[11px] font-bold">Wifi</span>
                                            <div className="w-4 h-4 rounded-full border border-[#D1B894] bg-[#FDF8EB]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-10">
                            <button className="bg-[#1877F2] text-white font-medium text-[16px] px-24 py-2.5 rounded-full hover:bg-blue-600 shadow-sm transition-all">
                                Tambah
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
