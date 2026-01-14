import { createContext, useContext } from "react";

const ReloadDailyUserContext = createContext(null);

export const useReloadDailyUser = () => {
  const ctx = useContext(ReloadDailyUserContext);
  if (!ctx) {
    throw new Error("useReloadDailyUser must be used inside Provider");
  }
  return ctx;
};

export default ReloadDailyUserContext;
