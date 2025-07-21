import { users, campaigns, type User, type InsertUser, type Campaign, type InsertCampaign } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string | number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail?(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser?(email: string, password: string): Promise<User | null>;
  
  // Campaign methods
  getCampaign(id: string): Promise<Campaign | undefined>;
  getCampaignsByUser(userId: string): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign & { id: string; userId: string }): Promise<Campaign>;
  updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
  getActiveCampaigns(): Promise<Campaign[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private campaigns: Map<string, Campaign>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.currentId = 1;
  }

  async getUser(id: string | number): Promise<User | undefined> {
    return this.users.get(Number(id));
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id: id.toString() };
    this.users.set(id, user);
    return user;
  }

  // Campaign methods
  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async getCampaignsByUser(userId: string): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(
      (campaign) => campaign.userId === userId
    );
  }

  async createCampaign(campaignData: InsertCampaign & { id: string; userId: string }): Promise<Campaign> {
    const campaign: Campaign = {
      ...campaignData,
      currentHits: 0,
      isActive: false,
      startTime: null,
      createdAt: new Date(),
    };
    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updated = { ...campaign, ...updates };
    this.campaigns.set(id, updated);
    return updated;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(
      (campaign) => campaign.isActive
    );
  }
}

export const storage = new MemStorage();
