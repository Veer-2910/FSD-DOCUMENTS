import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/auth.js';
import { getUserBookings, updateBookingStatus } from '../utils/localStorageUtils.js';
import { showToast } from '../components/Toast.jsx';
import { useNavigate } from 'react-router-dom';
import '../css/booking.css';
import Footer from '../components/Footer';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const userBookings = getUserBookings(user.id || user.email);
    setBookings(userBookings);
    setLoading(false);
  }, [navigate]);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus(bookingId, 'cancelled');
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      showToast('Booking cancelled successfully', 'success');
    }
  };

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

  if (loading) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border text-primary-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="container mt-4 pt-4">
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-primary-custom fw-bold">
                <i className="bi bi-bookmark-check me-2"></i>
                My Bookings
              </h2>
              <button 
                className="btn btn-primary-custom"
                onClick={() => navigate('/')}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Book New Vehicle
              </button>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-bookmark-x fs-1 text-muted mb-3"></i>
                <h4 className="text-muted">No bookings found</h4>
                <p className="text-muted mb-4">You haven't made any bookings yet.</p>
                <button 
                  className="btn btn-primary-custom"
                  onClick={() => navigate('/')}
                >
                  <i className="bi bi-car-front me-2"></i>
                  Browse Vehicles
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="col-lg-6 col-md-6">
                    <div className="card card-custom h-100">
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
                              
                              {booking.status === 'active' && (
                                <button 
                                  className="btn btn-outline-danger w-100"
                                  onClick={() => handleCancelBooking(booking.id)}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookings;