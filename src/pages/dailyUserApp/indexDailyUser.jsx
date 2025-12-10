import React from "react";
import { motion } from "framer-motion";
import "./dailyUserStyles/index.module.css";
import DailyUserOut from "./dailyUserComponents/DailyUserOut.jsx";

const IndexDailyUser = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // start
      animate={{ opacity: 1, y: 0 }} // enter
      exit={{ opacity: 0, y: 30 }} // leave route
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="miniAppWrapper"
    >
      <DailyUserOut />
    </motion.div>
  );
};

export default IndexDailyUser;
