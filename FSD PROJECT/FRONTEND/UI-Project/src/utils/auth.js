import axios from "axios";

const API = "http://localhost:5000/api";
let currentUser = null;

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API}/login`, { email, password });
    const user = res.data.user;

    // 💾 Save user
    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUser = user;

    return {
      success: true,
      user,
      redirectTo: user.role === "admin" ? "/admin" : "/",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Login failed",
    };
  }
};

export const signup = async ({ name, email, password }) => {
  try {
    const res = await axios.post(`${API}/signup`, { name, email, password });
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Signup failed",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  currentUser = null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};

export const getCurrentUser = () => {
  if (currentUser) return currentUser;

  const stored = localStorage.getItem("currentUser");
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }

  return null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "admin";
};
