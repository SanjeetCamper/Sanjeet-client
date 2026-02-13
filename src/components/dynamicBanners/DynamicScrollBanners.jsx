import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const  DynamicScrollBanners =({ slides }) => {
  const [index, setIndex] = useState(0);
  const isHover = useRef(false);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden w-full h-[150px] bg-white">

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index]._id}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 p-3 cursor-pointer"
        >
          <div
            style={{ backgroundColor: slides[index].bgColor, color: slides[index].textColor }}
            className="p-4 rounded-xl h-full flex items-center gap-3"
            onClick={() => slides[index].buttonLink && window.open(slides[index].buttonLink)}
          >
            {slides[index].imageUrl && (
              <img src={slides[index].imageUrl}
                className="w-16 h-16 rounded-lg object-cover border"
              />
            )}

            <div>
              <h2 className="font-semibold text-sm">{slides[index].title}</h2>
              <p className="text-xs opacity-80">{slides[index].subtitle}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}


export default DynamicScrollBanners;