'use client';

import React, { useState } from 'react';
import styles from './AdminPage.module.css';
import { 
    FiHome, FiUsers, FiMenu, FiSearch, FiPlus, FiEdit3, 
    FiTrash2, FiMapPin, FiFileText, FiArrowLeft, FiUploadCloud, FiX, FiSave, FiMinus, FiInfo, FiEye, FiEyeOff, FiCheckSquare
} from 'react-icons/fi';
import { BiBuildingHouse } from 'react-icons/bi';
import { MdOutlineBed } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('hotel'); 
    const [searchQuery, setSearchQuery] = useState('');
    const [editingHotel, setEditingHotel] = useState(null);

    // ================= STATE MANAJEMEN KAMAR =================
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);

    // ================= STATE MANAJEMEN PENGGUNA =================
    const [users, setUsers] = useState([
        { id: 1, name: 'Andi Hermawan', email: 'andi.admin@gmail.com', role: 'Admin', status: 'Aktif', phone: '081234567890', hotelId: '' },
        { id: 2, name: 'Siti Rahma', email: 'siti.recep@gmail.com', role: 'Resepsionis', status: 'Aktif', phone: '085712345678', hotelId: 'Hotel Grand Serela' },
        { id: 3, name: 'Rian Hidayat', email: 'rian.tamu@gmail.com', role: 'Tamu', status: 'Tidak Aktif', phone: '081922334455', hotelId: '' },
        { id: 4, name: 'Budi Santoso', email: 'budi.tamu@gmail.com', role: 'Tamu', status: 'Aktif', phone: '082199887766', hotelId: '' }
    ]);
    const [editingUser, setEditingUser] = useState(null);
    const [userSearchQuery, setUserSearchQuery] = useState('');

    // State Form Pengguna
    const [namaPengguna, setNamaPengguna] = useState('');
    const [emailPengguna, setEmailPengguna] = useState('');
    const [noTelpPengguna, setNoTelpPengguna] = useState('');
    const [passwordPengguna, setPasswordPengguna] = useState('');
    const [peranPengguna, setPeranPengguna] = useState('Tamu'); 
    const [statusPengguna, setStatusPengguna] = useState('Aktif');
    const [idHotelPengguna, setIdHotelPengguna] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ================= LOGIKA MANAGEMENT PENGGUNA =================
    const resetFormPengguna = () => {
        setNamaPengguna('');
        setEmailPengguna('');
        setNoTelpPengguna('');
        setPasswordPengguna('');
        setPeranPengguna('Tamu');
        setStatusPengguna('Aktif');
        setIdHotelPengguna('');
        setShowPassword(false);
        setEditingUser(null);
    };

    const handleEditPengguna = (user) => {
        setEditingUser(user);
        setNamaPengguna(user.name);
        setEmailPengguna(user.email);
        setNoTelpPengguna(user.phone);
        setPasswordPengguna('********');
        setPeranPengguna(user.role);
        setStatusPengguna(user.status);
        setIdHotelPengguna(user.hotelId || '');
        setActiveTab('tambahPengguna');
    };

    const handleHapusPengguna = (userId) => {
        if(confirm("Apakah Anda yakin ingin menghapus akun pengguna ini?")) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const handleSimpanPengguna = (e) => {
        e.preventDefault();

        if (editingUser) {
            // Aksi Update / Ubah Data
            setUsers(users.map(u => u.id === editingUser.id ? {
                ...u,
                name: namaPengguna,
                email: emailPengguna,
                phone: noTelpPengguna,
                role: peranPengguna,
                status: statusPengguna,
                hotelId: peranPengguna === 'Resepsionis' ? idHotelPengguna : ''
            } : u));
        } else {
            // Aksi Tambah Baru
            const newUser = {
                id: Date.now(),
                name: namaPengguna,
                email: emailPengguna,
                phone: noTelpPengguna,
                role: peranPengguna,
                status: 'Aktif', // Default aktif untuk pengguna baru
                hotelId: peranPengguna === 'Resepsionis' ? idHotelPengguna : ''
            };
            setUsers([...users, newUser]);
        }

        resetFormPengguna();
        setActiveTab('pengguna');
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(userSearchQuery.toLowerCase())
    );

    // State Form Data Kamar
    const [namaKamar, setNamaKamar] = useState('');
    const [hargaKamar, setHargaKamar] = useState('');
    const [ukuranKamar, setUkuranKamar] = useState('');
    const [deskripsiKamar, setDeskripsiKamar] = useState('');
    const [jumlahKamarMandi, setJumlahKamarMandi] = useState(1);
    const [jumlahKamarTidur, setJumlahKamarTidur] = useState(1);
    const [jumlahKamarTersediaForm, setJumlahKamarTersediaForm] = useState(1);
    const [fasilitasKamar, setFasilitasKamar] = useState({
        sarapan: false, tv: false, makanSiang: false, penyejukUdara: false,
        makanMalam: false, wifi: false, kulkas: false, tempatTidurTambahan: false
    });
    
        const [hotels, setHotels] = useState([
            { 
                id: 1, name: 'Hotel Grand Serela', location: 'Bandung, Indonesia', rating: '4.5', image: '/images/Restify_BG2.png',
                rooms: [
                    { id: 101, name: 'Kamar Suite', available: 3, image: '/images/Restify_BG2.png', price: 1200000, size: 36, description: 'Kamar mewah dengan fasilitas premium.', facilities: { sarapan: true, tv: true }, kamarMandi: 1, kamarTidur: 1 },
                    { id: 102, name: 'Kamar Superior Flat', available: 5, image: '/images/Restify_BG2.png', price: 850000, size: 28, description: 'Kamar flat nyaman minimalis.', facilities: { wifi: true, penyejukUdara: true }, kamarMandi: 1, kamarTidur: 1 },
                    { id: 103, name: 'Kamar Grand Deluxe', available: 7, image: '/images/Restify_BG2.png', price: 1050000, size: 32, description: 'Kamar deluxe dengan space luas.', facilities: { sarapan: true, wifi: true, penyejukUdara: true }, kamarMandi: 1, kamarTidur: 1 },
                    { id: 104, name: 'Kamar Superior Terrace', available: 4, image: '/images/Restify_BG2.png', price: 950000, size: 30, description: 'Kamar nyaman terhubung dengan teras luar.', facilities: { tv: true, wifi: true }, kamarMandi: 1, kamarTidur: 1 }
                ]
            },
            { id: 2, name: 'Hotel Aston Tropicana', location: 'Bandung, Indonesia', rating: '4.7', image: '/images/Restify_BG2.png', rooms: [] },
            { id: 3, name: 'Hotel Swiss-Belresort', location: 'Bandung, Indonesia', rating: '4.6', image: '/images/Restify_BG2.png', rooms: [] },
            { id: 4, name: 'Hotel Harris Ciumbuleuit', location: 'Bandung, Indonesia', rating: '4.4', image: '/images/Restify_BG2.png', rooms: [] },
        ]);

    // ================= STATE FORM TAMBAH HOTEL =================
    const [namaHotel, setNamaHotel] = useState('');
    const [lokasiHotel, setLokasiHotel] = useState('');
    const [deskripsiHotel, setDeskripsiHotel] = useState('');
    
    const [showFasilitas, setShowFasilitas] = useState(false);
    const [fasilitas, setFasilitas] = useState({
        kolamRenang: false,
        restoran: false,
        ruangSerbaGuna: false
    });

    // Handler Checkbox Sub-Fasilitas
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFasilitas(prev => ({ ...prev, [name]: checked }));
    };

    const handleEdit = (hotel) => {
        setEditingHotel(hotel); 
        setNamaHotel(hotel.name || hotel.nama);
        setLokasiHotel(hotel.location || hotel.lokasi);
        setActiveTab('tambahHotel'); 
    };

    // Reset Form setelah simpan atau batal
    const resetForm = () => {
        setNamaHotel('');
        setLokasiHotel('');
        setDeskripsiHotel('');
        setShowFasilitas(false);
        setFasilitas({ kolamRenang: false, restoran: false, ruangSerbaGuna: false });
        setEditingHotel(null); // Membersihkan state editing agar kembali ke mode tambah baru
    };

    const handleSimpanHotel = (e) => {
        e.preventDefault();
        
        if (!namaHotel || !lokasiHotel || !deskripsiHotel) {
            alert('Mohon lengkapi semua bidang yang bertanda bintang (*)!');
            return;
        }

        if (editingHotel) {
            // ================= MODE UBAH DATA =================
            setHotels(hotels.map(hotel => {
                if (hotel.id === editingHotel.id) {
                    return {
                        ...hotel,
                        name: namaHotel,
                        location: lokasiHotel,
                        // Jika ada data deskripsi/fasilitas di list utama, simpan juga di sini
                    };
                }
                return hotel;
            }));
        } else {
            // ================= MODE TAMBAH BARU (CREATE) =================
            const newHotel = {
                id: Date.now(),
                name: namaHotel,
                location: lokasiHotel,
                rating: '4.5',
                image: '/images/Restify_BG2.png'
            };

            setHotels([newHotel, ...hotels]); 
        }

        resetForm();
        setActiveTab('hotel'); 
    };

    // Action: Hapus Hotel Langsung
    const handleDeleteHotel = (id) => {
        setHotels(hotels.filter(hotel => hotel.id !== id));
    };

