import React from "react";
import HomeHero from "../components/HomeHero.jsx";
import FooterUs from "../components/FooterUs.jsx";
import "../index.css";
import DynamicScrollSlider from "../components/scrollBanner/DynamicScrollSlider.jsx";
import DynamicGallerySlider from "./DynamicGallerySlider.jsx";

const HomeUser = () => {
  return (
    <div className="space-y-5">
      <HomeHero />

      <DynamicScrollSlider />

      {/* <BannerScrollForDash /> */}

      <DynamicGallerySlider />

      {/* Old wale */}
      {/* <ImageGallery />  */}
      {/* <AboutUs /> */}
      <FooterUs />
    </div>
  );
};

export default HomeUser;
