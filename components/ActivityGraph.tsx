import { activity, activityGeneratedAt } from '@/data/activity';

export function ActivityGraph({ slug }: { slug: string }) {
  const allWeeks = activity[slug];
  if (!allWeeks || allWeeks.length === 0) return null;

  const firstActive = allWeeks.findIndex((c) => c > 0);
  const weeks = firstActive === -1 ? allWeeks : allWeeks.slice(firstActive);

  const total = weeks.reduce((a, b) => a + b, 0);
  const max = Math.max(...weeks);
  const label =
    weeks.length === 52 ? 'past year' : `past ${weeks.length} weeks`;

  return (
    <div>
      <div className="sec-label mb-[10px]">
        ACTIVITY <span style={{ letterSpacing: 0, color: 'var(--text-faint)' }}>
          {' '}
          - commits by week, {label}
        </span>
      </div>
      {total === 0 ? (
        <div className="text-xs" style={{ color: 'var(--text-faint)' }}>
          no public commit data yet.
        </div>
      ) : (
        <>
          <div
            className="flex h-5 w-full items-end gap-px"
            role="img"
            aria-label={`${total} commits over the ${label}`}
          >
            {weeks.map((count, i) => {
              const level =
                count === 0
                  ? 0
                  : 1 + Math.min(6, Math.floor((count / max) * 6.999));
              return (
                <span
                  key={i}
                  title={`${count} commits`}
                  style={{
                    flex: '1 1 0',
                    minWidth: 0,
                    height: `${2 + level * 2}px`,
                    background: count === 0 ? 'var(--bar-off)' : 'var(--accent)',
                    opacity: count === 0 ? 1 : 0.45 + 0.55 * (level / 7),
                  }}
                />
              );
            })}
          </div>
          <div className="mt-[6px] flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-faint)' }}>
            <span>{total} commits</span>
            <span>peak {max}/wk</span>
            <span className="ml-auto">as of {activityGeneratedAt}</span>
          </div>
        </>
      )}
    </div>
  );
}
