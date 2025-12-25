import React, { useEffect, useState } from "react";
// import { useDailyUser } from "../../dailyUserContext/DailyUserContext";
import { MessageSquare } from "lucide-react";
import {motion} from 'framer-motion'

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const DailyUserHistoryEntryItem = ({ entry, minuteTick }) => {
  const entryPending = entry.totalAmount - (entry.paymentReceived || 0);
  const [showNote, setShowNote] = useState(false);

  return (
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className="bg-white border border-gray-200 rounded-xl p-3 space-y-2"
>
      <div className="flex justify-between items-start gap-3">
        {/* LEFT */}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-800">
            {entry.camperGiven} campers × ₹{entry.rate}
          </p>
          <p className="text-xs text-gray-500">
            Recieved: {entry.camperGiven} campers
          </p>
          <p className="text-xs text-gray-500">
            Given: {entry.camperReceived} campers
          </p>
          <p className="text-xs text-gray-500">{timeAgo(entry.createdAt)}</p>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-800">
            ₹ {entry.totalAmount}
          </p>
          <span className="text-xs text-gray-500">Total Amount</span>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-1 text-right">
          {entry.paymentReceived > 0 && (
            <div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Paid
              </span>
              <span className="text-sm font-semibold text-gray-800">
                &nbsp;₹ {entry.paymentReceived}
              </span>
            </div>
          )}

          {entryPending > 0 && (
            <div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                Pending
              </span>
              <span className="text-sm font-semibold text-gray-800">
                &nbsp;₹ {entryPending}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* NOTE ICON */}
      {entry.note?.visibleToUser && entry.note?.text && (
        <div className="mt-2">
          <button
            onClick={() => setShowNote(!showNote)}
            className="flex items-center gap-1 text-xs text-blue-600 mb-2"
          >
            <MessageSquare size={14} />
            {showNote ? "Hide note" : "View note"}
          </button>

          {showNote && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <p className="text-xs text-blue-700">
                {entry.note.text}
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DailyUserHistoryEntryItem;
