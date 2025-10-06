import React from "react";
import VehicleCard from "./VehicleCard.jsx";
import { getVehicles } from "../utils/localStorageUtils.js";

const VehicleList = ({ selectedCategory, onBookVehicle }) => {
  const vehicles = getVehicles();
  const filteredVehicles = selectedCategory
    ? vehicles.filter((vehicle) => vehicle.category === selectedCategory)
    : vehicles;

  if (!selectedCategory) {
    return null;
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="fw-bold text-primary-custom mb-3">
              <i className="bi bi-funnel me-2"></i>
              Available{" "}
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
              s
            </h3>
            <button
              className="btn btn-outline-secondary"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Categories
            </button>
          </div>
        </div>

        <div className="row g-4">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="col-lg-4 col-md-6">
                <VehicleCard vehicle={vehicle} onBook={onBookVehicle} />
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VehicleList;
