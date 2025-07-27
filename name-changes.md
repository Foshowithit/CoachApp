// Update these values in your existing files:

// 1. src/app/layout.tsx
export const metadata: Metadata = {
  title: "Adams Performance Coaching - Get Strong",
  description: "Professional fitness coaching and performance optimization platform.",
};

// 2. src/components/Navbar.tsx
// Replace "codeflex.ai" with:
<Link href="/" className="flex items-center gap-2">
  <span className="text-xl font-bold">Adams Performance Coaching</span>
</Link>

// 3. src/app/generate-program/page.tsx
// Replace "CodeFlex AI" with "Adams Performance Coach" in:
<h2 className="text-xl font-bold text-foreground">Adams Performance Coach</h2>
<p className="text-sm text-muted-foreground">Fitness & Performance Expert</p>

// And in the messages section:
<div className="font-semibold text-xs text-muted-foreground mb-1">
  {msg.role === "assistant" ? "Adams Coach" : "You"}:
</div>

// 4. src/app/page.tsx (Home page)
// Update the hero section with:
<h1 className="text-5xl font-bold">Adams Performance Coaching</h1>
<p className="text-xl">Professional fitness coaching tailored to your goals</p>

// 5. package.json
{
  "name": "adams-performance-coaching",
  "version": "0.1.0",
  // ... rest of package.json
}

// 6. public/index.html or app metadata
// Update any meta tags or titles
