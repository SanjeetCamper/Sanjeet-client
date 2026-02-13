import { useEffect , useState } from "react";

const DynamicGallery = ({ images }) => {
  const [main, setMain] = useState(images[0]);

  useEffect(() => {
    const i = setInterval(() => {
      setMain((p) => {
        const ci = images.indexOf(p);
        const ni = (ci + 1) % images.length;
        return images[ni];
      });
    }, 3000);

    return () => clearInterval(i);
  }, [images]);

  return (
    <div className="flex flex-col items-center space-y-4 mt-5">

      <img
        src={main.imageUrl}
        className="w-full max-w-3xl h-60 rounded-xl object-cover"
      />

      <div className="grid grid-cols-4 max-w-3xl gap-4">
        {images.map((img) => (
          <img
            key={img._id}
            src={img.imageUrl}
            onClick={() => setMain(img)}
            className={`w-full h-16 rounded-lg object-cover cursor-pointer ${
              main._id === img._id ? "border-2 border-[#21c4cc]" : "border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


export default DynamicGallery;