import React, { useEffect, useMemo, useState } from "react";
import { exportCsv } from "./exportCsv";
import { exportPdf } from "./exportPdf";
import { useToast } from "../../../context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

const ranges = [
  { label: "Last 7 Days", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

const ExportReportModal = ({ history = [], onClose ,open }) => {
  const { showToast } = useToast();
  const [range, setRange] = useState("week");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("csv"); // csv | pdf

  // 🔹 filter data
  const filtered = useMemo(() => {
    const now = new Date();

    return history.filter((e) => {
      const d = new Date(e.date || e.createdAt);

      if (range === "week") {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        return d >= last7;
      }

      if (range === "month") {
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }

      if (range === "custom") {
        if (!fromDate || !toDate) return false;
        const from = new Date(fromDate).setHours(0, 0, 0, 0);
        const to = new Date(toDate).setHours(23, 59, 59, 999);
        return d >= from && d <= to;
      }

      return true;
    });
  }, [history, range, fromDate, toDate]);

  // 🔹 totals
  const summary = useMemo(() => {
    let campers = 0;
    let total = 0;
    let paid = 0;

    filtered.forEach((e) => {
      campers += e.camperGiven || 0;
      total += e.totalAmount || 0;
      paid += e.paymentReceived || 0;
    });

    return {
      entries: filtered.length,
      campers,
      total,
      paid,
      pending: total - paid,
    };
  }, [filtered]);

  const handleExport = () => {
    if (!filtered.length) return showToast("No Data Availbale", "warning");

    if (type === "csv") {
      exportCsv(filtered, summary);
    } else {
      exportPdf(filtered, summary);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full rounded-t-2xl p-4 space-y-4"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="text-sm font-semibold text-gray-700">Export Report</h2>

          {/* RANGE */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Select Range</p>
            <div className="flex gap-2">
              {ranges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`px-3 py-1.5 text-xs rounded-full ${
                    range === r.value
                      ? "bg-[#21c4cc] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOM DATE */}
          {range === "custom" && (
            <div className="flex gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          )}

          {/* SUMMARY PREVIEW */}
          <div className="bg-gray-50 border rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              Entries: <b>{summary.entries}</b>
            </div>
            <div>
              Campers: <b>{summary.campers}</b>
            </div>
            <div>
              Total: <b>₹ {summary.total}</b>
            </div>
            <div>
              Paid: <b>₹ {summary.paid}</b>
            </div>
            <div className="col-span-2">
              Pending: <b>₹ {summary.pending}</b>
            </div>
          </div>

          {/* TYPE */}
          <div className="flex gap-2">
            <button
              onClick={() => setType("csv")}
              className={`flex-1 py-2 text-xs rounded-lg ${
                type === "csv" ? "bg-[#21c4cc] text-white" : "bg-gray-100"
              }`}
            >
              CSV
            </button>
            <button
              onClick={() => setType("pdf")}
              className={`flex-1 py-2 text-xs rounded-lg ${
                type === "pdf" ? "bg-[#21c4cc] text-white" : "bg-gray-100"
              }`}
            >
              PDF
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 text-xs border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex-1 py-2 text-xs bg-[#21c4cc] text-white rounded-lg"
            >
              Export
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExportReportModal;
