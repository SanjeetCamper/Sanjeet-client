import React, { useState } from "react";
import ExportReportModal from "./ExportReportModal";

const ExportButton = ({history}) => {
    const [showExport, setShowExport] = useState(false);
  return (
    <div className="fixed z-100 bottom-25 right-10">
      <button onClick={() => setShowExport(true)} className="bg-[#21c4cc] text-white shadow border border-gray-300 py-2 px-5 rounded-full">Export</button>

      {showExport && (
        <ExportReportModal
          history={history}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};

export default ExportButton;
