import React, { useState } from "react";
import { validateContactForm } from "../utils/validation.js";
import { showToast } from "../components/Toast.jsx";
import "../css/contact.css";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      showToast(
        "Message sent successfully! We will get back to you soon.",
        "success"
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-overlay">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="text-white fw-bold">Get in Touch</h1>
                <p className="text-white lead ">
                  We're here to help you with all your vehicle rental needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="card card-custom">
              <div className="card-body p-5">
                <h3 className="fw-bold text-primary-custom mb-4">
                  <i className="bi bi-envelope me-1"></i>
                  Send us a Message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-person me-2"></i>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-envelope me-2"></i>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-chat-dots me-2"></i>
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-pencil me-2"></i>
                        Message *
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        }`}
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary-custom btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="row g-3">
              <div className="col-12">
                <div className="card card-custom h-100">
                  <div className="card-body text-center p-2">
                    <i className="bi bi-geo-alt fs-1 text-primary-custom mb-3"></i>
                    <h5 className="fw-bold-primary">Visit Our Office</h5>
                    <p className="text-muted mb-0-primary">
                      123 Business District
                      <br />
                      Connaught Place
                      <br />
                      New Delhi, 110001
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card card-custom h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-telephone fs-1 text-primary-custom mb-3"></i>
                    <h5 className="fw-bold-primary">Call Us</h5>
                    <p className="text-muted mb-0">
                      <a
                        href="tel:+911234567890"
                        className="text-decoration-none"
                      >
                        +91 12345 67890
                      </a>
                      <br />
                      <small>Mon - Sat: 9 AM - 8 PM</small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card card-custom h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-envelope fs-1 text-primary-custom mb-3"></i>
                    <h5 className="fw-bold">Email Us</h5>
                    <p className="text-muted mb-0">
                      <a
                        href="mailto:info@driveease.com"
                        className="text-decoration-none"
                      >
                        info@driveease.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
