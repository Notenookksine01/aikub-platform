import { BudgetOptimizationAgent } from '../../agents/budgetOptimizationAgent';
import { AdPerformanceMetrics } from '../../types';

describe('BudgetOptimizationAgent', () => {
  let agent: BudgetOptimizationAgent;

  beforeEach(() => {
    agent = new BudgetOptimizationAgent(2.0, 1000);
  });

  test('should analyze high-performing campaign and recommend budget increase', async () => {
    const metrics: AdPerformanceMetrics = {
      campaignId: 'test-campaign-1',
      impressions: 10000,
      clicks: 500,
      conversions: 50,
      spend: 200,
      ctr: 5.0,
      cpc: 0.4,
      cpa: 4.0,
      roi: 250, // High ROI: 250%
      reach: 8000,
      engagement: 600,
      timestamp: new Date(),
    };

    const analysis = await agent.analyze(metrics);

    expect(analysis.agentName).toBe('BudgetOptimizationAgent');
    expect(analysis.insights.length).toBeGreaterThan(0);
    expect(analysis.recommendations.some(r => r.action === 'increase_budget')).toBe(true);
  });

  test('should analyze low-performing campaign and recommend budget decrease', async () => {
    const metrics: AdPerformanceMetrics = {
      campaignId: 'test-campaign-2',
      impressions: 10000,
      clicks: 100,
      conversions: 5,
      spend: 500,
      ctr: 1.0,
      cpc: 5.0,
      cpa: 100.0,
      roi: 0.5, // Low ROI: 0.5%
      reach: 8000,
      engagement: 50,
      timestamp: new Date(),
    };

    const analysis = await agent.analyze(metrics);

    expect(analysis.insights.length).toBeGreaterThan(0);
    expect(analysis.recommendations.some(r => r.action === 'decrease_budget')).toBe(true);
  });

  test('should calculate optimal budget for high-ROI campaign', async () => {
    const action = {
      type: 'calculate_optimal_budget',
      parameters: {
        currentBudget: 100,
        roi: 300,
      },
    };

    const result = await agent.execute(action);

    expect(result.success).toBe(true);
    expect(result.data?.optimalBudget).toBeGreaterThan(100);
  });

  test('should generate optimization decision for high-ROI campaign', () => {
    const metrics: AdPerformanceMetrics = {
      campaignId: 'test-campaign-3',
      impressions: 10000,
      clicks: 500,
      conversions: 50,
      spend: 700, // 7 days
      ctr: 5.0,
      cpc: 0.4,
      cpa: 4.0,
      roi: 400,
      reach: 8000,
      engagement: 600,
      timestamp: new Date(),
    };

    const decision = agent.generateOptimizationDecision(metrics);

    expect(decision).not.toBeNull();
    expect(decision?.action).toBe('increase_budget');
    expect(decision?.parameters.newBudget).toBeGreaterThan(100);
  });
});
