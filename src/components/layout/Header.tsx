import React from 'react';
import { Bell, Menu, User, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  return (
    <header className="bg-brand-indigo border-b border-brand-blue/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden text-brand-white hover:bg-brand-blue/10"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-brand-white to-brand-blue bg-clip-text text-transparent">
                HIGHSTRAT AI
              </h1>
              <span className="px-2 py-1 text-xs font-semibold bg-brand-pink/20 text-brand-pink rounded-full border border-brand-pink/30">
                Beta
              </span>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-white hover:bg-brand-blue/10"
            >
              <Bell size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-white hover:bg-brand-blue/10"
            >
              <User size={18} />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
