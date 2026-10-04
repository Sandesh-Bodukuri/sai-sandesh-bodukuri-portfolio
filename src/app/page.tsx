import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { site } from '@/content/site';

// Step 1 placeholder: name, role line, and section stubs showing only their headings.
// The hero, motion and real section content arrive in Steps 3 to 6 (CLAUDE_CONTEXT.md §14).
export default function HomePage() {
  return (
    <>
      <Container className="py-(--section-y)">
        <h1>{site.name}</h1>
        <p className="mt-4 max-w-(--prose-max) text-lead text-fg-2">{site.role}</p>
      </Container>
      <Section id="projects" title="Projects" />
      <Section id="experiments" title="Experiments" />
      <Section id="about" title="About" />
      <Section id="skills" title="Skills" />
      <Section id="experience" title="Experience & education" />
      <Section id="github" title="GitHub" />
      <Section id="contact" title="Contact" />
    </>
  );
}
