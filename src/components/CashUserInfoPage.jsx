import { useState } from "react";
import BackButtonByNavigate from "../components/BackButtonByNavigate.jsx";
import { useContextUser } from "../context/UserContext.jsx";

const ADMINS = [
  { name: "Altamash Mansuri", phone: "918989465886" },
  { name: "Alisher Sayyad", phone: "918982621556" },
  { name: "Rihan Pathan", phone: "917067418473" },
];

const CashUserInfoPage = () => {
  const { user } = useContextUser();
  const [showAdminPopup, setShowAdminPopup] = useState(false);

  if (!user) return null;

  const message =
    "Hey 👋\n" +
    "मैं कैश डिलीवरी सेवा के लिए Cash User Access चाहता/चाहती हूँ।\n\n" +
    "👤 नाम: " +
    (user.name || "") +
    "\n" +
    "📞 मोबाइल: " +
    (user.phone || "") +
    "\n" +
    "📧 ईमेल: " +
    (user.email || "") +
    "\n" +
    "🆔 यूज़र ID: " +
    (user._id || "") +
    "\n" +
    "🏡 पता: " +
    (user.address || "") +
    "\n" +
    "🏘️ गाँव: " +
    (user.village || "") +
    "\n\n" +
    "कृपया मेरी Cash User ID बनाकर सेवा शुरू करें।\n" +
    "धन्यवाद 🙏";

  const openWhatsApp = (adminPhone) => {
    const url = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 z-100 bg-white p-4 space-y-2">
      <BackButtonByNavigate urlHeading={"Be A Cash User"} urlPath={-1} />

     <div className="px-2 space-y-4">
       <h1 className="text-lg font-semibold text-gray-800">कैश डिलीवरी सेवा</h1>

      <div className="text-sm text-gray-600 space-y-2">
        <p>
          हमारी पानी सप्लाई सेवा में आप <b>कैश यूज़र</b> के रूप में जुड़ सकते हैं।
        </p>

        <p>
          <b>Camper Price:</b> ₹20 (18L × ₹20 बोतल)
        </p>

        <p>सभी डिलीवरी, पैसे और रिकॉर्ड आपको ऐप में ऑनलाइन दिखेंगे।</p>

        <p className="text-red-600 text-xs">
          ⚠️ Cash User ID सिर्फ Admin बनाता है।
        </p>
      </div>

      {/* BUTTON → POPUP OPEN */}
      <button
        onClick={() => setShowAdminPopup(true)}
        className="block w-full text-center py-3 rounded-xl bg-green-600 text-white font-medium"
      >
        WhatsApp से Request भेजें
      </button>

      <p className="text-[11px] text-gray-400 text-center">
        Admin आपके message के आधार पर संपर्क करेगा।
      </p>

      {/* POPUP */}
      {showAdminPopup && (
        <div onClick={()=>setShowAdminPopup(false)} className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-[200]">
          <div onClick={(e)=>e.stopPropagation()} className="w-80 bg-white rounded-xl p-4 space-y-3 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Admin चुनें
            </h2>

            {ADMINS.map((a, idx) => (
              <button
                key={idx}
                onClick={() => openWhatsApp(a.phone)}
                className="w-full py-3 bg-[#21c4cc] text-white rounded-lg text-sm font-medium"
              >
                {a.name}
              </button>
            ))}

            <button
              onClick={() => setShowAdminPopup(false)}
              className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg text-sm"
            >
              रद्द करें
            </button>
          </div>
        </div>
      )}
     </div>
    </div>
  );
};

export default CashUserInfoPage;
