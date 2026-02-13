import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReloadDailyUser } from "../dailyUserContext/DailyUserReloadContext.jsx";

const ReloadMiniAppButton = () => {
  const { reloadMiniApp } = useReloadDailyUser();
  const [showText, setShowText] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setShowText(true);
      setTimeout(() => setShowText(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <>
      {/* SMALL EDGE TOGGLE ICON */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-30 left-0 z-50 bg-[#21c4cc] text-white p-2 px-1 rounded-r-lg shadow"
      >
        {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* MAIN RELOAD BUTTON */}
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 40, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={reloadMiniApp}
            className="fixed bottom-30 left-0 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#21c4cc] text-white shadow-lg"
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
                  transition={{ duration: 0.3 }}
                  className="text-sm whitespace-nowrap"
                >
                  Reload
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReloadMiniAppButton;
