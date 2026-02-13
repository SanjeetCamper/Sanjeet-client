import React from "react";
import { Info, User, Briefcase } from "lucide-react";
import BackButtonByNavigate from "../../../../components/BackButtonByNavigate.jsx";
import { motion } from "framer-motion";

const CallLink = ({ number }) => (
  <a
    href={`tel:${number}`}
    className="text-[#21c4cc] font-semibold hover:underline"
  >
    {number}
  </a>
);

const Card = ({ icon: Icon, title, children }) => (
  <div className="bg-white border border-gray-300 rounded-xl p-4 space-y-1">
    <div className="flex items-center gap-2 mb-1">
      <Icon size={18} className="text-[#21c4cc]" />
      <h3 className="text-gray-900 font-bold text-base tracking-wide">
        {title}
      </h3>
    </div>
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </div>
);

const Subtitle = ({ text }) => (
  <p className="text-gray-500 text-xs mt-1">{text}</p>
);

const DailyUserAdminInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      className="fixed top-0 left-0 w-full bg-white h-screen z-100 p-4 pb-25 overflow-auto scroll-hide space-y-4"
    >
      <BackButtonByNavigate
        urlHeading={"Admin Info"}
        urlPath={"/dailyuser/app/setting"}
      />

      {/* ================= BUSINESS INFO ================= */}
      <Card icon={Briefcase} title="Sanjeet Water Supplier">
        <p>
          हम रोजाना आपके घर तक शुद्ध, सुरक्षित और ताज़ा पेयजल (18L Camper
          Service) पहुँचाते हैं।
        </p>
        <p className="mt-1">
          हमारा वादा — 📦 समय पर डिलीवरी, 💧 बेहतरीन गुणवत्ता, और 💰 उचित दरें।
          <span className="font-semibold"> भरोसे के साथ पानी पिएं!</span>
        </p>

        <Subtitle text="सेवा क्षेत्र: गाँव संजीत एवं आसपास के प्रमुख इलाके" />
      </Card>

      {/* ================= OWNER / DEVELOPER ================= */}
      <Card icon={User} title="Altamash Mansuri">
        Developer & Owner <br />
        📞 <CallLink number="7489089302" />
        <Subtitle text="App development, technical support & business decisions" />
      </Card>

      {/* ================= OWNER ================= */}
      <Card icon={User} title="Alisher Sayyad">
        Owner <br />
        📞 <CallLink number="8982621556" />
        <Subtitle text="Order management & customer coordination" />
      </Card>

      {/* ================= OWNER ================= */}
      <Card icon={User} title="Rihan Pathan">
        Owner <br />
        📞 <CallLink number="7067418473" />
        <Subtitle text="Daily operations & delivery support" />
      </Card>

      {/* ================= SUPPORT ================= */}
      <Card icon={Info} title="Help & Support">
        Email:{" "}
        <span className="font-semibold text-gray-800">
          sanjeethelpline@gmail.com
        </span>
        <Subtitle text="यदि कॉल न लगे तो ईमेल के माध्यम से संपर्क करें" />
      </Card>
    </motion.div>
  );
};

export default DailyUserAdminInfo;
