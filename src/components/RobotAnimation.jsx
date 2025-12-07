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
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // typing effect
    if (charIndex < messages[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + messages[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 70); // typing speed

      return () => clearTimeout(timeout);
    }

    // hold completed line then next
    const hold = setTimeout(() => {
      setDisplayText("");
      setCharIndex(0);
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500); // hold 1.5s

    return () => clearTimeout(hold);
  }, [charIndex, index]);

  return (
    <div className="text-center">
      <style>{`
        @keyframes bubbleFade {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      <div
        className="mx-auto bg-white px-4 py-2 rounded-2xl shadow-sm text-[13px] font-medium inline-block relative"
        style={{ animation: "bubbleFade 0.4s ease" }}
      >
        {displayText}
        <span
          style={{
            display: "inline-block",
            width: "6px",
            marginLeft: "2px",
            animation: "cursorBlink 0.7s infinite",
          }}
        >
          |
        </span>

        <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm"></div>
      </div>

      <div>
        <div className="text-center mt-6">
          <RobotSpeech />
          <img
            src="/header_img.png"
            className={`${styles.robotImg} w-52 mx-auto mt-6`}
          />
        </div>

        <h1 className="flex items-center text-xl text-gray-500 sm:text-3xl font-medium mb-2">
          Hey Sanjeet Walo ! &nbsp;
          <img
            src={"/hand_wave.png"}
            alt=""
            className={`w-8 aspect-square ${styles.handImg}`}
          />
        </h1>

        {/* <button
          onClick={openSignIn}
          className="bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#14b8a6] text-white rounded-full px-8 py-2.5 mt-5  transition-all cursor-pointer"
        >
          Get Started
        </button> */}
      </div>
    </div>

    
  );
}
