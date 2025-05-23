import React from 'react';
import { MessageSquare, Phone, Send } from 'lucide-react';
import { Platform } from '../types';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatform, 
  onSelectPlatform 
}) => {
  const platforms = [
    { id: 'web', name: 'Web Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'whatsapp', name: 'WhatsApp', icon: <Phone className="w-4 h-4" /> },
    { id: 'telegram', name: 'Telegram', icon: <Send className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedPlatform === platform.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
          onClick={() => onSelectPlatform(platform.id as Platform)}
        >
          {platform.icon}
          {platform.name}
        </button>
      ))}
    </div>
  );
};

export default PlatformSelector;