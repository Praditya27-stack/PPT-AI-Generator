import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { generateDeck } from './services/aiGenerator.js';
import { exportToPPTX } from './services/pptxExporter.js';
import { PresentationDeckSchema } from './types/presentation.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Lightweight middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'PPT-AI-Generator',
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
  });
});

// Endpoint: Generate Presentation Deck
app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { topic, slideCount, theme, language } = req.body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      res.status(400).json({ error: 'Field "topic" is required and cannot be empty.' });
      return;
    }

    const count = Math.min(Math.max(Number(slideCount) || 6, 3), 12);
    
    console.log(`[AI-GEN] Generating deck: "${topic}" (${count} slides, theme: ${theme || 'dark_modern'})...`);
    
    const deck = await generateDeck({
      topic: topic.trim(),
      slideCount: count,
      theme,
      language: language || 'id'
    });

    console.log(`[AI-GEN] Success! Generated "${deck.title}" with ${deck.slides.length} slides.`);
    res.json(deck);
  } catch (error) {
    console.error('[AI-GEN Error]:', error);
    res.status(500).json({
      error: 'Failed to generate presentation deck.',
      details: (error as Error).message
    });
  }
});

// Endpoint: Export Deck to .PPTX
app.post('/api/export', async (req: Request, res: Response) => {
  try {
    const rawDeck = req.body;
    
    // Validate schema
    const parsedDeck = PresentationDeckSchema.safeParse(rawDeck);
    if (!parsedDeck.success) {
      res.status(400).json({
        error: 'Invalid Presentation Deck schema.',
        issues: parsedDeck.error.issues
      });
      return;
    }

    const deck = parsedDeck.data;
    console.log(`[PPTX-EXPORT] Exporting "${deck.title}" (${deck.slides.length} slides)...`);

    const buffer = await exportToPPTX(deck);

    const safeTitle = deck.title.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_') || 'presentation';
    const filename = `${safeTitle}.pptx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.end(buffer);

    console.log(`[PPTX-EXPORT] Successfully sent "${filename}" (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error('[PPTX-EXPORT Error]:', error);
    res.status(500).json({
      error: 'Failed to export presentation to PPTX.',
      details: (error as Error).message
    });
  }
});

// Serve frontend if client/dist exists
const clientDistPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 PPT-AI-Generator backend running on http://localhost:${PORT}`);
  console.log(`🛡️ 2GB RAM Constraint active. Memory usage: ~${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`);
});
