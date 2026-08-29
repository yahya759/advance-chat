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
import { sendMessageToAgent } from './services/companyAgent';

export default function App() {
  const [activeNav, setActiveNav] = useState('all');
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedContactId, setSelectedContactId] = useState('5'); // Mary Franci
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [isSending, setIsSending] = useState(false);

  const selectedContact =
    mockContacts.find((c) => c.id === selectedContactId) || mockContacts[4];

  const makeTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  // النص المكتوب هون بيتعامل معه كرسالة عميل (تجربة/محاكاة)، وبيترسل مباشرة
  // لـ Main Agent على n8n. الرد الراجع بيظهر كرسالة وكيل آلي.
  const handleSendMessage = async (text: string) => {
    const customerMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'contact',
      senderName: selectedContact.name,
      avatar: selectedContact.avatar,
      time: makeTime(),
      text,
    };
    setMessages((prev) => [...prev, customerMessage]);
    setIsSending(true);

    try {
      const reply = await sendMessageToAgent(text, selectedContact.id);
      const agentMessage: ChatMessage = {
        id: `m_${Date.now()}_r`,
        sender: 'user',
        senderName: 'AI Agent',
        time: makeTime(),
        text: reply,
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `m_${Date.now()}_e`,
        sender: 'user',
        senderName: 'AI Agent',
        time: makeTime(),
        text: 'تعذر الوصول للخدمة حالياً، حاول مرة ثانية.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
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
              isSending={isSending}
            />

            {/* Column 3: Contact & Info Details */}
            <ContactDetails contact={selectedContact} />
          </div>
        </div>
      </div>
    </main>
  );
}

