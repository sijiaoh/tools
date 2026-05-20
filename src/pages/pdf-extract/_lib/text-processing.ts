/**
 * Pure text processing functions for PDF text extraction.
 * These are extracted from the component for testability.
 */

/** Item from pdfjs TextContent with string data */
export interface TextItem {
  str: string;
  hasEOL?: boolean;
}

/**
 * Assembles text from pdfjs TextContent items into a single string.
 * Adds newlines for items with EOL flag, spaces otherwise.
 */
export function assemblePageText(items: TextItem[]): string {
  let text = '';
  for (const item of items) {
    text += item.str;
    if (item.hasEOL) {
      text += '\n';
    } else {
      text += ' ';
    }
  }
  return text;
}

/**
 * Normalizes whitespace in extracted text:
 * - Removes trailing spaces/tabs before newlines
 * - Collapses 3+ consecutive newlines to 2
 * - Trims leading/trailing whitespace
 */
export function normalizeText(text: string): string {
  return text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Formats a single page's text with a header.
 */
export function formatPageBlock(pageNum: number, text: string): string {
  return `=== Page ${pageNum} ===\n${text}`;
}

/**
 * Joins page blocks into final document text.
 */
export function joinPages(pageBlocks: string[]): string {
  return pageBlocks.join('\n\n') + '\n';
}
