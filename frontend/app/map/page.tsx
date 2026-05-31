"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./MapPage.module.css";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const location = searchParams.get("location");
  const name = searchParams.get("name");

  return (
    <div className={styles.container}>

      {/* TOPBAR (LOGO ONLY) */}
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" alt="logo" />
      </div>

      {/* HEADER ROW */}
      <div className={styles.headerRow}>
        <div className={styles.left}>Alamat Hotel</div>

        <div className={styles.center}>{name}</div>

        <div className={styles.right}>
          <button onClick={() => router.back()}>
            Kembali
          </button>
        </div>
      </div>

      {/* MAP */}
      <div className={styles.mapWrapper}>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
}