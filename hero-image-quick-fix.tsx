// Find the home page component (likely src/app/page.tsx)
// Add this CSS class to the image container

// In your page.tsx or home component, wrap the hero image:
<div className="relative">
  <img src="/hero-ai.png" alt="AI Trainer" className="hero-ai-image" />
  {/* Dark overlay to hide CodeFlex text */}
  <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 bg-background w-32 h-12 blur-sm" />
  {/* Optional: Add your own text */}
  <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-full border border-primary/30">
    <span className="text-primary text-sm font-bold tracking-wider">ADAMS</span>
  </div>
</div>
