'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine, RiFileTextLine, RiEyeLine, RiEyeOffLine, RiStarFill } from 'react-icons/ri';
import {
  MOCK_BOOKINGS,
  type Booking,
  formatTanggal,
  formatTanggalSingkat,
  formatJam,
  formatRupiah,
} from '@/data/mockBookings';

// =============================================================================
// TYPE & HELPERS
// =============================================================================
type ActiveTab = 'profil' | 'riwayat' | 'logout';

// =============================================================================
// SUB-COMPONENT – Booking Card (list item)
// =============================================================================
function BookingCard({
  booking,
  onSelect,
}: {
  booking: Booking;
  onSelect: (b: Booking) => void;
}) {
  const isActive = booking.status === 'active';

  return (
    <button
      onClick={() => onSelect(booking)}
      className={`w-full text-left rounded-[18px] px-6 py-5 flex items-center justify-between gap-4 transition-all shadow-sm hover:brightness-95 active:scale-[0.98]
        ${isActive ? 'bg-[#5E6B52]' : 'bg-[#E34A42]'} text-white`}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[18px] font-bold leading-tight truncate">
          {booking.hotelName}
        </span>
        <div className="flex items-center gap-2 text-[13px] font-medium opacity-90">
          <span>{formatTanggalSingkat(booking.checkIn)}</span>
          <span>→</span>
          <span>{formatTanggalSingkat(booking.checkOut)}</span>
        </div>
      </div>
      {/* Ikon dokumen */}
      <div className="shrink-0 w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center">
        <RiFileTextLine className="text-[18px]" />
      </div>
    </button>
  );
}

