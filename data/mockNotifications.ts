// =============================================================================
// MOCK DATA – Notifikasi User
// =============================================================================
// Struktur ini mencerminkan respons dari endpoint BE, misalnya:
//   GET /api/notifications
//
// Untuk BE, ganti `MOCK_NOTIFICATIONS` di komponen dengan:
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   useEffect(() => {
//     fetch('/api/notifications', { headers: { Authorization: `Bearer ${token}` } })
//       .then(r => r.json())
//       .then(data => setNotifications(data.notifications ?? []));
//   }, []);
// =============================================================================

export type NotificationType =
  | 'booking_confirmed'   // Reservasi dikonfirmasi
  | 'booking_forwarded'   // Reservasi diteruskan ke hotel
  | 'payment_success'     // Pembayaran berhasil
  | 'review_reminder'     // Pengingat untuk menulis ulasan
  | 'checkout_done'       // Check-out selesai
  | 'checkin_success';    // Check-in berhasil

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  hotelName: string;
  createdAt: string;      // ISO datetime string
  isRead: boolean;
  reviewLink?: string;    // Hanya ada jika type === 'review_reminder'
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  // ---- Hari Ini (26 April 2026) ----
  {
    id: 'N001',
    type: 'booking_confirmed',
    message: 'Reservasi anda di hotel "Puteri Gunung Hotel", sudah dikonfirmasi.',
    hotelName: 'Puteri Gunung Hotel',
    createdAt: '2026-04-26T09:25:00Z',
    isRead: false,
  },
  {
    id: 'N002',
    type: 'booking_forwarded',
    message: 'Reservasi anda sudah kami kirim ke pihak hotel "Puteri Gunung Hotel".',
    hotelName: 'Puteri Gunung Hotel',
    createdAt: '2026-04-26T09:19:00Z',
    isRead: false,
  },
  {
    id: 'N003',
    type: 'payment_success',
    message: 'Pembayaran untuk reservasi di "Puteri Gunung Hotel" telah berhasil.',
    hotelName: 'Puteri Gunung Hotel',
    createdAt: '2026-04-26T09:18:00Z',
    isRead: false,
  },
  // ---- Bulan Lalu (7 Maret 2026) ----
  {
    id: 'N004',
    type: 'review_reminder',
    message: 'Bagikan pengalaman Anda di "Aryaduta Bandung" dengan menulis ulasan.',
    hotelName: 'Aryaduta Bandung',
    createdAt: '2026-03-07T18:48:00Z',
    isRead: true,
    reviewLink: '/home/profile',
  },
  {
    id: 'N005',
    type: 'checkout_done',
    message: 'Check-out Anda dari "Aryaduta Bandung" telah selesai. Terima kasih telah menginap!',
    hotelName: 'Aryaduta Bandung',
    createdAt: '2026-03-07T18:46:00Z',
    isRead: true,
  },
  {
    id: 'N006',
    type: 'checkin_success',
    message: 'Check-in Anda di "Aryaduta Bandung" berhasil. Selamat menikmati waktu menginap!',
    hotelName: 'Aryaduta Bandung',
    createdAt: '2026-03-06T15:10:00Z',
    isRead: true,
  },
];


// =============================================================================
// Helper: grouping notifikasi berdasarkan hari
// =============================================================================
const BULAN_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export function formatNotifTime(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const day = d.getUTCDate();
  const month = BULAN_ID[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${hh}:${mm} · ${day} ${month} ${year}`;
}

/** Kembalikan label grup: "Hari ini", "Kemarin", atau "Bulan Lalu", dsb. */
export function getNotifGroup(isoDateTime: string): string {
  const now = new Date();
  const d = new Date(isoDateTime);

  const todayStr = now.toISOString().slice(0, 10);
  const dStr = d.toISOString().slice(0, 10);

  if (dStr === todayStr) return 'Hari ini';

  const yesterday = new Date(now);
  yesterday.setUTCDate(now.getUTCDate() - 1);
  if (dStr === yesterday.toISOString().slice(0, 10)) return 'Kemarin';

  if (d.getUTCMonth() === now.getUTCMonth() && d.getUTCFullYear() === now.getUTCFullYear()) {
    return 'Minggu Lalu';
  }

  return 'Bulan Lalu';
}

/** Kelompokkan notifikasi ke dalam Map<label, Notification[]> */
export function groupNotifications(
  notifications: Notification[],
): Map<string, Notification[]> {
  const map = new Map<string, Notification[]>();
  const order = ['Hari ini', 'Kemarin', 'Minggu Lalu', 'Bulan Lalu'];

  for (const n of notifications) {
    const group = getNotifGroup(n.createdAt);
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push(n);
  }

  // Sort map by predefined order
  const sorted = new Map<string, Notification[]>();
  for (const label of order) {
    if (map.has(label)) sorted.set(label, map.get(label)!);
  }
  // Tambahkan grup yang tidak ada di predefined order (fallback)
  for (const [k, v] of map) {
    if (!sorted.has(k)) sorted.set(k, v);
  }

  return sorted;
}
