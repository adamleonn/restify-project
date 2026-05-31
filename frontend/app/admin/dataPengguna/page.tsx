"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./DataPengguna.module.css";

export default function Page() {
  const router = useRouter();

  const [data, setData] = useState([
    { no: 1, nama: "Username", peran: "User" },
    { no: 2, nama: "Username", peran: "Resepsionis" },
    { no: 3, nama: "Username", peran: "Admin" },
    { no: 4, nama: "Username", peran: "Admin" },
  ]);

  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" alt="logo" />
      </div>

      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push("/admin")}>Kembali</button>

        <h2 className={styles.title}>Daftar Reservasi</h2>

        <button
          className={styles.addBtn}
          onClick={() => router.push("/admin/tambahPengguna")}
        >
          Tambah +
        </button>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>No.</span>
          <span>Nama</span>
          <span>Peran</span>
          <span>Aksi</span>
        </div>

        {data.map((item, index) => (
          <div key={index}>
            <div className={styles.tableRow}>
              <span>{item.no}</span>
              <span>{item.nama}</span>
              <span>{item.peran}</span>

              <span className={styles.actions}>
                <button 
                  className={`${styles.btn} ${styles.detail}`}
                  onClick={() => router.push("/admin/editPengguna")}
                >
                  <img src="/images/icon-search.png" alt="detail" />
                </button>

                <button
                  className={`${styles.btn} ${styles.delete}`}
                  onClick={() => setConfirmIndex(index)}
                >
                  <img src="/images/icon-delete.png" alt="delete" />
                </button>
              </span>
            </div>

            {confirmIndex === index && (
              <div className={styles.confirmBox}>
                <span>Hapus “{item.nama}”</span>

                <div className={styles.confirmActions}>
                  <button
                    className={styles.btnTidak}
                    onClick={() => setConfirmIndex(null)}
                  >
                    Tidak
                  </button>

                  <button
                    className={styles.btnYa}
                    onClick={() => {
                      const newData = data.filter((_, i) => i !== index);
                      setData(newData);
                      setConfirmIndex(null);
                    }}
                  >
                    Ya
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}