import React, { useState, useEffect } from "react";
import { isAdmin } from "../utils/auth.js";
import {
  getVehicles,
  saveVehicle,
  deleteVehicle,
  getStats,
  getBookings,
  updateBookingStatus,
  // deleteBooking,
  updateVehicleStatus,
} from "../utils/localStorageUtils.js";
import { showToast } from "../components/Toast.jsx";
import { useNavigate } from "react-router-dom";
import "../css/admin.css";

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "sedan",
    rentPerDay: "",
    image: "",
    location: "",
    fuel: "Petrol",
    transmission: "Manual",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setVehicles(getVehicles());
    setBookings(getBookings());
    setStats(getStats());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const vehicle = {
      id: editingVehicle ? editingVehicle.id : Date.now().toString(),
      ...formData,
      rentPerDay: parseInt(formData.rentPerDay),
      status: editingVehicle ? editingVehicle.status : "available",
    };

    saveVehicle(vehicle);
    showToast(
      editingVehicle
        ? "Vehicle updated successfully!"
        : "Vehicle added successfully!",
      "success"
    );

    resetForm();
    loadData();
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      brand: vehicle.brand,
      model: vehicle.model,
      category: vehicle.category,
      rentPerDay: vehicle.rentPerDay.toString(),
      image: vehicle.image,
      location: vehicle.location,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
    });
    setShowAddForm(true);
  };

  const handleDelete = (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle(vehicleId);
      showToast("Vehicle deleted successfully!", "success");
      loadData();
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking) {
        updateBookingStatus(bookingId, "cancelled");
        updateVehicleStatus(booking.vehicleId, "available");
        showToast("Booking cancelled successfully!", "success");
        loadData();
      }
    }
  };

  const handleCompleteBooking = (bookingId) => {
    if (window.confirm("Mark this booking as completed?")) {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking) {
        updateBookingStatus(bookingId, "completed");
        updateVehicleStatus(booking.vehicleId, "available");
        showToast("Booking marked as completed!", "success");
        loadData();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      model: "",
      category: "sedan",
      rentPerDay: "",
      image: "",
      location: "",
      fuel: "Petrol",
      transmission: "Manual",
    });
    setEditingVehicle(null);
    setShowAddForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: "bg-primary",
      cancelled: "bg-danger",
      completed: "bg-success",
    };
    return statusMap[status] || "bg-primary";
  };

  return (
    <div className="admin-page">
      <div className="container mt-5 pt-4">
        {/* Welcome Message */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-primary border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-badge fs-3 me-3"></i>
                <div>
                  <h5 className="alert-heading mb-1">
                    Welcome to Admin Dashboard!
                  </h5>
                  <p className="mb-0">
                    Manage your vehicle rental business efficiently from this
                    central hub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Header */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-primary-custom fw-bold mb-4">
              <i className="bi bi-gear me-2"></i>
              Admin Dashboard
            </h2>

            {/* Tab Navigation */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "dashboard" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "vehicles" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("vehicles")}
                >
                  <i className="bi bi-car-front me-2"></i>
                  Manage Vehicles
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "bookings" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("bookings")}
                >
                  <i className="bi bi-bookmark-check me-2"></i>
                  Manage Bookings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="row g-4 mb-5">
            <div className="col-lg-3 col-md-6">
              <div className="card admin-stats-card text-center">
                <div className="card-body">
                  <i className="bi bi-bookmark-check stats-icon text-primary-custom"></i>
                  <h3 className="text-primary-custom">
                    {stats.totalBookings || 0}
                  </h3>
                  <h5 className="card-title">Total Bookings</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card admin-stats-card text-center">
                <div className="card-body">
                  <i className="bi bi-car-front stats-icon text-success"></i>
                  <h3 className="text-success">
                    {stats.availableVehicles || 0}
                  </h3>
                  <h5 className="card-title">Available Vehicles</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card admin-stats-card text-center">
                <div className="card-body">
                  <i className="bi bi-clock stats-icon text-warning"></i>
                  <h3 className="text-warning">{stats.activeBookings || 0}</h3>
                  <h5 className="card-title">Active Bookings</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card admin-stats-card text-center">
                <div className="card-body">
                  <i className="bi bi-currency-rupee stats-icon text-orange-custom"></i>
                  <h3 className="text-orange-custom">
                    ₹{stats.totalRevenue || 0}
                  </h3>
                  <h5 className="card-title">Total Revenue</h5>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Management Tab */}
        {activeTab === "vehicles" && (
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-primary-custom">Vehicle Management</h4>
                <button
                  className="btn btn-primary-custom"
                  onClick={() => setShowAddForm(true)}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Vehicle
                </button>
              </div>

              <div className="table-container">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Vehicle</th>
                        <th>Category</th>
                        <th>Rent/Day</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                          <td>
                            <img
                              src={vehicle.image}
                              alt={vehicle.model}
                              className="vehicle-image"
                            />
                          </td>
                          <td>
                            <strong>
                              {vehicle.brand} {vehicle.model}
                            </strong>
                            <br />
                            <small className="text-muted">
                              {vehicle.fuel} • {vehicle.transmission}
                            </small>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {vehicle.category?.charAt(0).toUpperCase() +
                                vehicle.category?.slice(1)}
                            </span>
                          </td>
                          <td>₹{vehicle.rentPerDay}</td>
                          <td>{vehicle.location}</td>
                          <td>
                            <span
                              className={`badge ${
                                vehicle.status === "available"
                                  ? "badge-available"
                                  : "badge-booked"
                              }`}
                            >
                              {vehicle.status?.charAt(0).toUpperCase() +
                                vehicle.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(vehicle)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(vehicle.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Management Tab */}
        {activeTab === "bookings" && (
          <div className="row">
            <div className="col-12">
              <h4 className="text-primary-custom mb-4">Booking Management</h4>

              <div className="table-container">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Dates</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <small className="text-muted">
                              #{booking.id.slice(-6)}
                            </small>
                          </td>
                          <td>
                            <strong>{booking.fullName}</strong>
                            <br />
                            <small className="text-muted">
                              {booking.mobile}
                            </small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={booking.vehicleImage}
                                alt={booking.vehicleModel}
                                className="vehicle-image me-2"
                              />
                              <div>
                                <strong>
                                  {booking.vehicleBrand} {booking.vehicleModel}
                                </strong>
                              </div>
                            </div>
                          </td>
                          <td>
                            <small>
                              {formatDate(booking.pickupDate)} -{" "}
                              {formatDate(booking.dropoffDate)}
                              <br />
                              <span className="text-muted">
                                Booked: {formatDate(booking.bookingDate)}
                              </span>
                            </small>
                          </td>
                          <td>
                            <strong className="text-primary-custom">
                              ₹{booking.totalAmount}
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`badge ${getStatusBadge(
                                booking.status
                              )}`}
                            >
                              {booking.status?.charAt(0).toUpperCase() +
                                booking.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              {booking.status === "active" && (
                                <>
                                  <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() =>
                                      handleCompleteBooking(booking.id)
                                    }
                                    title="Mark as Completed"
                                  >
                                    <i className="bi bi-check-circle"></i>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() =>
                                      handleCancelBooking(booking.id)
                                    }
                                    title="Cancel Booking"
                                  >
                                    <i className="bi bi-x-circle"></i>
                                  </button>
                                </>
                              )}
                              {booking.status !== "active" && (
                                <span className="text-muted">No actions</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {bookings.length === 0 && (
                    <div className="text-center py-5">
                      <i className="bi bi-bookmark-x fs-1 text-muted mb-3"></i>
                      <h5 className="text-muted">No bookings found</h5>
                      <p className="text-muted">
                        Bookings will appear here once customers start booking
                        vehicles.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Vehicle Modal */}
      {showAddForm && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Model</label>
                      <input
                        type="text"
                        className="form-control"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="bike">Bike</option>
                        <option value="pickup">Pickup</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Rent per Day (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rentPerDay"
                        value={formData.rentPerDay}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Fuel Type</label>
                      <select
                        className="form-select"
                        name="fuel"
                        value={formData.fuel}
                        onChange={handleChange}
                        required
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Transmission</label>
                      <select
                        className="form-select"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                      >
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom">
                    {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
