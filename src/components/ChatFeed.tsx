import React, { useState } from 'react';
import { Paperclip, Mic, Send, Mail, FileText } from 'lucide-react';
import { ChatMessage, Contact } from '../types';

interface ChatFeedProps {
  contact: Contact;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const ChatFeed: React.FC<ChatFeedProps> = ({
  contact,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('You are welcome!');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex-1 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100/70 flex flex-col justify-between h-full min-w-0">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg) => {
          const isContact = msg.sender === 'contact';

          if (isContact) {
            return (
              <div key={msg.id} className="space-y-1 max-w-[420px]">
                {/* Contact Header */}
                <div className="flex items-center gap-2 mb-1 pl-0.5">
                  <img
                    src={msg.avatar || contact.avatar}
                    alt={msg.senderName}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-[#1E1B2E]">
                    {msg.senderName}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {msg.time}
                  </span>
                </div>

                {/* Incoming Bubble */}
                <div className="bg-white border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.02)] rounded-2xl rounded-tl-sm px-4 py-3 text-xs leading-relaxed text-[#2D2A3E] w-fit max-w-[360px]">
                  {msg.text}
                </div>

                {/* Subtext info (e.g., via SMS) */}
                {msg.channel && (
                  <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400 pr-2 pt-0.5">
                    <span>{msg.time}</span>
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="font-bold text-[#201D2E]">via {msg.channel}</span>
                  </div>
                )}
              </div>
            );
          }

          // Outgoing Message (User/Agent)
          return (
            <div key={msg.id} className="flex flex-col items-end space-y-1">
              <div className="bg-[#D5E9FF] text-[#1E293B] rounded-2xl rounded-tr-sm px-4 py-3 text-xs leading-relaxed max-w-[360px] shadow-xs">
                <p>{msg.text}</p>

                {/* Attachment file card if present */}
                {msg.attachment && (
                  <div className="bg-white rounded-xl p-2.5 mt-2.5 flex items-center gap-3 border border-blue-100/70 shadow-2xs cursor-pointer hover:bg-gray-50/90 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                      <Paperclip className="w-4 h-4 rotate-45" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[11.5px] font-bold text-[#1E1B2E] truncate">
                        {msg.attachment.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {msg.attachment.size}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Toolbar */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 mt-2">
        {/* Attachment Button */}
        <button
          type="button"
          id="btn-chat-attach"
          aria-label="Attach File"
          className="w-9 h-9 rounded-full bg-[#ECEEF5] hover:bg-[#E2E5F0] text-gray-500 hover:text-gray-700 flex items-center justify-center shrink-0 transition-colors"
        >
          <Paperclip className="w-4 h-4 rotate-45" />
        </button>

        {/* Voice/Mic Button */}
        <button
          type="button"
          id="btn-chat-voice"
          aria-label="Voice Message"
          className="w-9 h-9 rounded-full bg-[#ECEEF5] hover:bg-[#E2E5F0] text-gray-500 hover:text-gray-700 flex items-center justify-center shrink-0 transition-colors"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Text Input */}
        <input
          id="input-chat-message"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-[#F4F5FA] rounded-full px-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-1 focus:ring-purple-400/40 transition-all"
        />

        {/* Send Button */}
        <button
          type="submit"
          id="btn-chat-send"
          aria-label="Send Message"
          className="w-9 h-9 rounded-full bg-[#9061F9] hover:bg-[#7E4CE8] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95"
        >
          <Send className="w-3.5 h-3.5 -translate-x-0.5 translate-y-0.5" />
        </button>
      </form>
    </div>
  );
};
