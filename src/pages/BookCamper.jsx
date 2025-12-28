import { useState } from "react";
import StepOrder from "../components/bookCamper/StepOrder.jsx";
import StepAddress from "../components/bookCamper/StepAddress.jsx";
import StepPayment from "../components/bookCamper/StepPayments.jsx";
import StepReview from "../components/bookCamper/StepReview.jsx";

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
    <div className="mx-auto w-full max-w-md px-4 pt-27 text-justify pb-22 space-y-5">
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