'use client';

import { useEffect, useRef, useState } from 'react';

type ShareButtonProps = {
  title: string;
  url: string;
};

export function ShareButton({ title, url }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setOpen(false);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="share-control" ref={rootRef}>
      <button
        type="button"
        className="share-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">↗</span>
        {copied ? 'copied' : 'share'}
      </button>

      {open && (
        <div className="share-menu" role="menu">
          <a
            role="menuitem"
            href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            x / twitter
          </a>
          <a
            role="menuitem"
            href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            reddit
          </a>
          <button type="button" role="menuitem" onClick={copyLink}>
            discord
          </button>
          <button type="button" role="menuitem" onClick={copyLink}>
            copy link
          </button>
        </div>
      )}
    </div>
  );
}
