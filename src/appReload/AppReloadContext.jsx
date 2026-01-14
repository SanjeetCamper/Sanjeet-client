import { createContext, useContext } from "react";

const AppReloadContext = createContext(null);

export const useAppReload = () => {
  const ctx = useContext(AppReloadContext);
  if (!ctx) {
    throw new Error("useAppReload must be used inside AppReloadProvider");
  }
  return ctx;
};

export default AppReloadContext;
