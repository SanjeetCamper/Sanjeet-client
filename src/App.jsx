import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import DailyUser from "./pages/DailyUser";
import { useUser } from "@clerk/clerk-react";
import Setting from "./pages/Setting";
import NavBar from "./components/Navbar.jsx"

const App = () => {
  const { user } = useUser();

  return (
    <>
      <NavBar />
      <div className="pt-16 pb-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/dailyuser" element={<DailyUser />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
      {user && <Footer />}
    </>
  );
};

export default App;
