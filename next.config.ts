import type { NextConfig } from 'next';

// Intentionally minimal. Security headers and CSP arrive in Step 9 (CLAUDE_CONTEXT.md §12, §14).
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
