import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButtonByNavigate = ({urlPath , urlHeading}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3">
      <ChevronLeft className="text-gray-500" size={22} onClick={() => navigate(urlPath)} />
      <h1 className="text-gray-600">{urlHeading}</h1>
    </div>
  );
};

export default BackButtonByNavigate;
