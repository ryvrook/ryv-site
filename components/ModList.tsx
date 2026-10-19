import Image from 'next/image';
import type { Mod } from '@/data/projects';

const groups: Mod['group'][] = ['Gameplay', 'Server tools', 'Libraries'];

export function ModList({ mods, countedAt }: { mods: Mod[]; countedAt?: string }) {
  const published = mods.filter((m) => m.downloads !== undefined);
  const total = published.reduce((sum, m) => sum + (m.downloads ?? 0), 0);

  return (
    <div>
      <div className="sec-label mb-1">
        MODS{' '}
        <span style={{ letterSpacing: 0, color: 'var(--text-faint)' }}>
          - {mods.length} mods, {published.length} on curseforge, {total.toLocaleString('en-US')} downloads
          {countedAt && ` as of ${countedAt}`}
        </span>
      </div>
      {groups.map((group) => {
        const list = mods.filter((m) => m.group === group);
        if (list.length === 0) return null;
        return (
          <div key={group} className="mt-4">
            <div className="mb-1 text-[11px] tracking-[.06em]" style={{ color: 'var(--text-dim)' }}>
              {group.toLowerCase()}
            </div>
            {list.map((mod) => (
              <div
                key={mod.name}
                className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 py-3 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-[14px]"
                style={{ borderBottom: '1px solid var(--line-faint)' }}
              >
                <Image
                  src={mod.icon}
                  alt={`${mod.name} icon`}
                  width={48}
                  height={48}
                  className="size-10 object-contain sm:size-12"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px]">
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--text-bright)' }}>
                      {mod.name}
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>{mod.version}</span>
                    <span className="sm:ml-auto" style={{ color: 'var(--text-dim)' }}>
                      {mod.downloads !== undefined ? (
                        <>
                          <span style={{ color: 'var(--amber)' }}>
                            {mod.downloads.toLocaleString('en-US')}
                          </span>{' '}
                          downloads
                        </>
                      ) : (
                        <span style={{ color: 'var(--text-faint)' }}>{mod.note}</span>
                      )}
                    </span>
                  </div>
                  <p
                    className="mt-1 mb-0 text-[12.5px]"
                    style={{ color: 'var(--text-body)', textWrap: 'pretty' }}
                  >
                    {mod.summary}
                  </p>
                  <div className="mt-[6px] flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                    <a href={mod.wiki} target="_blank" rel="noreferrer">
                      wiki
                    </a>
                    {mod.curseforge && (
                      <a href={mod.curseforge} target="_blank" rel="noreferrer">
                        curseforge
                      </a>
                    )}
                    {mod.repo && (
                      <a href={mod.repo} target="_blank" rel="noreferrer" className="quiet-link">
                        source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
