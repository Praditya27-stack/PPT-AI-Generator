# Architecture & Technical Rules

## Target Deployment & Hardware Constraints
- **Hardware Profile**: NAT VPS with 2GB Total RAM, no swap.
- **Shared Workloads**: The VPS also hosts Docker, WhatsApp bots, and 9router services.
- **Node.js Memory Ceiling**: The PPT AI service MUST not exceed **120MB RSS memory**.

## Non-Negotiable Hard Constraints
1. **ZERO Headless Browsers**:
   - Strictly forbidden to use `puppeteer`, `playwright`, `selenium`, or headless `chromium`.
   - Any HTML-to-image or HTML-to-PDF via browser will cause an immediate Out-Of-Memory (OOM) kernel kill.
2. **Native JS PPTX Generation**:
   - Use `pptxgenjs` for PowerPoint `.pptx` generation.
   - Coordinate calculations must follow the standard 16:9 widescreen layout (`width: 10 inches`, `height: 5.625 inches`).
   - Margin safety buffer: at least 0.5 inches on all edges to prevent text clipping in presentation software.
3. **Structured AI Schema**:
   - The LLM must return strict JSON matching the defined schema.
   - All responses must be validated at runtime using `zod`.
   - Never trust raw LLM output; provide a sanitization/repair function for markdown fences (```json) or trailing anomalies.
4. **Resilient AI Gateway Communication**:
   - Connect to 9router through the Cloudflare Tunnel endpoint.
   - Standard timeout: 60 seconds with graceful error reporting.
