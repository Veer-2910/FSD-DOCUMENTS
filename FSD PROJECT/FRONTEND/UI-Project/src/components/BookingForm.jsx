import React, { useState } from "react";
import { validateBookingForm } from "../utils/validation.js";
import { saveBooking } from "../utils/localStorageUtils.js";
import { showToast } from "./Toast.jsx";
import { isAuthenticated } from "../utils/auth.js";

const BookingForm = ({ vehicle, onClose, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    License: "",
    pickupDate: "",
    dropoffDate: "",
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

    if (!isAuthenticated()) {
      showToast("Please login to book a vehicle", "error");
      return;
    }

    const validationErrors = validateBookingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = {
        id: Date.now().toString(),
        vehicleId: vehicle.id,
        vehicleBrand: vehicle.brand,
        vehicleModel: vehicle.model,
        vehicleImage: vehicle.image,
        ...formData,
        totalAmount: calculateTotalAmount(),
        status: "active",
        bookingDate: new Date().toISOString(),
      };

      saveBooking(booking);
      showToast("Vehicle booked successfully!", "success");
      onBookingComplete();
      onClose();
    } catch (error) {
      showToast("Failed to book vehicle. Please try again.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalAmount = () => {
    const pickup = new Date(formData.pickupDate);
    const dropoff = new Date(formData.dropoffDate);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
    return days * vehicle.rentPerDay;
  };

  const getTotalDays = () => {
    if (formData.pickupDate && formData.dropoffDate) {
      const pickup = new Date(formData.pickupDate);
      const dropoff = new Date(formData.dropoffDate);
      const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-calendar-check me-2"></i>
              Book {vehicle.brand} {vehicle.model}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row mb-4">
              <div className="col-md-4">
                <img
                  src={vehicle.image}
                  className="img-fluid rounded border-radius-custom"
                  alt={`${vehicle.brand} ${vehicle.model}`}
                />
              </div>
              <div className="col-md-8">
                <h6 className="fw-bold">
                  {vehicle.brand} {vehicle.model}
                </h6>
                <p className="text-muted mb-1">
                  <i className="bi bi-currency-rupee"></i>
                  {vehicle.rentPerDay}/day
                </p>
                <p className="text-muted mb-1">
                  <i className="bi bi-geo-alt me-1"></i>
                  {vehicle.location || "Delhi, India"}
                </p>
                <p className="text-muted">
                  <i className="bi bi-fuel-pump me-1"></i>
                  {vehicle.fuel || "Petrol"} •{" "}
                  {vehicle.transmission || "Manual"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-person-fill me-2"></i>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-phone-fill me-2"></i>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.mobile ? "is-invalid" : ""
                    }`}
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    maxLength={10}
                    minLength={10}
                  />
                  {errors.mobile && (
                    <div className="invalid-feedback">{errors.mobile}</div>
                  )}
                </div>
                <div>
                  <label className="form-label fw-semibold">
                    <i className="bi bi-caret-right-fill me-2"></i>License Number *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.License ? "is-invalid" : ""
                    }`}
                    name="License"
                    value={formData.License}
                    onChange={handleChange}
                    placeholder="e.g., GJ0120231234567"
                    maxLength={16}
                    minLength={15}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-calendar-event-fill me-2"></i>
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.pickupDate ? "is-invalid" : ""
                    }`}
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    min={today}
                  />
                  {errors.pickupDate && (
                    <div className="invalid-feedback">{errors.pickupDate}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-calendar-x-fill me-2"></i>
                    Drop-off Date *
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.dropoffDate ? "is-invalid" : ""
                    }`}
                    name="dropoffDate"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    min={formData.pickupDate || today}
                  />
                  {errors.dropoffDate && (
                    <div className="invalid-feedback">{errors.dropoffDate}</div>
                  )}
                </div>
              </div>

              {getTotalDays() > 0 && (
                <div className="alert alert-info mt-4">
                  <div className="d-flex justify-content-between">
                    <span>
                      <strong>Total Days:</strong> {getTotalDays()}
                    </span>
                    <span>
                      <strong>Total Amount:</strong> ₹{calculateTotalAmount()}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary-custom"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Booking...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
