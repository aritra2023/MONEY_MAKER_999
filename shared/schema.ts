import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  website: text("website").notNull(),
  targetHits: integer("target_hits").notNull(),
  currentHits: integer("current_hits").notNull().default(0),
  duration: real("duration").notNull(), // hours
  hitType: text("hit_type").notNull(), // 'page-view' | 'unique-visitor' | 'click'
  isActive: boolean("is_active").notNull().default(false),
  startTime: timestamp("start_time"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  website: true,
  targetHits: true,
  duration: true,
  hitType: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
