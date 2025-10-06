import React from 'react';

const BookingCard = ({ booking, onCancel }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: 'badge-active',
      cancelled: 'badge-booked',
      completed: 'badge-available'
    };
    return statusMap[status] || 'badge-active';
  };

  return (
    <div className="card card-custom h-100 ">
      <div className="row g-0">
        <div className="col-md-4">
          <img 
            src={booking.vehicleImage} 
            className="img-fluid rounded-start h-100 object-fit-cover" 
            alt={`${booking.vehicleBrand} ${booking.vehicleModel}`}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title fw-bold mb-0">
                {booking.vehicleBrand} {booking.vehicleModel}
              </h5>
              <span className={`badge ${getStatusBadge(booking.status)}`}>
                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-muted mb-1">
                <i className="bi bi-person me-2"></i>
                {booking.fullName}
              </p>
              <p className="text-muted mb-1">
                <i className="bi bi-phone me-2"></i>
                {booking.mobile}
              </p>
              <p className="text-muted mb-1">
                <i className="bi bi-calendar-event me-2"></i>
                {formatDate(booking.pickupDate)} - {formatDate(booking.dropoffDate)}
              </p>
              <p className="text-muted mb-0">
                <i className="bi bi-calendar-plus me-2"></i>
                Booked on: {formatDate(booking.bookingDate)}
              </p>
            </div>
            
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-5 fw-bold text-primary-custom">
                  ₹{booking.totalAmount}
                </span>
              </div>
              
              {booking.status === 'active' && onCancel && (
                <button 
                  className="btn btn-outline-danger w-100"
                  onClick={() => onCancel(booking.id)}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;