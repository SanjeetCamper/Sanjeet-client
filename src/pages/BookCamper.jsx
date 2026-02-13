// pages/BookCamper.jsx
import { useState } from "react";
import StepUserDetails from "../components/order/StepUserDetails.jsx";
import StepCamperLocation from "../components/order/StepCamperLocation.jsx";
import StepSchedulePayment from "../components/order/StepSchedulePayment.jsx";
import ConfirmOrderModal from "../components/order/ConfirmOrderModal.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackButtonByNavigate from "../components/BackButtonByNavigate.jsx";

const BookCamper = () => {
  const [step, setStep] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  /* ---------------------------
     STEP NAVIGATION
  ---------------------------- */
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="fixed top-0 left-0 w-full bg-white h-screen z-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
        className="h-screen p-4 overflow-auto scroll-hide space-y-4"
      >
        <BackButtonByNavigate
          urlPath={"/order-place"}
          urlHeading={"Book Campers"}
        />

        {/* <p className="text-xs text-gray-500" onClick={()=>navigate()}><ChevronLeft /></p> */}

        <div className="mx-auto w-full max-w-md overflow-y-auto no-scrollbar pb-5 p-2 overflow-y-auto">
          {/* STEP INDICATOR */}
          <div className="flex justify-between text-xs text-gray-500 my-4">
            <span className={step === 1 ? "text-[#21c4cc]" : ""}>Details</span>
            <span className={step === 2 ? "text-[#21c4cc]" : ""}>Location</span>
            <span className={step === 3 ? "text-[#21c4cc]" : ""}>Schedule</span>
            <span className={step === 4 ? "text-[#21c4cc]" : ""}>Confirm</span>
          </div>

          {/* STEPS */}
          {step === 1 && <StepUserDetails onNext={nextStep} />}

          {step === 2 && (
            <StepCamperLocation onNext={nextStep} onBack={prevStep} />
          )}

          {step === 3 && (
            <StepSchedulePayment
              onNext={() => setConfirmOpen(true)}
              onBack={prevStep}
            />
          )}

          {/* CONFIRM MODAL */}
          {confirmOpen && (
            <ConfirmOrderModal
              onClose={() => setConfirmOpen(false)}
              onSuccess={() => {
                setConfirmOpen(false);
                // redirect handled inside modal after success
              }}
            />
          )}
        </div>
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 space-y-2">
          <p className="text-yellow-700 text-sm font-semibold">
            ⚠️ Order Confirmation Notice
          </p>

          <p className="text-gray-700 text-sm leading-relaxed">
            कृपया ध्यान दें — ऑर्डर स्वीकार करने से पहले हमारी टीम आपके दिए गए
            <b> मोबाइल नंबर पर कॉल करके पुष्टि</b> करेगी। इसलिए सही और चालू
            मोबाइल नंबर दर्ज करना अनिवार्य है।
          </p>

          <p className="text-xs text-red-600">
            बिना कॉल कन्फर्मेशन के कोई भी ऑर्डर स्वीकार नहीं किया जाएगा।
          </p>

          <div className="text-blue-700 flex gap-3 text-sm leading-relaxed">
            <p className="underline">किसी तरह की सहायता के लिए कॉल करे</p>{" "}
            <p>:</p>
            <button
              onClick={() => setShowPopup(true)}
              className="px-3 border rounded-full border-yellow-500 text-gray-700 shadow"
            >
              Call Now
            </button>
          </div>

          {/* POPUP */}
          {showPopup && (
            <div 
                onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-[200]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-80 bg-white rounded-xl p-4 space-y-3 shadow-lg"
                >
                  <h2 className="text-lg font-semibold text-gray-800 text-center">
                    Admin चुनें
                  </h2>

                  <button
                    onClick={() => (window.location.href = "tel:+917489089302")}
                    className="w-full py-3 bg-[#21c4cc] text-white rounded-lg text-sm font-medium"
                  >
                    Altamash Mansuri
                  </button>
                  <button
                    onClick={() => (window.location.href = "tel:+918982621556")}
                    className="w-full py-3 bg-[#21c4cc] text-white rounded-lg text-sm font-medium"
                  >
                    Alisher Sayyad
                  </button>
                  <button
                    onClick={() => (window.location.href = "tel:+917067418473")}
                    className="w-full py-3 bg-[#21c4cc] text-white rounded-lg text-sm font-medium"
                  >
                    Rihan Pathan
                  </button>

                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg text-sm"
                  >
                    रद्द करें
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BookCamper;
