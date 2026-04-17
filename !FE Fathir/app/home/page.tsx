"use client";

import { useRouter } from "next/navigation";
import styles from "./Home.module.css";



const recommendedHotels = [
  {
    name: "Urbanview Hotel Grand Malabar",
    price: "Rp. 359.231",
    rating: 4.8,
    image: "/images/test photo.jpg",
    desc: "wassup",
  },

];

const nearbyHotels = [
  {
    name: "Aryaduta Bandung",
    price: "Rp. 742.268",
    distance: "500 m",
    image: "/images/placeholder.jpg",
  },
];

export default function Page() {
  const router = useRouter();
    const goToDetail = (hotel: any) => {
        router.push(
            `/detail?name=${encodeURIComponent(hotel.name)}&price=${encodeURIComponent(hotel.price)}&image=${encodeURIComponent(hotel.image)}`
        );
    };
  return (
    <div className={styles.home}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.location}>📍 Bandung ⌄</div>

        <div className={styles.logo}>
          <img src="/images/Restify landscape.png" alt="logo" />
        </div>

        <div className={styles.icons}>
          <div className={styles.icon}>AI</div>
          <div className={styles.icon}>🔔</div>
        </div>
      </div>

      {/* SEARCH */}
      <div className={styles.searchBar}>🔍 Cari Hotel</div>

      {/* REKOMENDASI */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Rekomendasi Hotel</h3>
          <span>Lihat semua</span>
        </div>

        <div className={styles.cardRow}>
          {recommendedHotels.map((hotel, i) => (
            <div
              className={styles.card}
              key={i}
                onClick={() => goToDetail(hotel)}
            >
              <img src={hotel.image} alt="" />
              <div className={styles.cardInfo}>
                <h4>{hotel.name}</h4>
                <p>📍 Bandung, Indonesia</p>
                <div className={styles.bottom}>
                  <span>{hotel.price} / Malam</span>
                  <span>⭐ {hotel.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TERDEKAT */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Hotel Terdekat</h3>
          <span>Lihat semua</span>
        </div>

        <div className={styles.grid}>
          {nearbyHotels.map((hotel, i) => (
            <div
              className={`${styles.card} ${styles.horizontal}`}
              key={i}
                onClick={() => goToDetail(hotel)}
            >
              <img src={hotel.image} alt="" />
              <div className={styles.cardInfo}>
                <h4>{hotel.name}</h4>
                <p>📍 {hotel.distance} dari lokasi</p>
                <span>{hotel.price} / Malam</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}