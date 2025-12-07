import { useState, useEffect } from "react";
import styles from '../styles/HomeHero.module.css'

export default function RobotSpeech() {
  const messages = [
    "Are you thirsty? 💧",
    "Fresh jar delivered daily 🚚",
    "Pure & chilled water ready 🧊",
    "Need a refill? 🚰",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 3000); // speed 1.8s

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mt-6">
      <div className={`${styles.headerImg} mx-auto bg-white px-4 py-2 rounded-2xl shadow-sm text-[13px] text-gray-700 font-medium inline-block relative `}>
        {messages[index]}
        <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm"></div>
      </div>
    </div>
  );
}
