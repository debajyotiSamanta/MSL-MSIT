import { Trophy, Menu } from "lucide-react";
import { useState } from "react";

export default function Header({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false);

  const linkClass = (page) =>
    `text-sm font-bold transition-colors ${
      activePage === page ? "text-orange-400" : "hover:text-orange-400"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-blue-900/95 backdrop-blur-md border-b border-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="h-12 w-12 bg-white rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="../src/assets/msit-logo.png"
              alt="MSIT Logo"
              className="h-.9 w-.9 object-cover"
            />
          </div>

          <div className="h-8 w-[1px] bg-blue-700 hidden sm:block" />

          <div className="h-12 w-12 bg-orange-500 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="../src/assets/udaan-logo.jpg"
              alt="UDAAN Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-8 w-[1px] bg-blue-700 hidden sm:block" />
          <div className="h-12 w-12 bg-white rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="../src/assets/msl-logo.png"
              alt="MSL Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            {/* <div className="bg-orange-500 p-1.5 rounded-lg">
              <Trophy size={18} />
            </div> */}
            <span className="text-3xl font-black italic hidden lg:block">
              MSL <span className="text-orange-500">2026</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button className={linkClass("home")} onClick={() => onNavigate("home")}>
            HOME
          </button>
          <button className={linkClass("auction")} onClick={() => onNavigate("auction")}>
            AUCTION
          </button>
          <button className={linkClass("rosters")} onClick={() => onNavigate("rosters")}>
            TEAMS
          </button>
          <button
            onClick={() => onNavigate("register")}
            className="bg-orange-500 px-5 py-2 rounded-full text-xs font-black"
          >
            REGISTER
          </button>
        </nav>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800 p-6 space-y-4">
          {["home", "auction", "rosters", "register"].map((p) => (
            <button
              key={p}
              onClick={() => {
                onNavigate(p);
                setOpen(false);
              }}
              className="block w-full text-left font-bold"
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
