import React from 'react';
import { 
  FileText, 
  FileCheck, 
  FileQuestion, 
  MessageSquare, 
  Ban, 
  Trash2, 
  Sparkles 
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { id: 'all', label: 'All', icon: FileText },
    { id: 'assigned', label: 'Assigned to Me', icon: FileCheck },
    { id: 'unassigned', label: 'Unassigned', icon: FileQuestion },
    { id: 'live_chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'blocked', label: 'Blocked', icon: Ban, isPro: true },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  return (
    <aside className="w-56 bg-[#211F30] text-white flex flex-col justify-between p-5 select-none shrink-0 h-full">
      {/* Brand Logo */}
      <div>
        <div className="flex items-center gap-2.5 px-1 py-1 mb-7">
          <div className="w-8 h-8 relative flex items-center justify-center">
            {/* Custom glowing violet zigzag ribbon logo */}
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 24L17 7C17.5 6 19 6 19.5 7.2L24.5 19.5C25 20.8 24 22 22.5 22L13 22"
                stroke="url(#purpleGlow)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 24L13.5 12C14 11 15.5 11 16 12L25 24"
                stroke="#C084FC"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="purpleGlow" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">InboxAI</span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all relative ${
                  isActive
                    ? 'bg-[#2E2B43] text-white shadow-sm'
                    : 'text-[#9A98A8] hover:text-white hover:bg-[#2A273D]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8E8C9D]'}`} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </div>

                {item.isPro && (
                  <span className="bg-[#48336D] text-[#C49BFA] text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider">
                    PRO
                  </span>
                )}

                {isActive && (
                  <span className="absolute right-0 top-2 bottom-2 w-1 bg-[#8B5CF6] rounded-l-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro Plan Card */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-b from-[#4A3B7B] via-[#433470] to-[#34275E] border border-purple-500/20 shadow-md">
        {/* Decorative blur lights in background */}
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#8B5CF6]/30 blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-[#6366F1]/20 blur-lg pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          {/* Mini logo icon */}
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 18L13 6C13.4 5.2 14.5 5.2 15 6.2L19 14.5"
                stroke="#C084FC"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold text-white/90">Pro Plan</span>
        </div>

        <div className="flex items-baseline gap-1 mt-1 mb-1">
          <span className="text-2xl font-bold text-white tracking-tight">$189</span>
          <span className="text-[11px] text-purple-200/70 font-normal">/month</span>
        </div>

        <p className="text-[10.5px] leading-snug text-purple-200/80 mb-3.5">
          Open a lot of cool features with our Premium Pro Plan
        </p>

        <button
          id="btn-get-pro-plan"
          className="w-full bg-[#1A1827] hover:bg-[#151320] text-white text-[11px] font-semibold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
          <span>Get Pro Plan</span>
        </button>
      </div>
    </aside>
  );
};
