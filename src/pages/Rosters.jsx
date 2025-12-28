import React, { useMemo, useRef, useState, useEffect } from "react";
import { Users, LayoutGrid, UserPlus, Shield, Upload } from "lucide-react";

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

const MIN_PLAYERS_REQUIRED = 15;

/**
 * Main Application Wrapper
 * Manages the state for all teams including logos, players, and budgets.
 */
export default function App() {
  const [teamsState, setTeamsState] = useState(() => 
    TEAM_NAMES.map((name, index) => ({
      id: index + 1,
      name,
      budget: 2000,
      players: [],
      logo: null,
    }))
  );

  const handleUpdateLogo = (teamId, newLogoData) => {
    setTeamsState((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, logo: newLogoData } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Rosters teams={teamsState} onUpdateLogo={handleUpdateLogo} />
    </div>
  );
}

/**
 * Rosters Component
 * Displays the grid of teams and handles individual team logo updates.
 */
function Rosters({ teams = [], onUpdateLogo }) {
  const fileInputRef = useRef(null);
  const [activeTeamId, setActiveTeamId] = useState(null);

  // Ensure consistent ordering based on TEAM_NAMES array
  const displayTeams = useMemo(() => {
    const teamMap = new Map(teams.map((t) => [t.name, t]));
    return TEAM_NAMES.map((name, index) => {
      const existingTeam = teamMap.get(name);
      return {
        id: existingTeam?.id || index + 1,
        name,
        budget: existingTeam?.budget ?? 2000,
        players: existingTeam?.players ?? [],
        logo: existingTeam?.logo ?? null,
      };
    });
  }, [teams]);

  const totalPlayersDrafted = useMemo(
    () => displayTeams.reduce((sum, t) => sum + t.players.length, 0),
    [displayTeams]
  );

  const handleLogoClick = (teamId) => {
    setActiveTeamId(teamId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && activeTeamId && onUpdateLogo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateLogo(activeTeamId, reader.result);
        setActiveTeamId(null);
        // Reset input value so same file can be uploaded again if needed
        e.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-in slide-in-from-right-4 duration-500">
      {/* Hidden File Input used for uploading logos */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 flex items-center gap-3">
            <LayoutGrid size={32} className="text-blue-600" />
            TEAMS AREA
          </h2>
          <p className="text-gray-500 font-medium mt-1">
            Full list of all 12 competing squads (Min {MIN_PLAYERS_REQUIRED} players/team)
          </p>
        </div>

        <div className="bg-blue-900 text-white px-8 py-4 rounded-3xl shadow-xl flex items-center gap-6">
          <div className="border-r border-blue-700 pr-6">
            <p className="text-[10px] uppercase font-black tracking-widest text-blue-300">
              Total Drafted
            </p>
            <p className="text-2xl font-black">{totalPlayersDrafted}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-blue-300">
              League Size
            </p>
            <p className="text-2xl font-black">12 Teams</p>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayTeams.map((team) => {
          const playerCount = team.players.length;
          const progress = Math.min(
            (playerCount / MIN_PLAYERS_REQUIRED) * 100,
            100
          );

          return (
            <div
              key={team.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all flex flex-col overflow-hidden"
            >
              {/* Team Header */}
              <div className="bg-gray-50 p-6 border-b flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {/* Team Logo Container - Clickable for updates */}
                  <div 
                    onClick={() => handleLogoClick(team.id)}
                    title="Click to change team logo"
                    className="group relative w-12 h-12 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0 cursor-pointer hover:border-blue-500 transition-all active:scale-95"
                  >
                    {team.logo ? (
                      <img src={team.logo} alt={team.name} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                    ) : (
                      <Shield className="text-blue-200 group-hover:opacity-40 transition-opacity" size={24} />
                    )}
                    {/* Overlay icon appearing on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/10">
                      <Upload size={16} className="text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 truncate max-w-[150px]">
                      {team.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={12} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        {playerCount} Players
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase font-black text-gray-400">
                    Budget Left
                  </p>
                  <p
                    className={`text-xl font-black ${
                      team.budget < 500 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {team.budget}
                  </p>
                </div>
              </div>

              {/* Players Section */}
              <div className="flex-grow p-5 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
                {playerCount === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 opacity-60">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <UserPlus size={32} />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest">
                      Awaiting Draft
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {team.players.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl shadow-sm hover:bg-white transition border border-transparent hover:border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              p.image ||
                              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                p.name
                              )}`
                            }
                            className="w-10 h-10 rounded-full border shadow-sm bg-white"
                            alt={p.name}
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              {p.name}
                            </p>
                            <p className="text-[10px] uppercase font-black text-blue-400">
                              {p.position}
                            </p>
                          </div>
                        </div>

                        <div className="bg-blue-900 px-3 py-1 rounded-lg">
                          <p className="text-[10px] font-bold text-white whitespace-nowrap">
                            {p.finalPrice} pts
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress Bar Section */}
              <div className="p-5 bg-gray-50 border-t mt-auto">
                <div className="flex justify-between text-xs font-black mb-2">
                  <span className="text-gray-500 uppercase tracking-tight">Squad Completion</span>
                  <span
                    className={
                      playerCount >= MIN_PLAYERS_REQUIRED
                        ? "text-green-600"
                        : "text-blue-900"
                    }
                  >
                    {playerCount} / {MIN_PLAYERS_REQUIRED}
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      playerCount >= MIN_PLAYERS_REQUIRED
                        ? "bg-green-500"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}} />
    </div>
  );
}