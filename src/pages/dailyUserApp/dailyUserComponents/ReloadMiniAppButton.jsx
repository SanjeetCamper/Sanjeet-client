import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReloadDailyUser } from "../dailyUserContext/DailyUserReloadContext.jsx";

const ReloadMiniAppButton = () => {
  const { reloadMiniApp } = useReloadDailyUser();
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
      onClick={reloadMiniApp}
      className="fixed bottom-18 left-10 z-100 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#21c4cc] text-white"
    >
      <RotateCcw size={18} />

      <AnimatePresence>
        {showText && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm whitespace-nowrap"
          >
            Reload
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ReloadMiniAppButton;
