import { createContext, useContext, useState, useEffect } from "react";

const ToastSettingsContext = createContext();
export const useToastSettings = () => useContext(ToastSettingsContext);

export const ToastSettingsProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  useEffect(() => {
    const s = localStorage.getItem("toast_sound");
    const v = localStorage.getItem("toast_vibration");

    if (s !== null) setSoundEnabled(s === "true");
    if (v !== null) setVibrationEnabled(v === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("toast_sound", soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("toast_vibration", vibrationEnabled);
  }, [vibrationEnabled]);

  return (
    <ToastSettingsContext.Provider
      value={{
        soundEnabled,
        vibrationEnabled,
        setSoundEnabled,
        setVibrationEnabled,
      }}
    >
      {children}
    </ToastSettingsContext.Provider>
  );
};
