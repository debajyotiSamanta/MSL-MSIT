import React, { useState, useMemo, useRef } from "react";
import {
  Gavel,
  CheckCircle,
  Shield,
  Search,
  Zap,
  TrendingUp,
  ArrowRight,
  Users,
  UserCheck,
  UserMinus,
  Upload,
} from "lucide-react";

/* ---------------- CONSTANTS ---------------- */

const INITIAL_BUDGET = 2000;

const TEAM_NAMES = [
  "Shaolin Monks",
  "Spitting Cobras",
  "ThunderDrakes FC",
  "Benzofury FC",
  "Royal Mariners",
  "Zenyx FC",
  "Timberwolves",
  "Jager Masters",
  "Unemployed XI FC",
  "Cosmic Knights",
  "United FC",
  "Blitzkrieg FC",
];

// Helper to generate a unique logo URL for each team
const getTeamLogo = (name) => `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

const MOCK_REGISTERED_PLAYERS = {
  "1": {
    id: "1",
    name: "Arjun Mehta",
    position: "Midfielder",
    basePrice: 10,
    desc: "Playmaker with exceptional vision and passing accuracy.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun",
  },
  "2": {
    id: "2",
    name: "Rohan Das",
    position: "Striker",
    basePrice: 10,
    desc: "Clinical finisher with explosive pace.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Rohan",
  },
  "3": {
    id: "3",
    name: "Vikram Singh",
    position: "Defender",
    basePrice: 10,
    desc: "Rock-solid center back with great aerial ability.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Vikram",
  },
  "4": {
    id: "4",
    name: "Samir Khan",
    position: "Goalkeeper",
    basePrice: 10,
    desc: "Lightning-fast reflexes and vocal leadership.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Samir",
  },
};

/* ---------------- COMPONENT ---------------- */

export default function App() {
  const [teams, setTeams] = useState(
    TEAM_NAMES.map((name, index) => ({
      id: index + 1,
      name,
      budget: INITIAL_BUDGET,
      players: [],
      logo: getTeamLogo(name)
    }))
  );

  const [currentBid, setCurrentBid] = useState(10);
  const [leadingTeamId, setLeadingTeamId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRegId, setSearchRegId] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(
    MOCK_REGISTERED_PLAYERS["1"]
  );
  const [isSold, setIsSold] = useState(false);
  const [viewTab, setViewTab] = useState("unsold"); // 'unsold' | 'sold'
  
  // Ref for file input
  const fileInputRef = useRef(null);
  const [activeUploadTeamId, setActiveUploadTeamId] = useState(null);

  /* ---------------- HANDLERS ---------------- */

  const handleBid = (teamId, increment) => {
    if (isSold) return;
    const team = teams.find((t) => t.id === teamId);
    const newBid = currentBid + increment;
    if (team.budget < newBid) return;
    setCurrentBid(newBid);
    setLeadingTeamId(teamId);
  };

  const handlePlayerSearch = () => {
    const player = MOCK_REGISTERED_PLAYERS[searchRegId];
    if (!player) return;
    setCurrentPlayer(player);
    setCurrentBid(player.basePrice);
    setLeadingTeamId(null);
    setIsSold(false);
  };

  const handleNextPlayer = () => {
    const ids = Object.keys(MOCK_REGISTERED_PLAYERS);
    const index = ids.indexOf(currentPlayer.id);
    const next = MOCK_REGISTERED_PLAYERS[ids[(index + 1) % ids.length]];
    setCurrentPlayer(next);
    setCurrentBid(next.basePrice);
    setLeadingTeamId(null);
    setIsSold(false);
    setSearchRegId("");
  };

  const handleSold = () => {
    if (!leadingTeamId || isSold) return;
    setTeams((prev) =>
      prev.map((team) =>
        team.id === leadingTeamId
          ? {
              ...team,
              budget: team.budget - currentBid,
              players: [
                ...team.players,
                { ...currentPlayer, finalPrice: currentBid },
              ],
            }
          : team
      )
    );
    setIsSold(true);
  };

  const handleLogoUploadClick = (teamId) => {
    setActiveUploadTeamId(teamId);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && activeUploadTeamId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeams(prev => prev.map(t => 
          t.id === activeUploadTeamId ? { ...t, logo: reader.result } : t
        ));
        setActiveUploadTeamId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  /* ---------------- DERIVED ---------------- */

  const leadingTeamName =
    teams.find((t) => t.id === leadingTeamId)?.name || "No Bids Yet";

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const soldPlayerIds = useMemo(() => {
    return teams.flatMap((t) => t.players.map((p) => p.id));
  }, [teams]);

  const directoryPlayers = useMemo(() => {
    const allPlayers = Object.values(MOCK_REGISTERED_PLAYERS);
    if (viewTab === "sold") {
      return allPlayers
        .filter((p) => soldPlayerIds.includes(p.id))
        .map((p) => {
          const ownerTeam = teams.find((t) =>
            t.players.find((tp) => tp.id === p.id)
          );
          const soldData = ownerTeam?.players.find((tp) => tp.id === p.id);
          return { ...p, owner: ownerTeam?.name, finalPrice: soldData?.finalPrice };
        });
    }
    return allPlayers.filter((p) => !soldPlayerIds.includes(p.id));
  }, [viewTab, soldPlayerIds, teams]);

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pb-32 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Hidden File Input for Logo Updates */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />

      {/* LIVE AUCTION CARD */}
      <div className="mb-12 bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden relative">
        {isSold && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur z-10 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center scale-110">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-black mb-2">SOLD!</h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6">
                to {leadingTeamName}
              </p>
              <button
                onClick={handleNextPlayer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 mx-auto shadow-lg active:scale-95"
              >
                NEXT PLAYER <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* AUCTION BAR */}
        <div className="bg-blue-900 px-8 py-4 flex flex-col md:flex-row gap-4 items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-orange-500 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Now Bidding
            </span>
          </div>

          <div className="flex items-center bg-blue-800/50 rounded-full px-2 py-1 border border-blue-700 w-full md:w-auto">
            <input
              placeholder="Search Reg ID"
              value={searchRegId}
              onChange={(e) => setSearchRegId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePlayerSearch()}
              className="bg-transparent text-xs font-bold px-3 py-1 outline-none text-white w-full md:w-32"
            />
            <button
              onClick={handlePlayerSearch}
              className="bg-orange-500 p-1.5 rounded-full hover:bg-orange-600"
            >
              <Search size={14} />
            </button>
          </div>

          <span className="bg-red-500 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">
            LIVE
          </span>
        </div>

        {/* PLAYER INFO */}
        <div className="p-8 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src={currentPlayer.image}
                alt={currentPlayer.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-5 space-y-4">
            <h2 className="text-4xl font-black text-blue-900">
              {currentPlayer.name}
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-xs">
                {currentPlayer.position}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-bold text-xs">
                Base: {currentPlayer.basePrice} pts
              </span>
            </div>
            <p className="text-gray-500 italic text-sm">
              {currentPlayer.desc}
            </p>
          </div>

          {/* BID PANEL */}
          <div className="md:col-span-12 lg:col-span-4 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
              Current Bid
            </p>
            <p className="text-5xl font-black text-blue-900 mb-4">
              {currentBid} <span className="text-sm opacity-50">pts</span>
            </p>

            <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm mb-4">
              <Shield size={16} className="text-blue-600" />
              <span className="font-bold text-sm truncate">
                {leadingTeamName}
              </span>
            </div>

            {leadingTeamId && (
              <button
                onClick={handleSold}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Gavel size={18} /> MARK AS SOLD
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PLAYER DIRECTORY SECTION */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Users size={24} className="text-blue-600" />
            Player Directory
          </h3>
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setViewTab("unsold")}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                viewTab === "unsold"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <UserMinus size={16} /> Remaining
            </button>
            <button
              onClick={() => setViewTab("sold")}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                viewTab === "sold"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <UserCheck size={16} /> Sold
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {directoryPlayers.length > 0 ? (
            directoryPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={player.image}
                  className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100"
                  alt={player.name}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate">
                    {player.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {player.position} • ID: {player.id}
                  </p>
                  {viewTab === "sold" && (
                    <p className="text-[10px] text-green-600 font-bold mt-1 truncate">
                      Sold to {player.owner} @ {player.finalPrice}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">
                No players found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BIDDING PANEL HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp size={24} className="text-blue-600" />
          Team Standings
        </h3>

        <input
          placeholder="Filter teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-full text-sm outline-none w-48 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TEAMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTeams.map((team) => {
          const isLeading = team.id === leadingTeamId;
          return (
            <div
              key={team.id}
              className={`bg-white rounded-2xl border-2 p-5 transition-all ${
                isLeading
                  ? "border-blue-600 shadow-xl bg-blue-50/30"
                  : "border-gray-100 hover:border-blue-200"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4 overflow-hidden">
                  {/* Clickable Team Logo for Upload */}
                  <div 
                    onClick={() => handleLogoUploadClick(team.id)}
                    className="group/logo relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 border-2 border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:border-blue-400 transition-colors"
                    title="Click to update logo"
                  >
                    <img 
                      src={team.logo} 
                      alt={`${team.name} Logo`} 
                      className="w-full h-full object-cover group-hover/logo:opacity-30 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity">
                      <Upload size={18} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm truncate text-gray-900 leading-tight">{team.name}</h4>
                    <p className="text-[9px] text-gray-400 font-bold tracking-tighter">TEAM {team.id}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded flex-shrink-0 ${
                    isLeading
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isLeading ? "LEADING" : `T${team.id}`}
                </span>
              </div>

              <p className="text-xl font-black text-blue-900 mb-4">
                {team.budget}{" "}
                <span className="text-[10px] text-gray-400 font-normal">
                  pts left
                </span>
              </p>

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {[10, 50].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleBid(team.id, amt)}
                      disabled={
                        team.budget < currentBid + amt ||
                        isLeading ||
                        isSold
                      }
                      className="py-2 rounded-lg bg-blue-100 text-blue-600 font-bold text-xs hover:bg-blue-200 disabled:opacity-30 transition-colors"
                    >
                      +{amt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleBid(team.id, 100)}
                  disabled={
                    team.budget < currentBid + 100 || isLeading || isSold
                  }
                  className="py-2 rounded-lg bg-red-100 text-red-600 font-bold text-xs hover:bg-red-200 disabled:opacity-30 border border-red-200 transition-colors"
                >
                  +100 Points
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}