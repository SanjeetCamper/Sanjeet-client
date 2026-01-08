import React from "react";
import HomeHero from "../components/HomeHero.jsx";
import AboutUs from "../components/AboutUs.jsx";
import FooterUs from "../components/FooterUs.jsx";
import "../index.css";
import ImageGallery from "../components/ImageGallery.jsx";
import Banner from "../CloudinaryStorage/Banner.jsx";
import MembershipPlanPurchaseBanner from  '../components/dashboardComponents/MembershipPlanPurchaseBanner.jsx'
import BookCamperCard from "../components/dashboardComponents/BookCamperCard.jsx";
import BannerScrollForDash from "../components/BannerScrollForDash.jsx";

const HomeUser = () => {
  return (
    <div className="space-y-5">
      <HomeHero />

      <BannerScrollForDash />
{/* 
      <MembershipPlanPurchaseBanner />

      <BookCamperCard /> */}
            
      <ImageGallery />
      {/* <AboutUs /> */}
      <FooterUs />
    </div>
  );
};

export default HomeUser;
