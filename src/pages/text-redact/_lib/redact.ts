/**
 * Redaction options for text processing.
 */
export interface RedactOptions {
  /** Custom words/phrases to mask (case-sensitive, exact match) */
  customWords: string[];
  /** Whether to mask numbers (including comma-formatted like 1,234,567) */
  maskNumbers: boolean;
}

/**
 * The replacement string for all masked content.
 * Fixed length prevents information leakage about original content length.
 */
export const MASK_REPLACEMENT = '***';

/**
 * Regex pattern for numbers with optional comma separators.
 * Matches: 123, 1,234, 1,234,567, etc.
 * Does not match: ,123, 1,,234, 1234,56 (invalid formats)
 */
const NUMBER_PATTERN = /\d{1,3}(?:,\d{3})*|\d+/g;

/**
 * Escapes special regex characters in a string.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Redacts sensitive information from text.
 *
 * Processing order:
 * 1. Custom words (longer matches first, case-sensitive)
 * 2. Number patterns (if enabled)
 *
 * This order ensures words containing numbers are masked as whole units.
 *
 * @param text - The input text to redact
 * @param options - Redaction options
 * @returns The redacted text with sensitive content replaced by ***
 */
export function redact(text: string, options: RedactOptions): string {
  if (!text) {
    return text;
  }

  let result = text;

  // Step 1: Mask custom words (longer matches first to handle overlapping)
  if (options.customWords.length > 0) {
    // Sort by length descending so longer matches are replaced first
    const sortedWords = [...options.customWords]
      .filter((word) => word.length > 0)
      .sort((a, b) => b.length - a.length);

    for (const word of sortedWords) {
      const pattern = new RegExp(escapeRegex(word), 'g');
      result = result.replace(pattern, MASK_REPLACEMENT);
    }
  }

  // Step 2: Mask numbers if enabled
  if (options.maskNumbers) {
    result = result.replace(NUMBER_PATTERN, MASK_REPLACEMENT);
  }

  return result;
}
