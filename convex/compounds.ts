import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get compound information by name
export const getCompound = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const compound = await ctx.db
      .query("compounds")
      .withIndex("by_name", (q) => q.eq("name", args.name.toLowerCase()))
      .first();
    
    return compound;
  },
});

// Search compounds
export const searchCompounds = query({
  args: { 
    query: v.string(),
    limit: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const compounds = await ctx.db
      .query("compounds")
      .collect();
    
    const queryLower = args.query.toLowerCase();
    const filtered = compounds.filter(c => 
      c.name.includes(queryLower) ||
      c.displayName.toLowerCase().includes(queryLower)
    );
    
    return filtered.slice(0, args.limit || 5);
  },
});

// Save chat interaction
export const saveChat = mutation({
  args: {
    userId: v.string(),
    message: v.string(),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("compoundChats", {
      ...args,
      timestamp: Date.now(),
    });
    return id;
  },
});
