/**
 * Pure text processing functions for PDF text extraction.
 * These are extracted from the component for testability.
 */

/** Minimal text item interface for text assembly (subset of pdfjs TextItem) */
export interface TextItem {
  str: string;
  hasEOL?: boolean;
}

/** Font information for debug display */
export interface FontInfo {
  name: string;
  type: string;
}

/** Debug information collected during PDF processing */
export interface PageDebugInfo {
  pageNum: number;
  textItemCount: number;
  chineseCount: number;
  englishCount: number;
  digitCount: number;
  otherCount: number;
}

export interface DebugInfo {
  fonts: FontInfo[];
  pages: PageDebugInfo[];
  warnings: string[];
}

/** Counts character types in a string */
export function countCharTypes(text: string): {
  chinese: number;
  english: number;
  digits: number;
  other: number;
} {
  let chinese = 0;
  let english = 0;
  let digits = 0;
  let other = 0;

  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (
      (code >= 0x4e00 && code <= 0x9fff) || // CJK Unified Ideographs
      (code >= 0x3400 && code <= 0x4dbf) || // CJK Extension A
      (code >= 0x20000 && code <= 0x2a6df) // CJK Extension B
    ) {
      chinese++;
    } else if ((code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)) {
      english++;
    } else if (code >= 0x30 && code <= 0x39) {
      digits++;
    } else if (!/\s/.test(char)) {
      other++;
    }
  }

  return { chinese, english, digits, other };
}

/** Checks font name for potential issues and returns warnings */
export function checkFontWarnings(fontName: string): string[] {
  const warnings: string[] = [];

  if (fontName.includes('Identity-H') || fontName.includes('Identity-V')) {
    warnings.push(
      `字体 "${fontName}" 使用 Identity 编码，可能导致中文提取为乱码或空白`
    );
  }

  return warnings;
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
