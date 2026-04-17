import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        
        {/* Circle Logo */}
        <div className="logo-circle">
          <img src="/images/Logo.png" alt="Restify Logo" className="logo-img" />
        </div>

        {/* Subtitle */}
        <p className="subtitle">
          Temukan Tempat Menginap yang <br />
          Sempurna untuk Anda!
        </p>

        {/* Button */}
        <button className="start-btn">
          Mulai <span>→</span>
        </button>

      </div>
    </div>
  );
};

export default HeroSection;