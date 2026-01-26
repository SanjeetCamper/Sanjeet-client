import { useNavigate } from "react-router-dom";

const EmptyOrdersState = () => {
  const nav = useNavigate();
  return (
    <div className="text-center py-10 space-y-3">
      <p className="text-gray-500">अभी तक कोइ ऑर्डर्स नही है </p>
      <button
        onClick={() => nav("/book-camper")}
        className="px-4 py-2 bg-[#21c4cc] text-white rounded-xl"
      >
        Book Camper
      </button>
    </div>
  );
};

export default EmptyOrdersState;
