import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VehicleCard from "../components/VehicleCard.jsx";
import BookingForm from "../components/BookingForm.jsx";
import { getVehicles } from "../utils/localStorageUtils.js";
import "../css/vehicle.css";

const categoryNames = {
  bike: "Bikes",
  sedan: "Sedans",
  suv: "SUVs",
  hatchback: "Hatchbacks",
};

const Vehicles = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const allVehicles = getVehicles();
    const filteredVehicles = allVehicles.filter(
      (vehicle) => vehicle.category === category
    );
    setVehicles(filteredVehicles);
  }, [category]);

  const handleBookVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedVehicle(null);
  };

  const handleBookingComplete = () => {
    // Refresh the vehicles list
    const allVehicles = getVehicles();
    const filteredVehicles = allVehicles.filter(
      (vehicle) => vehicle.category === category
    );
    setVehicles(filteredVehicles);
  };

  return (
    <div className="vehicles-page" id="vehicle">
      <div className="vehicles-hero">
        <div className="vehicles-overlay">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="text-white fw-bold mb-3">
                  {categoryNames[category] || "Vehicles"}
                </h1>
                <p className="text-white lead">
                  Choose from our premium collection of{" "}
                  {categoryNames[category]?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold text-primary-custom mb-0">
                <i className="bi bi-funnel me-2"></i>
                Available {categoryNames[category]}
              </h3>
              <button
                className="category btn btn-outline "
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Categories
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} className="col-lg-4 col-md-6">
                <VehicleCard vehicle={vehicle} onBook={handleBookVehicle} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="bi bi-exclamation-circle fs-1 text-muted mb-3"></i>
              <h4 className="text-muted">
                No vehicles available in this category
              </h4>
              <p className="text-muted">
                Please check back later or contact us for more options.
              </p>
              <button
                className="btn btn-primary-custom"
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Browse Other Categories
              </button>
            </div>
          )}
        </div>
      </div>

      {showBookingForm && selectedVehicle && (
        <BookingForm
          vehicle={selectedVehicle}
          onClose={handleCloseBookingForm}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default Vehicles;
