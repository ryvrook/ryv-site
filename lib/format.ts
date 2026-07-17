import type { ProjectStatus } from '@/data/projects';

export const statusColor: Record<ProjectStatus, string> = {
  ACTIVE: 'var(--accent)',
  STABLE: 'var(--cyan)',
  EXPERIMENTAL: 'var(--amber)',
  ARCHIVED: 'var(--red)',
};

export function complexityBars(level: number): { on: string; off: string } {
  return { on: '▮'.repeat(level), off: '▮'.repeat(5 - level) };
}

export function formatTags(tags: string[]): string {
  return tags.map((t) => `#${t}`).join(' ');
}
