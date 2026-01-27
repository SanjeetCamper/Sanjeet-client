import { Wifi, X } from "lucide-react";
import { useEffect, useState } from "react";

const NetworkBanner = ({ status, message }) => {
  const [visible, setVisible] = useState(true);

  // 🔁 Reset visibility when status changes
  useEffect(() => {
    setVisible(true);

    // 🟢 auto-hide online banner
    if (status === "online") {
      const t = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(t);
    }
  }, [status]);

  if (!visible) return null;

  const isOnline = status === "online";

  return (
    <div className="fixed top-0 left-0 w-full p-3 pt-1 z-[9999] flex justify-center">
      <div
        className={`
          px-4 py-3 flex items-center justify-between gap-5 rounded-md
          text-white text-sm animate-slideUp
          ${isOnline ? "bg-green-600" : "bg-red-600"}
          w-full md:w-md lg:w-md
        `}
      >
        <span>{isOnline ? "" : "⚠️"}</span>

        <span className="flex-1 text-left">
          {message}
        </span>

        {!isOnline && (
          <X
            size={18}
            className="cursor-pointer hover:opacity-70"
            onClick={() => setVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NetworkBanner;
