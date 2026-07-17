import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { statusColor, complexityBars } from '@/lib/format';

export const metadata: Metadata = { title: 'projects' };

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.updated.localeCompare(a.updated));
  return (
    <div className="fade-up flex flex-col">
      <div className="mb-[10px] flex items-baseline justify-between gap-3">
        <div className="text-[11px] tracking-[.1em]" style={{ color: 'var(--text-dim)' }}>
          PROJECTS
        </div>
        <div className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
          {projects.length} entries
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--line)' }}>
        {sorted.map((p) => {
          const bars = complexityBars(p.complexity);
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="row-hover block px-1 py-[15px] no-underline hover:no-underline"
              style={{ borderBottom: '1px solid var(--line-soft)', color: 'inherit' }}
            >
              <div className="flex flex-wrap items-baseline gap-3 text-[11px]">
                <span className="text-[13px] font-semibold" style={{ color: 'var(--text-bright)' }}>
                  {p.name}
                </span>
                <span style={{ color: statusColor[p.status] }}>{p.status}</span>
                <span style={{ color: 'var(--text-dim)' }}>{p.lang}</span>
                <span style={{ color: 'var(--text-dim)' }}>{p.updated}</span>
                <span className="ml-auto" style={{ color: 'var(--text-dim)' }}>
                  complexity <span style={{ color: 'var(--amber)' }}>{bars.on}</span>
                  <span style={{ color: 'var(--bar-off)' }}>{bars.off}</span>
                </span>
              </div>
              <p className="mt-[7px] mb-0 text-[12.5px]" style={{ color: 'var(--text-body)' }}>
                {p.summary}
              </p>
              <div className="mt-[6px] text-[11px]" style={{ color: 'var(--text-faint)' }}>
                → read log{p.repo ? ' · source ↗' : ' · private'}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
