import type { Metadata } from 'next';
import { site } from '@/data/site';
import { SocialIcon } from '@/components/SocialIcon';

export const metadata: Metadata = { title: 'contact' };

export default function ContactPage() {
  const github = site.github.replace(/^https?:\/\//, '');
  return (
    <div className="fade-up flex flex-col gap-[10px]">
      <div className="text-[11px] tracking-[.1em]" style={{ color: 'var(--text-dim)' }}>
        CONTACT
      </div>
      <div
        className="grid grid-cols-[80px_1fr] gap-3 pt-[14px]"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        <span style={{ color: 'var(--text-dim)' }}>email</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-3">
        <span style={{ color: 'var(--text-dim)' }}>github</span>
        <a href={site.github} target="_blank" rel="noreferrer">
          {github}
        </a>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-3">
        <span style={{ color: 'var(--text-dim)' }}>rss</span>
        <a href="/feed.xml">/feed.xml</a>
      </div>
      <div className="mt-2 flex flex-wrap gap-[10px]">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
            className="btn-term inline-flex items-center gap-[7px]"
          >
            <SocialIcon name={s.label} />
            {s.label}
          </a>
        ))}
      </div>
      <p
        className="mt-[6px] mb-0 max-w-[52ch] text-[12.5px]"
        style={{ color: 'var(--text-body)', textWrap: 'pretty' }}
      >
        {site.contactNote}
      </p>
    </div>
  );
}
