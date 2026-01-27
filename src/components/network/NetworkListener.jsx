import { useEffect, useRef, useState } from "react";
import NetworkBanner from "./NetworkBanner.jsx";
import { useToastSettings } from "../../context/ToastSettingsContext";
import { Space, Wifi } from "lucide-react";

const NetworkListener = () => {
  const [status, setStatus] = useState(null); // 👈 important
  const wasOffline = useRef(!navigator.onLine); // 👈 track history

  const { soundEnabled, vibrationEnabled } = useToastSettings();

  const offlineSound = useRef(new Audio("/network-offline.mp3"));
  const onlineSound = useRef(new Audio("/network-online.mp3"));

  const playSound = (audioRef) => {
    if (!soundEnabled) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const vibrate = () => {
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(150);
    }
  };

  useEffect(() => {
    const onOffline = () => {
      wasOffline.current = true;
      setStatus("offline");
      playSound(offlineSound);
      vibrate();
    };

    const onOnline = () => {
      // ✅ show ONLY if coming from offline
      if (wasOffline.current) {
        setStatus("online");
        playSound(onlineSound);
        wasOffline.current = false;
      }
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [soundEnabled, vibrationEnabled]);

  if (!status) return null;

  return (
    <NetworkBanner
      status={status}
      message={
        status === "offline"
          ? "No Internet Connection. Please connect to internet."
          : <p className="flex gap-3 justify-center items-center"><Wifi /> Internet Connected</p>
      }
    />
  );
};

export default NetworkListener;
