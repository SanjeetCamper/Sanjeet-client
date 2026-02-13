import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClientScrollBanner } from "../../context/ClientScrollBannerContext";
import { ICON_MAP } from "../../utils/bannerIcons";

const DynamicScrollSlider = () => {
  const { banners } = useClientScrollBanner();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const isHovering = useRef(false);
  const navigate = useNavigate();

  /* AUTO SLIDE */
  useEffect(() => {
    if (!banners.length) return;

    intervalRef.current = setInterval(() => {
      if (!isHovering.current) {
        setIndex((prev) => (prev + 1) % banners.length);
      }
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [banners]);

  if (!banners.length) return null;

  const banner = banners[index];
  const Icon = ICON_MAP[banner.icon];

  const bgStyle = banner.useGradient
    ? {
        backgroundImage: `linear-gradient(to right, ${banner.gradientFrom}, ${banner.gradientTo})`,
      }
    : { backgroundColor: banner.solidBg };

  const activeDotColor = banner.useGradient
    ? banner.gradientFrom
    : banner.solidBg;

  const handleClick = () => {
    if (!banner.buttonLink) return;

    if (banner.linkType === "external") {
      // window.open(banner.buttonLink, "_blank");

      const fixedLink = banner.buttonLink.startsWith("http")
        ? banner.buttonLink
        : `https://${banner.buttonLink}`;

      window.open(fixedLink, "_blank");
    } else {
      navigate(banner.buttonLink);
    }
  };

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);

  return (
    <div className="w-full bg-white">
      <div
        className="relative overflow-hidden w-full h-[120px]"
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={banner._id}
            className="absolute inset-0 flex p-4 rounded-2xl"
            style={bgStyle}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) nextSlide();
              if (info.offset.x > 50) prevSlide();
            }}
          >
            <div className="flex gap-3 items-start text-white">
              <div className="bg-white p-2 rounded-full">
                {Icon && <Icon size={18} color={banner.iconColor} />}
              </div>

              <div>
                <h2
                  className="text-sm font-semibold"
                  style={{ color: banner.headingColor }}
                >
                  {banner.heading}
                </h2>

                <p
                  className="text-xs opacity-90 mt-1"
                  style={{ color: banner.subTextColor }}
                >
                  {banner.subText}
                </p>

                {banner.buttonText && (
                  <button
                    onClick={handleClick}
                    className="mt-3 text-xs font-medium px-4 py-2 rounded-full"
                    style={{
                      background: banner.buttonBgColor,
                      color: banner.buttonTextColor,
                    }}
                  >
                    {banner.buttonText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className={`absolute left-2 bottom-1/5 -translate-y-1/2 bg-white shadow rounded-full p-1 z-10`}
        >
          <ChevronLeft size={18} className={`text-[#21c4cc]`} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute right-2 bottom-1/5 -translate-y-1/2 bg-white shadow rounded-full p-1 z-10"
        >
          <ChevronRight size={18} className="text-[#21c4cc]" />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="h-2 w-2 rounded-full transition"
            style={{
              backgroundColor: index === i ? activeDotColor : "#d1d5db",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicScrollSlider;
