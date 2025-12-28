import { createContext, useContext, useRef, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // 🔒 store timeout + active toast id
  const timeoutRef = useRef(null);
  const activeToastId = useRef(null);

  /**
   * showToast(message, type, options)
   *
   * OLD USAGE (still works):
   * showToast("Saved", "success")
   *
   * NEW USAGE:
   * showToast("Offline", "warning", { autoClose: false, toastId: "offline" })
   */
  const showToast = (message, type = "success", options = {}) => {
    const {
      autoClose = true,
      duration = 3000,
      toastId = null,
    } = options;

    // ❌ prevent duplicate toast
    if (toastId && activeToastId.current === toastId) return;

    // clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setToast({ message, type });
    activeToastId.current = toastId;

    // ⏳ auto close only if enabled
    if (autoClose) {
      timeoutRef.current = setTimeout(() => {
        setToast(null);
        activeToastId.current = null;
      }, duration);
    }
  };

  // 🔥 dismiss specific toast (used for offline → online)
  const dismissToast = (toastId) => {
    if (activeToastId.current === toastId) {
      setToast(null);
      activeToastId.current = null;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  );
};
