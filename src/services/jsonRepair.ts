/**
 * Sanitizes and repairs JSON string from LLMs.
 * Removes markdown formatting, extracts outermost JSON structure,
 * and fixes common LLM output quirks.
 */
export function extractAndParseJSON<T = unknown>(rawText: string): T {
  let text = rawText.trim();

  // Strip Markdown code fences if present
  if (text.startsWith('```')) {
    const lines = text.split('\n');
    // Remove first line (e.g. ```json or ```)
    lines.shift();
    // Remove last line if it is ```
    if (lines.length > 0 && lines[lines.length - 1].trim() === '```') {
      lines.pop();
    }
    text = lines.join('\n').trim();
  }

  // Find the first occurrence of '{' and last occurrence of '}'
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }

  // Clean common trailing commas before closing braces/brackets
  text = text.replace(/,\s*([}\]])/g, '$1');

  try {
    return JSON.parse(text) as T;
  } catch (initialErr) {
    // Attempt minor recovery: escape raw newlines within strings
    try {
      const fixedNewlines = text.replace(/(?<!\\)\n/g, '\\n');
      return JSON.parse(fixedNewlines) as T;
    } catch {
      throw new Error(`Failed to parse AI output as JSON: ${(initialErr as Error).message}\nRaw preview: ${text.slice(0, 300)}`);
    }
  }
}
