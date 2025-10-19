import dotenv from 'dotenv';

dotenv.config();

export const config = {
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
    appId: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || '',
    adAccountId: process.env.FACEBOOK_AD_ACCOUNT_ID || '',
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4',
  },
  app: {
    port: parseInt(process.env.PORT || '3000'),
    env: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
  optimization: {
    maxDailyBudget: parseFloat(process.env.MAX_DAILY_BUDGET || '1000'),
    minROIThreshold: parseFloat(process.env.MIN_ROI_THRESHOLD || '2.0'),
    optimizationIntervalHours: parseInt(process.env.OPTIMIZATION_INTERVAL_HOURS || '6'),
  },
};

export function validateConfig(): void {
  const required = [
    'FACEBOOK_ACCESS_TOKEN',
    'FACEBOOK_AD_ACCOUNT_ID',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please copy .env.example to .env and fill in the required values.'
    );
  }
}
