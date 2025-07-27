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
});
