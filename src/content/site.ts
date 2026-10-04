import type { Site } from './types';

// Verified identity data (CLAUDE_CONTEXT.md §0). The public email lives only in this file.
// No phone number anywhere in the site source: it appears only inside the downloadable résumé PDF.
// TODO(content): LinkedIn URL is Pending; omit the link until the owner supplies it.
export const site = {
  status: 'verified',
  name: 'Sai Sandesh Bodukuri',
  role: 'AI/ML Engineer & Computer Science Developer',
  metaDescription: 'Sai Sandesh Bodukuri, AI/ML Engineer & Computer Science Developer.',
  email: '0913sandesh@gmail.com',
  github: { label: 'GitHub', href: 'https://github.com/Sandesh-Bodukuri' },
} as const satisfies Site;
