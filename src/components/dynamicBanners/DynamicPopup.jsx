import { useEffect, useState } from "react";

const DynamicPopup = ({ banner }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!banner) return;

    if (banner.dismissible) {
      const seen = localStorage.getItem("popup_seen");
      if (seen) setShow(false);
    }
  }, []);

  if (!banner || !show) return null;

  const closePopup = () => {
    if (banner.dismissible) {
      localStorage.setItem("popup_seen", "true");
    }
    setShow(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden max-w-lg w-full relative">

        <img src={banner.imageUrl} className="w-full object-contain" />

        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default DynamicPopup;