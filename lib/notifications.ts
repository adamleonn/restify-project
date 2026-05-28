/**
 * @file lib/notifications.ts
 * @description Centralized notification system menggunakan Sonner toast.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * cara pakai:
 *
 *   import { notify } from '@/lib/notifications';
 *
 *   notify.auth.registerSuccess();
 *   notify.auth.emailExists();
 *   notify.hotel.added();
 *   notify.api.fromStatus(response.status);
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { toast } from 'sonner';

export const notify = {

    // ─── AUTH: REGISTER ────────────────────────────────────────────────────────
    auth: {
        // ── Register ──────────────────────────────────────
        registerSuccess: () =>
            toast.success('Registrasi berhasil, silakan login'),

        emailExists: () =>
            toast.error('Email ini sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.'),

        passwordTooWeak: () =>
            toast.error('Kata sandi terlalu pendek. Gunakan minimal 6 karakter agar lebih aman.'),

        fieldRequired: () =>
            toast.error('Mohon lengkapi semua kolom yang tersedia sebelum melanjutkan.'),

        // ── Login: Success (role-based) ────────────────────
        loginSuccessUser: () =>
            toast.success('Login berhasil sebagai User'),

        loginSuccessAdmin: () =>
            toast.success('Login berhasil sebagai Admin'),

        loginSuccessReceptionist: () =>
            toast.success('Login berhasil sebagai Receptionist'),

        /**
         * Helper — deteksi role otomatis.
         * @param role 'user' | 'admin' | 'receptionist'
         */
        loginSuccess: (role: 'user' | 'admin' | 'receptionist') => {
            const messages: Record<string, string> = {
                user:         'Login berhasil sebagai User',
                admin:        'Login berhasil sebagai Admin',
                receptionist: 'Login berhasil sebagai Receptionist',
            };
            toast.success(messages[role] ?? 'Login berhasil');
        },

        // ── Login: Error ───────────────────────────────────
        emailNotFound: () =>
            toast.error('Kami tidak dapat menemukan akun dengan email tersebut. Pastikan penulisan sudah benar.'),

        wrongPassword: () =>
            toast.error('Kata sandi yang Anda masukkan tidak sesuai. Silakan coba lagi.'),

        accountInactive: () =>
            toast.error('Akun Anda saat ini sedang dinonaktifkan. Silakan hubungi admin untuk bantuan.'),

        rateLimitExceeded: () =>
            toast.error('Demi keamanan, akses dibatasi sementara karena terlalu banyak percobaan. Coba lagi nanti.'),

        // ── Authorization ──────────────────────────────────
        accessDenied: () =>
            toast.error('Harap setujui syarat dan ketentuan sebelum melanjutkan.'),

        sessionExpired: () =>
            toast.error('Sesi telah berakhir, silakan login kembali'),
        resetLinkSent: () =>
            toast.success('Link reset password telah dikirim ke email Anda.'),
        passwordResetSuccess: () =>
            toast.success('Kata sandi berhasil direset. Silakan login kembali.'),
        passwordMismatch: () =>
            toast.error('Kata sandi dan konfirmasi kata sandi tidak cocok. Silakan periksa kembali.'),

    },

    
    // ─── HOTEL & ROOM ──────────────────────────────────────────────────────────
    hotel: {
        loaded: () =>
            toast.success('Data berhasil dimuat'),

        added: () =>
            toast.success('Hotel berhasil ditambahkan'),

        updated: () =>
            toast.success('Hotel berhasil diupdate'),

        deleted: () =>
            toast.success('Hotel berhasil dihapus'),

        loadFailed: () =>
            toast.error('Gagal memuat data hotel'),

        notFound: () =>
            toast.error('Hotel tidak ditemukan'),

        noResults: () =>
            toast.error('Tidak ditemukan hotel sesuai filter'),
    },

    // ─── BOOKING ───────────────────────────────────────────────────────────────
    booking: {
        created: () =>
            toast.success('Booking berhasil dibuat'),

        approved: () =>
            toast.success('Booking berhasil disetujui'),

        declined: () =>
            toast.error('Booking ditolak'),

        cancelled: () =>
            toast.error('Booking berhasil dibatalkan'),

        roomUnavailable: () =>
            toast.error('Kamar tidak tersedia pada tanggal tersebut'),

        invalidCheckIn: () =>
            toast.error('Tanggal check-in tidak valid'),
    },

    // ─── PAYMENT ───────────────────────────────────────────────────────────────
    payment: {
        success: () =>
            toast.success('Pembayaran berhasil'),

        failed: () =>
            toast.error('Pembayaran gagal'),

        invalidMethod: () =>
            toast.error('Metode pembayaran tidak valid'),
    },

    // ─── API / HTTP ERROR ──────────────────────────────────────────────────────
    api: {
        badRequest: () =>
            toast.error('Data tidak valid'),

        unauthorized: () =>
            toast.error('Silakan login terlebih dahulu'),

        forbidden: () =>
            toast.error('Akses ditolak'),

        notFound: () =>
            toast.error('Data tidak ditemukan'),

        serverError: () =>
            toast.error('Terjadi kesalahan server'),

        unknown: () =>
            toast.error('Terjadi kesalahan, coba lagi nanti'),

        /**
         * Helper — otomatis tampilkan notif sesuai HTTP status code.
         * Panggil ini setelah cek response.ok === false.
         *
         * @example
         * if (!res.ok) { notify.api.fromStatus(res.status); return; }
         */
        fromStatus: (status: number) => {
            const handlers: Record<number, () => void> = {
                400: () => toast.error('Data tidak valid'),
                401: () => toast.error('Silakan login terlebih dahulu'),
                403: () => toast.error('Akses ditolak'),
                404: () => toast.error('Data tidak ditemukan'),
                429: () => toast.error('Terlalu banyak permintaan, coba lagi nanti'),
                500: () => toast.error('Terjadi kesalahan server'),
            };
            const handler = handlers[status] ?? (() => toast.error('Terjadi kesalahan, coba lagi nanti'));
            handler();
        },
    },

} as const;
