import { cld } from "../lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export default function Banner() {
  const img = cld.image("IMG_20250908_181626_utl5tt")
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(800).height(500));

  return (
    <div className="w-full">
      <AdvancedImage cldImg={img} className="w-full rounded-xl" />
    </div>
  );
}
