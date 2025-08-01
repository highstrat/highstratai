import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  Calendar,
  Users,
  Target
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  phase: string;
  duration: string;
  cost: string;
  benefits: string[];
  risks: string[];
  dependencies: string[];
  startDate: string;
  endDate: string;
}

interface Phase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  milestones: Milestone[];
}

const ModernizationRoadmapPage: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [loading, setPrioritizing] = useState(false);

  // Mock data
  const phases: Phase[] = [
    {
      id: '1',
      name: 'Assessment & Planning',
      description: 'Comprehensive analysis and strategic planning',
      status: 'completed',
      progress: 100,
      milestones: [
        {
          id: '1-1',
          title: 'Current State Analysis',
          description: 'Complete assessment of existing IT infrastructure',
          status: 'completed',
          phase: 'Assessment & Planning',
          duration: '4 weeks',
          cost: '$50,000',
          benefits: ['Clear understanding of current capabilities', 'Identified improvement areas'],
          risks: ['Resource availability', 'Data accuracy'],
          dependencies: ['Stakeholder interviews', 'System audits'],
          startDate: '2024-01-01',
          endDate: '2024-01-28'
        },
        {
          id: '1-2',
          title: 'Future State Design',
          description: 'Design target architecture and roadmap',
          status: 'completed',
          phase: 'Assessment & Planning',
          duration: '3 weeks',
          cost: '$35,000',
          benefits: ['Clear modernization path', 'Stakeholder alignment'],
          risks: ['Changing requirements', 'Technology evolution'],
          dependencies: ['Current state analysis completion'],
          startDate: '2024-01-29',
          endDate: '2024-02-18'
        }
      ]
    },
    {
      id: '2',
      name: 'Foundation & Infrastructure',
      description: 'Core infrastructure modernization',
      status: 'in-progress',
      progress: 65,
      milestones: [
        {
          id: '2-1',
          title: 'Cloud Migration Phase 1',
          description: 'Migrate non-critical systems to cloud',
          status: 'completed',
          phase: 'Foundation & Infrastructure',
          duration: '8 weeks',
          cost: '$150,000',
          benefits: ['Improved scalability', 'Reduced maintenance'],
          risks: ['Migration complexity', 'Downtime risks'],
          dependencies: ['Cloud provider selection', 'Security framework'],
          startDate: '2024-02-19',
          endDate: '2024-04-14'
        },
        {
          id: '2-2',
          title: 'Security Framework Implementation',
          description: 'Deploy enhanced security measures',
          status: 'in-progress',
          phase: 'Foundation & Infrastructure',
          duration: '6 weeks',
          cost: '$80,000',
          benefits: ['Enhanced security posture', 'Compliance readiness'],
          risks: ['Integration challenges', 'User adoption'],
          dependencies: ['Cloud migration completion'],
          startDate: '2024-04-15',
          endDate: '2024-05-26'
        }
      ]
    },
    {
      id: '3',
      name: 'AI & Analytics Integration',
      description: 'Implementation of AI capabilities',
      status: 'pending',
      progress: 0,
      milestones: [
        {
          id: '3-1',
          title: 'Data Platform Setup',
          description: 'Establish unified data platform',
          status: 'pending',
          phase: 'AI & Analytics Integration',
          duration: '10 weeks',
          cost: '$200,000',
          benefits: ['Unified data access', 'Analytics foundation'],
          risks: ['Data quality issues', 'Integration complexity'],
          dependencies: ['Infrastructure completion'],
          startDate: '2024-05-27',
          endDate: '2024-08-04'
        },
        {
          id: '3-2',
          title: 'AI Model Development',
          description: 'Develop and deploy AI models',
          status: 'pending',
          phase: 'AI & Analytics Integration',
          duration: '12 weeks',
          cost: '$300,000',
          benefits: ['Automated processes', 'Predictive capabilities'],
          risks: ['Model accuracy', 'Performance issues'],
          dependencies: ['Data platform completion'],
          startDate: '2024-08-05',
          endDate: '2024-10-27'
        }
      ]
    }
  ];

  const handlePrioritizeRecommendations = async () => {
    setPrioritizing(true);
    setTimeout(() => {
      setPrioritizing(false);
      console.log('Prioritizing recommendations...');
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-brand-blue" size={20} />;
      default:
        return <Circle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in-progress':
        return 'text-brand-blue';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-indigo dark:text-white">
              Modernization Roadmap
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Interactive timeline of your digital transformation journey
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button
              variant="primary"
              onClick={handlePrioritizeRecommendations}
              loading={loading}
              leftIcon={<Target size={18} />}
            >
              Prioritize Recommendations
            </Button>
          </div>
        </div>

        {/* Roadmap Timeline - Desktop Horizontal View */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300 dark:bg-dark-600"></div>
            
            {/* Phases */}
            <div className="flex justify-between">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex-1 relative">
                  {/* Phase Node */}
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-16 h-16 rounded-full border-4 bg-white dark:bg-dark-800 flex items-center justify-center
                      ${phase.status === 'completed' ? 'border-green-500' :
                        phase.status === 'in-progress' ? 'border-brand-blue' :
                        'border-gray-300 dark:border-dark-600'
                      }
                    `}>
                      {getStatusIcon(phase.status)}
                    </div>
                    
                    {/* Phase Info */}
                    <div className="mt-4 text-center max-w-xs">
                      <h3 className="font-semibold text-brand-indigo dark:text-white">
                        {phase.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {phase.description}
                      </p>
                      <Badge variant={getStatusVariant(phase.status)} className="mt-2">
                        {phase.progress}% Complete
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Milestones */}
                  <div className="mt-8 space-y-2">
                    {phase.milestones.map((milestone) => (
                      <Card
                        key={milestone.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedMilestone(milestone)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(milestone.status)}
                            <span className="text-sm font-medium text-brand-indigo dark:text-white">
                              {milestone.title}
                            </span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap Timeline - Mobile Vertical View */}
        <div className="lg:hidden space-y-6">
          {phases.map((phase) => (
            <Card key={phase.id} hoverable>
              <div className="flex items-start space-x-4">
                <div className={`
                  w-12 h-12 rounded-full border-4 bg-white dark:bg-dark-800 flex items-center justify-center flex-shrink-0
                  ${phase.status === 'completed' ? 'border-green-500' :
                    phase.status === 'in-progress' ? 'border-brand-blue' :
                    'border-gray-300 dark:border-dark-600'
                  }
                `}>
                  {getStatusIcon(phase.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-brand-indigo dark:text-white">
                      {phase.name}
                    </h3>
                    <Badge variant={getStatusVariant(phase.status)}>
                      {phase.progress}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {phase.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-brand-blue to-brand-pink h-2 rounded-full transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Milestones */}
                  <div className="space-y-2">
                    {phase.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="p-2 rounded border border-gray-200 dark:border-dark-600 cursor-pointer hover:border-brand-blue/50 transition-colors"
                        onClick={() => setSelectedMilestone(milestone)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(milestone.status)}
                            <span className="text-sm text-brand-indigo dark:text-white">
                              {milestone.title}
                            </span>
                          </div>
                          <ChevronRight size={14} className="text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Milestone Detail Modal/Card */}
        {selectedMilestone && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-brand-indigo dark:text-white">
                  {selectedMilestone.title}
                </h2>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Status and Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(selectedMilestone.status)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                    <div className={`font-medium ${getStatusColor(selectedMilestone.status)}`}>
                      {selectedMilestone.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Calendar className="mx-auto mb-2 text-brand-blue" size={20} />
                    <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                    <div className="font-medium text-brand-indigo dark:text-white">
                      {selectedMilestone.duration}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <DollarSign className="mx-auto mb-2 text-brand-pink" size={20} />
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cost</div>
                    <div className="font-medium text-brand-indigo dark:text-white">
                      {selectedMilestone.cost}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-brand-indigo dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedMilestone.description}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="font-semibold text-brand-indigo dark:text-white mb-2 flex items-center">
                    <TrendingUp size={16} className="mr-2 text-green-500" />
                    Expected Benefits
                  </h3>
                  <ul className="space-y-1">
                    {selectedMilestone.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle size={14} className="mr-2 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risks */}
                <div>
                  <h3 className="font-semibold text-brand-indigo dark:text-white mb-2 flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                    Potential Risks
                  </h3>
                  <ul className="space-y-1">
                    {selectedMilestone.risks.map((risk, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <AlertTriangle size={14} className="mr-2 text-yellow-500" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dependencies */}
                <div>
                  <h3 className="font-semibold text-brand-indigo dark:text-white mb-2 flex items-center">
                    <Users size={16} className="mr-2 text-brand-blue" />
                    Dependencies
                  </h3>
                  <ul className="space-y-1">
                    {selectedMilestone.dependencies.map((dependency, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Circle size={14} className="mr-2 text-brand-blue" />
                        {dependency}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-brand-indigo dark:text-white mb-2">Timeline</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Start: </span>
                      <span className="font-medium text-brand-indigo dark:text-white">
                        {new Date(selectedMilestone.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">End: </span>
                      <span className="font-medium text-brand-indigo dark:text-white">
                        {new Date(selectedMilestone.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>```tsx:src/pages/ModernizationRoadmapPage.tsx
    </AppLayout>
  );
};

export default ModernizationRoadmapPage;
