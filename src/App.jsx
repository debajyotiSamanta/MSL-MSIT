import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Register from "./pages/Register";
import Rosters from "./pages/Rosters";
import MatchSchedule from "./pages/MatchSchedule";
import Rulebook from "./pages/Rulebook";
import Venue from "./pages/Venue";
import PastWinners from "./pages/Gallery";
import ManagerRegistration from "./pages/ManagersRegistration";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-grow">
        {activePage === "home" && <Home onNavigate={handleNavigate} />}
        {activePage === "auction" && <Auction />}
        {activePage === "rosters" && <Rosters />}
        {activePage === "register" && <Register />}
        {activePage === "schedule" && <MatchSchedule />}
        {activePage === "rulebook" && <Rulebook />}
        {activePage === "venue" && <Venue />}
        {activePage === "gallery" && <PastWinners />}
        {activePage === "managers" && <ManagerRegistration />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}


