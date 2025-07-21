import type { Express } from "express";
import { createServer, type Server } from "http";
import { mongoStorage } from "./mongodb";
import { insertUserSchema, insertCampaignSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { TrafficGenerator } from "./traffic-generator";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const trafficGenerator = new TrafficGenerator(mongoStorage);

// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // User signup route
  app.post("/api/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await mongoStorage.getUserByEmail!(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists with this email" });
      }

      const user = await mongoStorage.createUser(userData);
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ 
        message: "User created successfully", 
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === 11000) {
        return res.status(400).json({ error: "Username or email already exists" });
      }
      res.status(400).json({ error: error.message || "Failed to create user" });
    }
  });

  // User login route
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await mongoStorage.validateUser!(email, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ 
        message: "Login successful", 
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(400).json({ error: error.message || "Login failed" });
    }
  });

  // Protected route middleware
  const authenticateToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
  };

  // Get user profile (protected)
  app.get("/api/user", authenticateToken, async (req: any, res) => {
    try {
      const user = await mongoStorage.getUser(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ 
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Campaign routes
  app.get("/api/campaigns", authenticateToken, async (req: any, res) => {
    try {
      const campaigns = await mongoStorage.getCampaignsByUser(req.userId);
      res.json(campaigns);
    } catch (error) {
      console.error("Get campaigns error:", error);
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", authenticateToken, async (req: any, res) => {
    try {
      const campaignData = insertCampaignSchema.parse(req.body);
      const campaignId = `campaign-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      const campaign = await mongoStorage.createCampaign({
        ...campaignData,
        id: campaignId,
        userId: req.userId,
      });

      res.status(201).json(campaign);
    } catch (error) {
      console.error("Create campaign error:", error);
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  app.post("/api/campaigns/:id/start", authenticateToken, async (req: any, res) => {
    try {
      const campaign = await mongoStorage.getCampaign(req.params.id);
      if (!campaign || campaign.userId !== req.userId) {
        return res.status(404).json({ error: "Campaign not found" });
      }

      const updatedCampaign = await mongoStorage.updateCampaign(req.params.id, {
        isActive: true,
        startTime: new Date(),
      });

      if (updatedCampaign) {
        trafficGenerator.startCampaign(req.params.id);
      }

      res.json(updatedCampaign);
    } catch (error) {
      console.error("Start campaign error:", error);
      res.status(500).json({ error: "Failed to start campaign" });
    }
  });

  app.post("/api/campaigns/:id/stop", authenticateToken, async (req: any, res) => {
    try {
      const campaign = await mongoStorage.getCampaign(req.params.id);
      if (!campaign || campaign.userId !== req.userId) {
        return res.status(404).json({ error: "Campaign not found" });
      }

      const updatedCampaign = await mongoStorage.updateCampaign(req.params.id, {
        isActive: false,
      });

      trafficGenerator.stopCampaign(req.params.id);

      res.json(updatedCampaign);
    } catch (error) {
      console.error("Stop campaign error:", error);
      res.status(500).json({ error: "Failed to stop campaign" });
    }
  });

  app.delete("/api/campaigns/:id", authenticateToken, async (req: any, res) => {
    try {
      const campaign = await mongoStorage.getCampaign(req.params.id);
      if (!campaign || campaign.userId !== req.userId) {
        return res.status(404).json({ error: "Campaign not found" });
      }

      trafficGenerator.stopCampaign(req.params.id);
      const deleted = await mongoStorage.deleteCampaign(req.params.id);

      if (deleted) {
        res.json({ message: "Campaign deleted successfully" });
      } else {
        res.status(404).json({ error: "Campaign not found" });
      }
    } catch (error) {
      console.error("Delete campaign error:", error);
      res.status(500).json({ error: "Failed to delete campaign" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
