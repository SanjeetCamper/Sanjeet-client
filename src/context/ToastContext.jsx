import { createContext, useContext, useRef, useState } from "react";
import Toast from "../components/Toast.jsx";
import { useToastSettings } from "./ToastSettingsContext";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

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
  const { soundEnabled, vibrationEnabled } = useToastSettings();

  const playSound = (type) => {
    if (!soundEnabled) return;
    const audio = sounds[type];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const vibrate = () => {
    if (!vibrationEnabled) return;
    if (navigator.vibrate) {
      navigator.vibrate(80);
    }
  };

  const showToast = (message, type = "success", options = {}) => {
    const { duration = 3000 } = options;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setToast({ message, type });

    playSound(type);
    vibrate();

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
