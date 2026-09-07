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
        <span className="w-full text-[12px] sm:ml-auto sm:w-auto sm:text-[11px]" style={{ color: 'var(--text-dim)' }}>
          {site.role}
        </span>
      </div>
      <nav
        aria-label="Main navigation"
        className="site-nav grid grid-cols-4 gap-[2px] text-[13px] tracking-[.04em] sm:flex sm:flex-wrap sm:py-[7px] sm:text-[11.5px] sm:tracking-[.06em]"
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
            aria-current={isActive(pathname, l.href) ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
