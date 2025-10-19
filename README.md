# AIKUB Platform - AI-Powered Facebook Advertising Management

> ระบบจัดการค่าใช้จ่ายและประสิทธิภาพการยิงโฆษณา Facebook แบบอัตโนมัติด้วย AI Agents หลายตัว

AIKUB Platform is an intelligent advertising management system that uses multiple AI agents to automatically optimize Facebook advertising campaigns. The platform helps reduce costs, increase sales, improve engagement, and build brand awareness through data-driven decision making.

## 🎯 Key Features

### Multi-Agent AI System
- **Budget Optimization Agent**: Automatically adjusts campaign budgets based on ROI and performance metrics
- **Audience Targeting Agent**: Analyzes and optimizes audience segments for better conversion rates
- **Performance Analysis Agent**: Provides comprehensive campaign performance insights and predictions
- **Content Optimization Agent**: Suggests improvements for ad creative and messaging
- **Brand Awareness Agent**: Focuses on building brand recognition and SEO optimization

### Automated Optimization
- Real-time campaign performance monitoring
- Automatic budget allocation and reallocation
- Intelligent audience targeting recommendations
- Performance predictions and trend analysis
- Scheduled optimization cycles

### Goals Achieved
✅ **Reduce Costs**: Optimize budget allocation to eliminate wasteful spending  
✅ **Increase Sales**: Focus resources on high-converting campaigns  
✅ **Improve Engagement**: Better audience targeting and content optimization  
✅ **Brand Awareness**: Build brand recognition through strategic campaigns  
✅ **SEO Optimization**: Improve organic visibility and search rankings  
✅ **Data Analytics**: Comprehensive insights and actionable recommendations  

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Facebook Business Account with Marketing API access
- Facebook App with appropriate permissions

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Notenookksine01/aikub-platform.git
cd aikub-platform
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your Facebook API credentials
```

4. Build the project:
```bash
npm run build
```

5. Start the platform:
```bash
npm start
```

## ⚙️ Configuration

Create a `.env` file based on `.env.example` and configure:

```env
# Facebook Marketing API Configuration
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_AD_ACCOUNT_ID=act_your_ad_account_id

# AI Configuration
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-4

# Application Settings
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# Budget Optimization Settings
MAX_DAILY_BUDGET=1000
MIN_ROI_THRESHOLD=2.0
OPTIMIZATION_INTERVAL_HOURS=6
```

## 📊 How It Works

### 1. Data Collection
The platform continuously monitors your Facebook ad campaigns, collecting:
- Performance metrics (impressions, clicks, conversions)
- Cost data (spend, CPC, CPA, ROI)
- Audience insights (demographics, interests, behaviors)
- Engagement metrics (reach, engagement rate)

### 2. AI Analysis
Multiple specialized AI agents analyze the data:

**Budget Optimization Agent**
- Identifies high-performing campaigns for scaling
- Detects underperforming campaigns for budget reduction
- Calculates optimal budget allocation

**Audience Targeting Agent**
- Analyzes conversion rates by audience segment
- Recommends targeting refinements
- Identifies new audience opportunities

**Performance Analysis Agent**
- Tracks trends across all campaigns
- Predicts future performance
- Identifies best practices

**Content Optimization Agent**
- Evaluates ad creative effectiveness
- Suggests improvements for headlines and CTAs
- Recommends content variations

**Brand Awareness Agent**
- Monitors brand reach and sentiment
- Provides SEO recommendations
- Develops content strategies

### 3. Automated Optimization
Based on AI analysis, the platform can:
- Automatically adjust campaign budgets
- Pause underperforming campaigns
- Provide actionable recommendations
- Generate comprehensive reports

### 4. Continuous Improvement
The system runs optimization cycles at configurable intervals (default: every 6 hours) to ensure campaigns stay optimized.

## 🏗️ Architecture

```
aikub-platform/
├── src/
│   ├── agents/              # AI Agent implementations
│   │   ├── budgetOptimizationAgent.ts
│   │   ├── audienceTargetingAgent.ts
│   │   ├── performanceAnalysisAgent.ts
│   │   ├── contentOptimizationAgent.ts
│   │   └── brandAwarenessAgent.ts
│   ├── services/            # External service integrations
│   │   ├── facebookAdsClient.ts
│   │   └── agentOrchestrator.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── logger.ts
│   ├── config/              # Configuration management
│   │   └── index.ts
│   └── index.ts             # Application entry point
├── __tests__/               # Test suite
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 📈 Example Output

When you run the platform, you'll see:

```
Starting AIKUB Platform - AI-Powered Facebook Advertising Management
=================================================================
Validating configuration...
Configuration validated successfully
Initializing Facebook Ads Client...
Initializing AI Agent Orchestrator...
All systems initialized successfully

📊 Analysis Results:
   Campaigns Analyzed: 5
   Total Spend: $1,234.56
   Total Conversions: 89
   Average ROI: 234.5%
   Total Reach: 45,678

💡 Key Insights:
   1. Campaign has excellent ROI: 345.23%
   2. Total spend across campaigns: $1,234.56
   3. Best performing campaign: campaign-123 (ROI: 345.23%)
   4. Found 2 high-potential campaigns with low spend
   5. Low engagement rate detected

🎯 Top Recommendations:
   1. [HIGH] increase_budget
      High-performing campaign can benefit from increased budget allocation
      Expected Impact: Potential to increase revenue by 69.05%
   
   2. [HIGH] scale_high_performers
      High-ROI campaigns with low spend are prime candidates for scaling
      Expected Impact: Maximize returns on proven campaigns

🚀 AIKUB Platform is now running
   Platform will continuously monitor and optimize your campaigns
   Press Ctrl+C to stop
```

## 🔒 Security Best Practices

- Never commit `.env` files or expose API credentials
- Use environment variables for all sensitive configuration
- Regularly rotate API access tokens
- Monitor API usage and implement rate limiting
- Review and audit optimization decisions before auto-execution

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🌟 Features Coming Soon

- [ ] Web dashboard for visualization
- [ ] Advanced ML models for prediction
- [ ] Multi-platform support (Google Ads, LinkedIn)
- [ ] A/B testing automation
- [ ] Custom alert system
- [ ] API for third-party integrations

## 💬 Support

For questions and support, please open an issue on GitHub.

---

**Built with ❤️ for smarter advertising management**