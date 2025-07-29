import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // EXISTING TABLES - Keep these as they are
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  plans: defineTable({
    userId: v.string(),
    name: v.string(),
    workoutPlan: v.object({
      schedule: v.array(v.string()),
      exercises: v.array(
        v.object({
          day: v.string(),
          routines: v.array(
            v.object({
              name: v.string(),
              sets: v.optional(v.number()),
              reps: v.optional(v.number()),
              duration: v.optional(v.string()),
              description: v.optional(v.string()),
              exercises: v.optional(v.array(v.string())),
            })
          ),
        })
      ),
    }),
    dietPlan: v.object({
      dailyCalories: v.number(),
      meals: v.array(
        v.object({
          name: v.string(),
          foods: v.array(v.string()),
        })
      ),
    }),
    isActive: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_active", ["isActive"]),

  // NEW TABLES - Enhanced Compound Knowledge
  compounds: defineTable({
    name: v.string(),
    displayName: v.string(),
    typicalDose: v.optional(v.float64()),
    dosageRangeLow: v.optional(v.float64()),
    dosageRangeHigh: v.optional(v.float64()),
    unit: v.string(),
    frequency: v.string(),
    cycleLength: v.optional(v.string()),
    category: v.string(),
    confidence: v.float64(),
    lastUpdated: v.float64(),
  }).index("by_name", ["name"]),

  compoundChats: defineTable({
    userId: v.string(),
    message: v.string(),
    response: v.string(),
    helpful: v.optional(v.boolean()),
    timestamp: v.float64(),
  }).index("by_user", ["userId"]),

  transcripts: defineTable({
    filename: v.optional(v.string()),
    processedAt: v.float64(),
    compoundsExtracted: v.number(),
    status: v.string(),
  }),

  // AI Coach Knowledge Base
  knowledgeBase: defineTable({
    topic: v.string(),
    content: v.string(),
    category: v.string(), // "fitness", "nutrition", "recovery", "technique"
    confidence: v.float64(), // 0-1 confidence score
    sources: v.array(v.string()), // conversation IDs that contributed
    createdAt: v.float64(),
    updatedAt: v.float64(),
  }).index("by_category", ["category"])
    .index("by_topic", ["topic"]),

  userContexts: defineTable({
    userId: v.string(),
    goals: v.array(v.string()),
    fitnessLevel: v.string(),
    preferences: v.object({
      workoutTypes: v.array(v.string()),
      dietaryRestrictions: v.array(v.string()),
      equipment: v.array(v.string()),
    }),
    currentMetrics: v.object({
      weight: v.optional(v.float64()),
      height: v.optional(v.float64()),
      bodyFat: v.optional(v.float64()),
    }),
    injuries: v.array(v.string()),
    lastUpdated: v.float64(),
  }).index("by_user", ["userId"]),

  coachChats: defineTable({
    userId: v.string(),
    messages: v.array(v.object({
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.float64(),
    })),
    sessionId: v.string(),
    createdAt: v.float64(),
  }).index("by_user", ["userId"])
    .index("by_session", ["sessionId"]),

  coachInsights: defineTable({
    userId: v.string(),
    type: v.string(), // "goal", "progress", "preference", "habit"
    content: v.string(),
    confidence: v.float64(),
    extractedFrom: v.string(), // chat session ID
    createdAt: v.float64(),
  }).index("by_user", ["userId"])
    .index("by_type", ["type"]),
});
