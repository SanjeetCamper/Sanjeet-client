// pages/BookCamper.jsx
import { useState } from "react";
import StepUserDetails from "../components/order/StepUserDetails.jsx";
import StepCamperLocation from "../components/order/StepCamperLocation.jsx";
import StepSchedulePayment from "../components/order/StepSchedulePayment.jsx";
import ConfirmOrderModal from "../components/order/ConfirmOrderModal.jsx";
import BackButton from "../components/BackButton.jsx";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButtonByNavigate from "../components/BackButtonByNavigate.jsx"

const BookCamper = () => {
  const [step, setStep] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
 
  /* ---------------------------
     STEP NAVIGATION
  ---------------------------- */
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-white z-100 pt-4 pb-20 px-6 space-y-1">

      
      <BackButtonByNavigate urlPath={"/order-place"} urlHeading={"Book Campers"} />

      {/* <p className="text-xs text-gray-500" onClick={()=>navigate()}><ChevronLeft /></p> */}

      <div className="mx-auto w-full max-w-md h-screen overflow-y-auto no-scrollbar pb-20 px-2 overflow-y-auto">

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
    </div>
  );
};

export default BookCamper;
