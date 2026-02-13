import { useEffect, useState , useRef } from "react";
import { useClientGallery } from "../context/ClientGalleryContext";
import { useNavigate } from "react-router-dom";

const DynamicImageGallery = () => {
  const { items } = useClientGallery();
  const [mainIndex, setMainIndex] = useState(0);
  const navigate = useNavigate();

  /* AUTO SLIDE */
  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);


  if (!items.length) return null;

  const current = items[mainIndex];

  /* CLICK FIX (Internal + External) */
  const handleClick = (item) => {
    if (!item.link) return;

    if (item.linkType === "external") {
      const fixed = item.link.startsWith("http")
        ? item.link
        : `https://${item.link}`;

      window.open(fixed, "_blank");
    } else {
      navigate(item.link);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-5">

      {/* MAIN IMAGE */}
      <div className="w-full max-w-4xl relative">
        <img
          src={current.imageUrl}
          alt="Main"
          onClick={() => handleClick(current)}
          className="w-full h-64 md:h-80 rounded-xl object-cover transition duration-500 cursor-pointer"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 md:grid-cols-6 max-w-4xl gap-4">
        {items.map((item, i) => (
          <img
            key={item._id}
            src={item.imageUrl}
            onClick={() => setMainIndex(i)}
            className={`w-full h-16 md:h-20 rounded-lg object-cover cursor-pointer border transition ${
              mainIndex === i
                ? "border-[#21c4cc] scale-105"
                : "border-transparent hover:opacity-80"
            }`}
            alt={`Thumb ${i}`}
          />
        ))}
      </div>

    </div>
  );
};

export default DynamicImageGallery;








