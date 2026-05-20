import { describe, it, expect } from 'vitest';
import { redact, MASK_REPLACEMENT } from './redact';

describe('redact', () => {
  describe('with no masking options', () => {
    it('returns input unchanged when no options are enabled', () => {
      const text = 'Hello 123 world';
      expect(redact(text, { customWords: [], maskNumbers: false })).toBe(text);
    });

    it('returns empty string unchanged', () => {
      expect(redact('', { customWords: [], maskNumbers: false })).toBe('');
    });
  });

  describe('number masking', () => {
    it('masks simple numbers', () => {
      const result = redact('Call 123 now', { customWords: [], maskNumbers: true });
      expect(result).toBe(`Call ${MASK_REPLACEMENT} now`);
    });

    it('masks comma-formatted numbers', () => {
      const result = redact('Total: 1,234,567', { customWords: [], maskNumbers: true });
      expect(result).toBe(`Total: ${MASK_REPLACEMENT}`);
    });

    it('masks multiple numbers', () => {
      const result = redact('From 100 to 200', { customWords: [], maskNumbers: true });
      expect(result).toBe(`From ${MASK_REPLACEMENT} to ${MASK_REPLACEMENT}`);
    });

    it('masks numbers at beginning and end', () => {
      const result = redact('123 middle 456', { customWords: [], maskNumbers: true });
      expect(result).toBe(`${MASK_REPLACEMENT} middle ${MASK_REPLACEMENT}`);
    });

    it('preserves text when number masking is disabled', () => {
      const text = 'Price: 1,234';
      expect(redact(text, { customWords: [], maskNumbers: false })).toBe(text);
    });

    it('handles various comma number formats', () => {
      expect(redact('1,234', { customWords: [], maskNumbers: true })).toBe(MASK_REPLACEMENT);
      expect(redact('12,345', { customWords: [], maskNumbers: true })).toBe(MASK_REPLACEMENT);
      expect(redact('123,456,789', { customWords: [], maskNumbers: true })).toBe(MASK_REPLACEMENT);
    });
  });

  describe('custom word masking', () => {
    it('masks a single custom word', () => {
      const result = redact('Hello John', { customWords: ['John'], maskNumbers: false });
      expect(result).toBe(`Hello ${MASK_REPLACEMENT}`);
    });

    it('masks multiple occurrences of same word', () => {
      const result = redact('John met John', { customWords: ['John'], maskNumbers: false });
      expect(result).toBe(`${MASK_REPLACEMENT} met ${MASK_REPLACEMENT}`);
    });

    it('masks multiple different words', () => {
      const result = redact('John and Jane', {
        customWords: ['John', 'Jane'],
        maskNumbers: false,
      });
      expect(result).toBe(`${MASK_REPLACEMENT} and ${MASK_REPLACEMENT}`);
    });

    it('is case-sensitive', () => {
      const result = redact('john John JOHN', { customWords: ['John'], maskNumbers: false });
      expect(result).toBe(`john ${MASK_REPLACEMENT} JOHN`);
    });

    it('handles longer matches first (overlapping words)', () => {
      const result = redact('ABC Company', {
        customWords: ['ABC', 'ABC Company'],
        maskNumbers: false,
      });
      // "ABC Company" should be matched first as it's longer
      expect(result).toBe(MASK_REPLACEMENT);
    });

    it('ignores empty strings in custom words', () => {
      const result = redact('Hello World', {
        customWords: ['', 'World', ''],
        maskNumbers: false,
      });
      expect(result).toBe(`Hello ${MASK_REPLACEMENT}`);
    });

    it('handles special regex characters in custom words', () => {
      const result = redact('Price: $100.00', {
        customWords: ['$100.00'],
        maskNumbers: false,
      });
      expect(result).toBe(`Price: ${MASK_REPLACEMENT}`);
    });

    it('handles Chinese characters', () => {
      const result = redact('我叫张三', { customWords: ['张三'], maskNumbers: false });
      expect(result).toBe(`我叫${MASK_REPLACEMENT}`);
    });
  });

  describe('combined masking (custom words + numbers)', () => {
    it('masks custom words before numbers', () => {
      // "Room 123" as a custom word should be masked as one unit
      const result = redact('Room 123 is booked', {
        customWords: ['Room 123'],
        maskNumbers: true,
      });
      expect(result).toBe(`${MASK_REPLACEMENT} is booked`);
    });

    it('masks remaining numbers after custom word masking', () => {
      const result = redact('John: 123, Jane: 456', {
        customWords: ['John', 'Jane'],
        maskNumbers: true,
      });
      expect(result).toBe(
        `${MASK_REPLACEMENT}: ${MASK_REPLACEMENT}, ${MASK_REPLACEMENT}: ${MASK_REPLACEMENT}`
      );
    });

    it('handles text with both custom words and comma-formatted numbers', () => {
      const result = redact('张三的薪水是1,234,567元', {
        customWords: ['张三'],
        maskNumbers: true,
      });
      expect(result).toBe(`${MASK_REPLACEMENT}的薪水是${MASK_REPLACEMENT}元`);
    });
  });

  describe('edge cases', () => {
    it('handles text with only whitespace', () => {
      const result = redact('   ', { customWords: [], maskNumbers: true });
      expect(result).toBe('   ');
    });

    it('handles text with newlines', () => {
      const result = redact('Line1\nLine2', { customWords: ['Line1'], maskNumbers: false });
      expect(result).toBe(`${MASK_REPLACEMENT}\nLine2`);
    });

    it('handles custom word that spans multiple words', () => {
      const result = redact('This is ABC Company Ltd', {
        customWords: ['ABC Company Ltd'],
        maskNumbers: false,
      });
      expect(result).toBe(`This is ${MASK_REPLACEMENT}`);
    });
  });
});
