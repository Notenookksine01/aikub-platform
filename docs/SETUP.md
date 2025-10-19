# Setup Guide

## Getting Facebook API Credentials

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Business" as the app type
4. Fill in app details:
   - App Name: Your Platform Name
   - App Contact Email: Your email
   - Business Account: Select your business

### Step 2: Add Marketing API

1. In your app dashboard, click "Add Product"
2. Find "Marketing API" and click "Set Up"
3. Follow the setup wizard

### Step 3: Get Access Token

1. Go to Tools → Graph API Explorer
2. Select your app from the dropdown
3. Click "Generate Access Token"
4. Grant permissions:
   - `ads_read`
   - `ads_management`
   - `business_management`
5. Copy the generated access token

### Step 4: Get Ad Account ID

1. Go to [Facebook Ads Manager](https://business.facebook.com/adsmanager/)
2. Look at the URL: `act_XXXXXXXXXX` is your ad account ID
3. Include the `act_` prefix in your configuration

## Environment Configuration

Create a `.env` file in the project root:

```env
# Facebook Marketing API Configuration
FACEBOOK_ACCESS_TOKEN=your_long_access_token_here
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_AD_ACCOUNT_ID=act_1234567890

# AI Configuration (Optional)
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

### Configuration Options Explained

**FACEBOOK_ACCESS_TOKEN**
- Long-lived user access token or system user token
- Required for all API operations
- Should have ads management permissions

**FACEBOOK_AD_ACCOUNT_ID**
- Must include `act_` prefix
- Found in Facebook Ads Manager URL
- Format: `act_1234567890`

**MAX_DAILY_BUDGET**
- Maximum daily budget (in dollars) the system can allocate to any campaign
- Prevents overspending on automated optimizations
- Default: 1000

**MIN_ROI_THRESHOLD**
- Minimum ROI percentage required for campaigns
- Campaigns below this threshold may have budgets reduced
- Default: 2.0 (200% return)

**OPTIMIZATION_INTERVAL_HOURS**
- How often the system runs optimization cycles
- Recommended: 6-12 hours for most use cases
- Default: 6

## Installation Steps

### 1. Install Node.js

Make sure you have Node.js 18 or higher installed:

```bash
node --version  # Should be 18+
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. Clone the Repository

```bash
git clone https://github.com/Notenookksine01/aikub-platform.git
cd aikub-platform
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- TypeScript
- Winston (logging)
- Axios (HTTP client)
- Jest (testing)

### 4. Configure Environment

```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### 5. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 6. Run Tests (Optional)

```bash
npm test
```

Verify everything is working correctly.

### 7. Start the Platform

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Verification

After starting, you should see:

```
Starting AIKUB Platform - AI-Powered Facebook Advertising Management
=================================================================
Validating configuration...
Configuration validated successfully
Initializing Facebook Ads Client...
Initializing AI Agent Orchestrator...
All systems initialized successfully
```

If you see errors:
- **"Missing required environment variables"**: Check your `.env` file
- **"Invalid access token"**: Regenerate your Facebook access token
- **"Cannot find module"**: Run `npm install` again
- **API errors**: Verify your Facebook app has proper permissions

## Troubleshooting

### Access Token Issues

**Problem:** Token expires quickly  
**Solution:** Generate a long-lived token:
```bash
# Exchange short-lived for long-lived token
curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

### Permission Issues

**Problem:** "Insufficient permissions"  
**Solution:** 
1. Go to Graph API Explorer
2. Add required permissions: `ads_read`, `ads_management`, `business_management`
3. Generate new token
4. Update `.env` file

### Rate Limiting

**Problem:** "Rate limit exceeded"  
**Solution:** 
- Increase `OPTIMIZATION_INTERVAL_HOURS`
- Reduce number of campaigns being monitored
- Implement request batching (advanced)

### Connection Issues

**Problem:** Cannot connect to Facebook API  
**Solution:**
- Check internet connection
- Verify API endpoint is accessible
- Check if Facebook API is operational: [status.fb.com](https://status.fb.com)

## Next Steps

Once the platform is running:

1. Monitor the console output for initial analysis
2. Review the recommendations provided by AI agents
3. Adjust configuration parameters as needed
4. Set up automated optimization cycles
5. Integrate with dashboards or monitoring tools

For more details, see:
- [API Documentation](./API.md)
- [README](../README.md)
