import React from "react";
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
import PublicRoute from "./routes/PublicRoute.jsx";
import HeaderHome from "./components/HeaderHome.jsx";

import { useUser } from "@clerk/clerk-react";
import ProfileSettings from "./components/settingsComponents/ProfileSettings.jsx";
import ChangePassword from "./components/settingsComponents/ChangePassword.jsx";
import NotificationSettings from "./components/settingsComponents/NotificationSettings.jsx";
// import ProfileImageChange from "./components/settingsComponents/ProfileImageChange.jsx";
import EditProfileMainBox from "./components/settingsComponents/EditProfileMainBox.jsx";


const App = () => {
  const location = useLocation();
  const noFrame = location.pathname.startsWith("/dailyuser/app");
  const {isSignedIn} = useUser();
  const showHeaderHome = !noFrame && !isSignedIn; 

  return (
    <>
      <InstallPWA />

      {!noFrame && <NavBar />}
      {showHeaderHome && <HeaderHome />}

      <div className="pb-0">
        <Routes>

          {/* 🔓 Public */}
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                {/* Clerk SignIn page */}
              </PublicRoute>
            }
          />

          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                {/* Clerk SignUp page */}
              </PublicRoute>
            }
          />

          {/* 📝 Profile completion */}
          <Route path="/complete-profile" element={<CompleteProfile />} />

          {/* 🔒 Protected App */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dailyuser/*"
            element={
              <ProtectedRoute>
                <DailyUser />
              </ProtectedRoute>
            }
          />

             {/* 🎯 Full screen app (still protected) */}
          <Route
            path="/dailyuser/app/*"
            element={
              <ProtectedRoute>
                <IndexDailyUser />
              </ProtectedRoute>
            }
          />


          {/* Settings Maing Page */}
          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />

          {/* Settings Sub Pages Started Here */}
            
            <Route //Setting ke andar Edit Profile Page
            path="/setting/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfileMainBox />
              </ProtectedRoute>
            }
          />
          
          <Route // Edit Profile ke andar 
            path="/setting/open-change-profile-details"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />

          <Route //Setting me change password 
            path="/setting/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute> 
            }
          />

          <Route // setting me notification controller
            path="/setting/notifications"
            element={
              <ProtectedRoute>
                <NotificationSettings />
              </ProtectedRoute> 
            }
          />
        {/* Settings Sub Pages Ended Here */}

        </Routes>
      </div>

      {!noFrame && <ProtectedRoute><Footer /></ProtectedRoute>}
    </>
  );
};

export default App;
