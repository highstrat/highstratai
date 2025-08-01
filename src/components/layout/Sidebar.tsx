import React from 'react';
import { 
  BarChart3, 
  ClipboardCheck, 
  PenTool, 
  Search, 
  Settings, 
  FileSignature, 
  TrendingUp,
  X
} from 'lucide-react';
import { Phase } from '../../types';
import { Button } from '../ui/Button';

interface SidebarProps {
  currentPhase: Phase;
  onPhaseChange: (phase: Phase) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'overview' as Phase, label: 'Overview', icon: BarChart3 },
  { id: 'assessment' as Phase, label: 'Assessment', icon: ClipboardCheck },
  { id: 'design' as Phase, label: 'Design', icon: PenTool },
  { id: 'source' as Phase, label: 'Source', icon: Search },
  { id: 'implement' as Phase, label: 'Implement', icon: Settings },
  { id: 'contract' as Phase, label: 'Contract', icon: FileSignature },
  { id: 'optimize' as Phase, label: 'Optimize', icon: TrendingUp },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPhase,
  onPhaseChange,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 bg-brand-indigo border-r border-brand-blue/20 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-6">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h2 className="text-xl font-bold text-brand-white">Navigation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-brand-white hover:bg-brand-blue/10"
