import React from 'react';

interface HeaderProps {
  title: string;
  icon: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, icon }) => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="ml-auto">
          <button className="bg-white/10 hover:bg-white/20 rounded-md px-3 py-1 text-sm transition-colors duration-150">
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;