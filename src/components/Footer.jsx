import {
  Trophy,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-blue-950 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-xl">
                <Trophy size={20} className="text-white" />
              </div>
              <span className="text-xl font-black italic tracking-tighter uppercase">
                MSL 2026
              </span>
            </div>

            <p className="text-blue-200 text-sm leading-relaxed">
              Empowering the next generation of football talent through a
              competitive, transparent, and exciting auction-based league.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-orange-500 text-xs">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-blue-200">
              <li onClick={() => onNavigate("home")} className="hover:text-white cursor-pointer transition-colors">
                Home
              </li>
              <li onClick={() => onNavigate("auction")} className="hover:text-white cursor-pointer transition-colors">
                Auction Room
              </li>
              <li onClick={() => onNavigate("rosters")} className="hover:text-white cursor-pointer transition-colors">
                Teams
              </li>
              <li onClick={() => onNavigate("register")} className="hover:text-white cursor-pointer transition-colors">
                Player Registration
              </li>
              <li onClick={() => onNavigate("managers")} className="hover:text-white cursor-pointer transition-colors">
                Manager Registration
              </li>
            </ul>
          </div>

          {/* Tournament Info */}
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-orange-500 text-xs">
              Tournament Info
            </h4>
            <ul className="space-y-4 text-sm text-blue-200">
              <li onClick={() => onNavigate("rulebook")} className="hover:text-white cursor-pointer transition-colors">Rulebook</li>
              <li onClick={() => onNavigate("schedule")} className="hover:text-white cursor-pointer transition-colors">Match Schedule</li>
              <li onClick={() => onNavigate("venue")} className="hover:text-white cursor-pointer transition-colors">Venue Map</li>
              <li onClick={() => onNavigate("gallery")} className="hover:text-white cursor-pointer transition-colors">Gallery</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-orange-500 text-xs">
              Contact Us
            </h4>

            <ul className="space-y-4 text-sm text-blue-200">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500" />
                support@msleague.com
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500" />
                +91 98765 43210
              </li>

              {/* Newsletter */}
              <li className="mt-6 p-4 bg-blue-900/50 rounded-2xl border border-blue-800">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">
                  Newsletter
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border-b border-blue-700 text-xs py-1 outline-none w-full placeholder:text-blue-400"
                  />
                  <button className="text-orange-500 hover:text-orange-400 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          <p>© 2026 Meghnad Saha Soccer League. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
