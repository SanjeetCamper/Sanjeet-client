import React ,{useEffect, useState} from "react";
import Banner from "../CloudinaryStorage/Banner";

const ImageGallery = () => {
  const images = [
    "/Campers.png",
    // "https://res.cloudinary.com/dsjr8tatb/image/upload/v1765184508/IMG_20250908_181626_utl5tt.jpg",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
    // "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png",

  ];

  const [mainImg, setMainImg] = useState(images[1]);

  useEffect(() => {
  const interval = setInterval(() => {
    setMainImg((prev) => {
      const currentIndex = images.indexOf(prev);
      const nextIndex = (currentIndex + 1) % images.length;
      return images[nextIndex];
    });
  }, 4000); // 3 seconds auto change

  return () => clearInterval(interval);
}, [images]);

  return (
    <div className="flex flex-col items-center space-y-4 mt-5">
      {/* Main Image */}
      <div className="w-full max-w-3xl">
        <img
          src={mainImg}
          alt="Main"
          className="w-full rounded-lg transition duration-500"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 max-w-3xl gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            onClick={() => setMainImg(src)}
            className={`rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80 border ${
              mainImg === src ? "border-blue-500" : "border-transparent"
            }`}
            alt={`Thumb ${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
