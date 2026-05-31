'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Receptionist.module.css';

// Import Feather Icons
import { 
  FiUsers, 
  FiHome, 
  FiMenu, 
  FiSearch, 
  FiTrash2, 
  FiEye, 
  FiArrowLeft, 
  FiUser, 
  FiPlus, 
  FiMinus, 
  FiInfo,
  FiMessageSquare,
  FiCheckSquare
} from 'react-icons/fi';

export default function ReceptionistDashboard() {
  // State untuk melacak halaman aktif: 'reservations', 'detail', atau 'rooms'
  const [activeView, setActiveView] = useState('reservations');
  
  // State untuk menyimpan teks pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Data tiruan (mock data) Reservasi
  const [reservations, setReservations] = useState([
    { id: 1, name: 'Ahmad Subarjo', checkIn: '2 - oktober - 2026', checkOut: '5 - oktober - 2026', status: 'Check-In', statusClass: styles.badgeCheckIn },
    { id: 2, name: 'Siti Rahmawati', checkIn: '2 - oktober - 2026', checkOut: '5 - oktober - 2026', status: 'Belum Konfirmasi', statusClass: styles.badgePending },
    { id: 3, name: 'Budi Santoso', checkIn: '2 - oktober - 2026', checkOut: '5 - oktober - 2026', status: 'Di-Tolak', statusClass: styles.badgeRejected },
    { id: 4, name: 'Clara Wijaya', checkIn: '2 - oktober - 2026', checkOut: '5 - oktober - 2026', status: 'Selesai', statusClass: styles.badgeSuccess },
  ]);

  // State tambahan untuk melihat detail user tertentu secara dinamis
  const [selectedReservation, setSelectedReservation] = useState(null);

  // ================= STATE & FUNGSI BARU UNTUK DATA KAMAR =================
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Kamar Suite', count: 3, img: '/images/room1.jpg' },
    { id: 2, name: 'Kamar Superior Flat', count: 5, img: '/images/room2.jpg' },
    { id: 3, name: 'Kamar Grand Deluxe', count: 7, img: '/images/room3.jpg' },
    { id: 4, name: 'Kamar Superior Terrace', count: 4, img: '/images/room4.jpg' }
  ]);

  // Fungsi menambah jumlah kamar (+)
  const handleIncrementRoom = (id) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === id ? { ...room, count: room.count + 1 } : room
      )
    );
  };

  // Fungsi mengurangi jumlah kamar (-) dengan batas minimum 0
  const handleDecrementRoom = (id) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === id && room.count > 0 ? { ...room, count: room.count - 1 } : room
      )
    );
  };

  // Menghitung total seluruh kamar secara otomatis menggunakan reduce
  const totalAvailableRooms = rooms.reduce((sum, room) => sum + room.count, 0);
  // ========================================================================

  // Fungsi memfilter data reservasi berdasarkan input search bar
  const filteredReservations = reservations.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDetail = (reservation) => {
    setSelectedReservation(reservation);
    setActiveView('detail');
  };

  const handleDelete = (id) => {
    if(confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setReservations(reservations.filter(item => item.id !== id));
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className="relative w-36 h-10">
            <Image src="/images/logo-putih.png" alt="Restify Logo" fill className="object-contain" priority />
          </div>
        </div>
        
        <div className={styles.sidebarMenu}>
          <span className={styles.menuLabel}>Menu Utama</span>
          
          <button 
            className={`${styles.menuItem} ${(activeView === 'reservations' || activeView === 'detail') ? styles.menuItemActive : ''}`}
            onClick={() => setActiveView('reservations')}
          >
            <FiUsers size={18} /> Data Reservasi
          </button>
          
          <button 
            className={`${styles.menuItem} ${activeView === 'rooms' ? styles.menuItemActive : ''}`}
            onClick={() => setActiveView('rooms')}
          >
            <FiHome size={18} /> Data Kamar
          </button>
        </div>

        <div className={styles.logoutContainer}>
          <Link href="/login" className={styles.logoutButton}>
            Keluar
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={styles.mainContent}>
        {/* SHARED HEADER */}
        <header className={styles.header}>
          <button className={styles.hamburger}>
            <FiMenu size={22} />
          </button>
          <div className={styles.headerTitle}>
            Resepsionis <span className={styles.hotelName}>"Nama Hotel"</span>
          </div>
        </header>

        {/* DYNAMIC CONTENT BODY BASED ON STATE */}
        <div className={styles.contentBody}>
          
          {/* ================= DATA RESERVASI ================= */}
          {activeView === 'reservations' && (
            <div>
              <div className={styles.pageTitle}>Data Reservasi</div>
              <div className={styles.pageSubtitle}>Kelola data reservasi pengguna yang sudah dikonfirmasi dalam sistem.</div>
              
              <div className={styles.cardContainer}>
                <div className={styles.searchContainer} style={{ position: 'relative', width: '240px' }}>
                  <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input 
                    type="text" 
                    placeholder="Cari Nama" 
                    className={styles.searchInput} 
                    style={{ paddingLeft: '36px' }} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <table className={styles.customTable}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>PP</th>
                      <th>Nama</th>
                      <th>Durasi Masuk</th>
                      <th>Durasi Keluar</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.length > 0 ? (
                      filteredReservations.map((res, index) => (
                        <tr key={res.id}>
                          <td>{index + 1}</td>
                          <td>
                            <FiUser size={18} style={{ color: '#4b5563' }} />
                          </td>
                          <td>{res.name}</td>
                          <td>{res.checkIn}</td>
                          <td>{res.checkOut}</td>
                          <td><span className={`${styles.badge} ${res.statusClass}`}>{res.status}</span></td>
                          <td className={styles.actionGroup}>
                            <button 
                              className={`${styles.btnAction} ${styles.btnDetail}`} 
                              onClick={() => handleOpenDetail(res)}
                            >
                              <FiSearch size={14} />
                            </button>
                            <button 
                              className={`${styles.btnAction} ${styles.btnDelete}`}
                              onClick={() => handleDelete(res.id)}
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', color: '#9ca3af', padding: '24px' }}>
                          Nama tamu "{searchQuery}" tidak ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= DETAIL RESERVASI ================= */}
          {activeView === 'detail' && (
            <div>
              <div className={styles.detailHeaderArea}>
                <div>
                  <div className={styles.pageTitle}>Data Reservasi</div>
                  <div className={styles.pageSubtitle}>Kelola data reservasi pengguna yang sudah dikonfirmasi dalam sistem.</div>
                </div>
                <button className={styles.btnBack} onClick={() => setActiveView('reservations')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiArrowLeft size={16} /> Kembali
                </button>
              </div>

              <div className={styles.gridDetail}>
                <div className={styles.cardContainer}>
                  <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiUser size={18} /> Informasi Reservasi
                  </div>
                  <div className={styles.formGroup}>
                    <label>Nama</label>
                    <input type="text" value={selectedReservation?.name || 'Nama'} readOnly />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Tipe Kamar</label>
                    <input type="text" value="Kamar Grand Deluxe" readOnly />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Kode Transaksi</label>
                    <div className={styles.passwordWrapper}>
                      <input type="password" value="******" readOnly />
                      <span className={styles.passwordEye}><FiEye size={16} color="#6b7280" /></span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardContainer}>
                  <div className={styles.cardTitle}>Catatan Tamu</div>
                  <textarea rows={6} value="Anu kak aku mau anu itu" readOnly style={{ resize: 'none' }} />
                </div>
              </div>

              <div className={styles.gridActions}>
                <div className={styles.actionCard}>
                  <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiMessageSquare size={18} /> Konfirmasi Reservasi
                  </div>
                  <button className={`${styles.btnBig} ${styles.btnGreen}`}>Konfirmasi</button>
                  <button className={`${styles.btnBig} ${styles.btnOrange}`}>Tolak</button>
                </div>
                <div className={styles.actionCard}>
                  <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCheckSquare size={18} /> Status Menginap
                  </div>
                  <button className={`${styles.btnBig} ${styles.btnGreen}`}>Check-In</button>
                  <button className={`${styles.btnBig} ${styles.btnOrange}`}>Check-Out</button>
                </div>
              </div>
            </div>
          )}

          {/* ================= DATA KAMAR ================= */}
          {activeView === 'rooms' && (
            <div>
              <div className={styles.pageTitle}>Data Kamar</div>
              <div className={styles.pageSubtitle}>Kelola data ketersediaan kamar</div>

              <div className={styles.cardContainer}>
                <table className={styles.customTable}>
                  <thead>
                    <tr>
                      <th>Tipe Kamar</th>
                      <th>Kamar Tersedia</th>
                      <th>Perbarui</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td>
                          <div className={styles.roomRow}>
                            <Image src={room.img} alt={room.name} width={80} height={50} className={styles.roomImage} />
                            <span>{room.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className={styles.roomCount}>{room.count}</span>
                          <span className={styles.roomSub}>Kamar Tersedia</span>
                        </td>
                        <td>
                          <div className={styles.btnUpdateGroup}>
                            <button 
                              className={`${styles.btnUpdate} ${styles.btnPlus}`}
                              onClick={() => handleIncrementRoom(room.id)}
                            >
                              <FiPlus size={16} />
                            </button>
                            <button 
                              className={`${styles.btnUpdate} ${styles.btnMinus}`}
                              onClick={() => handleDecrementRoom(room.id)}
                            >
                              <FiMinus size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer otomatis terhitung dari total kalkulasi real-time */}
                <div className={styles.infoFooter} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiInfo size={18} /> Total seluruh kamar tersedia: {totalAvailableRooms} kamar
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}