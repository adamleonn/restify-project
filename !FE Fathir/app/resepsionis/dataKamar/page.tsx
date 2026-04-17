"use client";

import { useState } from "react";
import styles from "./DataKamar.module.css";

export default function Page() {
  const [rooms, setRooms] = useState([
    { type: "Standard Room", available: 11 },
    { type: "Superior Room", available: 5 },
    { type: "Deluxe Room", available: 7 },
    { type: "Suite Room", available: 2 },
  ]);

  const handleIncrement = (index: number) => {
    const updated = [...rooms];
    updated[index].available += 1;
    setRooms(updated);
  };

  const handleDecrement = (index: number) => {
    const updated = [...rooms];
    if (updated[index].available > 0) {
      updated[index].available -= 1;
      setRooms(updated);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" alt="logo" />
      </div>

      <div className={styles.header}>
        <button className={styles.backBtn}>Kembali</button>
        <h2 className={styles.title}>“Nama Hotel”</h2>
      </div>

      <h3 className={styles.subtitle}>Data Kamar</h3>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Tipe Kamar</span>
          <span>Kamar Tersedia</span>
          <span>Perbarui Manual</span>
        </div>

        {rooms.map((room, index) => (
          <div className={styles.tableRow} key={index}>
            <span>{room.type}</span>
            <span>{room.available}</span>

            <span className={styles.actions}>
              <button
                className={`${styles.btn} ${styles.plus}`}
                onClick={() => handleIncrement(index)}
              >
                +
              </button>

              <button
                className={`${styles.btn} ${styles.minus}`}
                onClick={() => handleDecrement(index)}
              >
                −
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}