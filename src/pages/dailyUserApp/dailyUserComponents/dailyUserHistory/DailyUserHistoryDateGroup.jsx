import React from "react";
// import HistoryEntryItem from "./HistoryEntryItem";
import DailyUserHistoryEntryItem from "./DailyUserHistoryEntryItem";
import { getDateLabel } from "../../../../utils/dateLabel";
import { motion } from "framer-motion";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 👈 delay between items
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const DailyUserHistoryDateGroup = ({ date, entries, minuteTick, scrolle }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      <div
        className={`sticky top-0 z-10 bg-gray-50 py-1 ${
          scrolle ? "shadow-sm" : ""
        }`}
      >
        <h3 className="text-xs font-semibold text-gray-500">
          {getDateLabel(date)}
        </h3>
        <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">
          {entries.length} entries
        </span>
      </div>
      <div className="space-y-2">
        {entries.map((entry) => (
          <motion.div key={entry._id} variants={item}>
          <DailyUserHistoryEntryItem
            entry={entry}
            minuteTick={minuteTick}
          />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyUserHistoryDateGroup;
