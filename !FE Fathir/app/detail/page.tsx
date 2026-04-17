"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import styles from "./HotelDetail.module.css";

export default function Page() {

  const params = useParams();
  const { id } = params;

  const hotels = [
    {
      id: "1",
      name: "Urbanview Hotel Grand Malabar",
      price: "Rp. 359.231",
      rating: 4.8,
      image: "/images/test photo.jpg",
      location: "Bandung, Indonesia",
      desc: "Hotel nyaman banget",
      images: ["/images/test photo.jpg","/images/test photo.jpg"]
    },
    {
      id: "2",
      name: "Ivory Hotel Bandung",
      price: "Rp. 359.000",
      rating: 4.7,
      image: "/images/placeholder.jpg",
      location: "Bandung, Indonesia",
      desc: "Lokasi strategis",
      images: ["/images/placeholder.jpg"]
    }
  ];

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    return <h2>Hotel tidak ditemukan</h2>;
  }

  const [tab, setTab] = useState("tentang");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const reviewDummy = [
    { id: 1, name: "Ahmad", text: "Bagus!", verified: true, hasPhoto: true },
    { id: 2, name: "Siti", text: "Nyaman", verified: true, hasPhoto: false },
  ];

  const filteredReviews = reviewDummy.filter((r) => {
    if (filter === "verified") return r.verified;
    if (filter === "photo") return r.hasPhoto;
    return true;
  });

  return (
    <div className={styles.container}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" alt="logo" />
      </div>

      {/* HEADER */}
      <div className={styles.header}>
        <img src={hotel.image} className={styles.banner} />

        <div className={styles.info}>
          <span className={styles.discount}>Diskon 20%</span>
          <div className={styles.rating}>⭐ {hotel.rating}</div>

          <h2>{hotel.name}</h2>

          <div className={styles.mapRow}>
            <p>📍 {hotel.location}</p>

            <iframe
              src={`https://www.google.com/maps?q=${hotel.location}&output=embed`}
            />
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <span onClick={() => setTab("tentang")} className={tab === "tentang" ? styles.active : ""}>Tentang</span>
        <span onClick={() => setTab("foto")} className={tab === "foto" ? styles.active : ""}>Foto</span>
        <span onClick={() => setTab("ulasan")} className={tab === "ulasan" ? styles.active : ""}>Ulasan</span>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>

        {tab === "tentang" && (
          <>
            <h3>Deskripsi</h3>
            <p>{hotel.desc}</p>
          </>
        )}

        {tab === "foto" && (
          <div className={styles.photoGrid}>
            {hotel.images.map((img, i) => (
              <img key={i} src={img} />
            ))}
          </div>
        )}

        {tab === "ulasan" && (
          <>
            <div className={styles.reviewTop}>
              
              <div>
                <button onClick={() => setFilter("verified")}>Terverifikasi</button>
                <button onClick={() => setFilter("photo")}>Foto</button>
              </div>

              <input placeholder="Cari..." />

              <button onClick={() => setShowModal(true)}>Tulis</button>

            </div>

            <div className={styles.reviewList}>
              {filteredReviews.map((r) => (
                <div key={r.id} className={styles.card}>
                  <strong>{r.name}</strong>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <div>Harga: {hotel.price}</div>
        <button>Pesan</button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            <textarea placeholder="Tulis ulasan..." />
            <button onClick={() => setShowModal(false)}>Kirim</button>
          </div>
        </div>
      )}

    </div>
  );
}