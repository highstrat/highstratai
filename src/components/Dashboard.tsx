import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { OverviewPhase } from './phases/OverviewPhase';
import { AssessmentPhase } from './phases/AssessmentPhase';
import { DesignPhase } from './phases/DesignPhase';
import { SourcePhase } from './phases/SourcePhase';
import { ImplementPhase } from './phases/ImplementPhase';
import { ContractPhase } from './phases/ContractPhase';
import { OptimizePhase } from './phases/OptimizePhase';
import { ApiService } from '../services/ApiService';
import { DashboardData, Phase } from '../types';

const Dashboard: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>('overview');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhaseChange = (phase: Phase) => {
    setCurrentPhase(phase);
    setSidebarOpen(false); // Close sidebar on mobile after selection
    
    // Track phase change for analytics
    ApiService.trackEvent('phase_changed', { phase });
  };

  const renderCurrentPhase = () => {
    const commonProps = { dashboardData, loading };
    
    switch (currentPhase) {
      case 'overview':
        return <OverviewPhase {...commonProps} />;
      case 'assessment':
        return <AssessmentPhase {...commonProps} />;
      case 'design':
        return <DesignPhase {...commonProps} />;
      case 'source':
        return <SourcePhase {...commonProps} />;
      case 'implement':
        return <ImplementPhase {...commonProps} />;
      case 'contract':
        return <ContractPhase {...commonProps} />;
      case 'optimize':
        return <OptimizePhase {...commonProps} />;
      default:
        return <OverviewPhase {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-indigo font-sans">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar
          currentPhase={currentPhase}
          onPhaseChange={handlePhaseChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-80 transition-all duration-300">
          <div className="p-4 lg:p-8">
            {renderCurrentPhase()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
