import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <h4 className="fw-bold">
                <i className=" Logo bi bi-car-front me-2"></i>
              <span className='Logo'>DriveEase</span>
              </h4>
              <p className="text-light">
                India's most trusted vehicle rental platform. From bikes to SUVs, 
                find the perfect ride for your journey across incredible India.
              </p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#categories">Vehicle</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Vehicle Types</h5>
            <ul className="footer-links">
              <li><Link to="/vehicles/bike">Bikes</Link></li>
              <li><Link to="/vehicles/sedan">Sedans</Link></li>
              <li><Link to="/vehicles/suv">SUVs</Link></li>
              <li><Link to="/vehicles/hatchback">Hatchbacks</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Support</h5>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
          
          <div className=" col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3">Contact Info</h5>
            <div className=" contact-info">
              <p className="mb-2">
                <i className="LOGOS bi bi-geo-alt me-2"></i>
                Delhi, India
              </p>
              <p className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +91 12345 67890
              </p>
              <p className="mb-0">
                <i className="bi bi-envelope me-2"></i>
                info@driveease.com
              </p>
            </div>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-light">
              © 2025 DriveEase. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 text-light">
              Made with <i className="bi bi-heart-fill text-danger"></i> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;