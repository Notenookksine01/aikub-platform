import { AIAgent, AgentAnalysis, AgentAction, AgentResult, AdPerformanceMetrics, OptimizationDecision } from '../types';
import logger from '../utils/logger';

/**
 * Budget Optimization Agent
 * Analyzes campaign performance and optimizes budget allocation
 * Goals: Reduce costs while maintaining or improving ROI
 */
export class BudgetOptimizationAgent implements AIAgent {
  name = 'BudgetOptimizationAgent';
  private minROI: number;
  private maxDailyBudget: number;

  constructor(minROI: number = 2.0, maxDailyBudget: number = 1000) {
    this.minROI = minROI;
    this.maxDailyBudget = maxDailyBudget;
  }

  async analyze(metrics: AdPerformanceMetrics): Promise<AgentAnalysis> {
    logger.info(`${this.name} analyzing campaign ${metrics.campaignId}`);

    const insights: string[] = [];
    const recommendations: any[] = [];
    const confidence = 0.8;

    // Analyze ROI
    if (metrics.roi > this.minROI * 1.5) {
      insights.push(`Campaign has excellent ROI: ${metrics.roi.toFixed(2)}%`);
      recommendations.push({
        action: 'increase_budget',
        priority: 'high',
        expectedImpact: `Potential to increase revenue by ${(metrics.roi * 0.2).toFixed(2)}%`,
        reasoning: 'High-performing campaign can benefit from increased budget allocation',
      });
    } else if (metrics.roi < this.minROI) {
      insights.push(`Campaign ROI is below threshold: ${metrics.roi.toFixed(2)}% < ${this.minROI}%`);
      recommendations.push({
        action: 'decrease_budget',
        priority: 'high',
        expectedImpact: 'Reduce costs by 20-30% while optimizing targeting',
        reasoning: 'Poor ROI indicates inefficient spending',
      });
    }

    // Analyze CPA
    if (metrics.cpa > 0 && metrics.conversions > 0) {
      const avgCPA = metrics.spend / metrics.conversions;
      if (avgCPA > 50) {
        insights.push(`High cost per acquisition: $${avgCPA.toFixed(2)}`);
        recommendations.push({
          action: 'optimize_targeting',
          priority: 'medium',
          expectedImpact: 'Reduce CPA by 15-25%',
          reasoning: 'High CPA suggests targeting refinement is needed',
        });
      }
    }

    // Analyze engagement
    if (metrics.engagement < metrics.reach * 0.01) {
      insights.push('Low engagement rate detected');
      recommendations.push({
        action: 'optimize_creative',
        priority: 'medium',
        expectedImpact: 'Increase engagement by 30-40%',
        reasoning: 'Low engagement indicates creative content needs improvement',
      });
    }

    return {
      agentName: this.name,
      timestamp: new Date(),
      insights,
      recommendations,
      confidence,
    };
  }

  async execute(action: AgentAction): Promise<AgentResult> {
    try {
      logger.info(`${this.name} executing action: ${action.type}`);

      switch (action.type) {
        case 'calculate_optimal_budget': {
          const currentBudget = action.parameters.currentBudget;
          const roi = action.parameters.roi;
          const optimalBudget = this.calculateOptimalBudget(currentBudget, roi);

          return {
            success: true,
            message: `Optimal budget calculated: $${optimalBudget}`,
            data: { optimalBudget },
          };
        }

        default:
          return {
            success: false,
            message: `Unknown action type: ${action.type}`,
          };
      }
    } catch (error) {
      logger.error(`${this.name} execution error:`, error);
      return {
        success: false,
        message: `Error executing action: ${error}`,
      };
    }
  }

  private calculateOptimalBudget(currentBudget: number, roi: number): number {
    let optimalBudget = currentBudget;

    if (roi > this.minROI * 1.5) {
      // Increase budget for high-performing campaigns
      optimalBudget = Math.min(currentBudget * 1.2, this.maxDailyBudget);
    } else if (roi < this.minROI) {
      // Decrease budget for low-performing campaigns
      optimalBudget = currentBudget * 0.7;
    }

    return Math.round(optimalBudget * 100) / 100;
  }

  generateOptimizationDecision(metrics: AdPerformanceMetrics): OptimizationDecision | null {
    const roi = metrics.roi;
    const currentBudget = metrics.spend / 7; // Average daily spend

    if (roi > this.minROI * 1.5 && currentBudget < this.maxDailyBudget) {
      return {
        campaignId: metrics.campaignId,
        action: 'increase_budget',
        reason: `High ROI of ${roi.toFixed(2)}% indicates campaign can scale`,
        parameters: {
          newBudget: Math.min(currentBudget * 1.2, this.maxDailyBudget),
        },
        expectedOutcome: `Increase in revenue while maintaining ROI above ${this.minROI}%`,
      };
    }

    if (roi < this.minROI) {
      return {
        campaignId: metrics.campaignId,
        action: 'decrease_budget',
        reason: `ROI of ${roi.toFixed(2)}% is below minimum threshold of ${this.minROI}%`,
        parameters: {
          newBudget: currentBudget * 0.7,
        },
        expectedOutcome: 'Reduced waste on underperforming campaign',
      };
    }

    return null;
  }
}
