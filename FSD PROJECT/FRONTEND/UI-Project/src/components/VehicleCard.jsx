import React from 'react';

const VehicleCard = ({ vehicle, onBook }) => {
  const isBooked = vehicle.status === 'booked';

  return (
    <div className="card card-custom h-100">
      <img 
        src={vehicle.image} 
        className="card-img-top" 
        alt={`${vehicle.brand} ${vehicle.model}`}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0">
            {vehicle.brand} {vehicle.model}
          </h5>
          <span className={`badge ${isBooked ? 'badge-booked' : 'badge-available'}`}>
            {isBooked ? 'Booked' : 'Available'}
          </span>
        </div>
        
        <div className="mb-3">
          <p className="text-muted mb-1">
            <i className="bi bi-geo-alt me-2"></i>
            {vehicle.location || 'Delhi, India'}
          </p>
          <p className="text-muted mb-1">
            <i className="bi bi-fuel-pump me-2"></i>
            {vehicle.fuel || 'Petrol'}
          </p>
          <p className="text-muted mb-0">
            <i className="bi bi-speedometer2 me-2"></i>
            {vehicle.transmission || 'Manual'}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="fs-4 fw-bold text-primary-custom">
                ₹{vehicle.rentPerDay}
              </span>
              <span className="text-muted">/day</span>
            </div>
          </div>
          
          <button 
            className={`btn w-100 ${isBooked ? 'btn-secondary' : 'btn-primary-custom'}`}
            onClick={() => onBook(vehicle)}
            disabled={isBooked}
          >
            {isBooked ? (
              <>
                <i className="bi bi-x-circle me-2"></i>
                Not Available
              </>
            ) : (
              <>
                <i className="bi bi-calendar-check me-2"></i>
                Book Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;