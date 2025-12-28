import React from "react";
import {useNavigate} from 'react-router-dom'

const BookCamperCard = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-[#21c4cc] text-white rounded-2xl p-4">
      <h2 className="text-sm font-semibold">Book Water Camper</h2>
      <p className="text-xs opacity-90 mt-1">
        Quick & easy water delivery
      </p>

      <button onClick={()=>navigate('/dashboard/book-camper')} className="mt-3 bg-white text-[#21c4cc] text-xs font-medium px-4 py-2 rounded-full">
        Book Camper
      </button>
    </div>
  );
};

export default BookCamperCard;
