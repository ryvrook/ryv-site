import { languages } from '@/data/languages';

const COLORS = [
  'var(--accent)',
  'var(--cyan)',
  'var(--amber)',
  'var(--red)',
  'var(--text-mid)',
  'var(--text-dim)',
];

const WIDTH = 24;

export function LanguageBars() {
  if (languages.length === 0) return null;
  const max = Math.max(...languages.map((l) => l.percent), 1);
  return (
    <section className="flex flex-col gap-2">
      <div className="sec-label">LANGUAGES</div>
      <div className="flex flex-col gap-[6px]">
        {languages.map((lang, i) => {
          const on = Math.min(
            WIDTH,
            Math.max(1, Math.round((lang.percent / max) * WIDTH)),
          );
          return (
            <div
              key={lang.name}
              className="grid grid-cols-[minmax(0,1fr)_48px] sm:grid-cols-[92px_minmax(0,1fr)_48px] items-baseline gap-[14px] text-[12px]"
            >
              <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
                {lang.name.toLowerCase()}
              </span>
              <span className="order-3 col-span-2 flex min-w-0 gap-[2px] sm:order-none sm:col-span-1" aria-hidden="true">
                {Array.from({ length: WIDTH }, (_, index) => (
                  <span key={index} style={{ flex: '1 1 0', height: 8, background: index < on ? COLORS[i % COLORS.length] : 'var(--bar-off)' }} />
                ))}
              </span>
              <span className="text-right text-[11px]" style={{ color: 'var(--text-dim)' }}>
                {lang.percent.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
