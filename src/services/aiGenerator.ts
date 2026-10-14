import dotenv from 'dotenv';
import { PresentationDeck, PresentationDeckSchema } from '../types/presentation.js';
import { extractAndParseJSON } from './jsonRepair.js';

dotenv.config();

const ROUTER_BASE_URL = process.env.ROUTER_BASE_URL || 'https://understanding-clearly-intro-writer.trycloudflare.com/v1';
const ROUTER_API_KEY = process.env.ROUTER_API_KEY || 'sk-f25a73114addbd52-ev5wwm-ac9dd0f3';
const ROUTER_MODEL = process.env.ROUTER_MODEL || 'ag/gemini-3.8-flash-high';

export interface GenerateDeckOptions {
  topic: string;
  slideCount?: number;
  theme?: 'dark_modern' | 'cyberpunk' | 'corporate_blue' | 'minimal_light';
  language?: 'id' | 'en';
}

const SYSTEM_PROMPT = `You are an elite Presentation Designer & Executive Storyteller (like the design team behind Gamma.app and McKinsey presentations).
Your mission is to produce high-impact, professional, visual slide deck specifications in STRICT JSON format.

=== ANTI-AI-SLOP RULES (CRITICAL) ===
1. NO GENERIC FLUFF: Strictly ban clichés ("Unlock the power of...", "In today's fast-paced world...", "Revolutionize your synergy"). Every bullet must be a concrete, insight-driven takeaway.
2. PYRAMID PRINCIPLE:
   - Slide Headlines must be action-oriented statements (max 8-10 words), not topic titles.
     * BAD: "Cloud Security Overview"
     * GOOD: "Zero-Trust Architecture Mitigates 94% of Lateral Infiltration"
   - Descriptions must be punchy (max 15 words per card/bullet).
3. STATS REQUIRE NUMBERS: The 'stats' layout MUST include real or high-confidence industry metrics with clear units ("78%", "3.5x", "<15ms", "$4.2M").
4. LAYOUT VARIETY:
   - Slide 1 MUST ALWAYS be 'hero' layout.
   - Middle slides MUST alternate across 'cards', 'stats', 'timeline'.
   - Final slide should be a 'callout' or 'cards' summarizing next steps or the core thesis.
5. STRICT JSON ONLY:
   - Output MUST be 100% valid JSON matching the exact schema below.
   - Do NOT wrap with markdown backticks (no \`\`\`json). Return raw JSON starting with { and ending with }.

=== JSON SCHEMA REFERENCE ===
{
  "title": "Presentation Title",
  "description": "Short executive summary",
  "theme": "dark_modern", // Options: "dark_modern" | "cyberpunk" | "corporate_blue" | "minimal_light"
  "slides": [
    {
      "id": "slide-1",
      "slideNumber": 1,
      "layout": "hero",
      "title": "Main Action Title",
      "subtitle": "Clear supporting value proposition",
      "content": {
        "headline": "Massive Hero Headline (7-10 words)",
        "subheadline": "Contextual subtitle explanation (1-2 sentences)",
        "badge": "INDUSTRY BRIEFING 2026",
        "author": "Presented by Strategic Team"
      }
    },
    {
      "id": "slide-2",
      "slideNumber": 2,
      "layout": "cards",
      "title": "Three Strategic Pillars",
      "subtitle": "Core execution drivers for scalable growth",
      "content": {
        "cards": [
          { "title": "Automated Workflows", "description": "Eliminates 12+ weekly hours of manual operational overhead", "iconName": "zap" },
          { "title": "Predictive AI Models", "description": "Forecasts customer demand spikes with 91% accuracy", "iconName": "cpu" },
          { "title": "Resilient Security", "description": "Enforces military-grade end-to-end encryption", "iconName": "shield" }
        ]
      }
    },
    {
      "id": "slide-3",
      "slideNumber": 3,
      "layout": "stats",
      "title": "Proven Performance Metrics",
      "subtitle": "Quantifiable operational impact",
      "content": {
        "stats": [
          { "value": "4.2x", "label": "Speed Multiplier", "description": "Faster delivery across deployment pipelines" },
          { "value": "68%", "label": "Cost Reduction", "description": "Lower cloud infrastructure expenditure" },
          { "value": "99.98%", "label": "System Uptime", "description": "Zero critical outages during peak periods" }
        ]
      }
    },
    {
      "id": "slide-4",
      "slideNumber": 4,
      "layout": "timeline",
      "title": "Phased Implementation Roadmap",
      "subtitle": "Milestones towards production maturity",
      "content": {
        "steps": [
          { "step": "01", "title": "Discovery & Audit", "description": "Evaluate legacy bottlenecks and baseline metrics" },
          { "step": "02", "title": "Pilot Deployment", "description": "Roll out core automated workflows to target cluster" },
          { "step": "03", "title": "Enterprise Rollout", "description": "Full production cutover and automated monitoring" }
        ]
      }
    },
    {
      "id": "slide-5",
      "slideNumber": 5,
      "layout": "callout",
      "title": "The Strategic Imperative",
      "subtitle": "Key takeaway for leadership",
      "content": {
        "quoteText": "Organizations that operationalize AI workflows today capture an asymmetric compounding advantage.",
        "highlightBadge": "CORE THESIS",
        "explanation": "Immediate pilot execution establishes market leadership before industry commoditization."
      }
    }
  ]
}`;

export async function generateDeck(options: GenerateDeckOptions): Promise<PresentationDeck> {
  const { topic, slideCount = 6, theme = 'dark_modern', language = 'id' } = options;

  const userPrompt = `Generate a high-impact presentation deck with EXACTLY ${slideCount} slides on the topic:
Topic: "${topic}"
Preferred Theme: "${theme}"
Language: "${language === 'id' ? 'Bahasa Indonesia (formal, tajam, profesional, kosakata eksekutif)' : 'English (executive, concise, punchy)'}"

Remember:
- Slide 1: 'hero'
- Include a mix of 'cards', 'stats', 'timeline', and 'callout'
- Total slides: ${slideCount}
- Return ONLY valid JSON matching the schema.`;

  const requestBody = {
    model: ROUTER_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.6,
    stream: false
  };

  const endpoint = `${ROUTER_BASE_URL}/chat/completions`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 75000); // 75s timeout for tunnel

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ROUTER_API_KEY}`
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`9router request failed (${response.status}): ${errText}`);
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error('AI returned an empty response.');
    }

    // Sanitize and extract JSON
    const parsedData = extractAndParseJSON(rawContent);

    // Validate with Zod
    const validatedDeck = PresentationDeckSchema.parse(parsedData);
    
    // Ensure theme is set
    validatedDeck.theme = theme;

    return validatedDeck;
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === 'AbortError') {
      throw new Error('Request to 9router timed out after 75 seconds.');
    }
    throw error;
  }
}
