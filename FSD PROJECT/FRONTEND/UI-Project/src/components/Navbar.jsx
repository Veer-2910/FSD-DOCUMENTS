import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, isAdmin } from "../utils/auth.js";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setIsAdminUser(isAdmin());
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setIsAdminUser(false);
    navigate("/");
  };

  // If admin is logged in, show admin-only navbar
  if (isAdminUser) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link
            className="navbar-brand fw-bold text-primary-custom fs-3"
            to="/admin"
          >
            <i className="bi bi-car-front me-2"></i>
            DriveEase
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-outline-primary me-2"
                  to="/admin"
                >
                  <i className="bi bi-person-badge me-1"></i>
                  Admin Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  // Regular navbar for non-admin users
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary-custom fs-3" to="/">
          <i className="bi bi-car-front me-2"></i>
          DriveEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active text-primary-custom" : ""
                }`}
                to="/"
              >
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about"
                    ? "active text-primary-custom"
                    : ""
                }`}
                to="/about"
              >
                <i className="bi bi-info-circle me-1"></i>
                About
              </Link>
            </li>

            {isAuth && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/bookings"
                      ? "active text-primary-custom"
                      : ""
                  }`}
                  to="/bookings"
                >
                  <i className="bi bi-bookmark me-1"></i>
                  My Bookings
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact"
                    ? "active text-primary-custom"
                    : ""
                }`}
                to="/contact"
              >
                <i className="bi bi-envelope me-1"></i>
                Contact
              </Link>
            </li>

            {!isAuth ? (
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-primary-custom text-white ms-2"
                  to="/login"
                >
                  <i className="bi bi-person me-1"></i>
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-outline-danger ms-2"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
