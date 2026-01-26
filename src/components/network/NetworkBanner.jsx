import { X } from "lucide-react";
import { useState } from "react";

const NetworkBanner = ({ message }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full p-3 pt-1 z-[9999] flex justify-center">
      <div className="bg-red-600  text-white px-4 py-3 flex items-center justify-between rounded-md gap-5 md:w-md lg:w-md animate-slideUp">
        <span>⚠️</span>
      <span className="text-sm">
        {message || "No Internet Connection. Please connect to internet."}
      </span>

      <X
        size={18}
        className="cursor-pointer hover:opacity-70"
        onClick={() => setVisible(false)} // 👈 CLOSE
      />
    </div>
    </div>
  );
};

export default NetworkBanner;
