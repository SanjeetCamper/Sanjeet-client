import React, { useEffect, useState } from "react";
import ExportReportModal from "./ExportReportModal";

const ExportButton = ({ history }) => {
  const [openExport, setOpenExport] = useState(false);

  return (
    <div className="fixed z-100 bottom-25 right-10">
      <div>
        <button
        onClick={() => setOpenExport(true)}
        className="bg-[#21c4cc] text-white shadow border border-gray-300 py-2 px-5 rounded-full"
      >
        Export
      </button>

      {openExport && (
        <ExportReportModal
          history={history}
          open={openExport}
          onClose={() => setOpenExport(false)}
        />
      )}
      </div>
    </div>
  );
};

export default ExportButton;
