import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Message, Platform, ChatState } from '../types';
import { generateBotResponse } from '../utils/botResponses';

interface ChatInterfaceProps {
  platform: Platform;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ platform }) => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
  });
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (chatState.messages.length === 0) {
      const initialMessage: Message = {
        id: '1',
        text: `Welcome to our customer service! How can I help you today?`,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: [
          { id: '1', text: 'Product Information' },
          { id: '2', text: 'Order Status' },
          { id: '3', text: 'Returns & Refunds' },
          { id: '4', text: 'Speak to an Agent' }
        ]
      };
      setChatState(prev => ({
        ...prev,
        messages: [initialMessage]
      }));
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newUserMessage],
      isTyping: true
    }));
    
    setInputText('');

    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText, platform);
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botResponse],
        isTyping: false
      }));
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickReplyClick = (replyText: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: replyText,
      sender: 'user',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newUserMessage],
      isTyping: true
    }));

    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse = generateBotResponse(replyText, platform);
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botResponse],
        isTyping: false
      }));
    }, 1000 + Math.random() * 1000);
  };

  const getPlatformClass = () => {
    switch(platform) {
      case 'whatsapp':
        return 'bg-[#e5ddd5]';
      case 'telegram':
        return 'bg-[#eef2f5]';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className={`flex-1 overflow-y-auto p-4 ${getPlatformClass()}`}>
        <div className="space-y-4">
          {chatState.messages.map(message => (
            <MessageBubble 
              key={message.id} 
              message={message}
              platform={platform}
              onQuickReplyClick={handleQuickReplyClick}
            />
          ))}
          {chatState.isTyping && <TypingIndicator platform={platform} />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your message..."
          />
          
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`rounded-full p-2 ${
              inputText.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-400'
            } transition-colors`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;