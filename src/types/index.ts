export type Platform = 'web' | 'whatsapp' | 'telegram';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  id: string;
  text: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}