"use client";

import { useState } from "react";
import styles from "./DataKamarAdmin.module.css";

export default function Page() {
  const [status, setStatus] = useState("pending");

  return (
    <div className={styles.container}>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" alt="logo" />
      </div>

      {/* HEADER */}
      <div className={styles.header}>
        <button className={styles.backBtn}>Kembali</button>

        <h2 className={styles.title}>
          Reservasi “Username”
        </h2>
      </div>

      {/* TITLE */}
      <div className={styles.table}>
        Data Reservasi
      </div>

      {/* FORM BOX */}
      <div className={styles.formBox}>
        {/* LEFT */}
        <div className={styles.formLeft}>
          <label>Nama</label>
          <input type="text" placeholder="Nama" />

          <label>Tipe kamar</label>
          <input type="text" placeholder="Kamar" />

          <div className={styles.durasiBox}>
            <div>
              <label>Durasi Tinggal</label>

              <p>06 - Januari - 2026</p>

              <small>Sampai</small>

              <p>10 - Januari - 2026</p>
            </div>

            <div className={styles.divider}></div>

            <div>
              <label>Jumlah Tamu</label>
              <p>= 2</p>

              <label>Tempat Tidur Ekstra</label>
              <p>= 1</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.formRight}>
          <label>Catatan</label>
          <textarea placeholder="....."></textarea>

          <label>Kode Transaksi</label>
          <input type="password" placeholder="******" />
        </div>
      </div>

      {/* BUTTON AREA */}
      <div className={styles.buttonArea}>
        <button
          className={styles.confirm}
          disabled={status !== "pending"}
          onClick={() => setStatus("confirmed")}
        >
          Konfirmasi
        </button>

        <button
          className={styles.reject}
          disabled={status !== "pending"}
          onClick={() => setStatus("rejected")}
        >
          Tolak
        </button>

        <button
          className={styles.checkin}
          disabled={status !== "confirmed"}
          onClick={() => setStatus("checkin")}
        >
          Check In
        </button>

        <button
          className={styles.checkout}
          disabled={status !== "checkin"}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}