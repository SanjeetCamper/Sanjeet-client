import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import { registerSW } from "virtual:pwa-register"; // 👈 add this
import { UserProvider } from "./context/UserContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { MembershipProvider } from "./context/MembershipContext.jsx";
import { DailyUserCredentialsProvider } from "./context/DailyUserCredentialsContext.jsx";
import AppReloadProvider from "./appReload/AppReloadProvider.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { VillageProvider } from "./context/VillageContext.jsx";
import { ToastSettingsProvider } from "./context/ToastSettingsContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

registerSW(); // 👈 call once, बस

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

document.addEventListener("contextmenu", (e) => {
  if (
    e.target.tagName === "IMG" ||
    e.target.tagName === "SVG" ||
    e.target.closest("svg") ||
    e.target.closest("a")
  ) {
    e.preventDefault();
  }
});

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <ToastSettingsProvider>
        <ToastProvider>
          <UserProvider>
            <NotificationProvider>
              <DailyUserCredentialsProvider>
                <MembershipProvider>
                  <OrderProvider>
                    <VillageProvider>
                      <AppReloadProvider />
                    </VillageProvider>
                  </OrderProvider>
                </MembershipProvider>
              </DailyUserCredentialsProvider>
            </NotificationProvider>
          </UserProvider>
        </ToastProvider>
      </ToastSettingsProvider>
    </BrowserRouter>
  </ClerkProvider>,
);
