'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';

const links = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
  { href: '/contact', label: 'contact' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  return (
    <header className="flex flex-col gap-[14px]">
      <div className="flex items-baseline gap-3 flex-wrap">
        <Link
          href="/"
          className="text-base font-semibold"
          style={{ color: 'var(--text-bright)' }}
        >
          {site.name}
        </Link>
        <span style={{ color: 'var(--text-dim)' }}>{site.handle}</span>
        <span className="ml-auto text-[11px]" style={{ color: 'var(--text-dim)' }}>
          {site.role}
        </span>
      </div>
      <nav
        className="flex flex-wrap gap-[2px] py-[7px] text-[11.5px] tracking-[.06em]"
        style={{
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="nav-link"
            data-active={isActive(pathname, l.href)}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
