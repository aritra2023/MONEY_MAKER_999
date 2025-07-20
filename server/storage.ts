import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string | number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail?(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser?(email: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
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
}

export const storage = new MemStorage();
