import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButtonByNavigate = ({urlPath , urlHeading}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1">
      <ChevronLeft className="text-gray-500" size={18} onClick={() => navigate(urlPath)} />
      <h1 className="text-gray-600 text-[13px]">{urlHeading}</h1>
    </div>
  );
};

export default BackButtonByNavigate;
