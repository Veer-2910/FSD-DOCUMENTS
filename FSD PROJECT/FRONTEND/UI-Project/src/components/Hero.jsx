import React from "react";
import "../css/home.css";

const Hero = ({ onScrollToCategories }) => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <h1 className="hero-title text-primary-emphasis mb-5">
                Drive the Freedom — Rent with Ease
              </h1>
              <p className="hero-subtitle">
                Discover India's most trusted vehicle rental platform. From
                bikes to SUVs, find the perfect ride for your journey across
                incredible India.
              </p>
              <div className="Button-row justify-content-center-mb-5">
                <button
                  className="Explore btn custom-btn"
                  onClick={onScrollToCategories}
                >
                  <i className="bi bi-arrow-down-circle me-2"></i>
                  <span>Explore Vehicles</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
