'use client';

import { useEffect, useId, useRef, useState } from 'react';

type ShareButtonProps = { title: string; url: string };

export function ShareButton({ title, url }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  async function share() {
    setFeedback('');
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }
    setOpen(current => !current);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setFeedback('Link copied');
      setOpen(false);
      triggerRef.current?.focus();
    } catch {
      setFeedback('Could not copy. Select the link below to copy it manually.');
    }
  }

  return (
    <div className="share-control" ref={rootRef} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button ref={triggerRef} type="button" className="share-trigger" aria-expanded={open} aria-controls={id} onClick={share}>
        <span aria-hidden="true">↗</span> {feedback === 'Link copied' ? 'copied' : 'share'}
      </button>
      {open && (
        <div id={id} className="share-menu" role="group" aria-label="Share this post">
          <a href={`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>x / twitter</a>
          <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>reddit</a>
          <button type="button" onClick={copyLink}>copy link</button>
          {feedback.startsWith('Could not') && <p className="share-feedback">{feedback}</p>}
          {feedback.startsWith('Could not') && <input aria-label="Post link" readOnly value={url} onFocus={event => event.currentTarget.select()} style={{ width: '100%', minWidth: 0, fontSize: 16, padding: 8 }} />}
        </div>
      )}
      <span className="sr-only" role="status">{feedback}</span>
    </div>
  );
}
