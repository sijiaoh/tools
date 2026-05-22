import { describe, it, expect } from 'vitest';
import {
  assemblePageText,
  normalizeText,
  formatPageBlock,
  joinPages,
  type TextItem,
} from './text-processing';

describe('assemblePageText', () => {
  it('joins items with spaces by default', () => {
    const items: TextItem[] = [
      { str: 'Hello' },
      { str: 'world' },
    ];
    expect(assemblePageText(items)).toBe('Hello world ');
  });

  it('adds newline when item has EOL flag', () => {
    const items: TextItem[] = [
      { str: 'First line', hasEOL: true },
      { str: 'Second line' },
    ];
    expect(assemblePageText(items)).toBe('First line\nSecond line ');
  });

  it('handles empty items array', () => {
    expect(assemblePageText([])).toBe('');
  });

  it('handles items with mixed EOL states', () => {
    const items: TextItem[] = [
      { str: 'A', hasEOL: false },
      { str: 'B', hasEOL: true },
      { str: 'C' },
      { str: 'D', hasEOL: true },
    ];
    expect(assemblePageText(items)).toBe('A B\nC D\n');
  });
});

describe('normalizeText', () => {
  it('removes trailing spaces before newlines', () => {
    expect(normalizeText('hello   \nworld')).toBe('hello\nworld');
  });

  it('removes trailing tabs before newlines', () => {
    expect(normalizeText('hello\t\t\nworld')).toBe('hello\nworld');
  });

  it('collapses 3+ newlines to 2', () => {
    expect(normalizeText('a\n\n\nb')).toBe('a\n\nb');
    expect(normalizeText('a\n\n\n\n\nb')).toBe('a\n\nb');
  });

  it('preserves 2 consecutive newlines', () => {
    expect(normalizeText('a\n\nb')).toBe('a\n\nb');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalizeText('  hello world  ')).toBe('hello world');
    expect(normalizeText('\n\nhello\n\n')).toBe('hello');
  });

  it('handles combined normalization', () => {
    const input = '  line1   \n\n\n\nline2\t\nline3  ';
    expect(normalizeText(input)).toBe('line1\n\nline2\nline3');
  });
});

describe('formatPageBlock', () => {
  it('formats page with header', () => {
    expect(formatPageBlock(1, 'Hello')).toBe('=== Page 1 ===\nHello');
  });

  it('works with multi-line text', () => {
    expect(formatPageBlock(42, 'Line 1\nLine 2')).toBe(
      '=== Page 42 ===\nLine 1\nLine 2'
    );
  });
});

describe('joinPages', () => {
  it('joins pages with double newline separator', () => {
    const blocks = ['=== Page 1 ===\nHello', '=== Page 2 ===\nWorld'];
    expect(joinPages(blocks)).toBe(
      '=== Page 1 ===\nHello\n\n=== Page 2 ===\nWorld\n'
    );
  });

  it('adds trailing newline to single page', () => {
    expect(joinPages(['=== Page 1 ===\nOnly page'])).toBe(
      '=== Page 1 ===\nOnly page\n'
    );
  });

  it('handles empty array', () => {
    expect(joinPages([])).toBe('\n');
  });
});
