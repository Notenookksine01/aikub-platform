import axios, { AxiosInstance } from 'axios';
import logger from '../utils/logger';
import { AdCampaign, AdPerformanceMetrics } from '../types';

/**
 * Facebook Marketing API Client
 * Handles all interactions with Facebook Ads API
 */
export class FacebookAdsClient {
  private client: AxiosInstance;
  private accessToken: string;
  private adAccountId: string;

  constructor(accessToken: string, adAccountId: string) {
    this.accessToken = accessToken;
    this.adAccountId = adAccountId;
    this.client = axios.create({
      baseURL: 'https://graph.facebook.com/v18.0',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all campaigns for the ad account
   */
  async getCampaigns(): Promise<AdCampaign[]> {
    try {
      const response = await this.client.get(
        `/${this.adAccountId}/campaigns`,
        {
          params: {
            access_token: this.accessToken,
            fields: 'id,name,status,objective,daily_budget,lifetime_budget,start_time,stop_time',
          },
        }
      );

      return response.data.data.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        budget: campaign.lifetime_budget ? parseFloat(campaign.lifetime_budget) / 100 : 0,
        dailyBudget: campaign.daily_budget ? parseFloat(campaign.daily_budget) / 100 : 0,
        objective: campaign.objective,
        startDate: new Date(campaign.start_time),
        endDate: campaign.stop_time ? new Date(campaign.stop_time) : undefined,
      }));
    } catch (error) {
      logger.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  /**
   * Get performance metrics for a campaign
   */
  async getCampaignMetrics(campaignId: string): Promise<AdPerformanceMetrics> {
    try {
      const response = await this.client.get(`/${campaignId}/insights`, {
        params: {
          access_token: this.accessToken,
          fields: 'impressions,clicks,conversions,spend,ctr,cpc,cpa,reach,engagement',
          time_range: JSON.stringify({ since: '7 days ago', until: 'today' }),
        },
      });

      const data = response.data.data[0] || {};
      const spend = parseFloat(data.spend || 0);
      const conversions = parseFloat(data.conversions || 0);
      const revenue = conversions * 50; // Assuming average order value

      return {
        campaignId,
        impressions: parseInt(data.impressions || 0),
        clicks: parseInt(data.clicks || 0),
        conversions: conversions,
        spend: spend,
        ctr: parseFloat(data.ctr || 0),
        cpc: parseFloat(data.cpc || 0),
        cpa: parseFloat(data.cpa || 0),
        roi: spend > 0 ? ((revenue - spend) / spend) * 100 : 0,
        reach: parseInt(data.reach || 0),
        engagement: parseInt(data.engagement || 0),
        timestamp: new Date(),
      };
    } catch (error) {
      logger.error(`Error fetching metrics for campaign ${campaignId}:`, error);
      throw error;
    }
  }

  /**
   * Update campaign budget
   */
  async updateCampaignBudget(campaignId: string, newBudget: number): Promise<void> {
    try {
      await this.client.post(`/${campaignId}`, null, {
        params: {
          access_token: this.accessToken,
          daily_budget: Math.round(newBudget * 100), // Convert to cents
        },
      });
      logger.info(`Updated budget for campaign ${campaignId} to ${newBudget}`);
    } catch (error) {
      logger.error(`Error updating budget for campaign ${campaignId}:`, error);
      throw error;
    }
  }

  /**
   * Pause/Resume campaign
   */
  async updateCampaignStatus(campaignId: string, status: 'ACTIVE' | 'PAUSED'): Promise<void> {
    try {
      await this.client.post(`/${campaignId}`, null, {
        params: {
          access_token: this.accessToken,
          status: status,
        },
      });
      logger.info(`Updated status for campaign ${campaignId} to ${status}`);
    } catch (error) {
      logger.error(`Error updating status for campaign ${campaignId}:`, error);
      throw error;
    }
  }

  /**
   * Get audience insights
   */
  async getAudienceInsights(campaignId: string): Promise<any> {
    try {
      const response = await this.client.get(`/${campaignId}/insights`, {
        params: {
          access_token: this.accessToken,
          fields: 'age,gender,country,region,actions',
          breakdowns: 'age,gender,country',
        },
      });

      return response.data.data;
    } catch (error) {
      logger.error(`Error fetching audience insights for campaign ${campaignId}:`, error);
      throw error;
    }
  }
}
