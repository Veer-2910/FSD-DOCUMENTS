import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "bike",
    name: "Bikes",
    icon: "bi-bicycle",
    image:
      "https://images.unsplash.com/photo-1723494471214-565579a3840f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Perfect for city rides and short trips",
  },
  {
    id: "sedan",
    name: "Sedan",
    icon: "bi-car-front",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Comfortable for family ",
  },
  {
    id: "suv",
    name: "SUV",
    icon: "bi-car-front",
    image:
      "https://images.unsplash.com/flagged/photo-1557225586-c21e48488706?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Spacious vehicles for group travel",
  },
  {
    id: "hatchback",
    name: "Hatchback",
    icon: "bi-car-front-fill",
    image:
      "https://www.wsupercars.com/wallpapers-regular/Volkswagen/2015-Volkswagen-Polo-GTI-004-1080.jpg",
    description: "Compact and fuel-efficient cars",
  },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    navigate(`/vehicles/${categoryId}`);
  };

  return (
    <section className="py-4 categories" id="categories">
      <div className="container-fluid px-0">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="Choose display-5 fw-bold mb-3  mt-5">
              Choose Your Ride
            </h2>
            <p className="lead text-muted fw-semibold">
              Select from our diverse fleet of well-maintained vehicles
            </p>
          </div>
        </div>

        <div className="category-scroll-container">
          {categories.map((category) => (
            <div key={category.id} className="category-card-wrapper">
              <div
                className="card card-custom h-100 category-card"
                onClick={() => handleCategorySelect(category.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.name}
                />
                <div className="card-body text-center">
                  <i
                    className={`${category.icon} fs-1 text-primary-custom mb-3`}
                  ></i>
                  <h5 className="card-title fw-bold">{category.name}</h5>
                  <p className="card-text text-muted">{category.description}</p>
                  <button className="View-Button btn btn-custom">
                  
                      View {category.name}
        
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
