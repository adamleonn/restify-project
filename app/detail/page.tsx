"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./HotelDetail.module.css";
import { useRouter } from "next/navigation";

export default function HotelDetail() {
  const searchParams = useSearchParams();


  const router = useRouter();

  const hotel = {
    name: searchParams.get("name"),
    price: searchParams.get("price"),
    image: searchParams.get("image"),
    rating: searchParams.get("rating"),
    location: searchParams.get("location") || "Bandung, Indonesia",
  };

  const [tab, setTab] = useState("tentang");
  const [showBooking, setShowBooking] = useState(false);
  const [step, setStep] = useState("form");

  const [guest, setGuest] = useState(1);
  const [extraBed, setExtraBed] = useState(1);
  const [room, setRoom] = useState("Deluxe Room");

  const reviewDummy = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      time: "2 hari lalu",
      text: "Hotel nyaman banget, bersih dan pelayanannya ramah.",
    },
  ];

  if (!hotel.name) return <h2>Data hotel tidak ditemukan</h2>;

  return (
    <div className={styles["detail-container"]}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" />
      </div>

      {/* HEADER */}
      <div className={styles.header}>
        <img src={hotel.image} className={styles["detail-banner"]} />

        <div className={styles["detail-info"]}>
          <div className={styles.rating}>⭐ {hotel.rating ?? "- 4.5"}</div>
          <h2>{hotel.name}</h2>

          <div className={styles["location-map-row"]}>
            <p className={styles.location}>📍 {hotel.location}</p>

            <button
              className={styles["btn-map"]}
              onClick={() =>
                window.location.href = `/map?location=${encodeURIComponent(
                  hotel.location
                )}&name=${encodeURIComponent(hotel.name)}`
              }
            >
              Lihat Map
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <span className={tab === "tentang" ? styles.active : ""} onClick={() => setTab("tentang")}>
          Tentang
        </span>
        <span className={tab === "foto" ? styles.active : ""} onClick={() => setTab("foto")}>
          Foto
        </span>
        <span className={tab === "ulasan" ? styles.active : ""} onClick={() => setTab("ulasan")}>
          Ulasan
        </span>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {tab === "tentang" && (
          <>
            <h3>Standar Room</h3>
            <div className={styles["facility-grid"]}>
              <div>2 Kamar tidur</div>
              <div>1 Kamar mandi</div>
              <div>AC</div>
              <div>WiFi</div>
              <div>Sarapan</div>
            </div>

            <h3>Deskripsi</h3>
            <p>{hotel.desc}</p>
          </>
        )}

        {tab === "foto" && (
          <div className={styles["photo-grid"]}>
            <img src={hotel.image || ""} />
          </div>
        )}

        {tab === "ulasan" && (
          <div>
            <h3>Ulasan</h3>
            <div className={styles["review-list"]}>
              {reviewDummy.map((r) => (
                <div key={r.id} className={styles["review-card"]}>
                  <div className={styles["review-user"]}>
                    <img src="https://i.pravatar.cc/40" />
                    <div>
                      <strong>{r.name}</strong>
                      <p className={styles["review-time"]}>{r.time}</p>
                    </div>
                  </div>
                  <p className={styles["review-text"]}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <div className={styles.price}>Harga : {hotel.price} / Malam</div>
        <button className={styles["btn-pesan"]} onClick={() => {
          setShowBooking(true);
          setStep("form");
        }}>
          Pesan
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {showBooking && (
        <div className={styles.overlay}>

          {/* ================= FORM ================= */}
          {step === "form" && (
            <div className={styles.bookingBox}>
              <div className={styles.bookingHeader}>
                <img src={hotel.image} />
                <div>
                  <h2>{hotel.name}</h2>
                  <p>📍 {hotel.location}</p>
                </div>
              </div>

              <div className={styles.bookingGrid}>
                <div>
                  <h3>Pilih Tanggal</h3>

                  <div className={styles.dateGroup}>
                    <span className={styles.dateLabel}>Check-in</span>
                    <div className={styles.dateCard}>
                      Senin <br /> 10 November 2026
                    </div>
                  </div>

                  <div className={styles.dateGroup}>
                    <span className={styles.dateLabel}>Check-out</span>
                    <div className={styles.dateCard}>
                      Minggu <br /> 4 Desember 2026
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Pilih Kamar</h3>
                  {["Standard Room","Superior Room","Deluxe Room","Suite Room"].map((r) => (
                    <div key={r} className={styles.roomItem} onClick={() => setRoom(r)}>
                      {r}
                      <div className={room === r ? styles.radioActive : styles.radio}></div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3>Tamu</h3>

                  <div className={styles.counter}>
                    <span>Jumlah Tamu</span>
                    <div>
                      <button onClick={() => setGuest(Math.max(1, guest - 1))}>-</button>
                      <span>{guest}</span>
                      <button onClick={() => setGuest(guest + 1)}>+</button>
                    </div>
                  </div>

                  <div className={styles.counter}>
                    <span>Ekstra Kasur</span>
                    <div>
                      <button onClick={() => setExtraBed(Math.max(0, extraBed - 1))}>-</button>
                      <span>{extraBed}</span>
                      <button onClick={() => setExtraBed(extraBed + 1)}>+</button>
                    </div>
                  </div>

                  <textarea placeholder="Tulis di sini..." className={styles.note}/>
                </div>
              </div>

              <div className={styles.bookingFooter}>
                <button onClick={() => setShowBooking(false)}>Tutup</button>
                <button className={styles.confirmBtn} onClick={() => setStep("payment")}>
                  Pesan
                </button>
              </div>
            </div>
          )}

          {/* ================= PAYMENT ================= */}
          {step === "payment" && (
            <div className={styles.paymentBox}>
              <div className={styles.bookingHeader}>
                <img src={hotel.image} />
                <div>
                  <h2>{hotel.name}</h2>
                  <p>📍 {hotel.location}</p>
                </div>
              </div>

              <div className={styles.paymentContent}>
                <div className={styles.left}>
                  <p>Tanggal Pemesanan</p>
                  <p>Check In</p>
                  <p>Check Out</p>
                  <p>Tipe Kamar</p>
                  <p>Jumlah Tamu</p>
                  <p>Ekstra Kasur</p>
                  <hr />
                  <p>Subtotal</p>
                  <p>Pajak & Biaya</p>
                </div>

                <div className={styles.right}>
                  <p>24 April, 2026 | 14:00</p>
                  <p>10 November, 2026</p>
                  <p>04 Desember, 2026</p>
                  <p>{room}</p>
                  <p>{guest} Orang</p>
                  <p>{extraBed} Kasur</p>
                  <hr />
                  <p>Rp2.325.000</p>
                  <p>Rp775.000</p>
                </div>

                <div className={styles.qr}>
                  <h3>Qris</h3>
                  <img src="/images/qr-placeholder.png" />
                </div>
              </div>

              <div className={styles.paymentFooter}>
                <h2>Total : Rp2.480.000</h2>

                <button onClick={() => setStep("success")}>
                  Selesai
                </button>
              </div>
            </div>
          )}

          {/* ================= SUCCESS ================= */}
          {step === "success" && (
            <div className={styles.successBox}>
              <img src="/images/Restify landscape.png" alt="Restify" />

              <h1>Terima kasih!</h1>

              <h2>Kamar hotel Anda berhasil dipesan.</h2>

              <p>
                Pesanan Anda telah tersimpan di menu riwayat pemesanan.
                <br />
                Silakan tunjukkan kode pembayaran saat check-in di hotel.
              </p>

              <button onClick={() => router.push("/home")}>Kembali ke Beranda</button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}