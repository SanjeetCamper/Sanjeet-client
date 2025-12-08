import React from "react";
import styles from "../styles/HomeHero.module.css";

const WaveEffect = () => {
  return (
    <div>
      <div class={styles.waves}>
        <div class={styles.wave}></div>
        <div class={styles.wave}></div>
        <div class={styles.wave}></div>
      </div>
    </div>
  );
};

export default WaveEffect;
