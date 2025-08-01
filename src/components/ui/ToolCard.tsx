import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onAction: () => Promise<void>;
  actionLabel: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  onAction,
  actionLabel,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);
      await onAction();
    } catch (error) {
      console.error('Tool action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card hover className="text-center group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-blue to-brand-pink rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon size={32} className="text-brand-indigo" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-brand-white">{title}</h3>
          <p className="text-brand-blue text-sm leading-relaxed">{description}</p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={handleAction}
          loading={loading}
          className="w-full"
        >
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
};
