import React from 'react';
import { Search } from 'lucide-react';
import { Contact } from '../types';

interface ConversationsListProps {
  contacts: Contact[];
  selectedContactId: string;
  onSelectContact: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
  searchQuery,
  setSearchQuery,
}) => {
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="w-[260px] bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100/70 flex flex-col shrink-0 h-full">
      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="input-search-conversations"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-[#F4F5FA] rounded-full pl-9 pr-3.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-1 focus:ring-purple-400/50 transition-all"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 -mr-1 custom-scrollbar">
        {filteredContacts.map((contact) => {
          const isSelected = contact.id === selectedContactId;
          return (
            <div
              key={contact.id}
              id={`contact-item-${contact.id}`}
              onClick={() => onSelectContact(contact.id)}
              className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#F6F7FC]'
                  : 'hover:bg-gray-50/80'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* Avatar with unread badge */}
                <div className="relative shrink-0 mt-0.5">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <span className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-[#8B5CF6] text-white text-[8.5px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#1E1B2E] truncate">
                      {contact.name}
                    </h4>
                    <span className="text-[9.5px] text-gray-400 shrink-0 font-medium">
                      {contact.time}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-400 leading-tight">
                    {contact.phone}
                  </p>

                  <p className={`text-[11px] mt-0.5 truncate ${
                    contact.lastMessage === 'Typing...'
                      ? 'text-[#2D2A3E] font-medium'
                      : 'text-gray-500'
                  }`}>
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
