import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MembershipPlanPurchaseBanner from "./dashboardComponents/MembershipPlanPurchaseBanner";
import BookCamperCard from "./dashboardComponents/BookCamperCard";

const slides = [
   {
    id: 1,
    component: <MembershipPlanPurchaseBanner />,
  },
  {
    id: 2,
    component: <BookCamperCard />,
  },
];

const BannerScrollForDash = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const isHovering = useRef(false);

  /* 🔁 Auto scroll */
  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isHovering.current) {
        setIndex((prev) => (prev + 1) % slides.length);
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
  };

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="w-full bg-white">
      <div
        className="relative overflow-hidden w-full h-[120px]"
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            className={`absolute inset-0 flex items-center justify-center cursor-pointer text-lg font-semibold ${slides[index].bg}`}
            onClick={slides[index].onClick}
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
            <div className="w-full">{slides[index].component}</div>
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 bottom-1/5 -translate-y-1/2 bg-white shadow rounded-full p-1 z-10"
        >
          <ChevronLeft size={18} className="text-[#21c4cc]"/>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 bottom-1/5 -translate-y-1/2 bg-white shadow rounded-full p-1 z-10"
        >
          <ChevronRight size={18} className="text-[#21c4cc]" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              index === i ? "bg-[#21c4cc]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerScrollForDash;