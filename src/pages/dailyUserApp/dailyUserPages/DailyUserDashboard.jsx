import React, { useState } from "react";
import DailyUserWelcomeCard from "../dailyUserComponents/dailyUserDashboard/DailyUserWelcomeCard.jsx";
import DailyUserTodaySummaryCard from "../dailyUserComponents/dailyUserDashboard/DailyUserTodaySummaryCard.jsx";
import DailyUserInfoCard from "../dailyUserComponents/dailyUserDashboard/DailyUserInfoCard.jsx";
import { useDailyUser } from "../dailyUserContext/DailyUserContext";
import FullPageLoader from '../../../components/FullPageLoader.jsx'
import AddEntryButton from '../dailyUserComponents/dailyUserDashboard/AddEntryButton.jsx'
import ProfessionalEntryModal from "../dailyUserComponents/dailyUserDashboard/ProfessionalEntryModal.jsx";
import DashboardShowCard from "../dailyUserComponents/dailyUserDashboard/DashboardShowCard.jsx";
import {useToast} from '../../../context/ToastContext.jsx'
import dailyEntryApi from "../../../utils/dailyEntryApi.js";

const DailyUserDashboard = () => {
  const {loading , dailyUser , summary , todaySummary , refreshHistory ,refreshToday ,refreshUserSummary} = useDailyUser();
  const [open , setOpen] = useState(false);
  const {showToast} = useToast();

  const handleAddEntry = async (data) => {
  try {
    await dailyEntryApi.post("/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dailyUserToken")}`,
      },
    });

    // 🔄 AUTO REFRESH (yehi magic hai)
    refreshUserSummary();
    refreshToday();
    refreshHistory();
    showToast("Entry Added" , "success");

  } catch (err) {
    showToast("Failed to add entry");
  }
};


  if(loading)<FullPageLoader />

  return (
    <div className="pt-4 px-4 pb-22">
      <AddEntryButton onOpen={()=>setOpen(true)} />
      <DailyUserWelcomeCard dailyUser={dailyUser}/>
      <DashboardShowCard summary={summary}/>
      <DailyUserTodaySummaryCard todaySummary={todaySummary}/>
      <DailyUserInfoCard />

      {/* <AddEntryModal open={open} onClose={()=>setOpen(false)} /> */}
      <ProfessionalEntryModal open={open} onClose={()=>setOpen(false)} onSubmit={handleAddEntry}  />
    </div>
  );
};

export default DailyUserDashboard;
