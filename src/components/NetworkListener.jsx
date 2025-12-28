import { useEffect, useRef } from "react";
import { useToast } from "../context/ToastContext.jsx";

const NetworkListener = () => {
  const { showToast, dismissToast } = useToast();
  const offlineToastId = useRef("offline-toast");

  useEffect(() => {
    const showOffline = () => {
      showToast(
        "Connect internet for online updates",
        "warning",
        {
          autoClose: false,          // ❌ auto close disabled
          toastId: offlineToastId.current, // same toast always
        }
      );
    };

    const showOnline = () => {
      dismissToast(offlineToastId.current);
      showToast("Back online", "success");
    };

    // initial state
    if (!navigator.onLine) {
      showOffline();
    }

    window.addEventListener("offline", showOffline);
    window.addEventListener("online", showOnline);

    return () => {
      window.removeEventListener("offline", showOffline);
      window.removeEventListener("online", showOnline);
    };
  }, []);

  return null;
};

export default NetworkListener;