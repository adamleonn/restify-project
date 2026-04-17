import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        
        <div className="logo-circle">
          <img src="/images/Logo.png" alt="Restify Logo" className="logo-img" />
        </div>

        <p className="subtitle">
          Temukan Tempat Menginap yang <br />
          Sempurna untuk Anda!
        </p>

        <button className="start-btn">
          Mulai <span>→</span>
        </button>

      </div>
    </div>
  );
};

export default HeroSection;