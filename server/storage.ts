import { db } from "./db";
import { scores, type InsertScore, type Score } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  getHighScores(): Promise<Score[]>;
  createScore(score: InsertScore): Promise<Score>;
}

export class DatabaseStorage implements IStorage {
  async getHighScores(): Promise<Score[]> {
    return await db.select()
      .from(scores)
      .orderBy(desc(scores.score))
      .limit(10);
  }

  async createScore(score: InsertScore): Promise<Score> {
    const [newScore] = await db.insert(scores).values(score).returning();
    return newScore;
  }
}

export const storage = new DatabaseStorage();
