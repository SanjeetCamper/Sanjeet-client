import React from "react";
import HomeHero from "../components/HomeHero.jsx";
import AboutUs from "../components/AboutUs.jsx";
import FooterUs from "../components/FooterUs.jsx";
import "../index.css";
import ImageGallery from "../components/ImageGallery.jsx";
import Banner from "../CloudinaryStorage/Banner.jsx";

const HomeUser = () => {
  return (
    <div>
      <HomeHero />
            
      <ImageGallery />
      {/* <AboutUs /> */}
      <FooterUs />
    </div>
  );
};

export default HomeUser;
