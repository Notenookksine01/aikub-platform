import { config, validateConfig } from './config';
import { FacebookAdsClient } from './services/facebookAdsClient';
import { AgentOrchestrator } from './services/agentOrchestrator';
import logger from './utils/logger';

/**
 * Main application entry point
 * AI-powered Facebook Advertising Management Platform
 */
async function main() {
  try {
    logger.info('Starting AIKUB Platform - AI-Powered Facebook Advertising Management');
    logger.info('=================================================================');

    // Validate configuration
    logger.info('Validating configuration...');
    validateConfig();
    logger.info('Configuration validated successfully');

    // Initialize Facebook Ads Client
    logger.info('Initializing Facebook Ads Client...');
    const facebookClient = new FacebookAdsClient(
      config.facebook.accessToken,
      config.facebook.adAccountId
    );

    // Initialize Agent Orchestrator
    logger.info('Initializing AI Agent Orchestrator...');
    const orchestrator = new AgentOrchestrator(facebookClient, {
      minROI: config.optimization.minROIThreshold,
      maxDailyBudget: config.optimization.maxDailyBudget,
    });

    logger.info('All systems initialized successfully');
    logger.info('=================================================================');

    // Run initial comprehensive analysis
    logger.info('Running initial comprehensive analysis...');
    const analysis = await orchestrator.runComprehensiveAnalysis();

    logger.info('\n📊 Analysis Results:');
    logger.info(`   Campaigns Analyzed: ${analysis.campaigns}`);
    logger.info(`   Total Spend: $${analysis.metrics.totalSpend.toFixed(2)}`);
    logger.info(`   Total Conversions: ${analysis.metrics.totalConversions}`);
    logger.info(`   Average ROI: ${analysis.metrics.averageROI.toFixed(2)}%`);
    logger.info(`   Total Reach: ${analysis.metrics.totalReach.toLocaleString()}`);

    logger.info('\n💡 Key Insights:');
    analysis.insights.slice(0, 5).forEach((insight: string, index: number) => {
      logger.info(`   ${index + 1}. ${insight}`);
    });

    logger.info('\n🎯 Top Recommendations:');
    analysis.recommendations.slice(0, 5).forEach((rec: any, index: number) => {
      logger.info(`   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.action}`);
      logger.info(`      ${rec.reasoning}`);
      logger.info(`      Expected Impact: ${rec.expectedImpact}`);
    });

    // Run optimization cycle (dry run)
    logger.info('\n🔧 Running Optimization Cycle (Dry Run)...');
    await orchestrator.runOptimizationCycle(false);

    // Generate comprehensive report
    logger.info('\n📈 Generating Comprehensive Report...');
    const report = await orchestrator.generateReport();

    logger.info('\n✅ Report Generated Successfully');
    logger.info('=================================================================');

    // Schedule periodic optimization cycles
    logger.info(`\n⏰ Scheduling optimization cycles every ${config.optimization.optimizationIntervalHours} hours`);
    
    setInterval(async () => {
      logger.info('\n🔄 Running scheduled optimization cycle...');
      try {
        await orchestrator.runOptimizationCycle(false);
        logger.info('✅ Scheduled optimization cycle completed');
      } catch (error) {
        logger.error('❌ Error in scheduled optimization cycle:', error);
      }
    }, config.optimization.optimizationIntervalHours * 60 * 60 * 1000);

    logger.info('\n🚀 AIKUB Platform is now running');
    logger.info('   Platform will continuously monitor and optimize your campaigns');
    logger.info('   Press Ctrl+C to stop');

  } catch (error) {
    logger.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('\n\n👋 Shutting down AIKUB Platform...');
  logger.info('Goodbye!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('\n\n👋 Shutting down AIKUB Platform...');
  logger.info('Goodbye!');
  process.exit(0);
});

// Start the application
main().catch(error => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});
