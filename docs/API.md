# API Documentation

## FacebookAdsClient

The Facebook Ads Client handles all interactions with the Facebook Marketing API.

### Methods

#### `getCampaigns(): Promise<AdCampaign[]>`
Fetches all campaigns for the configured ad account.

**Returns:** Array of campaign objects with basic information.

**Example:**
```typescript
const campaigns = await facebookClient.getCampaigns();
console.log(`Found ${campaigns.length} campaigns`);
```

#### `getCampaignMetrics(campaignId: string): Promise<AdPerformanceMetrics>`
Retrieves performance metrics for a specific campaign.

**Parameters:**
- `campaignId` (string): The Facebook campaign ID

**Returns:** Performance metrics including spend, conversions, ROI, etc.

**Example:**
```typescript
const metrics = await facebookClient.getCampaignMetrics('campaign-123');
console.log(`ROI: ${metrics.roi}%`);
```

#### `updateCampaignBudget(campaignId: string, newBudget: number): Promise<void>`
Updates the daily budget for a campaign.

**Parameters:**
- `campaignId` (string): The Facebook campaign ID
- `newBudget` (number): New daily budget in dollars

**Example:**
```typescript
await facebookClient.updateCampaignBudget('campaign-123', 150.00);
```

#### `updateCampaignStatus(campaignId: string, status: 'ACTIVE' | 'PAUSED'): Promise<void>`
Pauses or resumes a campaign.

**Parameters:**
- `campaignId` (string): The Facebook campaign ID
- `status` (string): 'ACTIVE' or 'PAUSED'

**Example:**
```typescript
await facebookClient.updateCampaignStatus('campaign-123', 'PAUSED');
```

## AI Agents

### BudgetOptimizationAgent

Analyzes campaign performance and optimizes budget allocation.

#### `analyze(metrics: AdPerformanceMetrics): Promise<AgentAnalysis>`
Analyzes campaign metrics and provides optimization recommendations.

**Example:**
```typescript
const agent = new BudgetOptimizationAgent(2.0, 1000);
const analysis = await agent.analyze(metrics);

console.log('Insights:', analysis.insights);
console.log('Recommendations:', analysis.recommendations);
```

#### `generateOptimizationDecision(metrics: AdPerformanceMetrics): OptimizationDecision | null`
Generates an actionable optimization decision based on performance.

**Example:**
```typescript
const decision = agent.generateOptimizationDecision(metrics);
if (decision) {
  console.log(`Action: ${decision.action}`);
  console.log(`Reason: ${decision.reason}`);
}
```

### AudienceTargetingAgent

Optimizes audience targeting for better conversion rates.

#### `analyze(audienceData: AudienceData): Promise<AgentAnalysis>`
Analyzes audience data and provides targeting recommendations.

#### `scoreAudienceQuality(audienceData: AudienceData): number`
Returns a quality score (0-100) for the audience configuration.

**Example:**
```typescript
const agent = new AudienceTargetingAgent();
const score = agent.scoreAudienceQuality(audienceData);
console.log(`Audience Quality Score: ${score}/100`);
```

### PerformanceAnalysisAgent

Provides comprehensive performance analysis across all campaigns.

#### `analyze(metrics: AdPerformanceMetrics[]): Promise<AgentAnalysis>`
Analyzes performance data for multiple campaigns.

**Example:**
```typescript
const agent = new PerformanceAnalysisAgent();
const analysis = await agent.analyze(allMetrics);

console.log('Total Spend:', analysis.insights[0]);
console.log('Top Performers:', analysis.insights);
```

### ContentOptimizationAgent

Optimizes ad creative and messaging for better engagement.

#### `analyze(data: any): Promise<AgentAnalysis>`
Analyzes content performance and provides optimization suggestions.

**Example:**
```typescript
const agent = new ContentOptimizationAgent();
const analysis = await agent.analyze({
  adCreative: creativeData,
  performance: performanceData
});
```

### BrandAwarenessAgent

Focuses on building brand recognition and improving SEO.

#### `analyze(data: any): Promise<AgentAnalysis>`
Analyzes brand metrics and provides awareness-building recommendations.

#### `calculateBrandHealthScore(metrics: any): number`
Calculates overall brand health score.

**Example:**
```typescript
const agent = new BrandAwarenessAgent();
const score = agent.calculateBrandHealthScore(brandMetrics);
console.log(`Brand Health: ${score}/100`);
```

## AgentOrchestrator

Coordinates all AI agents for comprehensive optimization.

### Methods

#### `runComprehensiveAnalysis(): Promise<any>`
Runs a complete analysis across all campaigns using all agents.

**Example:**
```typescript
const orchestrator = new AgentOrchestrator(facebookClient);
const analysis = await orchestrator.runComprehensiveAnalysis();

console.log('Insights:', analysis.insights);
console.log('Recommendations:', analysis.recommendations);
```

#### `executeOptimizations(dryRun: boolean = true): Promise<OptimizationDecision[]>`
Generates and optionally executes optimization decisions.

**Parameters:**
- `dryRun` (boolean): If true, only generates decisions without executing them

**Example:**
```typescript
// Generate decisions without executing
const decisions = await orchestrator.executeOptimizations(true);

// Execute optimizations automatically
const decisions = await orchestrator.executeOptimizations(false);
```

#### `runOptimizationCycle(autoExecute: boolean = false): Promise<void>`
Runs a complete optimization cycle including analysis and decision execution.

**Example:**
```typescript
// Manual review cycle
await orchestrator.runOptimizationCycle(false);

// Automatic execution cycle
await orchestrator.runOptimizationCycle(true);
```

#### `generateReport(): Promise<any>`
Generates a comprehensive performance report.

**Example:**
```typescript
const report = await orchestrator.generateReport();
console.log('Report:', JSON.stringify(report, null, 2));
```

## Data Types

### AdPerformanceMetrics

```typescript
interface AdPerformanceMetrics {
  campaignId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;      // Click-through rate
  cpc: number;      // Cost per click
  cpa: number;      // Cost per acquisition
  roi: number;      // Return on investment
  reach: number;
  engagement: number;
  timestamp: Date;
}
```

### AudienceData

```typescript
interface AudienceData {
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
```

### OptimizationDecision

```typescript
interface OptimizationDecision {
  campaignId: string;
  action: 'increase_budget' | 'decrease_budget' | 'pause' | 'adjust_targeting' | 'optimize_creative';
  reason: string;
  parameters: Record<string, any>;
  expectedOutcome: string;
}
```
