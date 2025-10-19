# Quick Reference Guide

## Installation
```bash
git clone https://github.com/Notenookksine01/aikub-platform.git
cd aikub-platform
npm install
cp .env.example .env
# Edit .env with your credentials
npm run build
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FACEBOOK_ACCESS_TOKEN` | Facebook API access token | Required |
| `FACEBOOK_AD_ACCOUNT_ID` | Ad account ID (with act_ prefix) | Required |
| `MAX_DAILY_BUDGET` | Maximum daily budget per campaign | 1000 |
| `MIN_ROI_THRESHOLD` | Minimum ROI percentage | 2.0 |
| `OPTIMIZATION_INTERVAL_HOURS` | Hours between optimizations | 6 |

## Common Commands

```bash
# Development
npm run dev              # Run in development mode with hot reload
npm run build           # Build TypeScript to JavaScript
npm start               # Start the platform

# Testing
npm test                # Run all tests
npm test -- --coverage  # Run tests with coverage report

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
```

## Key Concepts

### AI Agents

1. **BudgetOptimizationAgent** - Optimizes spending based on ROI
2. **AudienceTargetingAgent** - Refines audience targeting
3. **PerformanceAnalysisAgent** - Analyzes campaign performance
4. **ContentOptimizationAgent** - Improves ad creative
5. **BrandAwarenessAgent** - Builds brand recognition and SEO

### Optimization Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| ROI > 300% | High Performance | Increase budget by 20% |
| ROI < 200% | Low Performance | Decrease budget by 30% |
| ROI < 50% | Very Poor | Pause campaign |
| Engagement < 1% | Low Engagement | Optimize creative |
| CPA > $50 | High Cost | Refine targeting |

## Code Examples

### Basic Usage
```typescript
import { FacebookAdsClient } from './services/facebookAdsClient';
import { AgentOrchestrator } from './services/agentOrchestrator';

const client = new FacebookAdsClient(token, accountId);
const orchestrator = new AgentOrchestrator(client);

// Run analysis
const analysis = await orchestrator.runComprehensiveAnalysis();
console.log(analysis.insights);
```

### Budget Optimization
```typescript
import { BudgetOptimizationAgent } from './agents/budgetOptimizationAgent';

const agent = new BudgetOptimizationAgent(2.0, 1000);
const analysis = await agent.analyze(metrics);
const decision = agent.generateOptimizationDecision(metrics);
```

### Audience Targeting
```typescript
import { AudienceTargetingAgent } from './agents/audienceTargetingAgent';

const agent = new AudienceTargetingAgent();
const score = agent.scoreAudienceQuality(audienceData);
const analysis = await agent.analyze(audienceData);
```

## Troubleshooting

### "Missing required environment variables"
**Solution:** Copy `.env.example` to `.env` and fill in your Facebook API credentials

### "Invalid access token"
**Solution:** Regenerate token from Facebook Graph API Explorer with correct permissions

### "Rate limit exceeded"
**Solution:** Increase `OPTIMIZATION_INTERVAL_HOURS` or reduce number of campaigns

### Build errors
**Solution:** Delete `node_modules` and `dist`, then run `npm install && npm run build`

## API Endpoints (Facebook)

The platform uses these Facebook Marketing API endpoints:

- `GET /{ad_account_id}/campaigns` - Fetch campaigns
- `GET /{campaign_id}/insights` - Get performance metrics
- `POST /{campaign_id}` - Update campaign (budget, status)
- `GET /{campaign_id}/insights?breakdowns=age,gender,country` - Audience insights

## Best Practices

1. **Start Small** - Test with a few campaigns first
2. **Use Dry Run** - Always test decisions before auto-executing
3. **Monitor Regularly** - Check reports and logs frequently
4. **Set Alerts** - Configure notifications for major decisions
5. **Review Decisions** - Don't rely 100% on automation initially
6. **Keep Backups** - Save campaign configurations before changes
7. **Test Credentials** - Verify API access before going live
8. **Update Tokens** - Refresh access tokens regularly

## Metrics Glossary

| Metric | Definition |
|--------|------------|
| **ROI** | Return on Investment - (Revenue - Cost) / Cost × 100 |
| **CTR** | Click-Through Rate - (Clicks / Impressions) × 100 |
| **CPC** | Cost Per Click - Total Spend / Total Clicks |
| **CPA** | Cost Per Acquisition - Total Spend / Total Conversions |
| **Reach** | Number of unique users who saw the ad |
| **Engagement** | Total interactions (likes, comments, shares, clicks) |
| **Conversion** | Desired action taken (purchase, signup, etc.) |

## Output Examples

### Analysis Output
```
📊 Analysis Results:
   Campaigns Analyzed: 5
   Total Spend: $1,234.56
   Total Conversions: 89
   Average ROI: 234.5%
   Total Reach: 45,678

💡 Key Insights:
   1. Campaign has excellent ROI: 345.23%
   2. Total spend across campaigns: $1,234.56
   3. Best performing campaign: campaign-123
```

### Recommendation Output
```
🎯 Top Recommendations:
   1. [HIGH] increase_budget
      High-performing campaign can benefit from increased budget
      Expected Impact: Potential to increase revenue by 69%
   
   2. [MEDIUM] optimize_creative
      Low engagement indicates content needs improvement
      Expected Impact: Increase engagement by 30-50%
```

## File Structure

```
aikub-platform/
├── src/
│   ├── agents/           # AI agent implementations
│   ├── services/         # Facebook API & orchestrator
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Logging and utilities
│   ├── config/          # Configuration management
│   └── index.ts         # Main entry point
├── docs/                # Documentation
├── __tests__/           # Test files
└── package.json         # Dependencies
```

## Support

- **Documentation:** See `/docs` folder
- **Issues:** Open a GitHub issue
- **API Docs:** See `docs/API.md`
- **Setup Guide:** See `docs/SETUP.md`
- **Features:** See `docs/FEATURES.md`

## Quick Tips

💡 **Tip 1:** Use `dry run mode` for first week to understand decisions  
💡 **Tip 2:** Set conservative thresholds initially (ROI > 3.0)  
💡 **Tip 3:** Review logs daily: `tail -f combined.log`  
💡 **Tip 4:** Monitor Facebook Ad Account for changes  
💡 **Tip 5:** Keep access tokens secure and rotate regularly  

## Version Information

- **Node.js:** 18.x or higher required
- **TypeScript:** 5.3+
- **Facebook API:** v18.0
- **Platform Version:** 1.0.0

---

For detailed documentation, see:
- [README.md](../README.md) - Overview and quick start
- [SETUP.md](SETUP.md) - Installation and configuration
- [API.md](API.md) - API reference
- [FEATURES.md](FEATURES.md) - Detailed feature list
