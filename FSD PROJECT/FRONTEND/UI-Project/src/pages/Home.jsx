import React, { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import CategoryCards from "../components/CategoryCards.jsx";
import Reviews from "../components/Reviews.jsx";
import { initializeStorage } from "../utils/localStorageUtils.js";
import "../css/home.css";
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  const handleScrollToCategories = () => {
    const element = document.getElementById("categories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page" id="home">
      <Hero onScrollToCategories={handleScrollToCategories} />
      <CategoryCards />
      <Reviews />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
