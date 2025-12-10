import React from "react";
import styles from "../styles/HomeHero.module.css";

const WaveEffect = () => {
  return (
    <div>
      <div className={styles.waves}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
    </div>
  );
};

export default WaveEffect;
