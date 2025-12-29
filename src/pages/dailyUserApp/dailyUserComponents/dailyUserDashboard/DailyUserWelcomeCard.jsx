import { useState } from "react";
import {
  User,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DailyUserWelcomeCard = ({ dailyUser }) => {
  const name = dailyUser?.name || "";
  const username = dailyUser?.username || "";
  const type = dailyUser?.type;

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#21c4cc] to-[#08cfbe] text-white rounded-2xl p-4 space-y-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <User size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold leading-tight">
              {name}
            </h2>
            <p className="text-[11px] opacity-90">
              {type === "cash" ? "Cash User" : "Online Plan User"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="p-1 rounded-full bg-white/20"
        >
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* COLLAPSE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              {/* USERNAME */}
              <div>
                <p className="text-[11px] opacity-80 mb-1">
                  Username
                </p>
                <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg">
                  <CreditCard size={14} />
                  <input
                    value={username}
                    disabled
                    className="bg-transparent outline-none text-xs w-full text-white"
                  />
                </div>
              </div>

              {/* PASSWORD (MASKED) */}
              <div>
                <p className="text-[11px] opacity-80 mb-1">
                  Password
                </p>
                <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg">
                  <Lock size={14} />
                  <input
                    value="••••••••"
                    disabled
                    className="bg-transparent outline-none text-xs w-full text-white tracking-widest"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyUserWelcomeCard;
