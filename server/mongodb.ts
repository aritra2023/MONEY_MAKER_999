import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { User, InsertUser, Campaign, InsertCampaign } from '@shared/schema';
import type { IStorage } from './storage';

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// MongoDB Campaign Schema
const campaignSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  website: { type: String, required: true },
  targetHits: { type: Number, required: true },
  currentHits: { type: Number, default: 0 },
  duration: { type: Number, required: true },
  hitType: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  startTime: { type: Date },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
const CampaignModel = mongoose.model('Campaign', campaignSchema);

export class MongoStorage implements IStorage {
  private connected = false;

  async connect() {
    if (this.connected) return;
    
    try {
      await mongoose.connect('mongodb+srv://404movie:404moviepass@cluster0.fca76c9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
      this.connected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async getUser(id: string | number): Promise<User | undefined> {
    await this.connect();
    
    try {
      const user = await UserModel.findById(id).lean();
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
      } as User;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await this.connect();
    
    try {
      const user = await UserModel.findOne({ username }).lean();
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
      } as User;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    await this.connect();
    
    try {
      const user = await UserModel.findOne({ email }).lean();
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
      } as User;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.connect();
    
    try {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(insertUser.password, 10);
      
      const user = new UserModel({
        username: insertUser.username,
        email: insertUser.email,
        password: hashedPassword,
      });
      
      const savedUser = await user.save();
      
      return {
        id: savedUser._id.toString(),
        username: savedUser.username,
        email: savedUser.email,
        password: savedUser.password,
      } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    await this.connect();
    
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;
      
      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
      } as User;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  // Campaign methods
  async getCampaign(id: string): Promise<Campaign | undefined> {
    await this.connect();
    
    try {
      const campaign = await CampaignModel.findOne({ id }).lean();
      if (!campaign) return undefined;
      
      return {
        id: campaign.id,
        userId: campaign.userId,
        website: campaign.website,
        targetHits: campaign.targetHits,
        currentHits: campaign.currentHits,
        duration: campaign.duration,
        hitType: campaign.hitType,
        isActive: campaign.isActive,
        startTime: campaign.startTime,
        createdAt: campaign.createdAt,
      } as Campaign;
    } catch (error) {
      console.error('Error getting campaign:', error);
      return undefined;
    }
  }

  async getCampaignsByUser(userId: string): Promise<Campaign[]> {
    await this.connect();
    
    try {
      const campaigns = await CampaignModel.find({ userId }).lean();
      return campaigns.map(campaign => ({
        id: campaign.id,
        userId: campaign.userId,
        website: campaign.website,
        targetHits: campaign.targetHits,
        currentHits: campaign.currentHits,
        duration: campaign.duration,
        hitType: campaign.hitType,
        isActive: campaign.isActive,
        startTime: campaign.startTime,
        createdAt: campaign.createdAt,
      })) as Campaign[];
    } catch (error) {
      console.error('Error getting campaigns by user:', error);
      return [];
    }
  }

  async createCampaign(campaignData: InsertCampaign & { id: string; userId: string }): Promise<Campaign> {
    await this.connect();
    
    try {
      const campaign = new CampaignModel({
        id: campaignData.id,
        userId: campaignData.userId,
        website: campaignData.website,
        targetHits: campaignData.targetHits,
        duration: campaignData.duration,
        hitType: campaignData.hitType,
        currentHits: 0,
        isActive: false,
      });
      
      const savedCampaign = await campaign.save();
      
      return {
        id: savedCampaign.id,
        userId: savedCampaign.userId,
        website: savedCampaign.website,
        targetHits: savedCampaign.targetHits,
        currentHits: savedCampaign.currentHits,
        duration: savedCampaign.duration,
        hitType: savedCampaign.hitType,
        isActive: savedCampaign.isActive,
        startTime: savedCampaign.startTime,
        createdAt: savedCampaign.createdAt,
      } as Campaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    await this.connect();
    
    try {
      const campaign = await CampaignModel.findOneAndUpdate(
        { id },
        updates,
        { new: true }
      ).lean();
      
      if (!campaign) return undefined;
      
      return {
        id: campaign.id,
        userId: campaign.userId,
        website: campaign.website,
        targetHits: campaign.targetHits,
        currentHits: campaign.currentHits,
        duration: campaign.duration,
        hitType: campaign.hitType,
        isActive: campaign.isActive,
        startTime: campaign.startTime,
        createdAt: campaign.createdAt,
      } as Campaign;
    } catch (error) {
      console.error('Error updating campaign:', error);
      return undefined;
    }
  }

  async deleteCampaign(id: string): Promise<boolean> {
    await this.connect();
    
    try {
      const result = await CampaignModel.deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return false;
    }
  }

  async getActiveCampaigns(): Promise<Campaign[]> {
    await this.connect();
    
    try {
      const campaigns = await CampaignModel.find({ isActive: true }).lean();
      return campaigns.map(campaign => ({
        id: campaign.id,
        userId: campaign.userId,
        website: campaign.website,
        targetHits: campaign.targetHits,
        currentHits: campaign.currentHits,
        duration: campaign.duration,
        hitType: campaign.hitType,
        isActive: campaign.isActive,
        startTime: campaign.startTime,
        createdAt: campaign.createdAt,
      })) as Campaign[];
    } catch (error) {
      console.error('Error getting active campaigns:', error);
      return [];
    }
  }
}

export const mongoStorage = new MongoStorage();