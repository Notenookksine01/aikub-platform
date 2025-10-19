import { AIAgent, AgentAnalysis, AgentAction, AgentResult, AudienceData } from '../types';
import logger from '../utils/logger';

/**
 * Audience Targeting Agent
 * Analyzes audience data and optimizes targeting for better conversion
 * Goals: Reach the most relevant audience, improve conversion rates
 */
export class AudienceTargetingAgent implements AIAgent {
  name = 'AudienceTargetingAgent';

  async analyze(audienceData: AudienceData): Promise<AgentAnalysis> {
    logger.info(`${this.name} analyzing audience data`);

    const insights: string[] = [];
    const recommendations: any[] = [];
    const confidence = 0.85;

    // Analyze conversion rate
    if (audienceData.conversionRate < 0.02) {
      insights.push(`Low conversion rate: ${(audienceData.conversionRate * 100).toFixed(2)}%`);
      recommendations.push({
        action: 'refine_targeting',
        priority: 'high',
        expectedImpact: 'Increase conversion rate by 50-100%',
        reasoning: 'Current audience may not be well-targeted',
      });
    }

    // Analyze engagement
    if (audienceData.engagement < 100) {
      insights.push('Low audience engagement detected');
      recommendations.push({
        action: 'expand_interests',
        priority: 'medium',
        expectedImpact: 'Increase reach by 30-50%',
        reasoning: 'Limited audience engagement suggests need for broader interest targeting',
      });
    }

    // Demographics analysis
    if (audienceData.demographics.age.length < 2) {
      insights.push('Limited age group targeting');
      recommendations.push({
        action: 'test_age_groups',
        priority: 'low',
        expectedImpact: 'Discover new high-converting segments',
        reasoning: 'Testing multiple age groups can reveal untapped opportunities',
      });
    }

    // Interest diversity
    if (audienceData.interests.length < 5) {
      insights.push('Limited interest targeting');
      recommendations.push({
        action: 'expand_interests',
        priority: 'medium',
        expectedImpact: 'Increase qualified leads by 20-30%',
        reasoning: 'More diverse interest targeting can improve audience quality',
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
        case 'generate_targeting_recommendations': {
          const recommendations = this.generateTargetingRecommendations(
            action.parameters.audienceData
          );

          return {
            success: true,
            message: 'Targeting recommendations generated',
            data: { recommendations },
          };
        }

        case 'analyze_demographics': {
          const insights = this.analyzeDemographics(
            action.parameters.demographics
          );

          return {
            success: true,
            message: 'Demographics analyzed',
            data: { insights },
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

  private generateTargetingRecommendations(audienceData: AudienceData): string[] {
    const recommendations: string[] = [];

    // Suggest lookalike audiences
    if (audienceData.conversionRate > 0.03) {
      recommendations.push('Create lookalike audience based on high-converting users');
    }

    // Suggest interest expansion
    if (audienceData.interests.length < 10) {
      recommendations.push('Expand interest targeting to reach similar audiences');
    }

    // Suggest geo-targeting optimization
    if (audienceData.demographics.location.length > 5) {
      recommendations.push('Focus on top-performing locations to improve efficiency');
    }

    // Suggest demographic refinement
    recommendations.push('Test different age and gender combinations to find optimal segments');

    return recommendations;
  }

  private analyzeDemographics(demographics: any): string[] {
    const insights: string[] = [];

    if (demographics.age) {
      insights.push(`Age groups: ${demographics.age.join(', ')}`);
    }

    if (demographics.gender) {
      insights.push(`Gender distribution: ${demographics.gender.join(', ')}`);
    }

    if (demographics.location) {
      insights.push(`Top locations: ${demographics.location.slice(0, 3).join(', ')}`);
    }

    return insights;
  }

  /**
   * Score audience quality based on multiple factors
   */
  scoreAudienceQuality(audienceData: AudienceData): number {
    let score = 0;

    // Conversion rate weight: 40%
    score += Math.min(audienceData.conversionRate * 100, 10) * 4;

    // Engagement weight: 30%
    score += Math.min(audienceData.engagement / 1000, 1) * 30;

    // Interest diversity weight: 15%
    score += Math.min(audienceData.interests.length / 20, 1) * 15;

    // Demographics diversity weight: 15%
    const demoScore = 
      (audienceData.demographics.age.length / 5) * 5 +
      (audienceData.demographics.gender.length / 2) * 5 +
      (audienceData.demographics.location.length / 10) * 5;
    score += Math.min(demoScore, 15);

    return Math.round(score * 100) / 100;
  }
}
