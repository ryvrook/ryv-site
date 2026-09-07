import Link from 'next/link';
import Image from 'next/image';
import { Clock } from '@/components/Clock';
import { LanguageBars } from '@/components/LanguageBars';
import { site, type RecentEntry } from '@/data/site';

function RecentText({ entry }: { entry: RecentEntry }) {
  if (!entry.href) return <span>{entry.text}</span>;
  const label = entry.label ?? entry.text;
  const at = entry.text.indexOf(label);
  if (at === -1) {
    return <Link href={entry.href}>{entry.text}</Link>;
  }
  return (
    <span>
      {entry.text.slice(0, at)}
      <Link href={entry.href}>{label}</Link>
      {entry.text.slice(at + label.length)}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="fade-up flex flex-col gap-9">
      <section className="flex flex-col items-start gap-5 sm:flex-row">
        <div
          className="shrink-0 p-1"
          style={{ border: '1px solid var(--line)', background: 'var(--panel)' }}
        >
          {site.avatar ? (
            <Image
              src={site.avatar}
              alt={site.name}
              width={160}
              height={160}
              className="block size-24 sm:size-40"
            />
          ) : (
            <div
              className="flex size-24 items-center justify-center text-[11px] sm:size-40"
              style={{ color: 'var(--text-faint)' }}
            >
              photo
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-[10px]">
          <p
            className="m-0 max-w-[56ch]"
            style={{ color: 'var(--text-body)', textWrap: 'pretty' }}
          >
            {site.bio}
          </p>
          <div className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
            {site.stationId} / <Clock /> local
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="sec-label">NOW</div>
        {site.now.map((item) => (
          <div key={item}>
            <span style={{ color: 'var(--text-dim)' }}>→</span> {item}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <div className="sec-label">RECENT</div>
        {site.recent.map((entry) => (
          <div key={`${entry.date}-${entry.text}`} className="recent-entry grid grid-cols-1 gap-1 py-2 sm:grid-cols-[92px_minmax(0,1fr)] sm:gap-[14px] sm:py-0">
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              {entry.date}
            </span>
            <RecentText entry={entry} />
          </div>
        ))}
      </section>

      <LanguageBars />
    </div>
  );
}
