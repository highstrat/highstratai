import React from 'react';
import { FileSignature, Scale, Shield, DollarSign } from 'lucide-react';
import { ToolCard } from '../ui/ToolCard';
import { DashboardData } from '../../types';
import { ApiService } from '../../services/ApiService';

interface ContractPhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const ContractPhase: React.FC<ContractPhaseProps> = ({ dashboardData, loading }) => {
  const tools = [
    {
      id: 'contract-generator',
      title: 'AI Contract Generator',
      description: 'Generate comprehensive AI vendor and partnership contracts',
      icon: FileSignature,
      action: () => ApiService.startTool('contract-generator'),
    },
    {
      id: 'legal-compliance',
      title: 'Legal Compliance Checker',
      description: 'Ensure AI implementations meet regulatory requirements',
      icon: Scale,
      action: () => ApiService.startTool('legal-compliance'),
    },
    {
      id: 'risk-mitigation',
      title: 'Risk Mitigation Planner',
      description: 'Develop strategies to mitigate AI implementation risks',
      icon: Shield,
      action: () => ApiService.startTool('risk-mitigation'),
    },
    {
      id: 'cost-calculator',
      title: 'ROI Calculator',
      description: 'Calculate costs, benefits, and ROI for AI investments',
      icon: DollarSign,
      action: () => ApiService.startTool('cost-calculator'),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">Contracts & Compliance</h2>
        <p className="text-brand-blue">Manage legal aspects and ensure compliant AI implementations</p>
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
            actionLabel="Open Tool"
          />
        ))}
      </div>
    </div>
  );
};
