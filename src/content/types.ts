// Content types (CLAUDE_CONTEXT.md §0 content status system, §7.4 case-study structure).
// Every item carries a status. Production builds render only `verified` items.

export type ContentStatus = 'verified' | 'pending' | 'optional';

export type Statused<T> = T & { status: ContentStatus };

export type ExternalLink = { label: string; href: string };

/** A result with its exact supplied value and a plain-language meaning (§0 metric explanation rule). */
export type Metric = { label: string; value: string; plainLanguage?: string };

export type Site = Statused<{
  name: string;
  role: string;
  metaDescription: string;
  email: string;
  github: ExternalLink;
}>;

export type Project = Statused<{
  slug: string;
  name: string;
  tier: 'flagship' | 'secondary';
  technologies: string[];
  links: ExternalLink[];
  // Flagship case-study parts (§7.4). A part with no Verified content stays undefined and is omitted.
  problem?: string;
  whyItMattered?: string;
  approach?: string;
  architecture?: string;
  implementation?: string;
  results?: Metric[];
  lessons?: string;
}>;

export type ExperienceEntry = Statused<{
  kind: 'work' | 'education' | 'credential';
  organization: string;
  title: string;
  period?: string;
  highlights: string[];
}>;

export type SkillGroup = Statused<{
  name: string;
  skills: string[];
}>;
