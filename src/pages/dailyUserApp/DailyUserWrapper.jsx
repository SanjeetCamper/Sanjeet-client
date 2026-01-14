import { useState } from "react";
import IndexDailyUser from './indexDailyUser.jsx'
import ReloadDailyUserContext from "./dailyUserContext/DailyUserReloadContext.jsx";

const DailyUserWrapper = () => {
  const [reloadKey, setReloadKey] = useState(0);

  const reloadMiniApp = () => {
    setReloadKey(prev => prev + 1);
  };

  return (
    <ReloadDailyUserContext.Provider value={{ reloadMiniApp }}>
      <IndexDailyUser key={reloadKey} />
    </ReloadDailyUserContext.Provider>
  );
};

export default DailyUserWrapper;
