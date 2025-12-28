import React from "react";
import {
  Trophy,
  Users,
  Gavel,
  Activity,
  UserPlus,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const stats = [
  { icon: Users, value: "120+", label: "Players", color: "text-blue-600" },
  { icon: Trophy, value: "12", label: "Teams", color: "text-orange-500" },
  { icon: Gavel, value: "Live", label: "Auction", color: "text-green-600" },
  { icon: Activity, value: "2026", label: "Season", color: "text-purple-600" },
];

export default function Home({ onNavigate }) {
  return (
    <main className="flex-grow animate-in fade-in duration-700">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-blue-900 text-white rounded-b-[4rem] pb-20 pt-10 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left */}
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-2 rounded-full backdrop-blur-sm">
                <Activity size={16} className="text-orange-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Season 2026 is Live
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                MEGHNAD SAHA <span className="text-orange-500">SOCCER</span>{" "}
                LEAGUE
              </h1>

              <p className="text-lg text-blue-100 font-medium max-w-lg">
                The ultimate collegiate auction-based football tournament. Build
                your dream squad, manage your budget(Points) in auction, and dominate the field.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                  onClick={() => onNavigate?.("auction")}
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-orange-900/20 transition-all active:scale-95"
                >
                  <Gavel size={20} /> ENTER AUCTION
                </button>

                <button
                  onClick={() => onNavigate?.("register")}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-black transition-all active:scale-95"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 relative">
              <div className="relative z-10 bg-gradient-to-br from-blue-800 to-blue-950 p-4 rounded-3xl border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
                  alt="Soccer Stadium"
                  className="rounded-2xl grayscale-[0.2] hover:grayscale-0 transition-all"
                />
              </div>

              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex flex-col items-center text-center hover:-translate-y-1 transition-all"
              >
                <div className={`p-3 rounded-2xl bg-gray-50 mb-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <p className="text-2xl font-black text-gray-900">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HUB SECTION */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 uppercase italic">
              Tournament Hub
            </h2>
            <p className="text-gray-500 font-medium">
              Manage your MSL experience
            </p>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <HubCard
            icon={Gavel}
            title="Live Auction"
            desc="Real-time bidding system for team owners."
            color="blue"
            action={() => onNavigate?.("auction")}
            bgIcon={Trophy}
          />
          <HubCard
            icon={Users}
            title="Team Rosters"
            desc="View finalized team compositions."
            color="green"
            action={() => onNavigate?.("rosters")}
            bgIcon={ShieldCheck}
          />
          <HubCard
            icon={UserPlus}
            title="Player Registration"
            desc="Join the player pool for the auction."
            color="orange"
            action={() => onNavigate?.("register")}
            bgIcon={Activity}
          />
          <HubCard
            icon={UserPlus}
            title="Manager Registration"
            desc="Join the manager pool for the event."
            color="orange"
            action={() => onNavigate?.("managers")}
            bgIcon={Activity}
          />
        </div>
      </div>
    </main>
  );
}

/* ---------------- HUB CARD ---------------- */

function HubCard({ icon: Icon, title, desc, action, color, bgIcon: Bg }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    green: "bg-green-50 text-green-600 group-hover:bg-green-600",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
  };

  return (
    <div
      onClick={action}
      className="group cursor-pointer bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
    >
      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colors[color]} group-hover:text-white`}
        >
          <Icon size={28} />
        </div>

        <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-6">{desc}</p>

        <div className="flex items-center font-bold text-sm gap-1 text-gray-700 group-hover:gap-3 transition-all">
          Explore <ChevronRight size={18} />
        </div>
      </div>

      <Bg
        size={150}
        className="absolute -right-4 -bottom-4 text-gray-50 opacity-10 group-hover:scale-110 transition-transform"
      />
    </div>
  );
}
