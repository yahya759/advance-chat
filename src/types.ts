export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  unreadCount?: number;
  lastMessage: string;
  time: string;
  dateCreated: string;
  status: 'Active User' | 'Inactive' | 'Pending';
  notes: { id: string; text: string; date: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'contact' | 'user';
  senderName: string;
  avatar?: string;
  time: string;
  text: string;
  channel?: 'SMS' | 'Live Chat';
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}
