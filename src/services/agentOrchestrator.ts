import { BudgetOptimizationAgent } from '../agents/budgetOptimizationAgent';
import { AudienceTargetingAgent } from '../agents/audienceTargetingAgent';
import { PerformanceAnalysisAgent } from '../agents/performanceAnalysisAgent';
import { ContentOptimizationAgent } from '../agents/contentOptimizationAgent';
import { BrandAwarenessAgent } from '../agents/brandAwarenessAgent';
import { FacebookAdsClient } from '../services/facebookAdsClient';
import { AIAgent, OptimizationDecision } from '../types';
import logger from '../utils/logger';

/**
 * AI Agent Orchestrator
 * Coordinates multiple AI agents to optimize Facebook advertising
 */
export class AgentOrchestrator {
  private budgetAgent: BudgetOptimizationAgent;
  private audienceAgent: AudienceTargetingAgent;
  private performanceAgent: PerformanceAnalysisAgent;
  private contentAgent: ContentOptimizationAgent;
  private brandAgent: BrandAwarenessAgent;
  private facebookClient: FacebookAdsClient;
  private agents: AIAgent[];

  constructor(
    facebookClient: FacebookAdsClient,
    config: {
      minROI?: number;
      maxDailyBudget?: number;
    } = {}
  ) {
    this.facebookClient = facebookClient;
    this.budgetAgent = new BudgetOptimizationAgent(
      config.minROI || 2.0,
      config.maxDailyBudget || 1000
    );
    this.audienceAgent = new AudienceTargetingAgent();
    this.performanceAgent = new PerformanceAnalysisAgent();
    this.contentAgent = new ContentOptimizationAgent();
    this.brandAgent = new BrandAwarenessAgent();

    this.agents = [
      this.budgetAgent,
      this.audienceAgent,
      this.performanceAgent,
      this.contentAgent,
      this.brandAgent,
    ];

    logger.info('Agent Orchestrator initialized with all agents');
  }

  /**
   * Run comprehensive analysis across all agents
   */
  async runComprehensiveAnalysis(): Promise<any> {
    logger.info('Starting comprehensive analysis...');

    try {
      // Fetch campaign data
      const campaigns = await this.facebookClient.getCampaigns();
      logger.info(`Analyzing ${campaigns.length} campaigns`);

      // Fetch metrics for each campaign
      const metricsPromises = campaigns.map(campaign =>
        this.facebookClient.getCampaignMetrics(campaign.id)
      );
      const allMetrics = await Promise.all(metricsPromises);

      // Run performance analysis
      const performanceAnalysis = await this.performanceAgent.analyze(allMetrics);

      // Run budget optimization for each campaign
      const budgetAnalyses = await Promise.all(
        allMetrics.map(metrics => this.budgetAgent.analyze(metrics))
      );

      // Collect all insights and recommendations
      const allAnalyses = [performanceAnalysis, ...budgetAnalyses];

      const insights = allAnalyses.flatMap(analysis => analysis.insights);
      const recommendations = allAnalyses.flatMap(analysis => analysis.recommendations);

      logger.info(`Analysis complete: ${insights.length} insights, ${recommendations.length} recommendations`);

      return {
        timestamp: new Date(),
        campaigns: campaigns.length,
        insights,
        recommendations: this.prioritizeRecommendations(recommendations),
        metrics: {
          totalSpend: allMetrics.reduce((sum, m) => sum + m.spend, 0),
          totalConversions: allMetrics.reduce((sum, m) => sum + m.conversions, 0),
          averageROI: allMetrics.reduce((sum, m) => sum + m.roi, 0) / allMetrics.length,
          totalReach: allMetrics.reduce((sum, m) => sum + m.reach, 0),
        },
      };
    } catch (error) {
      logger.error('Error in comprehensive analysis:', error);
      throw error;
    }
  }

  /**
   * Execute optimization decisions automatically
   */
  async executeOptimizations(dryRun: boolean = true): Promise<OptimizationDecision[]> {
    logger.info(`Executing optimizations (dry run: ${dryRun})...`);

    const decisions: OptimizationDecision[] = [];

    try {
      const campaigns = await this.facebookClient.getCampaigns();
      const activeCampaigns = campaigns.filter(c => c.status === 'active');

      for (const campaign of activeCampaigns) {
        const metrics = await this.facebookClient.getCampaignMetrics(campaign.id);
        const decision = this.budgetAgent.generateOptimizationDecision(metrics);

        if (decision) {
          decisions.push(decision);

          if (!dryRun) {
            await this.executeDecision(decision);
          }
        }
      }

      logger.info(`Generated ${decisions.length} optimization decisions`);
      return decisions;
    } catch (error) {
      logger.error('Error executing optimizations:', error);
      throw error;
    }
  }

  /**
   * Execute a single optimization decision
   */
  private async executeDecision(decision: OptimizationDecision): Promise<void> {
    logger.info(`Executing decision: ${decision.action} for campaign ${decision.campaignId}`);

    try {
      switch (decision.action) {
        case 'increase_budget':
        case 'decrease_budget':
          await this.facebookClient.updateCampaignBudget(
            decision.campaignId,
            decision.parameters.newBudget
          );
          break;

        case 'pause':
          await this.facebookClient.updateCampaignStatus(
            decision.campaignId,
            'PAUSED'
          );
          break;

        case 'adjust_targeting':
          logger.info('Targeting adjustment requires manual review');
          break;

        case 'optimize_creative':
          logger.info('Creative optimization requires manual review');
          break;
      }
    } catch (error) {
      logger.error(`Error executing decision for campaign ${decision.campaignId}:`, error);
      throw error;
    }
  }

  /**
   * Prioritize recommendations by priority level
   */
  private prioritizeRecommendations(recommendations: any[]): any[] {
    const priorityOrder: { [key: string]: number } = { high: 1, medium: 2, low: 3 };

    return recommendations.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Generate a comprehensive report
   */
  async generateReport(): Promise<any> {
    logger.info('Generating comprehensive report...');

    const analysis = await this.runComprehensiveAnalysis();

    return {
      reportDate: new Date(),
      summary: {
        totalCampaigns: analysis.campaigns,
        totalSpend: analysis.metrics.totalSpend,
        totalConversions: analysis.metrics.totalConversions,
        averageROI: analysis.metrics.averageROI,
        totalReach: analysis.metrics.totalReach,
      },
      insights: analysis.insights,
      recommendations: analysis.recommendations,
      agentStatus: this.agents.map(agent => ({
        name: agent.name,
        status: 'active',
      })),
    };
  }

  /**
   * Run optimization cycle (should be called periodically)
   */
  async runOptimizationCycle(autoExecute: boolean = false): Promise<void> {
    logger.info('Starting optimization cycle...');

    try {
      // Step 1: Analyze current performance
      const analysis = await this.runComprehensiveAnalysis();
      logger.info('Performance analysis complete');

      // Step 2: Generate optimization decisions
      const decisions = await this.executeOptimizations(!autoExecute);
      logger.info(`Generated ${decisions.length} optimization decisions`);

      // Step 3: Log summary
      logger.info('Optimization cycle complete', {
        insights: analysis.insights.length,
        recommendations: analysis.recommendations.length,
        decisions: decisions.length,
        autoExecuted: autoExecute,
      });
    } catch (error) {
      logger.error('Error in optimization cycle:', error);
      throw error;
    }
  }
}
