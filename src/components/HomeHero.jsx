import React from "react";
import styles from "../styles/HomeHero.module.css";

const HomeHero = () => {
  return (
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

      

      <h1>Saneet Water Supplier</h1>
      <p>Pure Water, Pure Trust.</p>
      <button class={styles.btnOrder}>Order Now</button>
    </div>
  );
};

export default HomeHero;
