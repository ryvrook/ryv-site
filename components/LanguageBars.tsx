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
              className="grid grid-cols-[92px_1fr_48px] items-baseline gap-[14px] text-[12px]"
            >
              <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
                {lang.name.toLowerCase()}
              </span>
              <span className="tracking-[.08em]" aria-hidden>
                <span style={{ color: COLORS[i % COLORS.length] }}>
                  {'▮'.repeat(on)}
                </span>
                <span style={{ color: 'var(--bar-off)' }}>
                  {'▮'.repeat(WIDTH - on)}
                </span>
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
