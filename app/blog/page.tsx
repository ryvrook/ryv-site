import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { formatTags } from '@/lib/format';

export const metadata: Metadata = { title: 'blog' };

export default function BlogPage() {
  const posts = getPosts();
  return (
    <div className="fade-up flex flex-col">
      <div className="mb-[10px] flex items-baseline justify-between gap-3">
        <div className="text-[11px] tracking-[.1em]" style={{ color: 'var(--text-dim)' }}>
          BLOG
        </div>
        <div className="text-[11px]">
          <a href="/feed.xml" className="quiet-link touch-link">
            rss
          </a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--line)' }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-row row-hover grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-2 px-1 py-5 no-underline hover:no-underline sm:grid-cols-[92px_minmax(0,1fr)_52px] sm:gap-[14px] sm:py-[14px]"
            style={{ borderBottom: '1px solid var(--line-soft)', color: 'inherit' }}
          >
            <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
              {post.date}
            </span>
            <span className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:row-start-auto">
              <span className="font-medium" style={{ color: '#c6d0d6' }}>
                {post.title}
              </span>
              <br />
              <span className="text-[11.5px]" style={{ color: 'var(--text-mid)' }}>
                {post.blurb}
              </span>
              <br />
              <span className="text-[10.5px]" style={{ color: 'var(--text-faint)' }}>
                {formatTags(post.tags)}
              </span>
            </span>
            <span className="col-start-2 row-start-1 text-right text-[11px] sm:col-start-auto sm:row-start-auto" style={{ color: 'var(--text-dim)' }}>
              {post.minutes} min
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-3 text-[11px]" style={{ color: 'var(--text-faint)' }}>
        {posts.length} entries. No comments section, just{' '}
        <Link href="/contact" className="quiet-link">
          get in touch
        </Link>
        .
      </div>
    </div>
  );
}
