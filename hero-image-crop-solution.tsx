// In your home page component, add this styling to crop the image

<div className="relative overflow-hidden h-[600px]">
  <img 
    src="/hero-ai.png" 
    alt="AI Trainer" 
    className="absolute -bottom-20 right-0 h-[700px] w-auto object-cover"
  />
</div>

// This will crop out the bottom part with the CodeFlex text
