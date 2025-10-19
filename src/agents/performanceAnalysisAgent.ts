import { AIAgent, AgentAnalysis, AgentAction, AgentResult, AdPerformanceMetrics } from '../types';
import logger from '../utils/logger';

/**
 * Performance Analysis Agent
 * Comprehensive analysis of campaign performance
 * Goals: Identify trends, predict outcomes, provide actionable insights
 */
export class PerformanceAnalysisAgent implements AIAgent {
  name = 'PerformanceAnalysisAgent';

  async analyze(metrics: AdPerformanceMetrics[]): Promise<AgentAnalysis> {
    logger.info(`${this.name} analyzing performance data for ${metrics.length} campaigns`);

    const insights: string[] = [];
    const recommendations: any[] = [];
    const confidence = 0.9;

    if (metrics.length === 0) {
      return {
        agentName: this.name,
        timestamp: new Date(),
        insights: ['No performance data available'],
        recommendations: [],
        confidence: 0,
      };
    }

    // Calculate aggregate metrics
    const totalSpend = metrics.reduce((sum, m) => sum + m.spend, 0);
    const totalConversions = metrics.reduce((sum, m) => sum + m.conversions, 0);
    const avgROI = metrics.reduce((sum, m) => sum + m.roi, 0) / metrics.length;
    const avgCTR = metrics.reduce((sum, m) => sum + m.ctr, 0) / metrics.length;

    insights.push(`Total spend across campaigns: $${totalSpend.toFixed(2)}`);
    insights.push(`Total conversions: ${totalConversions}`);
    insights.push(`Average ROI: ${avgROI.toFixed(2)}%`);
    insights.push(`Average CTR: ${avgCTR.toFixed(2)}%`);

    // Identify best and worst performers
    const sortedByROI = [...metrics].sort((a, b) => b.roi - a.roi);
    const bestPerformer = sortedByROI[0];
    const worstPerformer = sortedByROI[sortedByROI.length - 1];

    insights.push(`Best performing campaign: ${bestPerformer.campaignId} (ROI: ${bestPerformer.roi.toFixed(2)}%)`);
    insights.push(`Worst performing campaign: ${worstPerformer.campaignId} (ROI: ${worstPerformer.roi.toFixed(2)}%)`);

    // Performance-based recommendations
    if (avgROI < 1.5) {
      recommendations.push({
        action: 'optimize_overall_strategy',
        priority: 'high',
        expectedImpact: 'Improve overall ROI by 50-100%',
        reasoning: 'Average ROI is below optimal level, comprehensive optimization needed',
      });
    }

    if (avgCTR < 1.0) {
      recommendations.push({
        action: 'improve_ad_creative',
        priority: 'high',
        expectedImpact: 'Increase CTR by 30-50%',
        reasoning: 'Low CTR indicates ad creative is not resonating with audience',
      });
    }

    // Identify opportunities
    const highPotentialCampaigns = metrics.filter(m => m.roi > 3.0 && m.spend < 100);
    if (highPotentialCampaigns.length > 0) {
      insights.push(`Found ${highPotentialCampaigns.length} high-potential campaigns with low spend`);
      recommendations.push({
        action: 'scale_high_performers',
        priority: 'high',
        expectedImpact: 'Maximize returns on proven campaigns',
        reasoning: 'High-ROI campaigns with low spend are prime candidates for scaling',
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
        case 'generate_performance_report': {
          const report = this.generatePerformanceReport(action.parameters.metrics);
          return {
            success: true,
            message: 'Performance report generated',
            data: { report },
          };
        }

        case 'identify_trends': {
          const trends = this.identifyTrends(action.parameters.metrics);
          return {
            success: true,
            message: 'Trends identified',
            data: { trends },
          };
        }

        case 'predict_outcomes': {
          const predictions = this.predictOutcomes(action.parameters.metrics);
          return {
            success: true,
            message: 'Outcomes predicted',
            data: { predictions },
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

  private generatePerformanceReport(metrics: AdPerformanceMetrics[]): any {
    return {
      summary: {
        totalCampaigns: metrics.length,
        totalSpend: metrics.reduce((sum, m) => sum + m.spend, 0),
        totalConversions: metrics.reduce((sum, m) => sum + m.conversions, 0),
        totalClicks: metrics.reduce((sum, m) => sum + m.clicks, 0),
        totalImpressions: metrics.reduce((sum, m) => sum + m.impressions, 0),
        avgROI: metrics.reduce((sum, m) => sum + m.roi, 0) / metrics.length,
      },
      topPerformers: metrics.sort((a, b) => b.roi - a.roi).slice(0, 5),
      underperformers: metrics.sort((a, b) => a.roi - b.roi).slice(0, 5),
      recommendations: this.generateRecommendations(metrics),
    };
  }

  private identifyTrends(metrics: AdPerformanceMetrics[]): string[] {
    const trends: string[] = [];

    // Analyze spend trends
    const avgSpend = metrics.reduce((sum, m) => sum + m.spend, 0) / metrics.length;
    const highSpendCampaigns = metrics.filter(m => m.spend > avgSpend * 1.5);
    
    if (highSpendCampaigns.length > metrics.length * 0.3) {
      trends.push('Increasing spend concentration in specific campaigns');
    }

    // Analyze ROI trends
    const positiveROI = metrics.filter(m => m.roi > 2.0);
    if (positiveROI.length > metrics.length * 0.6) {
      trends.push('Majority of campaigns showing positive ROI trend');
    }

    // Analyze engagement trends
    const avgEngagement = metrics.reduce((sum, m) => sum + m.engagement, 0) / metrics.length;
    if (avgEngagement > 1000) {
      trends.push('Strong engagement across campaigns');
    }

    return trends;
  }

  private predictOutcomes(metrics: AdPerformanceMetrics[]): any {
    const avgROI = metrics.reduce((sum, m) => sum + m.roi, 0) / metrics.length;
    const totalSpend = metrics.reduce((sum, m) => sum + m.spend, 0);

    return {
      projectedROI: avgROI * 1.1, // Conservative 10% improvement
      projectedMonthlySpend: (totalSpend / 7) * 30,
      projectedConversions: metrics.reduce((sum, m) => sum + m.conversions, 0) * 4.3,
      confidence: 0.75,
    };
  }

  private generateRecommendations(metrics: AdPerformanceMetrics[]): string[] {
    const recommendations: string[] = [];

    const avgROI = metrics.reduce((sum, m) => sum + m.roi, 0) / metrics.length;
    if (avgROI < 2.0) {
      recommendations.push('Focus on improving overall campaign ROI through better targeting');
    }

    const lowCTR = metrics.filter(m => m.ctr < 1.0);
    if (lowCTR.length > metrics.length * 0.5) {
      recommendations.push('Improve ad creative and messaging to increase CTR');
    }

    const highCPA = metrics.filter(m => m.cpa > 50);
    if (highCPA.length > 0) {
      recommendations.push('Optimize campaigns with high CPA through refined targeting');
    }

    return recommendations;
  }
}
