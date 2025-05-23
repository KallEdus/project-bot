import React from 'react';
import { Platform } from '../types';

interface TypingIndicatorProps {
  platform: Platform;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ platform }) => {
  const getIndicatorStyle = () => {
    switch(platform) {
      case 'whatsapp':
        return 'bg-white text-black';
      case 'telegram':
        return 'bg-white text-black';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="flex items-start">
      <div className={`rounded-lg px-4 py-2 ${getIndicatorStyle()} max-w-[80%]`}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;