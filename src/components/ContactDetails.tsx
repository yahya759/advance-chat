import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Contact } from '../types';

interface ContactDetailsProps {
  contact: Contact;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(true);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <div className="w-[260px] bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100/70 flex flex-col shrink-0 h-full overflow-y-auto custom-scrollbar space-y-4">
      {/* General Info Accordion */}
      <div className="border-b border-gray-100/80 pb-3">
        <button
          onClick={() => setIsGeneralOpen(!isGeneralOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-xs font-bold text-[#1E1B2E]">General info</span>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-gray-600">
            {isGeneralOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {isGeneralOpen && (
          <div className="mt-3 space-y-3">
            {/* User header */}
            <div className="flex items-center gap-2.5">
              <img
                src={contact.avatar}
                alt={contact.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1E1B2E]">{contact.name}</h4>
                <p className="text-[10px] text-gray-400">{contact.phone}</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Email</span>
              <span className="text-xs font-bold text-[#1E1B2E] tracking-tight">{contact.email}</span>
            </div>

            {/* Date Created */}
            <div>
              <span className="text-[10px] text-gray-400 font-medium block">Date Created</span>
              <span className="text-xs font-bold text-[#1E1B2E]">{contact.dateCreated}</span>
            </div>

            {/* Status */}
            <div>
              <span className="text-[10px] text-gray-400 font-medium block mb-1">Status</span>
              <span className="bg-[#8B5CF6] text-white text-[10px] font-semibold px-3 py-1 rounded-full inline-block">
                {contact.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Notes Accordion */}
      <div className="border-b border-gray-100/80 pb-3">
        <button
          onClick={() => setIsNotesOpen(!isNotesOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <span className="text-xs font-bold text-[#1E1B2E]">Notes</span>
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-gray-600">
            {isNotesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {isNotesOpen && (
          <div className="mt-3 space-y-2.5">
            {contact.notes.map((note) => (
              <div
                key={note.id}
                className="bg-[#F7F8FC] rounded-xl p-3 border border-gray-100/60"
              >
                <p className="text-[11px] leading-relaxed text-[#4A4858]">
                  {note.text}
                </p>
                <span className="text-[9.5px] text-gray-400 block mt-2 font-medium">
                  {note.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsed Sections */}
      <div className="space-y-3 pt-0.5">
        {/* Additional Info */}
        <button
          onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
          className="w-full flex items-center justify-between text-left text-xs font-bold text-[#1E1B2E] group hover:text-gray-700"
        >
          <span>Additional Info</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
        </button>
        {isAdditionalOpen && (
          <div className="text-[11px] text-gray-500 bg-[#F7F8FC] p-2.5 rounded-lg">
            No additional info provided yet.
          </div>
        )}

        {/* Shared Files */}
        <button
          onClick={() => setIsFilesOpen(!isFilesOpen)}
          className="w-full flex items-center justify-between text-left text-xs font-bold text-[#1E1B2E] group hover:text-gray-700"
        >
          <span>Shared Files</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
        </button>
        {isFilesOpen && (
          <div className="text-[11px] text-gray-500 bg-[#F7F8FC] p-2.5 rounded-lg">
            1 file shared (Presentation.pdf)
          </div>
        )}

        {/* Shared Links */}
        <button
          onClick={() => setIsLinksOpen(!isLinksOpen)}
          className="w-full flex items-center justify-between text-left text-xs font-bold text-[#1E1B2E] group hover:text-gray-700"
        >
          <span>Shared Links</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
        </button>
        {isLinksOpen && (
          <div className="text-[11px] text-gray-500 bg-[#F7F8FC] p-2.5 rounded-lg">
            No shared links recorded.
          </div>
        )}

        {/* Documentations */}
        <button
          onClick={() => setIsDocsOpen(!isDocsOpen)}
          className="w-full flex items-center justify-between text-left text-xs font-bold text-[#1E1B2E] group hover:text-gray-700"
        >
          <span>Documentations</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
        </button>
        {isDocsOpen && (
          <div className="text-[11px] text-gray-500 bg-[#F7F8FC] p-2.5 rounded-lg">
            Client user documentation available.
          </div>
        )}
      </div>
    </div>
  );
};
