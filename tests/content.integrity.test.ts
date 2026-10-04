import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { experience } from '@/content/experience';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { skills } from '@/content/skills';
import { isContentStatus, publishable } from '@/content/status';

// Content integrity (CLAUDE_CONTEXT.md §0, §13): statuses, URLs, and contact-data hygiene.

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const contentDir = join(srcDir, 'content');

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? listFiles(full) : [full];
  });
}

const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};

describe('content integrity', () => {
  it('gives every item a valid status', () => {
    const items = [site, ...projects, ...experience, ...skills];
    for (const item of items) expect(isContentStatus(item.status)).toBe(true);
  });

  it('has complete, valid Verified identity data', () => {
    expect(site.status).toBe('verified');
    expect(site.name.trim()).not.toBe('');
    expect(site.role.trim()).not.toBe('');
    expect(site.metaDescription.length).toBeLessThanOrEqual(160);
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(isHttpUrl(site.github.href)).toBe(true);
  });

  it('uses valid URLs for every project link', () => {
    for (const project of projects) {
      for (const link of project.links) expect(isHttpUrl(link.href), link.href).toBe(true);
    }
  });

  it('renders only Verified items in production', () => {
    const sample = [
      { status: 'verified', id: 1 },
      { status: 'pending', id: 2 },
      { status: 'optional', id: 3 },
    ] as const;
    expect(publishable(sample).map((item) => item.id)).toEqual([1]);
  });

  it('keeps the email only in src/content/site.ts', () => {
    for (const file of listFiles(srcDir)) {
      if (file.endsWith('.woff2')) continue;
      if (file === join(contentDir, 'site.ts')) continue;
      expect(readFileSync(file, 'utf-8'), file).not.toContain(site.email);
    }
  });

  it('keeps phone-number-like strings out of the content modules', () => {
    const phoneLike = /(?:\+?\d[\s().-]?){10,}/;
    for (const file of listFiles(contentDir)) {
      expect(readFileSync(file, 'utf-8'), file).not.toMatch(phoneLike);
    }
  });
});
