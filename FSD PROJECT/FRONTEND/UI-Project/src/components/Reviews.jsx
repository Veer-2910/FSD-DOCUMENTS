import React from 'react';
import '../css/reviews.css';

const reviews = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Excellent service! Booked a sedan for my family trip to Agra. The car was clean, well-maintained, and the booking process was seamless.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    vehicle: 'Honda City'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Amazing experience with DriveEase! Rented a bike for exploring Goa. Great rates and fantastic customer support.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    vehicle: 'Royal Enfield Classic'
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Bangalore',
    rating: 4,
    comment: 'Very reliable service. Used their SUV for a weekend trip with friends. Smooth booking and pickup process.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    vehicle: 'Mahindra Scorpio'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Best rental service in India! Professional staff, clean vehicles, and transparent pricing. Highly recommended!',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    vehicle: 'Maruti Swift'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    comment: 'Outstanding experience! Rented a pickup truck for moving. The vehicle was in perfect condition and very affordable.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    vehicle: 'Mahindra Bolero Pickup'
  },
  {
    id: 6,
    name: 'Kavya Nair',
    location: 'Chennai',
    rating: 4,
    comment: 'Great service and competitive prices. The hatchback I rented was fuel-efficient and perfect for city driving.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    vehicle: 'Hyundai i20'
  }
];

const Reviews = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index}
        className={`bi bi-star${index < rating ? '-fill' : ''} text-warning`}
      ></i>
    ));
  };

  return (
    <section className="reviews-section py-5 " >
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold text-primary-custom mb-2">
              What Our Customers Say
            </h2>
            <p className="lead text-muted">
              Join thousands of satisfied customers across India
            </p>
          </div>
        </div>
        
        <div className="row g-5">
          {reviews.map(review => (
            <div key={review.id} className="col-lg-4 col-md-6">
              <div className="card review-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="review-avatar me-3"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{review.name}</h6>
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {review.location}
                      </small>
                    </div>
                  </div>
                  
                  <div className="rating mb-3">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="review-text mb-3">"{review.comment}"</p>
                  
                  <div className="review-vehicle">
                    <small className="text-primary-custom fw-semibold">
                      <i className="bi bi-car-front me-1"></i>
                      Rented: {review.vehicle}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="stats-container">
              <div className="row g-4">
                <div className="col-md-3 col-6">
                  <div className="stat-item">
                    <h3 className="stat-number text-primary-custom">50,000+</h3>
                    <p className="stat-label">Happy Customers</p>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="stat-item">
                    <h3 className="stat-number text-primary-custom">1,000+</h3>
                    <p className="stat-label">Vehicles</p>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="stat-item">
                    <h3 className="stat-number text-primary-custom">25+</h3>
                    <p className="stat-label">Cities</p>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="stat-item">
                    <h3 className="stat-number text-primary-custom">4.8/5</h3>
                    <p className="stat-label">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;