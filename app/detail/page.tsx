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

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [filters, setFilters] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const [showFilter, setShowFilter] = useState(false);

  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviewDummy = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      time: "2 hari lalu",
      text: "Hotel nyaman banget",
      verified: true,
      hasPhoto: false,
    },
    {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
        {
      id: 2,
      name: "Budi",
      time: "1 hari lalu",
      text: "Mantap banget!",
      verified: false,
      hasPhoto: true,
    },
  ];

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredReviews = reviewDummy.filter((r) => {
  if (filters.includes("verified") && !r.verified) return false;
  if (filters.includes("photo") && !r.hasPhoto) return false;

  if (search && !r.text.toLowerCase().includes(search.toLowerCase()))
    return false;

  return true;
  });

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

          <div className={styles.filterBar}>

            {/* LEFT */}
            <div className={styles.filterLeft}>

              {/* tombol utama */}
              <button
                className={styles.filterMainBtn}
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter
              </button>

              {/* 🔥 FILTER MUNCUL KE SAMPING */}
              {showFilter && (
                <div className={styles.filterExpand}>
                  <button
                    className={filters.includes("verified") ? styles.activeFilter : ""}
                    onClick={() => toggleFilter("verified")}
                  >
                    Terverifikasi
                  </button>

                  <button
                    className={filters.includes("latest") ? styles.activeFilter : ""}
                    onClick={() => toggleFilter("latest")}
                  >
                    Terbaru
                  </button>

                  <button
                    className={filters.includes("photo") ? styles.activeFilter : ""}
                    onClick={() => toggleFilter("photo")}
                  >
                    Dengan Foto
                  </button>
                </div>
              )}
            </div>

            {/* CENTER */}
            <div className={styles.searchWrapper}>
              <input
                placeholder="Cari di ulasan"
                className={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* RIGHT */}
            <div 
              className={styles.writeReview}
              onClick={() => setShowReview(true)}
            >
              ✏️ Tulis Ulasan
            </div>

          </div>

            {/* 🔥 LIST */}
            <div className={styles["review-list"]}>
              {filteredReviews.map((r) => (
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
                  <span className={styles.dateLabel}>Check in</span>

                  <div className={styles.dateCard}>
                    <div>
                      <div className={styles.day}>
                        {checkIn
                          ? new Date(checkIn).toLocaleDateString("id-ID", { weekday: "long" })
                          : "Pilih"}
                      </div>

                      <div className={styles.fullDate}>
                        {checkIn
                          ? new Date(checkIn).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "tanggal"}
                      </div>
                    </div>

                    {/* ICON + INPUT */}
                    <div className={styles.iconWrapper}>
                      <img src="/images/date-icon.png" className={styles.icon} />

                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className={styles.hiddenDate}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.dateGroup}>
                  <span className={styles.dateLabel}>Check out</span>

                  <div className={styles.dateCard}>
                    <div>
                      <div className={styles.day}>
                        {checkOut
                          ? new Date(checkOut).toLocaleDateString("id-ID", { weekday: "long" })
                          : "Pilih"}
                      </div>

                      <div className={styles.fullDate}>
                        {checkOut
                          ? new Date(checkOut).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "tanggal"}
                      </div>
                    </div>

                    <div className={styles.iconWrapper}>
                      <img src="/images/date-icon.png" className={styles.icon} />

                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={styles.hiddenDate}
                      />
                    </div>
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
                  <p>{checkIn || "-"}</p>
                  <p>{checkOut || "-"}</p>
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

            {/* ================= REVIEW POPUP ================= */}
      {showReview && (
        <div className={styles.overlay}>
          <div className={styles.reviewPopup}>

            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>

            {/* ⭐ RATING */}
            <div className={styles.starRow}>
              {[1,2,3,4,5].map((i) => (
                <span
                  key={i}
                  onClick={() => setRating(i)}
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: i <= rating ? "#f5b301" : "#ccc"
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* TEXT */}
            <textarea
              placeholder="Tulis di sini..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className={styles.reviewInput}
            />

            <button
              className={styles.submitReview}
              onClick={() => {
                setShowReview(false);
                setRating(0);
                setReviewText("");
              }}
            >
              Kirim
            </button>

          </div>
        </div>
      )}
      
    </div>
  );
}
