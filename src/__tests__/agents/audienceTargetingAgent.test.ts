import { AudienceTargetingAgent } from '../../agents/audienceTargetingAgent';
import { AudienceData } from '../../types';

describe('AudienceTargetingAgent', () => {
  let agent: AudienceTargetingAgent;

  beforeEach(() => {
    agent = new AudienceTargetingAgent();
  });

  test('should analyze audience with low conversion rate', async () => {
    const audienceData: AudienceData = {
      demographics: {
        age: ['25-34'],
        gender: ['male', 'female'],
        location: ['US', 'UK'],
      },
      interests: ['technology', 'business'],
      behaviors: ['online_shopping'],
      engagement: 500,
      conversionRate: 0.01, // 1% - low
    };

    const analysis = await agent.analyze(audienceData);

    expect(analysis.agentName).toBe('AudienceTargetingAgent');
    expect(analysis.insights.length).toBeGreaterThan(0);
    expect(analysis.recommendations.some(r => r.action === 'refine_targeting')).toBe(true);
  });

  test('should recommend interest expansion for limited targeting', async () => {
    const audienceData: AudienceData = {
      demographics: {
        age: ['25-34', '35-44'],
        gender: ['male'],
        location: ['US'],
      },
      interests: ['tech'], // Limited interests
      behaviors: ['online_shopping'],
      engagement: 50, // Low engagement
      conversionRate: 0.03,
    };

    const analysis = await agent.analyze(audienceData);

    expect(analysis.recommendations.some(r => r.action === 'expand_interests')).toBe(true);
  });

  test('should generate targeting recommendations', async () => {
    const action = {
      type: 'generate_targeting_recommendations',
      parameters: {
        audienceData: {
          demographics: {
            age: ['25-34'],
            gender: ['male'],
            location: ['US', 'UK', 'CA'],
          },
          interests: ['tech', 'business'],
          behaviors: [],
          engagement: 1000,
          conversionRate: 0.04,
        },
      },
    };

    const result = await agent.execute(action);

    expect(result.success).toBe(true);
    expect(result.data?.recommendations).toBeDefined();
    expect(result.data?.recommendations.length).toBeGreaterThan(0);
  });

  test('should score audience quality correctly', () => {
    const goodAudience: AudienceData = {
      demographics: {
        age: ['18-24', '25-34', '35-44'],
        gender: ['male', 'female'],
        location: ['US', 'UK', 'CA', 'AU'],
      },
      interests: ['tech', 'business', 'marketing', 'design', 'entrepreneurship'],
      behaviors: ['online_shopping', 'mobile_user'],
      engagement: 5000,
      conversionRate: 0.05,
    };

    const score = agent.scoreAudienceQuality(goodAudience);

    expect(score).toBeGreaterThan(50); // Good audience should score above 50
  });
});
