/**
 * Base AI Agent Interface
 * All AI agents implement this interface
 */
export interface AIAgent {
  name: string;
  analyze(data: any): Promise<AgentAnalysis>;
  execute(action: AgentAction): Promise<AgentResult>;
}

export interface AgentAnalysis {
  agentName: string;
  timestamp: Date;
  insights: string[];
  recommendations: Recommendation[];
  confidence: number;
}

export interface Recommendation {
  action: string;
  priority: 'high' | 'medium' | 'low';
  expectedImpact: string;
  reasoning: string;
}

export interface AgentAction {
  type: string;
  parameters: Record<string, any>;
}

export interface AgentResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Facebook Ads Data Structures
 */
export interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'deleted';
  budget: number;
  dailyBudget: number;
  objective: string;
  startDate: Date;
  endDate?: Date;
}

export interface AdPerformanceMetrics {
  campaignId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number; // Click-through rate
  cpc: number; // Cost per click
  cpa: number; // Cost per acquisition
  roi: number; // Return on investment
  reach: number;
  engagement: number;
  timestamp: Date;
}

export interface AudienceData {
  demographics: {
    age: string[];
    gender: string[];
    location: string[];
  };
  interests: string[];
  behaviors: string[];
  engagement: number;
  conversionRate: number;
}

export interface OptimizationDecision {
  campaignId: string;
  action: 'increase_budget' | 'decrease_budget' | 'pause' | 'adjust_targeting' | 'optimize_creative';
  reason: string;
  parameters: Record<string, any>;
  expectedOutcome: string;
}
