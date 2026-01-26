import { Plane } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BookCamperCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 items-start bg-gradient-to-r from-[#21c4cc] to-[#1bb0b8] text-white rounded-2xl p-4">
      <div>
        <div className="bg-white p-2 rounded-full">
          <Plane size={18} className="text-[#21c4cc]"/>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold">Book Water Camper</h2>
        <p className="text-xs opacity-90 mt-1">Quick & easy water delivery</p>

        <button
          onClick={() => navigate("/book-camper")}
          className="mt-3 bg-white text-[#21c4cc] text-xs font-medium px-4 py-2 rounded-full"
        >
          Book Camper
        </button>
      </div>
    </div>
  );
};

export default BookCamperCard;
