import React from "react";
import styles from "../styles/HomeHero.module.css";
import WaveEffect from "./WaveEffect";

const HomeHero = () => {
  return (
    <div>
      <div class={styles.hero}>
      <WaveEffect />

        <img src="/logo.png" className="rounded-full w-30" alt="" />
      </div>
    </div>
  );
};

export default HomeHero;
