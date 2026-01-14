import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppReload } from "./AppReloadContext.jsx";

const ReloadAppButton = () => {
  const { reloadApp } = useAppReload();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(true);
      setTimeout(() => setShowText(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={reloadApp}
      className="fixed bottom-20 left-10 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#21c4cc] text-white"
    >
      <motion.div
        whileTap={{ rotate: -180 }}
        transition={{ duration: 0.4 }}
      >
        <RotateCcw size={18} />
      </motion.div>

      <AnimatePresence>
        {showText && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-sm whitespace-nowrap"
          >
            Reload App
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ReloadAppButton;
