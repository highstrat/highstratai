import React from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { TrendingUp, TrendingDown, Minus, DollarSign, Shield, Activity } from 'lucide-react';
import { DashboardData } from '../../types';

interface OverviewPhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const OverviewPhase: React.FC<OverviewPhaseProps> = ({ dashboardData, loading }) => {
  const metrics = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+3 this month',
      trend: 'up' as const,
      icon: Activity,
    },
    {
      title: 'Completion Rate',
      value: '87%',
      change: '+12% vs last quarter',
      trend: 'up' as const,
      icon: TrendingUp,
    },
    {
      title: 'ROI Generated',
      value: '$2.4M',
      change: '+18% growth',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'Risk Score',
      value: 'Low',
      change: 'Stable',
      trend: 'neutral' as const,
      icon: Shield,
    },
  ];

  const recentProjects = [
    {
      name: 'Customer Service AI Chatbot',
      description: 'E-commerce Platform Integration',
      status: 'Implementation',
      progress: 75,
      priority: 'medium' as const,
    },
    {
      name: 'Predictive Analytics Engine',
      description: 'Supply Chain Optimization',
      status: 'Contract',
      progress: 90,
      priority: 'high' as const,
    },
    {
      name: 'Document Processing AI',
      description: 'Legal Document Analysis',
      status: 'Design',
      progress: 45,
      priority: 'low' as const,
    },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-400" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-400" />;
      default:
        return <Minus size={16} className="text-brand-blue" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-brand-blue/20 rounded w-1/3"></div>
          <div className="h-4 bg-brand-blue/10 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-brand-blue/20 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">Strategic Overview</h2>
        <p className="text-brand-blue">Monitor your AI implementation journey across all phases</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} hover className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-pink"></div>
              
              <CardHeader>
                <h3 className="text-lg font-semibold text-brand-white">{metric.title}</h3>
                <Icon size={24} className="text-brand-blue" />
              </CardHeader>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-brand-blue">{metric.value}</div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  {getTrendIcon(metric.trend)}
                  <span className={
                    metric.trend === 'up' ? 'text-green-400' :
                    metric.trend === 'down' ? 'text-red-400' :
                    'text-brand-blue'
                  }>
                    {metric.change}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-brand-white">Recent Projects</h3>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <div 
              key={index}
              className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-brand-blue/20 rounded-lg hover:border-brand-blue/40 transition-colors duration-200"
            >
              <div className="space-y-1 mb-4 lg:mb-0">
                <h4 className="font-semibold text-brand-white">{project.name}</h4>
                <p className="text-sm text-brand-blue">{project.description}</p>
              </div>
              
              <div className="flex flex-col lg:items-end space-y-2 lg:min-w-[150px]">
                <Badge variant={project.priority}>{project.status}</Badge>
                <div className="w-full lg:w-32 bg-brand-indigo rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-brand-blue to-brand-pink h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
