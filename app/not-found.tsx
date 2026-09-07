import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fade-up flex flex-col gap-[10px]">
      <div className="text-[11px] tracking-[.1em]" style={{ color: 'var(--text-dim)' }}>
        404
      </div>
      <div className="pt-[14px]" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="m-0 text-[12.5px]" style={{ color: 'var(--text-body)' }}>
          No such path. Either the link that sent you here is stale, or I
          removed the page.
        </p>
        <div className="page-actions mt-3 text-[11.5px]">
          <Link href="/">← home</Link>
        </div>
      </div>
    </div>
  );
}
