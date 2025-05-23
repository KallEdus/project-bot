import React from 'react';
import { Message, Platform } from '../types';

interface MessageBubbleProps {
  message: Message;
  platform: Platform;
  onQuickReplyClick: (text: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  platform,
  onQuickReplyClick
}) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getBubbleStyle = () => {
    if (isUser) {
      switch(platform) {
        case 'whatsapp':
          return 'bg-[#dcf8c6] text-black';
        case 'telegram':
          return 'bg-[#effdde] text-black';
        default:
          return 'bg-blue-600 text-white';
      }
    } else {
      switch(platform) {
        case 'whatsapp':
          return 'bg-white text-black';
        case 'telegram':
          return 'bg-white text-black';
        default:
          return 'bg-gray-200 text-black';
      }
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${getBubbleStyle()}`}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'} opacity-70`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {message.quickReplies && message.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 mb-1">
          {message.quickReplies.map(reply => (
            <button
              key={reply.id}
              onClick={() => onQuickReplyClick(reply.text)}
              className="bg-white hover:bg-gray-100 text-blue-600 text-sm rounded-full px-3 py-1 border border-blue-300 transition-colors"
            >
              {reply.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;