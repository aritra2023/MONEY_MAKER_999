import type { IStorage } from "./storage";
import type { Campaign } from "@shared/schema";

export class TrafficGenerator {
  private storage: IStorage;
  private activeJobs: Map<string, NodeJS.Timeout> = new Map();
  private userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59',
  ];

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  async startCampaign(campaignId: string): Promise<void> {
    const campaign = await this.storage.getCampaign(campaignId);
    if (!campaign || !campaign.isActive) {
      console.log(`Campaign ${campaignId} not found or not active`);
      return;
    }

    console.log(`Starting traffic generation for campaign: ${campaignId}`);
    
    // Calculate hit interval based on duration and target hits
    const totalDurationMs = campaign.duration * 60 * 60 * 1000; // Convert hours to milliseconds
    const hitInterval = Math.max(totalDurationMs / campaign.targetHits, 2000); // Minimum 2 seconds between hits

    const job = setInterval(async () => {
      try {
        await this.generateHit(campaignId);
      } catch (error) {
        console.error(`Error generating hit for campaign ${campaignId}:`, error);
      }
    }, hitInterval);

    this.activeJobs.set(campaignId, job);

    // Set auto-stop timer based on duration
    setTimeout(() => {
      this.stopCampaign(campaignId);
    }, totalDurationMs);
  }

  stopCampaign(campaignId: string): void {
    const job = this.activeJobs.get(campaignId);
    if (job) {
      clearInterval(job);
      this.activeJobs.delete(campaignId);
      console.log(`Stopped traffic generation for campaign: ${campaignId}`);
      
      // Update campaign status
      this.storage.updateCampaign(campaignId, { isActive: false });
    }
  }

  private async generateHit(campaignId: string): Promise<void> {
    const campaign = await this.storage.getCampaign(campaignId);
    if (!campaign || !campaign.isActive) {
      this.stopCampaign(campaignId);
      return;
    }

    // Check if we've reached the target
    if (campaign.currentHits >= campaign.targetHits) {
      console.log(`Campaign ${campaignId} reached target hits`);
      this.stopCampaign(campaignId);
      return;
    }

    try {
      // Generate actual HTTP request to the website
      await this.makeHttpRequest(campaign.website, campaign.hitType);
      
      // Update hit count
      await this.storage.updateCampaign(campaignId, {
        currentHits: campaign.currentHits + 1
      });

      console.log(`Generated hit ${campaign.currentHits + 1}/${campaign.targetHits} for ${campaign.website}`);
    } catch (error) {
      console.error(`Failed to generate hit for ${campaign.website}:`, error);
    }
  }

  private async makeHttpRequest(url: string, hitType: string): Promise<void> {
    const userAgent = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    
    // Add referrer variations to make traffic look more natural
    const referrers = [
      'https://www.google.com/',
      'https://www.bing.com/',
      'https://duckduckgo.com/',
      'https://www.yahoo.com/',
      'https://www.facebook.com/',
      'https://twitter.com/',
      ''
    ];
    const referrer = referrers[Math.floor(Math.random() * referrers.length)];

    try {
      // Ensure URL has protocol
      let targetUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        targetUrl = 'https://' + url;
      }

      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          ...(referrer && { 'Referer': referrer }),
        },
        // Add random delay to simulate human behavior
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      // Simulate different types of traffic behavior
      switch (hitType) {
        case 'page-view':
          // Simple page load
          break;
        case 'unique-visitor':
          // Simulate browsing behavior with small delay
          await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
          break;
        case 'click':
          // Simulate click interaction with longer stay time
          await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 2000));
          break;
      }

      console.log(`HTTP request to ${targetUrl} completed with status: ${response.status}`);
    } catch (error: any) {
      // Handle different types of errors
      if (error.name === 'AbortError') {
        console.log(`Request to ${url} timed out`);
      } else if (error.code === 'ENOTFOUND') {
        console.log(`Domain ${url} not found`);
      } else {
        console.log(`Request to ${url} failed: ${error.message}`);
      }
      
      // Still count as attempt even if failed (like real traffic)
      throw error;
    }
  }

  // Clean up all jobs on shutdown
  shutdown(): void {
    console.log('Shutting down traffic generator...');
    this.activeJobs.forEach((job, campaignId) => {
      clearInterval(job);
      console.log(`Stopped campaign: ${campaignId}`);
    });
    this.activeJobs.clear();
  }
}