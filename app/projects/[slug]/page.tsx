import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/data/projects';
import { statusColor } from '@/lib/format';
import { ActivityGraph } from '@/components/ActivityGraph';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="fade-up flex flex-col gap-[22px]">
      <div className="text-[11px] tracking-[.06em]" style={{ color: 'var(--text-dim)' }}>
        <Link href="/projects">projects</Link> / {project.name}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="m-0 text-[19px] font-semibold" style={{ color: 'var(--text-bright)' }}>
            {project.name}
          </h1>
          <span className="text-[11px]" style={{ color: statusColor[project.status] }}>
            ● {project.status}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-5 text-[11px]" style={{ color: 'var(--text-dim)' }}>
          <span>
            lang: <span style={{ color: 'var(--text)' }}>{project.lang}</span>
          </span>
          <span>
            updated: <span style={{ color: 'var(--text)' }}>{project.updated}</span>
          </span>
          {project.license && (
            <span>
              license: <span style={{ color: 'var(--text)' }}>{project.license}</span>
            </span>
          )}
        </div>
      </div>

      <div
        className="flex flex-col gap-[6px] px-[14px] py-3 text-xs"
        style={{ background: 'var(--panel-deep)', border: '1px solid var(--line)' }}
      >
        {project.url && (
          <div className="grid grid-cols-[64px_1fr] gap-3">
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              url
            </span>
            <a href={project.url} target="_blank" rel="noreferrer" className="break-all">
              {project.url.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {project.repo ? (
          <div className="grid grid-cols-[64px_1fr] gap-3">
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              clone
            </span>
            <a href={project.repo} target="_blank" rel="noreferrer" className="break-all">
              {project.repo}.git
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-[64px_1fr] gap-3">
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              source
            </span>
            <span style={{ color: 'var(--text-faint)' }}>private repository</span>
          </div>
        )}
        {project.mirror && (
          <div className="grid grid-cols-[64px_1fr] gap-3">
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              mirror
            </span>
            <a
              href={project.mirror.href}
              target="_blank"
              rel="noreferrer"
              className="break-all"
              style={{ color: 'var(--text-mid)' }}
            >
              {project.mirror.label}
            </a>
          </div>
        )}
        <div className="grid grid-cols-[64px_1fr] gap-3">
          <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
            meta
          </span>
          <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
            {[project.lang, project.license, `updated ${project.updated}`]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </div>
      </div>

      <ActivityGraph slug={project.slug} />

      <div className="flex flex-col gap-3">
        {project.body.map((para, i) => (
          <p
            key={i}
            className="m-0 text-[12.5px]"
            style={{ color: 'var(--text-body)', textWrap: 'pretty' }}
          >
            {para}
          </p>
        ))}
      </div>

      {project.diagram && (
        <div>
          <div className="sec-label mb-[10px]">ARCHITECTURE</div>
          <pre
            className="term"
            style={{ fontSize: '10.5px', lineHeight: 1.45, color: 'var(--text-dim)' }}
          >
            {project.diagram}
          </pre>
        </div>
      )}

      <div>
        <div className="sec-label mb-1">CHANGELOG</div>
        {project.changelog.map((entry) => (
          <div
            key={`${entry.date}-${entry.message}`}
            className="grid grid-cols-[92px_1fr] gap-[14px] py-[7px] text-xs"
            style={{ borderBottom: '1px solid var(--line-faint)' }}
          >
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              {entry.date}
            </span>
            <span style={{ color: 'var(--text-body)' }}>{entry.message}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-[18px] text-[11.5px]">
        {project.repo && (
          <>
            <a href={project.repo} target="_blank" rel="noreferrer">
              repository
            </a>
            <a
              href={`${project.repo}/issues`}
              target="_blank"
              rel="noreferrer"
              className="quiet-link"
            >
              issues
            </a>
          </>
        )}
        <Link href="/projects" className="quiet-link ml-auto">
          ← all projects
        </Link>
      </div>
    </div>
  );
}
