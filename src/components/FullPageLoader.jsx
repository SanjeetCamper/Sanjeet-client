import React from "react";

const FullPageLoader = ({value}) => {
  return (
    <div className="fixed top-0 left-0 z-100">
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-blue-200 border-t-[#19a1a8] animate-spin" />
          <h1 className="text-lg font-semibold text-[#19a1a8]">
            Sanjeet Water Supplier
          </h1>
          <p className="text-xs text-gray-500">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
