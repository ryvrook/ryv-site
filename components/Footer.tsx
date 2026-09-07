'use client';

import { usePathname } from 'next/navigation';
import { site } from '@/data/site';

function pageRef(pathname: string): string {
  if (pathname === '/') return 'home';
  const parts = pathname.split('/').filter(Boolean);
  return parts.join(' / ');
}

export function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className="flex flex-wrap gap-x-[14px] gap-y-2 pt-[14px] text-[12px] sm:text-[11px]"
      style={{ color: 'var(--text-faint)', borderTop: '1px solid var(--line-soft)' }}
    >
      <span>
        {site.name} © {site.copyrightYears}
      </span>
      <span className="min-w-0 break-words sm:ml-auto">{pageRef(pathname)}</span>
    </footer>
  );
}
