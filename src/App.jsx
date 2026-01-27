import React from "react";
import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DailyUser from "./pages/DailyUser";
import Setting from "./pages/Setting";
import Notification from "./pages/Notification";
import CompleteProfile from "./pages/CompleteProfile.jsx";

import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import InstallPWA from "./InstallPWA.jsx";
import HeaderHome from "./components/HeaderHome.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ProfileGuard from "./routes/ProfileGaurd.jsx";

import ProfileSettings from "./components/settingsComponents/ProfileSettings.jsx";
import ChangePassword from "./components/settingsComponents/ChangePassword.jsx";
import NotificationSettings from "./components/settingsComponents/NotificationSettings.jsx";
import EditProfileMainBox from "./components/settingsComponents/EditProfileMainBox.jsx";

import MembershipPlans from "./pages/MembershipPlans.jsx";
import CreateDailyUserCredentials from "./pages/CreateDailyUserCredentials.jsx";
import DailyUserWrapper from "./pages/dailyUserApp/DailyUserWrapper.jsx";

import ReloadAppButton from "./appReload/ReloadAppButton.jsx";
import OrderCamper from "./pages/OrderCamper.jsx";
import BookCamper from "./pages/BookCamper.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import ToastSettings from "./pages/ToastSettings.jsx";

import NetworkListener from "./components/network/NetworkListener.jsx";
import { useContextUser } from "./context/UserContext.jsx";

const App = () => {
  const location = useLocation();
  const { user } = useContextUser();

  const noFrame = location.pathname.startsWith("/dailyuser/app");
  const showHeaderHome = !noFrame && !user;

  return (
    <>
      <NetworkListener />
      <InstallPWA />

      {!noFrame && <NavBar />}
      {showHeaderHome && <HeaderHome />}

      <div className="pb-0">
        <Routes>
          {/* 🔒 Protected + Profile Guarded Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <Home />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-place"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <OrderCamper />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/book-camper"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <BookCamper />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <MyOrder />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <Dashboard />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/membership/plans"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <MembershipPlans />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/daily-user/create-credentials"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <CreateDailyUserCredentials />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <Notification />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dailyuser/*"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <DailyUser />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          {/* 🔲 Full screen Daily User App */}
          <Route
            path="/dailyuser/app/*"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <DailyUserWrapper />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          {/* ⚙️ Settings */}
          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <Setting />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting/edit-profile"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <EditProfileMainBox />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting/open-change-profile-details"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <ProfileSettings />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting/change-password"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <ChangePassword />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting/notifications"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <NotificationSettings />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting/toast-notifications"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <ToastSettings />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          {/* 🧩 Profile Completion Page */}
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {!noFrame && (
        <>
          <Footer />
          <ReloadAppButton />
        </>
      )}
    </>
  );
};

export default App;
