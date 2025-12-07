import React from "react";
import styles from "../styles/HomeHero.module.css";

const HomeHero = () => {
  return (
    <div>
      <div class={styles.hero}>
        <div class={styles.waves}>
          <div class={styles.wave}></div>
          <div class={styles.wave}></div>
          <div class={styles.wave}></div>
        </div>

        <img src="/logo.png" className="rounded-full w-30" alt="" />
      </div>
    </div>
  );
};

export default HomeHero;
