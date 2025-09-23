import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>

        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsSidebarOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>
            Contact
          </Link>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
