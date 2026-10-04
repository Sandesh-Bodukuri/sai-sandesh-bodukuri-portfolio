// Single access point for environment variables (CLAUDE_CONTEXT.md §12, §15).
// Only public, non-secret values exist at Step 1.

function readSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  try {
    return new URL(raw).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}"`);
  }
}

export const env = {
  siteUrl: readSiteUrl(),
} as const;
