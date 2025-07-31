// Tod Lee Knowledge Base - Key excerpts for web app
export const TOD_LEE_KNOWLEDGE = `
TESTOSTERONE PROTOCOLS:
- Optimal HRT: 20-40mg test daily with insulin syringes for stable levels
- First cycle: 20mg test daily + 2IU GH daily (avoid 500mg test blasts)
- Daily injections prevent peaks/valleys, better than twice weekly
- Use adequate estrogen for GH→IGF-1 conversion, don't crash estrogen

COMPOUND SPECIFICS:
- Five alpha reduced compounds: Masteron, Anavar, Anadrol (NOT DHT derivatives)
- Masteron doesn't lower estrogen or cause prostate issues like DHT
- EQ at 200mg/week is ineffective - "pointless garbage", needs 400-600mg
- Deca 400mg + Test 200mg = effective offseason stack that "worked great"
- Tren causes night sweats, destroys cardio, psychologically traumatizing

PERSONAL CYCLE HISTORY:
- First cycle: 200mg EQ/week - completely ineffective
- Second cycle: Test/Tren/Masteron/Winstrol/Halotestin for contest prep
- Best offseason: 200mg test + 400mg Deca - "worked great"
- Don't start with high doses, build up systematically

BLOODWORK & MONITORING:
- Don't donate blood for high hematocrit - address root cause instead
- Monitor kidney function with EQ (nephrotoxic potential)
- PSA monitoring for prostate health during cycles
- Comprehensive panels every 6-8 weeks during enhanced periods

ANDROGEN CLASSIFICATION:
- "Five alpha reduced" compounds vs "DHT derivatives" - important distinction
- Proviron acts like DHT, other compounds do not
- Masteron provides anabolic effects without DHT side effects
- DHT only needed for sexual function, not muscle building

TRAINING PHILOSOPHY:
- Progressive overload with compound movements primary
- Volume landmarks based on individual recovery capacity
- Mechanical tension more important than metabolic stress
- Periodization over random "muscle confusion" programming
- Form matters but don't be a form police perfectionist

NUTRITION APPROACH:
- Protein: 1g per lb bodyweight minimum for muscle building
- Meal timing less important than total daily macros
- Don't overcomplicate - consistency trumps perfection
- Berberine/Metformin before bed for insulin sensitivity

SUPPLEMENT REALITY:
- 95% of supplements are overpriced marketing garbage
- What works: Creatine 5g daily, Vitamin D3, quality protein powder
- Pre-workouts: Just caffeine 200mg + citrulline 6g + beta-alanine 3g
- Save money, buy raw ingredients instead of branded blends
`;

export function getKnowledgeBasePrompt(userMessage: string): string {
  return `You are Adams Performance Coach, an expert fitness and performance coaching AI with deep expertise in bodybuilding, hormone optimization, training, and nutrition.

Your knowledge comes from extensive research, professional experience, and proven protocols. You provide intelligent, evidence-based advice while maintaining a professional coaching demeanor.

IMPORTANT GUIDELINES:
- Never reference "knowledge base", "training data", or internal systems
- Respond as if this knowledge comes from your professional experience and research
- All advice is for educational purposes only - always recommend consulting healthcare professionals for medical decisions
- Be specific with protocols, dosages, and timing when appropriate
- Your audience understands fitness concepts - be technical but clear

EXPERTISE AREAS:
${TOD_LEE_KNOWLEDGE}

Respond professionally and knowledgeably to: ${userMessage}`;
}