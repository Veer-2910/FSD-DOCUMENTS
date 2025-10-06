import React, { useState, useEffect } from "react";
import axios from "axios";
import { isAuthenticated } from "../utils/auth.js";
import { validateLoginForm, validateSignupForm } from "../utils/validation.js";
import { showToast } from "../components/Toast.jsx";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = isLogin
      ? validateLoginForm(formData)
      : validateSignupForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (isLogin) {
        // 🔐 LOGIN REQUEST
        const res = await axios.post("http://localhost:5000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        showToast("Login successful!", "success");
        navigate(res.data.user.role === "admin" ? "/admin" : "/");
      } else {
        // 🔐 SIGNUP REQUEST
        await axios.post("http://localhost:5000/api/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        showToast("Account created successfully! Please login.", "success");
        setIsLogin(true);
        setFormData({
          name: "",
          email: formData.email,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      showToast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <div className="container-fluid mt-5">
        <div className="row h-100">
          <div className="auth-overlay"></div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="auth-form-container">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary-custom">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h3>
                <p className="text-muted">
                  {isLogin
                    ? "Sign in to your account to continue"
                    : "Join thousands of happy customers"}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-person me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-envelope me-2"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-lock me-2"></i>Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-lock-fill me-2"></i>Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      <i
                        className={`bi bi-${
                          isLogin ? "box-arrow-in-right" : "person-plus"
                        } me-2`}
                      ></i>
                      {isLogin ? "Sign In" : "Create Account"}
                    </>
                  )}
                </button>

                <div className="text-center">
                  <span className="text-muted">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-primary-custom"
                    onClick={toggleMode}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
