#!/usr/bin/env node
// Dependency-free bundle reporter and budget gate (CLAUDE_CONTEXT.md §10, D-035).
//
// Reads the production build in .next and, for each prerendered route, reports:
//   first-load JS (gzip), CSS (gzip), HTML (gzip), and font bytes (raw WOFF2).
// Exit code 1 if any route's first-load JS exceeds the 200 KB hard investigation gate.
// Everything else is reported as target / warning, never as a failure.
//
// Units: 1 KB = 1000 bytes. gzip = node:zlib level 6 (close to `next start` compression).

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const KB = 1000;
const JS_TARGET = 170 * KB; // <= target
const JS_GATE = 200 * KB; // > hard investigation gate
const CSS_TARGET = 25 * KB;
const FONT_TARGET = 115 * KB; // calibrated at Step 1 (D-032)

const root = process.cwd();
const nextDir = join(root, '.next');
const appDir = join(nextDir, 'server', 'app');

if (!existsSync(appDir)) {
  console.error('No production build found at .next/server/app. Run `pnpm build` first.');
  process.exit(2);
}

const fmt = (bytes) => `${(bytes / KB).toFixed(1)} KB`;
const gzipSize = (buffer) => gzipSync(buffer, { level: 6 }).length;

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/** Map a /_next/... URL to its file under .next/. */
function resolveAsset(url) {
  const clean = url.split('?')[0].split('#')[0];
  if (!clean.startsWith('/_next/')) return null;
  const file = join(nextDir, clean.slice('/_next/'.length));
  return existsSync(file) ? file : null;
}

function attr(tag, name) {
  const match = new RegExp(`${name}="([^"]*)"`, 'i').exec(tag);
  return match ? match[1] : null;
}

function analyseRoute(htmlFile) {
  const html = readFileSync(htmlFile);
  const text = html.toString('utf-8');

  const scripts = new Set();
  for (const tag of text.match(/<script\b[^>]*>/gi) ?? []) {
    const src = attr(tag, 'src');
    if (!src || /\bnomodule\b/i.test(tag)) continue; // nomodule polyfills are not fetched by modern browsers
    scripts.add(src);
  }
  for (const tag of text.match(/<link\b[^>]*>/gi) ?? []) {
    if (/rel="preload"/i.test(tag) && /as="script"/i.test(tag)) {
      const href = attr(tag, 'href');
      if (href) scripts.add(href);
    }
  }

  const styles = new Set();
  for (const tag of text.match(/<link\b[^>]*>/gi) ?? []) {
    if (/rel="stylesheet"/i.test(tag)) {
      const href = attr(tag, 'href');
      if (href) styles.add(href);
    }
  }

  const preloadedFonts = new Set();
  for (const tag of text.match(/<link\b[^>]*>/gi) ?? []) {
    if (/as="font"/i.test(tag)) {
      const href = attr(tag, 'href');
      if (href) preloadedFonts.add(href);
    }
  }

  let js = 0;
  const jsFiles = [];
  for (const src of scripts) {
    const file = resolveAsset(src);
    if (!file) continue;
    const size = gzipSize(readFileSync(file));
    js += size;
    jsFiles.push([relative(nextDir, file), size]);
  }

  let css = 0;
  const fontFiles = new Map();
  for (const href of styles) {
    const file = resolveAsset(href);
    if (!file) continue;
    const source = readFileSync(file);
    css += gzipSize(source);
    for (const match of source
      .toString('utf-8')
      .matchAll(/url\(\s*["']?([^"')]+\.woff2?)["']?\s*\)/gi)) {
      const fontUrl = match[1];
      const fontFile = resolveAsset(
        fontUrl.startsWith('/') ? fontUrl : `/_next/static/media/${fontUrl.split('/').pop()}`,
      );
      if (fontFile) fontFiles.set(fontFile, statSync(fontFile).size);
    }
  }

  let fontsAll = 0;
  for (const size of fontFiles.values()) fontsAll += size;

  let fontsPreloaded = 0;
  for (const href of preloadedFonts) {
    const file = resolveAsset(href);
    if (file) fontsPreloaded += statSync(file).size;
  }

  return {
    js,
    jsFiles,
    css,
    html: gzipSize(html),
    fontsAll,
    fontCount: fontFiles.size,
    fontsPreloaded,
  };
}

function routeName(htmlFile) {
  const rel = relative(appDir, htmlFile)
    .split(sep)
    .join('/')
    .replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel.replace(/\/index$/, '')}`;
}

function zone(bytes) {
  if (bytes > JS_GATE) return 'HARD GATE (> 200 KB)';
  if (bytes > JS_TARGET) return 'warning (170-200 KB)';
  return 'target (<= 170 KB)';
}

const routes = walk(appDir)
  .filter((file) => file.endsWith('.html'))
  .sort();

if (routes.length === 0) {
  console.error('No prerendered HTML found under .next/server/app.');
  process.exit(2);
}

console.log('Bundle baseline (production build)');
console.log('Units: 1 KB = 1000 bytes. gzip = zlib level 6. Fonts are raw WOFF2.\n');

let gateFailed = false;
for (const file of routes) {
  const name = routeName(file);
  const r = analyseRoute(file);
  if (r.js > JS_GATE) gateFailed = true;

  console.log(`Route ${name}`);
  console.log(`  First-load JS (gzip): ${fmt(r.js)}  ->  ${zone(r.js)}`);
  for (const [path, size] of r.jsFiles.sort((a, b) => b[1] - a[1])) {
    console.log(`      ${fmt(size).padStart(9)}  ${path}`);
  }
  console.log(
    `  CSS (gzip):           ${fmt(r.css)}  ->  ${r.css <= CSS_TARGET ? 'target (<= 25 KB)' : 'above 25 KB target'}`,
  );
  console.log(`  HTML (gzip):          ${fmt(r.html)}`);
  console.log(
    `  Fonts: ${r.fontCount} file(s) referenced by CSS = ${fmt(r.fontsAll)} (${r.fontsAll <= FONT_TARGET ? 'within' : 'above'} the 115 KB target); preloaded on this route = ${fmt(r.fontsPreloaded)}`,
  );
  console.log('');
}

if (gateFailed) {
  console.error(
    'FAIL: first-load JS exceeds the 200 KB hard investigation gate (CLAUDE_CONTEXT.md §10).',
  );
  process.exit(1);
}
console.log('Gate: OK (no route above 200 KB first-load JS).');
