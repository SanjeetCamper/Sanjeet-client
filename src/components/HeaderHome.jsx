import { useClerk } from "@clerk/clerk-react";
import React from "react";
// import styles from "../styles/HomeHero.module.css";
import AboutUs from "./AboutUs.jsx";
// import RobotSpeech from "./RobotAnimation";
import HomeHero from "./HomeHero.jsx";

const HeaderHome = () => {
  const { openSignIn } = useClerk();

  return (
    <div>

      <HomeHero />

      

      <div>
        {/* <div className="mt-10  bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white rounded-xl p-5">
          <h2 className="text-xl font-semibold text-white">Our Services</h2>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>• 18L Jar doorstep delivery</li>
            <li>• Monthly & weekly subscription plans</li>
            <li>• Quick refill & emergency supply</li>
            <li>• Cold / RO / Mineral options</li>
          </ul>
        </div>

        <div className="mt-10  bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white rounded-xl p-5">
          <h2 className="text-xl font-semibold text-white">Why Choose Us</h2>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>• Pure & lab-tested water</li>
            <li>• Fixed delivery slots</li>
            <li>• 24/7 customer support</li>
            <li>• Easy digital refills & tracking</li>
          </ul>
        </div>

        <div onClick={openSignIn} className="mt-10 px-6 space-y-3">
          <button className="w-full bg-gradient-to-r from-[#00b4d8] to-[#48cae4] text-white py-3 rounded-full text-lg">
            Create Account
          </button>
        </div> */}
      </div>

      <AboutUs />
    </div>
  );
};

export default HeaderHome;
