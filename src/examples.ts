/**
 * Example Usage of AIKUB Platform
 * 
 * This file demonstrates how to use the platform programmatically
 */

import { FacebookAdsClient } from './services/facebookAdsClient';
import { AgentOrchestrator } from './services/agentOrchestrator';
import { BudgetOptimizationAgent } from './agents/budgetOptimizationAgent';
import { AudienceTargetingAgent } from './agents/audienceTargetingAgent';
import logger from './utils/logger';

async function exampleBasicUsage() {
  console.log('=== Example 1: Basic Analysis ===');
  
  // Initialize Facebook client
  const facebookClient = new FacebookAdsClient(
    'your_access_token',
    'act_your_ad_account_id'
  );

  // Get campaigns
  const campaigns = await facebookClient.getCampaigns();
  console.log(`Found ${campaigns.length} campaigns`);

  // Get metrics for first campaign
  if (campaigns.length > 0) {
    const metrics = await facebookClient.getCampaignMetrics(campaigns[0].id);
    console.log('Campaign Metrics:', {
      spend: metrics.spend,
      conversions: metrics.conversions,
      roi: metrics.roi,
    });
  }
}

async function exampleBudgetOptimization() {
  console.log('\n=== Example 2: Budget Optimization ===');
  
  // Initialize budget optimization agent
  const budgetAgent = new BudgetOptimizationAgent(2.0, 1000);

  // Sample performance metrics
  const metrics = {
    campaignId: 'campaign-123',
    impressions: 10000,
    clicks: 500,
    conversions: 50,
    spend: 200,
    ctr: 5.0,
    cpc: 0.4,
    cpa: 4.0,
    roi: 250,
    reach: 8000,
    engagement: 600,
    timestamp: new Date(),
  };

  // Analyze performance
  const analysis = await budgetAgent.analyze(metrics);
  
  console.log('Analysis Insights:');
  analysis.insights.forEach(insight => console.log(`  - ${insight}`));
  
  console.log('\nRecommendations:');
  analysis.recommendations.forEach(rec => {
    console.log(`  [${rec.priority.toUpperCase()}] ${rec.action}`);
    console.log(`    Reasoning: ${rec.reasoning}`);
    console.log(`    Expected Impact: ${rec.expectedImpact}`);
  });

  // Generate optimization decision
  const decision = budgetAgent.generateOptimizationDecision(metrics);
  if (decision) {
    console.log('\nOptimization Decision:');
    console.log(`  Action: ${decision.action}`);
    console.log(`  Reason: ${decision.reason}`);
    console.log(`  Expected Outcome: ${decision.expectedOutcome}`);
  }
}

async function exampleAudienceTargeting() {
  console.log('\n=== Example 3: Audience Targeting ===');
  
  const audienceAgent = new AudienceTargetingAgent();

  const audienceData = {
    demographics: {
      age: ['25-34', '35-44'],
      gender: ['male', 'female'],
      location: ['US', 'UK', 'CA'],
    },
    interests: ['technology', 'business', 'marketing'],
    behaviors: ['online_shopping', 'mobile_user'],
    engagement: 1500,
    conversionRate: 0.03,
  };

  // Analyze audience
  const analysis = await audienceAgent.analyze(audienceData);
  
  console.log('Audience Analysis:');
  analysis.insights.forEach(insight => console.log(`  - ${insight}`));
  
  console.log('\nTargeting Recommendations:');
  analysis.recommendations.forEach(rec => {
    console.log(`  [${rec.priority.toUpperCase()}] ${rec.action}`);
  });

  // Calculate quality score
  const qualityScore = audienceAgent.scoreAudienceQuality(audienceData);
  console.log(`\nAudience Quality Score: ${qualityScore}/100`);
}

async function exampleOrchestrator() {
  console.log('\n=== Example 4: Full Orchestration ===');
  
  const facebookClient = new FacebookAdsClient(
    'your_access_token',
    'act_your_ad_account_id'
  );

  const orchestrator = new AgentOrchestrator(facebookClient, {
    minROI: 2.0,
    maxDailyBudget: 1000,
  });

  // Run comprehensive analysis
  console.log('Running comprehensive analysis...');
  const analysis = await orchestrator.runComprehensiveAnalysis();
  
  console.log('\nOverall Metrics:');
  console.log(`  Total Spend: $${analysis.metrics.totalSpend.toFixed(2)}`);
  console.log(`  Total Conversions: ${analysis.metrics.totalConversions}`);
  console.log(`  Average ROI: ${analysis.metrics.averageROI.toFixed(2)}%`);
  console.log(`  Total Reach: ${analysis.metrics.totalReach.toLocaleString()}`);

  console.log('\nTop Insights:');
  analysis.insights.slice(0, 3).forEach((insight: string) => {
    console.log(`  - ${insight}`);
  });

  console.log('\nTop Recommendations:');
  analysis.recommendations.slice(0, 3).forEach((rec: any) => {
    console.log(`  [${rec.priority.toUpperCase()}] ${rec.action}`);
  });

  // Generate optimization decisions (dry run)
  console.log('\nGenerating optimization decisions...');
  const decisions = await orchestrator.executeOptimizations(true);
  
  console.log(`Generated ${decisions.length} optimization decisions`);
  decisions.forEach(decision => {
    console.log(`\n  Campaign: ${decision.campaignId}`);
    console.log(`  Action: ${decision.action}`);
    console.log(`  Reason: ${decision.reason}`);
  });

  // Generate report
  console.log('\nGenerating comprehensive report...');
  const report = await orchestrator.generateReport();
  console.log('Report summary:', report.summary);
}

async function exampleScheduledOptimization() {
  console.log('\n=== Example 5: Scheduled Optimization ===');
  
  const facebookClient = new FacebookAdsClient(
    'your_access_token',
    'act_your_ad_account_id'
  );

  const orchestrator = new AgentOrchestrator(facebookClient);

  // Run optimization cycle every 6 hours
  const intervalHours = 6;
  console.log(`Scheduling optimization cycles every ${intervalHours} hours`);

  setInterval(async () => {
    console.log('\n--- Running Scheduled Optimization Cycle ---');
    try {
      await orchestrator.runOptimizationCycle(false); // Dry run
      console.log('Optimization cycle completed successfully');
    } catch (error) {
      console.error('Error in optimization cycle:', error);
    }
  }, intervalHours * 60 * 60 * 1000);

  console.log('Scheduled optimization is running. Press Ctrl+C to stop.');
}

// Main function to run examples
async function main() {
  try {
    console.log('AIKUB Platform Usage Examples\n');
    console.log('Note: Replace placeholder values with your actual Facebook API credentials\n');

    // Uncomment the examples you want to run:
    
    // await exampleBasicUsage();
    // await exampleBudgetOptimization();
    // await exampleAudienceTargeting();
    // await exampleOrchestrator();
    // await exampleScheduledOptimization();

    console.log('\n✅ All examples completed!');
    console.log('Uncomment the examples in the main() function to run them.');
    
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export {
  exampleBasicUsage,
  exampleBudgetOptimization,
  exampleAudienceTargeting,
  exampleOrchestrator,
  exampleScheduledOptimization,
};
