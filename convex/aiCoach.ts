import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Get user's chat history
export const getChatHistory = query({
  args: { userId: v.string(), sessionId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.sessionId) {
      return await ctx.db
        .query("coachChats")
        .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
        .order("desc")
        .take(10);
    } else {
      return await ctx.db
        .query("coachChats")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .order("desc")
        .take(10);
    }
  },
});

// Get user context
export const getUserContext = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userContexts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Get relevant knowledge
export const getRelevantKnowledge = query({
  args: { category: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;
    return await ctx.db
      .query("knowledgeBase")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("desc")
      .take(limit);
  },
});

// Save chat message
export const saveChatMessage = mutation({
  args: {
    userId: v.string(),
    sessionId: v.string(),
    messages: v.array(v.object({
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.float64(),
    })),
  },
  handler: async (ctx, args) => {
    const existingChat = await ctx.db
      .query("coachChats")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (existingChat) {
      // Update existing chat
      await ctx.db.patch(existingChat._id, {
        messages: [...existingChat.messages, ...args.messages],
      });
    } else {
      // Create new chat
      await ctx.db.insert("coachChats", {
        userId: args.userId,
        sessionId: args.sessionId,
        messages: args.messages,
        createdAt: Date.now(),
      });
    }
  },
});

// Update user context
export const updateUserContext = mutation({
  args: {
    userId: v.string(),
    updates: v.object({
      goals: v.optional(v.array(v.string())),
      fitnessLevel: v.optional(v.string()),
      preferences: v.optional(v.object({
        workoutTypes: v.array(v.string()),
        dietaryRestrictions: v.array(v.string()),
        equipment: v.array(v.string()),
      })),
      currentMetrics: v.optional(v.object({
        weight: v.optional(v.float64()),
        height: v.optional(v.float64()),
        bodyFat: v.optional(v.float64()),
      })),
      injuries: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userContexts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args.updates,
        lastUpdated: Date.now(),
      });
    } else {
      await ctx.db.insert("userContexts", {
        userId: args.userId,
        goals: args.updates.goals || [],
        fitnessLevel: args.updates.fitnessLevel || "beginner",
        preferences: args.updates.preferences || {
          workoutTypes: [],
          dietaryRestrictions: [],
          equipment: [],
        },
        currentMetrics: args.updates.currentMetrics || {},
        injuries: args.updates.injuries || [],
        lastUpdated: Date.now(),
      });
    }
  },
});

// Add to knowledge base
export const addKnowledge = mutation({
  args: {
    topic: v.string(),
    content: v.string(),
    category: v.string(),
    confidence: v.float64(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if knowledge already exists
    const existing = await ctx.db
      .query("knowledgeBase")
      .withIndex("by_topic", (q) => q.eq("topic", args.topic))
      .first();

    if (existing) {
      // Update existing knowledge with higher confidence
      const newConfidence = Math.min(1, (existing.confidence + args.confidence) / 2 + 0.1);
      await ctx.db.patch(existing._id, {
        content: args.content,
        confidence: newConfidence,
        sources: [...existing.sources, args.source],
        updatedAt: Date.now(),
      });
    } else {
      // Add new knowledge
      await ctx.db.insert("knowledgeBase", {
        topic: args.topic,
        content: args.content,
        category: args.category,
        confidence: args.confidence,
        sources: [args.source],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Add insight
export const addInsight = mutation({
  args: {
    userId: v.string(),
    type: v.string(),
    content: v.string(),
    confidence: v.float64(),
    extractedFrom: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("coachInsights", {
      userId: args.userId,
      type: args.type,
      content: args.content,
      confidence: args.confidence,
      extractedFrom: args.extractedFrom,
      createdAt: Date.now(),
    });
  },
});

// Get user insights
export const getUserInsights = query({
  args: { userId: v.string(), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const query = args.type
      ? ctx.db.query("coachInsights")
          .withIndex("by_user", (q) => q.eq("userId", args.userId))
          .filter((q) => q.eq(q.field("type"), args.type))
      : ctx.db.query("coachInsights")
          .withIndex("by_user", (q) => q.eq("userId", args.userId));
    
    return await query.order("desc").take(20);
  },
});