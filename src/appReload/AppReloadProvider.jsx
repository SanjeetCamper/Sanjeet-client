import { useState } from "react";
import AppReloadContext from "./AppReloadContext.jsx";
import App from "../App.jsx";

const AppReloadProvider = () => {
  const [appKey, setAppKey] = useState(0);

  const reloadApp = () => {
    setAppKey(prev => prev + 1);
  };

  return (
    <AppReloadContext.Provider value={{ reloadApp }}>
      {/* 👇 KEY CHANGE = FULL APP REMOUNT */}
      <App key={appKey} />
    </AppReloadContext.Provider>
  );
};

export default AppReloadProvider;
