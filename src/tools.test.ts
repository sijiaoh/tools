import { describe, it, expect } from 'vitest';
import { tools } from './tools';

describe('tools manifest', () => {
  it('exports an array of tools', () => {
    expect(Array.isArray(tools)).toBe(true);
  });

  it('each tool has required properties', () => {
    for (const tool of tools) {
      expect(tool).toHaveProperty('slug');
      expect(tool).toHaveProperty('title');
      expect(tool).toHaveProperty('description');
    }
  });

  it('each slug is a valid URL-safe string', () => {
    // URL-safe: lowercase letters, numbers, hyphens only; no leading/trailing hyphens
    const urlSafePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    for (const tool of tools) {
      expect(tool.slug).toMatch(urlSafePattern);
    }
  });

  it('has no duplicate slugs', () => {
    const slugs = tools.map((t) => t.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });
});
