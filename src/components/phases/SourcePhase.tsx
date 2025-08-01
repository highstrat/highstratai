import React from 'react';
import { Search, Users, Building2, Globe } from 'lucide-react';
import { ToolCard } from '../ui/ToolCard';
import { DashboardData } from '../../types';
import { ApiService } from '../../services/ApiService';

interface SourcePhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const SourcePhase: React.FC<SourcePhaseProps> = ({ dashboardData, loading }) => {
  const tools = [
    {
      id: 'vendor-finder',
      title: 'AI Vendor Finder',
      description: 'Discover and evaluate AI vendors and solution providers',
      icon: Search,
      action: () => ApiService.startTool('vendor-finder'),
    },
    {
      id: 'talent-sourcing',
      title: 'Talent Sourcing',
      description: 'Find and recruit AI specialists and data scientists',
      icon: Users,
      action: () => ApiService.startTool('talent-sourcing'),
    },
    {
      id: 'partner-network',
      title: 'Partner Network',
      description: 'Connect with strategic AI implementation partners',
      icon: Building2,
      action: () => ApiService.startTool('partner-network'),
    },
    {
      id: 'market-research',
      title: 'Market Research',
      description: 'Research AI trends, competitors, and market opportunities',
      icon: Globe,
      action: () => ApiService.startTool('market-research'),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">Resource Sourcing</h2>
        <p className="text-brand-blue">Find the right partners, vendors, and talent for your AI journey</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            onAction={tool.action}
            actionLabel="Start Search"
          />
        ))}
      </div>
    </div>
  );
};
