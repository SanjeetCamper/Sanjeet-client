import React from "react";
import styles from "../styles/HomeHero.module.css";
import AboutUs from "./AboutUs";

const HomeHero = () => {
  return (
    <div>
      <div class={styles.hero}>
      <div class={styles.waves}>
        <div class={styles.wave}></div>
        <div class={styles.wave}></div>
        <div class={styles.wave}></div>
      </div>

      <div class={styles.logoCircle}>
      
          <img src="/logo.png" className="rounded-full w-30" alt="" />      
        {/* <div class={styles.logoIcon}></div> */}
      </div>

      

      {/* <h1>Saneet <p>Water Supplier</p></h1> */}
      <div className="py-4 px-1 my-10 rounded-full border flex justify-center items-center">
        <p className="text-white">Pure Water, Pure Trust.</p>
      </div>
      <button class={styles.btnOrder}>Order Now</button>
    </div>

    <AboutUs />
    </div>
  );
};

export default HomeHero;
