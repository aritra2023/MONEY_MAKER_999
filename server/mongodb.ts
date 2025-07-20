import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { User, InsertUser } from '@shared/schema';
import type { IStorage } from './storage';

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

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
}

export const mongoStorage = new MongoStorage();