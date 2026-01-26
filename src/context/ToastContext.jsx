import { createContext, useContext, useRef, useState } from "react";
import Toast from "../components/Toast.jsx";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

// 🔊 sound map
const sounds = {
  success: new Audio("/toast-success.mp3"),
  error: new Audio("/toast-error.mp3"),
  info: new Audio("/toast-info.mp3"),
  warning: new Audio("/toast-warning.mp3"),
};

Object.values(sounds).forEach((a) => (a.preload = "auto"));

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const playSound = (type) => {
    const audio = sounds[type];
    if (!audio) return;

    try {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  };

  const showToast = (message, type = "success", options = {}) => {
    const { duration = 3000, sound = true } = options;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setToast({ message, type });

    if (sound) playSound(type);

    timeoutRef.current = setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  );
};
