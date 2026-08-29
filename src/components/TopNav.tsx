import React from 'react';
import { Bell, Settings } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'templates', label: 'Templates' },
    { id: 'projects', label: 'My Projects' },
  ];

  return (
    <header className="flex items-center justify-between px-6 pt-5 pb-3">
      {/* Navigation Capsule Bar */}
      <div className="bg-white rounded-full p-1 flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-200/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`top-nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-1.5 rounded-full text-xs transition-all font-semibold ${
                isActive
                  ? 'bg-[#181725] text-white shadow-sm'
                  : 'text-[#565463] hover:text-[#181725] font-medium'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* User Profile & Action Buttons */}
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Ashly Baldwin"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#06B6D4]/30"
            />
          </div>
          <span className="text-xs font-bold text-[#1E1B2E]">Ashly Baldwin</span>
        </div>

        {/* Notification Bell */}
        <button
          id="btn-notifications"
          aria-label="Notifications"
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-200/60 hover:text-gray-900 transition-colors"
        >
          <Bell className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>

        {/* Settings Gear */}
        <button
          id="btn-settings"
          aria-label="Settings"
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-200/60 hover:text-gray-900 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
};