// =============================================================================
// SUB-COMPONENT – Booking Detail
// =============================================================================
function BookingDetail({
  booking,
  onBack,
}: {
  booking: Booking;
  onBack: () => void;
}) {
  const [showCode, setShowCode] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const isActive = booking.status === 'active';

  const rows: { label: string; value: string }[] = [
    { label: 'Tanggal Pemesanan', value: `${formatTanggal(booking.bookedAt)} | ${formatJam(booking.bookedAt)}` },
    { label: 'Check In', value: formatTanggal(booking.checkIn) },
    { label: 'Check Out', value: formatTanggal(booking.checkOut) },
    { label: 'Tipe Kamar', value: booking.roomType },
    { label: 'Jumlah Tamu', value: `${booking.guestCount} Orang` },
    { label: 'Ekstra Kasur', value: booking.extraBed > 0 ? `${booking.extraBed} Kasur` : 'Tidak Ada' },
  ];

  return (
    <div
      className={`w-full rounded-[18px] text-white shadow-md overflow-hidden
        ${isActive ? 'bg-[#5E6B52]' : 'bg-[#E34A42]'}`}
    >
      {/* ---- HEADER ---- */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-white/20">
        <button
          onClick={onBack}
          className="shrink-0 w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Kembali ke daftar"
        >
          <RiArrowLeftLine className="text-[18px]" />
        </button>
        <h3 className="flex-1 text-center text-[18px] font-bold pr-9">{booking.hotelName}</h3>
      </div>

      {/* ---- DETAIL ROWS ---- */}
      <div className="px-6 pt-5 pb-2 flex flex-col gap-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between text-[13.5px]">
            <span className="opacity-80">{label}</span>
            <span className="font-semibold text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* ---- DIVIDER ---- */}
      <div className="mx-6 my-3 border-t border-white/25" />

      {/* ---- PRICING ---- */}
      <div className="px-6 pb-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[13.5px]">
          <span className="opacity-80">Subtotal</span>
          <span className="font-semibold">{formatRupiah(booking.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-[13.5px]">
          <span className="opacity-80">Pajak &amp; Biaya</span>
          <span className="font-semibold">{formatRupiah(booking.taxAndFee)}</span>
        </div>
        <div className="flex items-center justify-between text-[13.5px] font-bold">
          <span>Total</span>
          <span>{formatRupiah(booking.total)}</span>
        </div>

        {/* ---- TRANSACTION CODE or REVIEW BUTTON ---- */}
        <div className="flex justify-center mt-3">
          {isActive ? (
            // Kode Transaksi dengan toggle show/hide
            <div className="flex items-center gap-2 bg-[#FFFDF0] text-gray-800 rounded-full px-4 py-2 text-[13px] font-semibold shadow-inner">
              <span className="tracking-widest">
                {showCode ? booking.transactionCode : '••••••'}
              </span>
              <button
                onClick={() => setShowCode((v) => !v)}
                className="text-gray-500 hover:text-gray-800 transition-colors ml-1"
                aria-label={showCode ? 'Sembunyikan kode' : 'Tampilkan kode'}
              >
                {showCode ? <RiEyeOffLine className="text-[16px]" /> : <RiEyeLine className="text-[16px]" />}
              </button>
            </div>
          ) : (
            // Tombol Review untuk booking yang sudah selesai
            <>
              <button
                onClick={() => setShowReview(true)}
                className="bg-[#FFFDF0] text-gray-800 rounded-full px-8 py-2 text-[13px] font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Review
              </button>

              {/* Modal Review sederhana */}
              {showReview && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowReview(false)}
                >
                  <div
                    className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4 className="text-[18px] font-bold text-gray-800 mb-1">{booking.hotelName}</h4>
                    <p className="text-[13px] text-gray-500 mb-5">{booking.roomType}</p>

                    {/* Star rating */}
                    <p className="text-[12px] font-semibold text-gray-700 mb-2">Rating</p>
                    <div className="flex gap-2 mb-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="text-2xl text-yellow-400 hover:scale-110 transition-transform">
                          <RiStarFill />
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Tulis ulasan Anda di sini..."
                      className="w-full bg-[#FFFDF0] rounded-xl px-4 py-3 text-[13px] text-gray-700 outline-none resize-none mb-5 border border-gray-200"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowReview(false)}
                        className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => setShowReview(false)}
                        className="flex-1 py-2.5 rounded-full bg-[#5E6B52] text-white text-[13px] font-semibold hover:bg-[#4a5440] transition-colors"
                      >
                        Kirim
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profil');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const router = useRouter();

  // ---------------------------------------------------------------------------
  // Data bookings – ganti `MOCK_BOOKINGS` dengan fetch API dari BE
  // Contoh:
  //   const [bookings, setBookings] = useState<Booking[]>([]);
  //   useEffect(() => {
  //     fetch('/api/bookings').then(r => r.json()).then(setBookings);
  //   }, []);
  // ---------------------------------------------------------------------------
  const bookings: Booking[] = MOCK_BOOKINGS;

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="w-full relative h-[calc(100vh-140px)] flex items-center justify-center p-4 py-8 mb-10 overflow-hidden">

      {/* Background Doodle */}
      <div
        className="absolute inset-0 z-0 opacity-25 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('/images/bg-doodles.jpg')` }}
      />

      {/* Container Utama */}
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden h-[560px] relative z-10 border border-gray-50">

        {/* ============================= */}
        {/* SIDEBAR KIRI                  */}
        {/* ============================= */}
        <div className="w-full md:w-[35%] bg-[#FFFDF0] p-8 flex flex-col items-center">
          <div className="mb-4 mt-2">
            <Image src="/images/logo-putih.png" alt="Restify Logo" width={160} height={45} className="object-contain" priority />
          </div>
          <div className="w-full h-px bg-gray-300/60 mb-10 mt-2" />

          <div className="flex flex-col gap-5 w-full px-2">
            <button
              onClick={() => { setActiveTab('profil'); setSelectedBooking(null); }}
              className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-all shadow-sm
                ${activeTab === 'profil' ? 'bg-[#5E6B52] text-white' : 'bg-[#ACB5A4] text-white hover:bg-[#8f9888]'}`}
            >
              Profil Saya
            </button>

            <button
              onClick={() => { setActiveTab('riwayat'); setSelectedBooking(null); }}
              className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-all shadow-sm
                ${activeTab === 'riwayat' ? 'bg-[#5E6B52] text-white' : 'bg-[#ACB5A4] text-white hover:bg-[#8f9888]'}`}
            >
              Riwayat Pemesanan
            </button>

            <button
              onClick={() => setActiveTab('logout')}
              className={`w-full py-3.5 rounded-full font-bold text-[14px] transition-all shadow-sm
                ${activeTab === 'logout' ? 'bg-[#E34A42] text-white' : 'bg-[#F2A299] text-white hover:bg-[#de8478]'}`}
            >
              Logout
            </button>
          </div>
        </div>

        {/* ============================= */}
        {/* AREA KONTEN KANAN             */}
        {/* ============================= */}
        <div className="w-full md:w-[65%] p-8 md:p-10 flex flex-col overflow-y-auto">

          {/* ---- TAB: PROFIL SAYA ---- */}
          {activeTab === 'profil' && (
            <div className="w-full max-w-md mx-auto animate-fade-in pl-0 md:pl-4 flex flex-col justify-center flex-1">
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-800 mb-2.5">Nama</label>
                <input type="text" defaultValue="nama" readOnly
                  className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-xl text-sm font-medium text-gray-800 outline-none" />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-800 mb-2.5">Email</label>
                <input type="email" defaultValue="email@contoh.com" readOnly
                  className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-xl text-sm font-medium text-gray-800 outline-none" />
              </div>
              <div className="mb-1">
                <label className="block text-xs font-bold text-gray-800 mb-2.5">Kata Sandi</label>
                <input type="password" defaultValue="*************" readOnly
                  className="w-full bg-[#FFFDF0] px-4 py-3.5 rounded-xl text-lg font-medium text-gray-800 outline-none tracking-widest" />
              </div>
              <div className="flex justify-end mt-2">
                <button className="text-[11px] text-red-500 font-medium hover:underline">
                  Ganti Password
                </button>
              </div>
            </div>
          )}

          {/* ---- TAB: RIWAYAT PEMESANAN ---- */}
          {activeTab === 'riwayat' && (
            <div className="w-full flex flex-col animate-fade-in">
              {/* Judul */}
              <h2 className="text-[22px] font-bold text-gray-800 text-center mb-1">Riwayat Pemesanan</h2>
              <div className="w-full h-px bg-gray-200 mb-5" />

              {/* ---- DETAIL VIEW ---- */}
              {selectedBooking ? (
                <BookingDetail
                  booking={selectedBooking}
                  onBack={() => setSelectedBooking(null)}
                />
              ) : (
                /* ---- LIST VIEW ---- */
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[420px] pr-1
                  scrollbar-thin scrollbar-thumb-[#5E6B52]/50 scrollbar-track-transparent">
                  {bookings.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-10">Belum ada riwayat pemesanan.</p>
                  ) : (
                    bookings.map((b) => (
                      <BookingCard key={b.id} booking={b} onSelect={setSelectedBooking} />
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ---- TAB: LOGOUT ---- */}
          {activeTab === 'logout' && (
            <div className="w-full h-full flex flex-col items-center justify-center pb-10 animate-fade-in flex-1">
              <h2 className="text-[26px] font-medium mb-12 text-center max-w-[350px] leading-snug">
                Apakah anda yakin ingin keluar?
              </h2>
              <button
                onClick={handleLogout}
                className="bg-[#E34A42] text-white font-medium text-lg px-20 py-2.5 rounded-2xl hover:bg-red-700 transition-colors shadow-sm"
              >
                Iya
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
