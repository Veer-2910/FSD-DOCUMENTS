import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Bookings from "./pages/Bookings.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Admin from "./pages/Admin.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Toast from "./components/Toast.jsx";
import Messages from "./pages/message.jsx";

function AppWrapper() {
  const location = useLocation();

  // Pages where Footer should be hidden
  const hideFooterPaths = ["/login"];

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles/:category" element={<Vehicles />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/messages" element={<Messages />} />

      </Routes>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
      <Toast />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
