/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { ConversationsList } from './components/ConversationsList';
import { ChatFeed } from './components/ChatFeed';
import { ContactDetails } from './components/ContactDetails';
import { mockContacts, mockMessages } from './data/mockData';
import { ChatMessage } from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState('all');
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedContactId, setSelectedContactId] = useState('5'); // Mary Franci
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  const selectedContact =
    mockContacts.find((c) => c.id === selectedContactId) || mockContacts[4];

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      senderName: 'Ashly Baldwin',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <main className="w-screen h-screen bg-[#F1F3FA] flex overflow-hidden">
      {/* Main App Container */}
      <div className="w-full h-full flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

        {/* Right Dashboard Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header Navigation */}
          <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* 3 Main Content Columns */}
          <div className="flex-1 px-6 pb-6 pt-2 flex gap-4 min-h-0 overflow-hidden">
            {/* Column 1: Conversations List */}
            <ConversationsList
              contacts={mockContacts}
              selectedContactId={selectedContactId}
              onSelectContact={setSelectedContactId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Column 2: Active Chat Feed */}
            <ChatFeed
              contact={selectedContact}
              messages={messages}
              onSendMessage={handleSendMessage}
            />

            {/* Column 3: Contact & Info Details */}
            <ContactDetails contact={selectedContact} />
          </div>
        </div>
      </div>
    </main>
  );
}

