import React, { useEffect, useState } from "react";
import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DailyUser from "./pages/DailyUser";
import Setting from "./pages/Setting";
import Notification from "./pages/Notification";
import IndexDailyUser from "./pages/dailyUserApp/indexDailyUser.jsx";
import CompleteProfile from "./pages/CompleteProfile.jsx";

import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import InstallPWA from "./InstallPWA.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
// import PublicRoute from "./routes/PublicRoute.jsx";
import HeaderHome from "./components/HeaderHome.jsx";

import { useUser } from "@clerk/clerk-react";
import ProfileSettings from "./components/settingsComponents/ProfileSettings.jsx";
import ChangePassword from "./components/settingsComponents/ChangePassword.jsx";
import NotificationSettings from "./components/settingsComponents/NotificationSettings.jsx";
// import ProfileImageChange from "./components/settingsComponents/ProfileImageChange.jsx";
import EditProfileMainBox from "./components/settingsComponents/EditProfileMainBox.jsx";
import { useContextUser } from "./context/UserContext.jsx";
import ProfileGuard from "./routes/ProfileGaurd.jsx";
import NetworkListener from "./components/NetworkListener.jsx";

const App = () => {
  const location = useLocation();
  const { user , loading} = useContextUser();
  const noFrame = location.pathname.startsWith("/dailyuser/app");
  const { isSignedIn } = useUser();
  const showHeaderHome = !noFrame && !isSignedIn;


  

  return (
    <>
      <NetworkListener />
      <InstallPWA />

      {!noFrame  && <NavBar />}
      {showHeaderHome && <HeaderHome />}

          {/* 🔥 PROFILE BLOCKER */}
      {user && !user.isProfileComplete && <CompleteProfile />}

      <div className="pb-0">
        <Routes>

          {/* 🔒 Protected App */}
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
                <ProfileGuard >
                  <DailyUser />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          {/* 🎯 Full screen app (still protected) */}
          <Route
            path="/dailyuser/app/*"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <IndexDailyUser />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          {/* Settings Maing Page */}
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

          {/* Settings Sub Pages Started Here */}

          <Route //Setting ke andar Edit Profile Page
            path="/setting/edit-profile"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <EditProfileMainBox />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route // Edit Profile ke andar
            path="/setting/open-change-profile-details"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <ProfileSettings />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route //Setting me change password
            path="/setting/change-password"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <ChangePassword />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />

          <Route // setting me notification controller
            path="/setting/notifications"
            element={
              <ProtectedRoute>
                <ProfileGuard>
                  <NotificationSettings />
                </ProfileGuard>
              </ProtectedRoute>
            }
          />
          {/* Settings Sub Pages Ended Here */}
        </Routes>
      </div>

      {!noFrame && (
        <ProtectedRoute>
          <ProfileGuard>
            <Footer />
          </ProfileGuard>
        </ProtectedRoute>
      )}
    </>
  );
};

export default App;
