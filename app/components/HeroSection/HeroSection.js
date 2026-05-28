"use client";

import React from "react";
import "./HeroSection.css";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  
  return (
    <div className="hero">
      <div className="hero-content">
        
        <div className="logo-circle">
          <img src="/images/Logo.png" alt="Restify Logo" className="logo-img" />
        </div>

        {/* Teks diubah sesuai gambar */}
        <h2 className="title">Mari Kita Mulai!</h2>

        {/* Menggunakan container flex untuk dua tombol */}
        <div className="button-group">
          <button
            className="action-btn"
            onClick={() => router.push("/login")}
          >
            Masuk
          </button>
          
          <button
            className="action-btn"
            onClick={() => router.push("/register")}
          >
            Daftar
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;