// ================= LOGIKA MANAGEMENT KAMAR =================
    const handleBukaDataKamar = (hotel) => {
        setSelectedHotel(hotel);
        setActiveTab('dataKamar');
    };

    const handleUbahKamarTersedia = (roomId, increment) => {
        setHotels(hotels.map(h => {
            if (h.id === selectedHotel.id) {
                const updatedRooms = h.rooms.map(r => {
                    if (r.id === roomId) {
                        const newVal = r.available + (increment ? 1 : -1);
                        return { ...r, available: newVal < 0 ? 0 : newVal };
                    }
                    return r;
                });
                setSelectedHotel({ ...h, rooms: updatedRooms });
                return { ...h, rooms: updatedRooms };
            }
            return h;
        }));
    };

    const handleHapusKamar = (roomId) => {
        if(confirm("Apakah Anda yakin ingin menghapus tipe kamar ini?")) {
            setHotels(hotels.map(h => {
                if (h.id === selectedHotel.id) {
                    const updatedRooms = h.rooms.filter(r => r.id !== roomId);
                    setSelectedHotel({ ...h, rooms: updatedRooms });
                    return { ...h, rooms: updatedRooms };
                }
                return h;
            }));
        }
    };

    const resetFormKamar = () => {
        setNamaKamar('');
        setHargaKamar('');
        setUkuranKamar('');
        setDeskripsiKamar('');
        setJumlahKamarMandi(1);
        setJumlahKamarTidur(1);
        setJumlahKamarTersediaForm(1);
        setFasilitasKamar({
            sarapan: false, tv: false, makanSiang: false, penyejukUdara: false,
            makanMalam: false, wifi: false, kulkas: false, tempatTidurTambahan: false
        });
        setEditingRoom(null);
    };

    const handleEditKamar = (room) => {
        setEditingRoom(room);
        setNamaKamar(room.name);
        setHargaKamar(room.price || '');
        setUkuranKamar(room.size || '');
        setDeskripsiKamar(room.description || '');
        setJumlahKamarMandi(room.kamarMandi || 1);
        setJumlahKamarTidur(room.kamarTidur || 1);
        setJumlahKamarTersediaForm(room.available || 1);
        setFasilitasKamar({ ...room.facilities });
        setActiveTab('tambahKamar');
    };

    const handleSimpanKamar = (e) => {
        e.preventDefault();
        
        setHotels(hotels.map(h => {
            if (h.id === selectedHotel.id) {
                let updatedRooms;
                if (editingRoom) {
                    updatedRooms = h.rooms.map(r => r.id === editingRoom.id ? {
                        ...r, name: namaKamar, price: Number(hargaKamar), size: Number(ukuranKamar),
                        description: deskripsiKamar, available: jumlahKamarTersediaForm,
                        kamarMandi: jumlahKamarMandi, kamarTidur: jumlahKamarTidur, facilities: fasilitasKamar
                    } : r);
                } else {
                    const newRoom = {
                        id: Date.now(), name: namaKamar, price: Number(hargaKamar), size: Number(ukuranKamar),
                        description: deskripsiKamar, available: jumlahKamarTersediaForm,
                        kamarMandi: jumlahKamarMandi, kamarTidur: jumlahKamarTidur, facilities: fasilitasKamar,
                        image: '/images/Restify_BG2.png'
                    };
                    updatedRooms = [...h.rooms, newRoom];
                }
                setSelectedHotel({ ...h, rooms: updatedRooms });
                return { ...h, rooms: updatedRooms };
            }
            return h;
        }));

        resetFormKamar();
        setActiveTab('dataKamar');
    };
    
    // Filter pencarian hotel
    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.adminContainer}>
            
            {/* ================= SIDEBAR ================= */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logoArea}>
                        <BiBuildingHouse className={styles.logoIcon} />
                        <span className={styles.logoText}>RESTIFY</span>
                    </div>
                </div>

                <div className={styles.sidebarMenu}>
                    <p className={styles.menuTitle}>Menu Utama</p>
                    
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`${styles.menuItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
                    >
                        <FiHome /> Dashboard
                    </button>

                    <button 
                        onClick={() => setActiveTab('hotel')}
                        className={`${styles.menuItem} ${activeTab === 'hotel' || activeTab === 'tambahHotel' ? styles.active : ''}`}
                    >
                        <BiBuildingHouse /> Data Hotel
                    </button>

                    <button 
                        onClick={() => setActiveTab('pengguna')}
                        className={`${styles.menuItem} ${activeTab === 'pengguna' ? styles.active : ''}`}
                    >
                        <FiUsers /> Data Pengguna
                    </button>
                </div>

                <div className={styles.sidebarFooter}>
                    <button onClick={() => router.push('/login')} className={styles.logoutBtn}>
                        Keluar
                    </button>
                </div>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className={styles.mainContent}>
                <header className={styles.navbar}>
                    <button className={styles.toggleBtn}>
                        <FiMenu />
                    </button>
                    <h1 className={styles.navbarTitle}>ADMIN</h1>
                    <div className={styles.spacer}></div>
                </header>

                <div className={styles.contentArea}>
                    
                {/* ================= VIEW: DASHBOARD ================= */}
                {activeTab === 'dashboard' && (
                    <div className={styles.dashboardViewSection}>
                        
                        {/* Banner Selamat Datang */}
                        <div className={styles.welcomeBannerBox}>
                            <h2 className={styles.welcomeBannerTitle}>Selamat datang, Admin! 👋</h2>
                            <p className={styles.welcomeBannerSubtitle}>Kelola data hotel, kamar, dan pengguna.</p>
                        </div>

                        {/* Container Kartu Statistik */}
                        <div className={styles.statsCardsWrapper}>
                            
                            {/* Baris Atas: Total Hotel & Total Kamar */}
                            <div className={styles.statsCardsRowTop}>
                                
                                {/* Card 1: Total Hotel */}
                                <div className={styles.summaryStatCard}>
                                    <div className={`${styles.statCircleBadge} ${styles.colorMutedGreen}`}>
                                        {/* Ikon Gedung/Hotel */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                                            <path d="M7 22V14h10v8"></path>
                                            <path d="M9 7h2v2H9z"></path>
                                            <path d="M13 7h2v2h-2z"></path>
                                            <path d="M9 11h2v2H9z"></path>
                                            <path d="M13 11h2v2h-2z"></path>
                                        </svg>
                                    </div>
                                    <div className={styles.statCardContent}>
                                        <span className={styles.statLabelHeading}>Total Hotel</span>
                                        <span className={styles.statDisplayNumber}>24</span>
                                    </div>
                                </div>

                                {/* Card 2: Total Kamar */}
                                <div className={styles.summaryStatCard}>
                                    <div className={`${styles.statCircleBadge} ${styles.colorSoftYellow}`}>
                                        {/* Ikon Kamar/Bed */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 4v16M22 4v16M2 8h20M2 14h20M6 8v6M10 8v6M14 8v6M18 8v6"></path>
                                        </svg>
                                    </div>
                                    <div className={styles.statCardContent}>
                                        <span className={styles.statLabelHeading}>Total Kamar</span>
                                        <span className={styles.statDisplayNumber}>132</span>
                                    </div>
                                </div>

                            </div>

                            {/* Baris Bawah: Total Pengguna (Posisinya Center di bawah) */}
                            <div className={styles.statsCardsRowBottom}>
                                
                                {/* Card 3: Total Pengguna */}
                                <div className={styles.summaryStatCard}>
                                    <div className={`${styles.statCircleBadge} ${styles.colorSoftBlue}`}>
                                        {/* Ikon User/Pengguna */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <div className={styles.statCardContent}>
                                        <span className={styles.statLabelHeading}>Total Pengguna</span>
                                        <span className={styles.statDisplayNumber}>37</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                )}

                    {/* ===== VIEW 2: DAFTAR HOTEL ===== */}
                    {activeTab === 'hotel' && (
                        <div className={styles.hotelViewSection}>
                            <div className={styles.hotelControlsBar}>
                                <h2 className={styles.viewTitleText}>Data Hotel</h2>
                                
                                <div className={styles.searchBarWrapper}>
                                    <FiSearch className={styles.searchIconInside} />
                                    <input 
                                        type="text" 
                                        placeholder="Cari Data Hotel" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={styles.hotelSearchInput}
                                    />
                                </div>

                                <button 
                                    onClick={() => { setEditingHotel(null); resetForm(); setActiveTab('tambahHotel'); }} 
                                    className={styles.addHotelBtn}
                                >
                                    <FiPlus /> Tambah Hotel
                                </button>
                            </div>

                            <div className={styles.hotelGridContainer}>
                                {filteredHotels.length > 0 ? (
                                    filteredHotels.map((hotel) => (
                                        <div key={hotel.id} className={styles.hotelCardItem}>
                                            <div className={styles.hotelImageThumbnail}>
                                                <div className={styles.actualImgPlaceholder} style={{ backgroundImage: `url(${hotel.image})` }} />
                                            </div>

                                            <div className={styles.hotelDetailsWrapper}>
                                                <div className={styles.hotelCardTopRow}>
                                                    <div>
                                                        <h3 className={styles.hotelNameText}>{hotel.name}</h3>
                                                        <p className={styles.hotelLocationText}>
                                                            <FiMapPin className={styles.pinIcon} /> {hotel.location}
                                                        </p>
                                                    </div>
                                                    <span className={styles.ratingBadgeText}>⭐ {hotel.rating}</span>
                                                </div>

                                                <div className={styles.hotelActionButtonsGroup}>
                                                    <button 
                                                        onClick={() => handleEdit(hotel)} 
                                                        className={`${styles.actionBtnOutline} ${styles.btnUbah}`}
                                                    >
                                                        Ubah
                                                    </button>
                                                    <button onClick={() => handleBukaDataKamar(hotel)} className={`${styles.actionBtnOutline} ${styles.btnKamar}`}>
                                                        <FiFileText size={12} /> Data Kamar
                                                    </button>
                                                    <button onClick={() => handleDeleteHotel(hotel.id)} className={`${styles.actionBtnOutline} ${styles.btnHapus}`}>
                                                        <FiTrash2 size={12} /> Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.emptyStateNotice}>Tidak ada data hotel.</div>
                                )}
                            </div>
                        </div>
                    )}
                    

                    {/* ===== VIEW 3: FORM TAMBAH / UBAH HOTEL ===== */}
                    {activeTab === 'tambahHotel' && (
                        <div className={styles.formContainerSection}>
                            
                            <div className={styles.formHeaderRow}>
                                <div>
                                    <h2 className={styles.formMainTitle}>
                                        {editingHotel ? 'Ubah Data Hotel' : 'Tambah Hotel Baru'}
                                    </h2>
                                    <p className={styles.formSubTitle}>Lengkapi informasi hotel dengan tepat</p>
                                </div>
                                <button type="button" onClick={() => { resetForm(); setActiveTab('hotel'); }} className={styles.backBtnOutline}>
                                    <FiArrowLeft size={14} /> Kembali
                                </button>
                            </div>

                            <form onSubmit={handleSimpanHotel}>
                                {/* KOTAK 1: INFORMASI HOTEL */}
                                <div className={styles.formCardBox}>
                                    <h3 className={styles.boxSectionTitle}>
                                        <BiBuildingHouse /> Informasi Hotel
                                    </h3>
                                    
                                    <div className={styles.inputsResponsiveGrid}>
                                        <div className={styles.inputFieldGroup}>
                                            <label>Nama Hotel <span className={styles.requiredStar}>*</span></label>
                                            <input 
                                                type="text" 
                                                placeholder="Masukkan nama hotel" 
                                                value={namaHotel}
                                                onChange={(e) => setNamaHotel(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={styles.inputFieldGroup}>
                                            <label>Lokasi <span className={styles.requiredStar}>*</span></label>
                                            <div className={styles.inputIconWrapper}>
                                                <FiMapPin className={styles.innerFieldIcon} />
                                                <input 
                                                    type="text" 
                                                    placeholder="Masukkan lokasi hotel" 
                                                    value={lokasiHotel}
                                                    onChange={(e) => setLokasiHotel(e.target.value)}
                                                    required
                                                    style={{ paddingLeft: '36px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.inputsResponsiveGrid}>
                                        <div className={styles.inputFieldGroup}>
                                            <label>Deskripsi Hotel <span className={styles.requiredStar}>*</span></label>
                                            <textarea 
                                                rows="5" 
                                                placeholder="Masukkan deskripsi hotel" 
                                                value={deskripsiHotel}
                                                onChange={(e) => setDeskripsiHotel(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>

                                        <div className={styles.inputFieldGroup}>
                                            {/* Checkbox Utama Saklar Fasilitas */}
                                            <div className={styles.mainFasilitasHeaderWrapper}>
                                                <span className={styles.labelTitleText}>Fasilitas Hotel</span>
                                                <input 
                                                    type="checkbox" 
                                                    id="toggleFasilitas"
                                                    checked={showFasilitas} 
                                                    onChange={(e) => {
                                                        setShowFasilitas(e.target.checked);
                                                        if (!e.target.checked) {
                                                            // Auto reset sub-opsi kalau dimatikan
                                                            setFasilitas({ kolamRenang: false, restoran: false, ruangSerbaGuna: false });
                                                        }
                                                    }}
                                                    className={styles.mainToggleCheckbox}
                                                />
                                                <label htmlFor="toggleFasilitas" className={styles.mainToggleBoxVisual}></label>
                                            </div>

                                            {/* Opsi anak hanya muncul jika showFasilitas === true */}
                                            {showFasilitas ? (
                                                <div className={`${styles.checkboxListWrapper} ${styles.fadeInAnimation}`}>
                                                    <label className={styles.checkboxCustomLabel}>
                                                        <input type="checkbox" name="kolamRenang" checked={fasilitas.kolamRenang} onChange={handleCheckboxChange} />
                                                        <span>Kolam Renang</span>
                                                    </label>
                                                    <label className={styles.checkboxCustomLabel}>
                                                        <input type="checkbox" name="restoran" checked={fasilitas.restoran} onChange={handleCheckboxChange} />
                                                        <span>Restoran</span>
                                                    </label>
                                                    <label className={styles.checkboxCustomLabel}>
                                                        <input type="checkbox" name="ruangSerbaGuna" checked={fasilitas.ruangSerbaGuna} onChange={handleCheckboxChange} />
                                                        <span>Ruang Serba Guna</span>
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className={styles.disabledFasilitasNotice}>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* KOTAK 2: MEDIA & KAMAR */}
                                <div className={styles.formCardBox}>
                                    <h3 className={styles.boxSectionTitle}>
                                        <FiFileText /> Media & Kamar
                                    </h3>

                                    <div className={styles.mediaTripleGrid}>
                                        <div className={styles.subMediaCard}>
                                            <h4>Foto Hotel</h4>
                                            <div className={styles.dragDropZoneBox}>
                                                <FiUploadCloud className={styles.uploadCloudIcon} />
                                                <p className={styles.mainUploadText}>Klik atau drag file ke sini</p>
                                                <p className={styles.subUploadText}>Format: JPG, PNG (Max, 10MB)</p>
                                                <button type="button" className={styles.miniSelectFileBtn}>Pilih File</button>
                                            </div>
                                        </div>

                                        <div className={styles.subMediaCard}>
                                            <h4>Lokasi di Peta</h4>
                                            <div className={styles.mapZoneBox}>
                                                <div className={styles.mockMapPinIndicator}>📍</div>
                                                <button type="button" className={styles.miniSelectFileBtn}>Pilih Lokasi di peta</button>
                                            </div>
                                        </div>

                                        <div className={styles.subMediaCard}>
                                            <h4>Data Kamar</h4>
                                            <div className={styles.roomZoneBox}>
                                                <MdOutlineBed className={styles.roomIconEmpty} />
                                                <p className={styles.mainUploadText}>Belum ada data kamar</p>
                                                <p className={styles.subUploadText}>Tambah data kamar untuk hotel ini</p>
                                                <button type="button" className={styles.miniSelectFileBtn}>Tambah Data Kamar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bagian Tombol Aksi Paling Bawah */}
                                <div className={styles.formActionFooterRow}>
                                    <button type="button" onClick={() => { resetForm(); setActiveTab('hotel'); }} className={styles.btnFooterBatal}>
                                        <FiX size={14} /> Batal
                                    </button>
                                    <button type="submit" className={styles.btnFooterSimpan}>
                                        <FiSave size={14} /> Simpan Hotel
                                    </button>
                                </div>
                            </form>

                        </div>
                    )}

                    {/* ===== VIEW 3A: DAFTAR DATA KAMAR ===== */}
                    {activeTab === 'dataKamar' && selectedHotel && (
                        <div className={styles.roomViewSection}>
                            <div className={styles.roomControlsBar}>
                                <div>
                                    <h2 className={styles.viewTitleText}>Data Kamar</h2>
                                    <p className={styles.roomSubHotelTitle}>Hotel: <span className={styles.hotelHighlightText}>"{selectedHotel.name}"</span></p>
                                </div>
                                <div className={styles.roomActionTopGroup}>
                                    <button onClick={() => setActiveTab('hotel')} className={styles.backBtnOutlineRed}>
                                        ← Kembali
                                    </button>
                                    <button onClick={() => { resetFormKamar(); setActiveTab('tambahKamar'); }} className={styles.addRoomBtn}>
                                        + Tambah Tipe Kamar
                                    </button>
                                </div>
                            </div>

                            <div className={styles.roomTableContainer}>
                                <table className={styles.roomTable}>
                                    <thead>
                                        <tr>
                                            <th>Tipe Kamar</th>
                                            <th>Kamar Tersedia</th>
                                            <th>Perbarui</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedHotel.rooms && selectedHotel.rooms.length > 0 ? (
                                            selectedHotel.rooms.map((room) => (
                                                <tr key={room.id}>
                                                    <td>
                                                        <div className={styles.roomTypeCell}>
                                                            <div className={styles.roomMiniImg} style={{ backgroundImage: `url(${room.image})` }} />
                                                            <span className={styles.roomTypeName}>{room.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className={styles.centerText}>
                                                        <div className={styles.availableCountText}>{room.available}</div>
                                                        <div className={styles.availableSubText}>Kamar Tersedia</div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.roomUpdateActions}>
                                                            <button onClick={() => handleUbahKamarTersedia(room.id, true)} className={`${styles.iconGridBtn} ${styles.bgGreenIcon}`} title="Tambah Tersedia">
                                                                <FiPlus size={16} />
                                                            </button>
                                                            <button onClick={() => handleUbahKamarTersedia(room.id, false)} className={`${styles.iconGridBtn} ${styles.bgYellowIcon}`} title="Kurangi Tersedia">
                                                                <FiMinus size={16} />
                                                            </button>
                                                            <button onClick={() => handleEditKamar(room)} className={`${styles.iconGridBtn} ${styles.bgNavyIcon}`} title="Ubah Detail">
                                                                <FiEdit3 size={14} />
                                                            </button>
                                                            <button onClick={() => handleHapusKamar(room.id)} className={`${styles.iconGridBtn} ${styles.bgRedIcon}`} title="Hapus Kamar">
                                                                <FiTrash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className={styles.emptyTableRow}>Belum ada data tipe kamar untuk hotel ini.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.roomTotalBanner}>
                                <FiInfo className={styles.infoIconBanner} />
                                <span>Total seluruh kamar tersedia: {selectedHotel.rooms ? selectedHotel.rooms.reduce((acc, curr) => acc + curr.available, 0) : 0} kamar</span>
                            </div>
                        </div>
                    )}

                    {/* ===== VIEW 3B: FORM TAMBAH / UBAH DATA KAMAR ===== */}
                    {activeTab === 'tambahKamar' && selectedHotel && (
                        <div className={styles.formContainerSection}>
                            <div className={styles.formHeaderRow}>
                                <div>
                                    <h2 className={styles.formMainTitle}>
                                        {editingRoom ? 'Ubah Data Kamar' : 'Tambah Data Kamar'} <span className={styles.hotelHighlightTextForm}>"{selectedHotel.name}"</span>
                                    </h2>
                                    <p className={styles.formSubTitle}>Lengkapi informasi kamar dengan tepat</p>
                                </div>
                                <button type="button" onClick={() => { resetFormKamar(); setActiveTab('dataKamar'); }} className={styles.backBtnOutlineRed}>
                                    ← Kembali
                                </button>
                            </div>

                            <form onSubmit={handleSimpanKamar}>
                                <div className={styles.formCardBox}>
                                    <h3 className={styles.boxSectionTitle}>
                                        📝 Informasi Kamar
                                    </h3>
                                    <div className={styles.inputsResponsiveGrid}>
                                        <div className={styles.inputFieldLeftLayout}>
                                            <div className={styles.inputFieldGroup}>
                                                <label>Tipe Kamar <span className={styles.requiredStar}>*</span></label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Contoh: Kamar Suite" 
                                                    value={namaKamar}
                                                    onChange={(e) => setNamaKamar(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.inputFieldGroup} style={{ marginTop: '12px' }}>
                                                <label>Harga per malam <span className={styles.requiredStar}>*</span> </label>
                                                <div className={styles.inputPrefixWrapper}>
                                                    <span className={styles.prefixLabel}>Rp.</span>
                                                    <input 
                                                        type="number" 
                                                        placeholder="Contoh: 123.456" 
                                                        value={hargaKamar}
                                                        onChange={(e) => setHargaKamar(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.inputFieldGroup} style={{ marginTop: '12px' }}>
                                                <label>Ukuran Kamar (m²) <span className={styles.requiredStar}>*</span></label>
                                                <input 
                                                    type="number" 
                                                    placeholder="Contoh: 3" 
                                                    value={ukuranKamar}
                                                    onChange={(e) => setUkuranKamar(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.inputFieldGroup}>
                                            <label>Deskripsi Kamar <span className={styles.requiredStar}>*</span></label>
                                            <div className={styles.textareaCounterWrapper}>
                                                <textarea 
                                                    rows="8" 
                                                    maxLength="300"
                                                    placeholder="Deskripsi kamar, fasilitas utama dan keunggulan lainnya..." 
                                                    value={deskripsiKamar}
                                                    onChange={(e) => setDeskripsiKamar(e.target.value)}
                                                    required
                                                ></textarea>
                                                <div className={styles.charCounterText}>{deskripsiKamar.length} / 300</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.mediaTripleGrid} style={{ alignItems: 'start' }}>
                                    {/* Kolom Kiri Grid: Opsi Fasilitas */}
                                    <div className={styles.subMediaCard} style={{ gridColumn: 'span 2' }}>
                                        <h3 className={styles.boxSectionTitle} style={{ marginBottom: '14px' }}>
                                            ✅ Fasilitas Kamar
                                        </h3>
                                        <div className={styles.facilitiesGridList}>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.sarapan} onChange={(e) => setFasilitasKamar({...fasilitasKamar, sarapan: e.target.checked})} />
                                                <span>Sarapan</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.tv} onChange={(e) => setFasilitasKamar({...fasilitasKamar, tv: e.target.checked})} />
                                                <span>TV</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.makanSiang} onChange={(e) => setFasilitasKamar({...fasilitasKamar, makanSiang: e.target.checked})} />
                                                <span>Makan Siang</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.penyejukUdara} onChange={(e) => setFasilitasKamar({...fasilitasKamar, penyejukUdara: e.target.checked})} />
                                                <span>Penyejuk Udara</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.makanMalam} onChange={(e) => setFasilitasKamar({...fasilitasKamar, makanMalam: e.target.checked})} />
                                                <span>Makan Malam</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.wifi} onChange={(e) => setFasilitasKamar({...fasilitasKamar, wifi: e.target.checked})} />
                                                <span>Wifi</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.kulkas} onChange={(e) => setFasilitasKamar({...fasilitasKamar, kulkas: e.target.checked})} />
                                                <span>Kulkas</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <label className={styles.facilityCheckItem}>
                                                <input type="checkbox" checked={fasilitasKamar.tempatTidurTambahan} onChange={(e) => setFasilitasKamar({...fasilitasKamar, tempatTidurTambahan: e.target.checked})} />
                                                <span>Tempat Tidur Tambahan</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                        </div>

                                        {/* Stepper Kamar Mandi */}
                                        <div className={styles.stepperRowItem}>
                                            <label className={styles.facilityCheckItem} style={{ flex: 1, margin: 0 }}>
                                                <input type="checkbox" defaultChecked />
                                                <span>Kamar Mandi</span> <span className={styles.facilityIconRight}></span>
                                            </label>
                                            <div className={styles.stepperActionBox}>
                                                <button type="button" onClick={() => setJumlahKamarMandi(prev => prev > 1 ? prev - 1 : 1)}><FiMinus /></button>
                                                <span>{jumlahKamarMandi}</span>
                                                <button type="button" onClick={() => setJumlahKamarMandi(prev => prev + 1)}><FiPlus /></button>
                                            </div>
                                        </div>

                                        {/* Dual Stepper Bawah */}
                                        <div className={styles.dualFormStepperRow}>
                                            <div className={styles.stepperBoxCard}>
                                                <span className={styles.stepperCardTitle}>Kamar Tidur</span>
                                                <div className={styles.stepperActionBox}>
                                                    <button type="button" onClick={() => setJumlahKamarTidur(prev => prev > 1 ? prev - 1 : 1)}><FiMinus /></button>
                                                    <span>{jumlahKamarTidur}</span>
                                                    <button type="button" onClick={() => setJumlahKamarTidur(prev => prev + 1)}><FiPlus /></button>
                                                </div>
                                            </div>
                                            <div className={`${styles.stepperBoxCard} ${styles.orangeBorderHighlight}`}>
                                                <span className={styles.stepperCardTitle}>Kamar Tersedia</span>
                                                <div className={styles.stepperActionBox}>
                                                    <button type="button" onClick={() => setJumlahKamarTersediaForm(prev => prev > 1 ? prev - 1 : 1)}><FiMinus /></button>
                                                    <span>{jumlahKamarTersediaForm}</span>
                                                    <button type="button" onClick={() => setJumlahKamarTersediaForm(prev => prev + 1)}><FiPlus /></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.formBottomWarningBanner}>
                                            <FiInfo /> <span>Pilih fasilitas yang tersedia di kamar ini</span>
                                        </div>
                                    </div>

                                    {/* Kolom Kanan Grid: Upload Media */}
                                    <div className={styles.subMediaCard}>
                                        <h3 className={styles.boxSectionTitle} style={{ marginBottom: '14px' }}>
                                            🖼️ Media Kamar
                                        </h3>
                                        <div className={styles.dragDropZoneBox} style={{ minHeight: '230px' }}>
                                            <FiUploadCloud className={styles.uploadCloudIcon} />
                                            <p className={styles.mainUploadText}>Klik atau drag file ke sini</p>
                                            <p className={styles.subUploadText}>Format: JPG, PNG (Max, 10MB)</p>
                                            <button type="button" className={styles.miniSelectFileBtn}>Pilih File</button>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formActionFooterRow}>
                                    <button type="button" onClick={() => { resetFormKamar(); setActiveTab('dataKamar'); }} className={styles.btnFooterBatal}>
                                        X Batal
                                    </button>
                                    <button type="submit" className={styles.btnFooterSimpan}>
                                         Simpan Hotel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ===== VIEW 4A: DAFTAR DATA PENGGUNA ===== */}
                    {activeTab === 'pengguna' && (
                        <div className={styles.roomViewSection}>
                            <div className={styles.roomControlsBar}>
                                <div>
                                    <h2 className={styles.viewTitleText}>Data Pengguna</h2>
                                    <p className={styles.roomSubHotelTitle}>Kelola akun pengguna yang terdaftar dalam sistem.</p>
                                </div>
                                <button onClick={() => { resetFormPengguna(); setActiveTab('tambahPengguna'); }} className={styles.addRoomBtn}>
                                    + Tambah Pengguna
                                </button>
                            </div>

                            {/* Pencarian */}
                            <div className={styles.searchBarWrapperUsers}>
                                <FiSearch className={styles.searchIconUsers} />
                                <input 
                                    type="text" 
                                    placeholder="Cari Nama, Email, atau Peran"
                                    value={userSearchQuery}
                                    onChange={(e) => setUserSearchQuery(e.target.value)}
                                    className={styles.userSearchInput}
                                />
                            </div>

                            {/* Tabel Pengguna */}
                            <div className={styles.roomTableContainer}>
                                <table className={styles.roomTable}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '60px' }}>No.</th>
                                            <th style={{ width: '60px' }}>PP</th>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>Peran</th>
                                            <th>Status</th>
                                            <th style={{ width: '120px' }}>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className={styles.userAvatarCircle}>
                                                            <FiUsers size={16} />
                                                        </div>
                                                    </td>
                                                    <td className={styles.roomTypeName}>{user.name}</td>
                                                    <td style={{ color: '#555555', fontSize: '13px' }}>{user.email}</td>
                                                    <td>
                                                        <span className={`${styles.roleBadge} ${
                                                            user.role === 'Admin' ? styles.badgeAdmin : 
                                                            user.role === 'Resepsionis' ? styles.badgeRecep : styles.badgeTamu
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.statusBadge} ${user.status === 'Aktif' ? styles.statusAktif : styles.statusNonAktif}`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.roomUpdateActions}>
                                                            <button onClick={() => handleEditPengguna(user)} className={`${styles.iconGridBtn} ${styles.bgNavyIcon}`} title="Ubah Pengguna">
                                                                <FiEdit3 size={14} />
                                                            </button>
                                                            <button onClick={() => handleHapusPengguna(user.id)} className={`${styles.iconGridBtn} ${styles.bgRedIcon}`} title="Hapus Pengguna">
                                                                <FiTrash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className={styles.emptyTableRow}>Data pengguna tidak ditemukan.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ================= VIEW: FORM TAMBAH / UBAH DATA PENGGUNA ================= */}
                    {activeTab === 'tambahPengguna' && (
                        <div className={styles.formContainerWrapper}>
                            <div className={styles.formHeaderFlexRow}>
                                <div>
                                    <h2 className={styles.formSectionMainTitle}>
                                        {editingUser ? 'Ubah Data Pengguna' : 'Tambah Pengguna'}
                                    </h2>
                                    <p className={styles.formSectionSubTitle}>
                                        {editingUser ? 'Lengkapi informasi pengguna dengan benar' : 'Lengkapi informasi pengguna baru dengan benar'}
                                    </p>
                                </div>
                                <button type="button" onClick={() => { resetFormPengguna(); setActiveTab('pengguna'); }} className={styles.btnOutlineBackRed}>
                                    ← Kembali
                                </button>
                            </div>

                            <form onSubmit={handleSimpanPengguna}>
                                <div className={styles.formTwoColumnGrid}>
                                    
                                    {/* CARD KIRI: Informasi Akun */}
                                    <div className={styles.whiteFormBoxCard}>
                                        <h3 className={styles.boxGroupTitle}>
                                            <FiUsers style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Informasi Akun
                                        </h3>
                                        
                                        <div className={styles.formInputWrapperItem}>
                                            <label>Nama <span className={styles.redStarMark}>*</span></label>
                                            <input type="text" placeholder="Masukkan nama" value={namaPengguna} onChange={(e) => setNamaPengguna(e.target.value)} required />
                                        </div>

                                        <div className={styles.formInputWrapperItem}>
                                            <label>Email <span className={styles.redStarMark}>*</span></label>
                                            <input type="email" placeholder="Masukkan email" value={emailPengguna} onChange={(e) => setEmailPengguna(e.target.value)} required />
                                        </div>

                                        <div className={styles.formInputWrapperItem}>
                                            <label>Nomor Telepon <span className={styles.redStarMark}>*</span></label>
                                            <div style={{ position: 'relative' }}>
                                                <input type="tel" placeholder="Masukkan nomor telepon" value={noTelpPengguna} onChange={(e) => setNoTelpPengguna(e.target.value)} required />
                                                <button type="button" className={styles.inputAdornmentIconBtn}></button>
                                            </div>
                                        </div>

                                        <div className={styles.formInputWrapperItem}>
                                            <label>Kata Sandi <span className={styles.redStarMark}>*</span></label>
                                            <div style={{ position: 'relative' }}>
                                                <input type={showPassword ? "text" : "password"} placeholder="Masukkan Kata Sandi" value={passwordPengguna} onChange={(e) => setPasswordPengguna(e.target.value)} required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.inputAdornmentIconBtn}>
                                                    {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Dropdown Status Akun hanya muncul saat UBAH DATA */}
                                        {editingUser && (
                                            <div className={styles.formInputWrapperItem}>
                                                <label>Status Akun</label>
                                                <select value={statusPengguna} onChange={(e) => setStatusPengguna(e.target.value)} className={styles.customSelectDropdown}>
                                                    <option value="Aktif">Aktif</option>
                                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    {/* CARD KANAN: Pilihan Peran (Role Selection) */}
                                    <div className={styles.whiteFormBoxCard}>
                                        <h3 className={styles.boxGroupTitle}>
                                            <FiCheckSquare style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Peran ( Role )
                                        </h3>
                                        <p className={styles.boxGroupSubHintText}>Pilih peran yang sesuai untuk pengguna ini.</p>
                                        
                                        <div className={styles.roleSelectionFlexStack}>
                                            
                                            {/* Opsi Peran: Tamu */}
                                            <div className={`${styles.roleRadioSelectCard} ${peranPengguna === 'Tamu' ? styles.cardRoleSelected : ''}`} onClick={() => setPeranPengguna('Tamu')}>
                                                <div className={styles.roleAvatarCircleIcon}><FiUsers size={18} /></div>
                                                <div style={{ flex: 1, marginLeft: '12px' }}>
                                                    <h4 className={styles.roleNameLabelText}>Tamu</h4>
                                                    <p className={styles.roleDescriptionText}>Dapat mengakses sistem sesuai dengan hak akses sebagai pengguna.</p>
                                                </div>
                                                <div className={`${styles.radioCircleOuter} ${peranPengguna === 'Tamu' ? styles.radioCircleActive : ''}`}>
                                                    <div className={styles.radioCircleInner} />
                                                </div>
                                            </div>

                                            {/* Opsi Peran: Resepsionis */}
                                            <div className={`${styles.roleRadioSelectCard} ${peranPengguna === 'Resepsionis' ? styles.cardRoleSelected : ''}`} onClick={() => setPeranPengguna('Resepsionis')}>
                                                <div className={styles.roleAvatarCircleIcon}><FiUsers size={18} /></div>
                                                <div style={{ flex: 1, marginLeft: '12px' }}>
                                                    <h4 className={styles.roleNameLabelText}>Resepsionis</h4>
                                                    <p className={styles.roleDescriptionText}>Dapat mengelola reservasi, tamu, dan data check-in / out.</p>
                                                </div>
                                                <div className={`${styles.radioCircleOuter} ${peranPengguna === 'Resepsionis' ? styles.radioCircleActive : ''}`}>
                                                    <div className={styles.radioCircleInner} />
                                                </div>
                                            </div>

                                            {/* Kondisional Input Tetapkan Hotel (Sub-item khusus Resepsionis) */}
                                            {peranPengguna === 'Resepsionis' && (
                                                <div className={styles.subConditionalInputCard}>
                                                    <label>Tetapkan Hotel <span style={{ fontWeight: 'normal', color: '#888', fontSize: '11px' }}>(via ID Hotel)</span></label>
                                                    <input type="text" placeholder="Masukkan ID Hotel" value={idHotelPengguna} onChange={(e) => setIdHotelPengguna(e.target.value)} required />
                                                </div>
                                            )}

                                            {/* Opsi Peran: Admin (Muncul Otomatis saat mengedit akun berkategori Admin) */}
                                            {peranPengguna === 'Admin' && (
                                                <div className={`${styles.roleRadioSelectCard} ${styles.cardRoleSelected}`}>
                                                    <div className={styles.roleAvatarCircleIcon}><FiUsers size={18} /></div>
                                                    <div style={{ flex: 1, marginLeft: '12px' }}>
                                                        <h4 className={styles.roleNameLabelText}>Admin</h4>
                                                        <p className={styles.roleDescriptionText}>Memiliki kontrol penuh terhadap semua konfigurasi dan manajemen sistem Restify.</p>
                                                    </div>
                                                    <div className={`${styles.radioCircleOuter} ${styles.radioCircleActive}`}>
                                                        <div className={styles.radioCircleInner} />
                                                    </div>
                                                </div>
                                            )}

                                        </div>

                                        {/* Banner Pemberitahuan Bawah */}
                                        <div className={styles.bottomStatusNoticeBanner}>
                                            <FiInfo size={16} style={{ marginRight: '8px', flexShrink: 0 }} />
                                            <span>Pastikan data yang dimasukkan sudah benar sebelum menyimpan</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Footer Aksi */}
                                <div className={styles.formFooterActionFlexBar}>
                                    <button type="button" onClick={() => { resetFormPengguna(); setActiveTab('pengguna'); }} className={styles.btnActionFooterCancel}>
                                        X Batal
                                    </button>
                                    <button type="submit" className={styles.btnActionFooterSave}>
                                        💾 Simpan Pengguna
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}