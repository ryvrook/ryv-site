import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { statusColor, complexityBars } from '@/lib/format';

export const metadata: Metadata = { title: 'projects' };

export default function ProjectsPage() {
  const sorted = [...projects].sort(
    (a, b) =>
      Number(!!b.pinned) - Number(!!a.pinned) ||
      (a.pinnedOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.pinnedOrder ?? Number.MAX_SAFE_INTEGER) ||
      b.updated.localeCompare(a.updated),
  );
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
              className={`project-row row-hover relative block px-1 py-5 sm:py-[15px] no-underline hover:no-underline ${
                p.image ? 'sm:pr-[84px]' : ''
              }`}
              style={{ borderBottom: '1px solid var(--line-soft)', color: 'inherit' }}
            >
              {p.image && (
                <Image
                  src={p.image}
                  alt=""
                  width={64}
                  height={64}
                  className="float-right mb-3 ml-3 size-12 object-contain sm:absolute sm:top-[15px] sm:right-1 sm:m-0 sm:size-16"
                />
              )}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px]">
                <span className="w-full text-[15px] font-semibold sm:w-auto sm:text-[13px]" style={{ color: 'var(--text-bright)' }}>
                  {p.name}
                </span>
                {p.pinned && (
                  <span title="pinned" style={{ color: 'var(--amber)' }}>
                    ★
                  </span>
                )}
                <span style={{ color: statusColor[p.status] }}>{p.status}</span>
                <span style={{ color: 'var(--text-dim)' }}>{p.lang}</span>
                <span style={{ color: 'var(--text-dim)' }}>{p.updated}</span>
                <span className="sm:ml-auto" style={{ color: 'var(--text-dim)' }}>
                  complexity <span style={{ color: 'var(--amber)' }}>{bars.on}</span>
                  <span style={{ color: 'var(--bar-off)' }}>{bars.off}</span>
                </span>
              </div>
              <p className="clear-both mt-[10px] mb-0 text-[14px] sm:clear-none sm:mt-[7px] sm:text-[12.5px]" style={{ color: 'var(--text-body)' }}>
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
