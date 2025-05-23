import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import PlatformSelector from './components/PlatformSelector';
import { Platform } from './types';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('web');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        title="Customer Service Chatbot" 
        icon={<MessageSquare className="w-6 h-6" />} 
      />
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <PlatformSelector 
          selectedPlatform={selectedPlatform} 
          onSelectPlatform={setSelectedPlatform} 
        />
        
        <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <ChatInterface platform={selectedPlatform} />
        </div>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Customer Service Chatbot | All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default App;