import { useClerk } from "@clerk/clerk-react";
import React from "react";
import styles from "../styles/HomeHero.module.css";

const HeaderHome = () => {
  const { openSignIn } = useClerk();

  return (
    <div className="flex flex-col items-center mt-0 sm:mt-0 px-4 text-center text-gray-800 mt-15">

      <p className="flex items-center text-sm text-gray-500 sm:text-3xl mb-5">ARE YOU THURSTY</p>

      <img
        src={"/header_img.png"}
        alt=""
        className={`${styles.headerImg} w-36  h-36 rounded-full mb-6`}
      />

      <h1 className="flex items-center text-xl text-gray-500 sm:text-3xl font-medium mb-2">
        Hey Sanjeet Walo ! &nbsp;
        <img
          src={"/hand_wave.png"}
          alt=""
          className={`w-8 aspect-square ${styles.handImg}`}
        />
      </h1>

      <div className="mt-10 mb-15 bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white rounded-xl p-5">
        <h2 className="text-2xl sm:text-5xl font-semibold my-4 text-gray-100">
          Welcome To Saneej Water Supplier 🚰
        </h2>

        <p className="mb-8 max-w-md text-gray-250">
          Pure water delivered fresh, clean and on time — every single day.
        </p>
      </div>

      <button
        onClick={openSignIn}
        className="bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white rounded-full px-8 py-2.5   transition-all cursor-pointer"
      >
        Get Started
      </button>

      <div>
        <div className="mt-10  bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white rounded-xl p-5">
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
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
