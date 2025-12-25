import React from "react";
import { Plus } from "lucide-react";

const AddEntryButton = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="w-full bg-[#21c4cc] text-white rounded-xl py-3 flex items-center justify-center gap-2 active:scale-95 transition mb-4"
    >
      <Plus size={18} />
      <span className="text-sm font-medium">Add Entry</span>
    </button>
  );
};

export default AddEntryButton;
