import React from "react";
// import styles from "../styles/HomeHero.module.css";
import AboutUs from "./AboutUs.jsx";
// import RobotSpeech from "./RobotAnimation";
import HomeHero from "./HomeHero.jsx";
import FooterUs from "./FooterUs.jsx";
import ImageGallery from "./ImageGallery.jsx";

const HeaderHome = () => {

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-27 text-justify pb-20 overflow-y-auto">

      <HomeHero />

      <ImageGallery />

      <FooterUs />
    </div>
  );
};

export default HeaderHome;
