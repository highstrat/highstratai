import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, BarChart3, Target, RefreshCw, Trophy, Star, Zap } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useGamification } from '../context/GamificationContext';
import { useNotification } from '../context/NotificationContext';
import AchievementDisplay from '../components/gamification/AchievementDisplay';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface HealthMetrics {
  score: number;
  trend: 'up' | 'down' | 'stable';
  categories: {
    infrastructure: number;
    security: number;
    performance: number;
    compliance: number;
  };
}

interface Risk {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  probability: number;
}

interface Recommendation {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  effort: string;
  timeline: string;
}

const AssessStrategyDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showGamificationDashboard, setShowGamificationDashboard] = useState(false);

  // Gamification and notification contexts
  const { awardPoints, unlockAchievement, userProgress } = useGamification();
  const { showSuccess, showError } = useNotification();
  const queryClient = useQueryClient();

  // Mutation for generating recommendations with gamification
  const generateRecommendationsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/v1/assess/generate-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          healthScore: healthMetrics?.score,
          risks: risks.map(r => ({ id: r.id, severity: r.severity }))
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate recommendations: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Award points for generating recommendations
      awardPoints(50, 'Generated AI recommendations');
      
      // Check for achievement unlocks
      if (recommendations.length === 0) {
        unlockAchievement('first_recommendations');
      }
      
      if (recommendations.length >= 10) {
        unlockAchievement('strategy_expert');
      }

      // Add new recommendations to state
      if (data.recommendations) {
        setRecommendations(prev => [...data.recommendations, ...prev]);
      }

      // Show success notification with gamification
      showSuccess(
        'AI recommendations generated successfully! +50 points earned',
        {
          actions: [
            {
              label: 'View Recommendations',
              onClick: () => {
                document.getElementById('recommendations-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }
            },
            {
              label: 'View Progress',
              onClick: () => setShowGamificationDashboard(true)
            }
          ]
        }
      );

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      queryClient.invalidateQueries({ queryKey: ['health-score'] });
    },
    onError: (error: Error) => {
      showError(
        `Failed to generate recommendations: ${error.message}`,
        {
          actions: [
            {
              label: 'Retry',
              onClick: () => generateRecommendationsMutation.mutate()
            }
          ]
        }
      );
    }
  });

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setHealthMetrics({
        score: 72,
        trend: 'up',
        categories: {
          infrastructure: 68,
          security: 85,
          performance: 71,
          compliance: 64
        }
      });

      setRisks([
        {
          id: '1',
          title: 'Legacy System Dependencies',
          severity: 'high',
          impact: 'Critical business processes at risk',
          probability: 85
        },
        {
          id: '2',
          title: 'Data Security Vulnerabilities',
          severity: 'high',
          impact: 'Potential compliance violations',
          probability: 70
        },
        {
          id: '3',
          title: 'Scalability Limitations',
          severity: 'medium',
          impact: 'Performance degradation under load',
          probability: 60
        },
        {
          id: '4',
          title: 'Integration Complexity',
          severity: 'medium',
          impact: 'Delayed project timelines',
          probability: 55
        }
      ]);

      setRecommendations([
        {
          id: '1',
          title: 'Implement Cloud-First Architecture',
          priority: 'high',
          impact: 'High',
          effort: 'Medium',
          timeline: '6-9 months'
        },
        {
          id: '2',
          title: 'Enhance Security Framework',
          priority: 'high',
          impact: 'High',
          effort: 'High',
          timeline: '3-6 months'
        },
        {
          id: '3',
          title: 'API Standardization Initiative',
          priority: 'medium',
          impact: 'Medium',
          effort: 'Low',
          timeline: '2-4 months'
        },
        {
          id: '4',
          title: 'Data Governance Program',
          priority: 'medium',
          impact: 'High',
          effort: 'Medium',
          timeline: '4-8 months'
        }
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const handleGenerateRecommendations = async () => {
    setGenerating(true);
    
    try {
      // Use the mutation for API call and gamification
      generateRecommendationsMutation.mutate();
      
      // Simulate AI recommendation generation for demo
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Add new recommendations for demo
      const newRecommendations: Recommendation[] = [
        {
          id: '5',
          title: 'AI-Powered Monitoring System',
          priority: 'high',
          impact: 'High',
          effort: 'Medium',
          timeline: '4-6 months'
        },
        {
          id: '6',
          title: 'Automated Testing Pipeline',
          priority: 'medium',
          impact: 'Medium',
          effort: 'Low',
          timeline: '1-3 months'
        }
      ];

      setRecommendations(prev => [...newRecommendations, ...prev]);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setGenerating(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'primary';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  return (
    <AppLayout>
      {/* Header with Gamification Toggle */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0e0934] dark:text-white font-montserrat">
            Assess & Strategize Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-montserrat mt-2">
            Comprehensive analysis and strategic recommendations
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Gamification Progress Summary */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#7ac5d7]/10 to-[#bf2e8a]/10 px-4 py-2 rounded-lg border border-[#7ac5d7]/20">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#bf2e8a]" />
              <span className="text-sm font-semibold text-[#0e0934] dark:text-white font-montserrat">
                {userProgress.totalPoints} pts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#7ac5d7]" />
              <span className="text-sm font-semibold text-[#0e0934] dark:text-white font-montserrat">
                {userProgress.unlockedAchievements.length} achievements
              </span>
            </div>
          </div>
          
          <Button
            variant={showGamificationDashboard ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowGamificationDashboard(!showGamificationDashboard)}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {showGamificationDashboard ? 'Hide Progress' : 'Show Progress'}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Score Overview */}
            <Card title="Health Score Overview" subtitle="Current system assessment" className="lg:col-span-1">
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - (healthMetrics?.score || 0) / 100)}`}
                        className="text-[#7ac5d7] transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#0e0934] dark:text-white font-montserrat">
                        {healthMetrics?.score}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                      Trending {healthMetrics?.trend}
                    </span>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  {Object.entries(healthMetrics?.categories || {}).map(([category, score]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm font-montserrat">
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {category}
                        </span>
                        <span className="text-[#0e0934] dark:text-white font-semibold">
                          {score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#7ac5d7] to-[#bf2e8a] h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Risk Assessment */}
            <Card title="Risk Assessment" subtitle="Critical areas requiring attention" className="lg:col-span-1">
              <div className="space-y-4">
                {risks.slice(0, 4).map((risk) => (
                  <div key={risk.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-[#0e0934] dark:text-white font-montserrat">
                        {risk.title}
                      </h4>
                      <Badge variant={getSeverityColor(risk.severity) as any} size="sm">
                        {risk.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-montserrat">
                      {risk.impact}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-montserrat">
                        Probability:
                      </span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-[#bf2e8a] to-red-500 h-1.5 rounded-full"
                          style={{ width: `${risk.probability}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#bf2e8a] font-montserrat">
                        {risk.probability}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Benchmarking */}
            <Card title="Performance Benchmarking" subtitle="Industry comparison metrics" className="lg:col-span-1">
              <div className="space-y-6">
                {/* Chart Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div className="text-center">
                    <BarChart3 size={48} className="text-[#7ac5d7] mx-auto mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                      Performance Chart
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-montserrat">
                      Integration with analytics service
                    </p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#7ac5d7] font-montserrat">78%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-montserrat">
                      Industry Percentile
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#bf2e8a] font-montserrat">+12%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-montserrat">
                      Performance Gain
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Strategic Recommendations - Full Width */}
          <Card 
            title="Strategic Recommendations" 
            subtitle="AI-powered actionable insights"
            id="recommendations-section"
          >
            <div className="mb-6">
              <Button
                onClick={handleGenerateRecommendations}
                disabled={generating || generateRecommendationsMutation.isPending}
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                {generating || generateRecommendationsMutation.isPending ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Generating AI Recommendations...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" />
                    Generate AI Recommendations
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-semibold text-[#0e0934] dark:text-white font-montserrat">
                      {rec.title}
                    </h4>
                    <Badge variant={getPriorityColor(rec.priority) as any} size="sm">
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs font-montserrat">
                      <span className="text-gray-600 dark:text-gray-400">Impact:</span>
                      <span className="text-[#bf2e8a] font-medium">{rec.impact}</span>
                    </div>
                    <div className="flex justify-between text-xs font-montserrat">
                      <span className="text-gray-600 dark:text-gray-400">Effort:</span>
                      <span className="text-[#7ac5d7] font-medium">{rec.effort}</span>
                    </div>
                    <div className="flex justify-between text-xs font-montserrat">
                      <span className="text-gray-600 dark:text-gray-400">Timeline:</span>
                      <span className="text-[#0e0934] dark:text-white font-medium">{rec.timeline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1">
                      Implement
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Gamification Dashboard - Positioned Below Main Content */}
          {showGamificationDashboard && (
            <div className="mt-8">
              <AchievementDisplay />
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default AssessStrategyDashboardPage;
