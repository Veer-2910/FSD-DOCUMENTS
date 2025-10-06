import React from "react";
import "../css/about.css";
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="text-white fw-bold mb-3">About DriveEase</h1>
              <p className="text-white lead">
                Your trusted partner for vehicle rentals across India
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5 align-items-center mb-5">
          <div className="BgImage py-5">
            <div className="container text-center">
              <h2 className="fw-bold text-primary-custom mb-4 fs-1">
                Our Story
              </h2>

              <div
                className="mx-auto"
                style={{ maxWidth: "900px", textAlign: "justify" }}
              >
                <p className="text-muted mb-4 fs-5">
                  Founded in 2020, <strong>DriveEase</strong> emerged from a
                  simple vision: to make vehicle rental accessible, affordable,
                  and hassle-free for every Indian.
                </p>

                <p className="text-secondary mb-4 fs-5">
                  Starting with just 10 vehicles in Delhi, we've grown to become
                  India’s most trusted vehicle rental platform, serving over{" "}
                  <strong>50,000 customers</strong> across
                  <strong> 25+ cities</strong>. Our journey has been driven by
                  our commitment to quality, transparency, and customer
                  satisfaction.
                </p>

                <p className="text-secondary fs-5">
                  Today, we offer everything from bikes for quick city rides to
                  luxury SUVs for family vacations, ensuring that every journey
                  is comfortable, safe, and memorable.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="fw-bold text-primary-custom mt-5">
              Why Choose DriveEase?
            </h2>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-4 col-md-6">
            <div className="feature-card text-center">
              <div className="feature-icon mb-3">
                <i className="bi bi-shield-check fs-1 text-primary-custom"></i>
              </div>
              <h5 className="fw-bold mb-3">Verified Vehicles</h5>
              <p className="text-muted">
                All our vehicles undergo rigorous quality checks and regular
                maintenance to ensure your safety and comfort.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card text-center">
              <div className="feature-icon mb-3">
                <i className="bi bi-currency-rupee fs-1 text-primary-custom"></i>
              </div>
              <h5 className="fw-bold mb-3">Transparent Pricing</h5>
              <p className="text-muted">
                No hidden charges, no surprises. What you see is what you pay.
                Clear, upfront pricing for all our services.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card text-center">
              <div className="feature-icon mb-3">
                <i className="bi bi-headset fs-1 text-primary-custom"></i>
              </div>
              <h5 className="fw-bold mb-3">24/7 Support</h5>
              <p className="text-muted">
                Our dedicated customer support team is available round the clock
                to assist you with any queries or emergencies.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card text-center">
              <div className="feature-icon mb-3">
                <i className="bi bi-geo-alt fs-1 text-primary-custom"></i>
              </div>
              <h5 className="fw-bold mb-3">Pan-India Presence</h5>
              <p className="text-muted">
                With operations in 25+ cities, we're always close to you.
                Seamless rentals wherever your journey takes you.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card text-center">
              <div className="feature-icon mb-3">
                <i className="bi bi-clock fs-1 text-primary-custom"></i>
              </div>
              <h5 className="fw-bold mb-3">Instant Booking</h5>
              <p className="text-muted">
                Book your vehicle in just a few clicks. Quick, easy, and
                hassle-free booking process designed for your convenience.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card text-center">
              <div className="feature-icon mb-3">
                <i className="bi bi-award fs-1 text-primary-custom"></i>
              </div>
              <h5 className="fw-bold mb-3">Quality Assurance</h5>
              <p className="text-muted">
                We maintain the highest standards of vehicle quality and
                cleanliness to ensure your rental experience exceeds
                expectations.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="cta-section text-center bg-primary-custom text-white rounded p-5">
              <h2 className="fw-bold mb-3">Ready to Start Your Journey?</h2>
              <p className="lead mb-4">
                Join thousands of satisfied customers and experience the
                DriveEase difference today.
              </p>
              <a href="/" className="btn btn-primary-custom btn-lg">
                <i className="bi bi-car-front me-2"></i>
                Browse Vehicles
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
     
  );

};

export default About;
