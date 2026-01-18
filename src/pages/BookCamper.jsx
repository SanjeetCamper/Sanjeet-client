import { useState } from "react";
import StepOrder from "../components/bookCamper/StepOrder.jsx";
import StepAddress from "../components/bookCamper/StepAddress.jsx";
import StepPayment from "../components/bookCamper/StepPayments.jsx";
import StepReview from "../components/bookCamper/StepReview.jsx";
import BackButton from '../components/BackButton.jsx'
// import { useNavigate } from "react-router-dom";

const BookCamper = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    quantity: "",
    date: "",
    name: "",
    phone: "",
    address: "",
    paymentMethod: "online",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div className="fixed top-0 left-0 z-[100] h-screen bg-white w-full w-full p-4 text-justify space-y-5">
      <div>
        <BackButton />
      </div>
      {step === 1 && <StepOrder form={form} setForm={setForm} next={next} />}
      {step === 2 && (
        <StepAddress form={form} setForm={setForm} next={next} back={back} />
      )}
      {step === 3 && (
        <StepPayment form={form} setForm={setForm} next={next} back={back} />
      )}
      {step === 4 && <StepReview form={form} back={back} />}

    </div>
  );
};

export default BookCamper;