"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TambahPengguna.module.css";

export default function Page() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [hotel, setHotel] = useState("");

  const handleSubmit = () => {
    const data = {
      nama,
      email,
      password,
      role,
      hotel: role === "resepsionis" ? hotel : null,
    };

    console.log("DATA:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <img src="/images/Restify landscape.png" alt="logo" />
      </div>

      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push("/admin/daftarDataKamar")}>Kembali</button>
        <h2 className={styles.title}>Tambah Pengguna</h2>
      </div>

      <div className={styles.formBox}>
        {/* LEFT */}
        <div className={styles.formLeft}>
          <label>Nama</label>
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <label>Email</label>
          <input
            type="text"
            placeholder="Email@contoh.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Kata Sandi</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* RIGHT */}
        <div className={styles.formRight}>
          <div className={styles.fasilitasHeader}>
            <h3>Peran</h3>
          </div>

          <div className={styles.fasilitasGrid}>
            <div className={styles.fasilitasCol}>
              <div
                className={`${styles.fasilitasRow} ${
                  role === "user" ? styles.active : ""
                }`}
                onClick={() => setRole("user")}
              >
                <span>User</span>
                <div
                  className={`${styles.radioUi} ${
                    role === "user" ? styles.active : ""
                  }`}
                />
              </div>

              <div
                className={`${styles.fasilitasRow} ${
                  role === "resepsionis" ? styles.active : ""
                }`}
                onClick={() => setRole("resepsionis")}
              >
                <span>Resepsionis</span>
                <div
                  className={`${styles.radioUi} ${
                    role === "resepsionis" ? styles.active : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {role === "resepsionis" && (
            <div className={styles.tetapkanHotel}>
              <label>Tetapkan Hotel</label>

              <div className={styles.inputSearchWrapper}>
                <input
                  type="text"
                  placeholder="..."
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  className={styles.inputSearchHotel}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <button className={styles.btnTambah} onClick={handleSubmit}>
          Tambah
        </button>
      </div>
    </div>
  );
}