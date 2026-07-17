import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPost } from '@/lib/posts';
import { formatTags } from '@/lib/format';
import { site } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.blurb };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="fade-up flex flex-col gap-5">
      <div className="text-[11px] tracking-[.06em]" style={{ color: 'var(--text-dim)' }}>
        <Link href="/blog">blog</Link> / {post.slug}
      </div>

      <div>
        <h1
          className="m-0 text-[19px] font-semibold leading-[1.4]"
          style={{ color: 'var(--text-bright)' }}
        >
          {post.title}
        </h1>
        <div className="mt-2 flex flex-wrap gap-4 text-[11px]" style={{ color: 'var(--text-dim)' }}>
          <span>{post.date}</span>
          <span>{post.minutes} min read</span>
          <span style={{ color: 'var(--text-faint)' }}>{formatTags(post.tags)}</span>
        </div>
      </div>

      <div
        className="post-body pt-5"
        style={{ borderTop: '1px solid var(--line)' }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <div
        className="flex gap-[18px] pt-[14px] text-[11.5px]"
        style={{ borderTop: '1px solid var(--line-soft)' }}
      >
        <span style={{ color: 'var(--text-faint)' }}>
          thoughts? <a href={`mailto:${site.email}`}>email me</a>
        </span>
        <Link href="/blog" className="quiet-link ml-auto">
          ← all entries
        </Link>
      </div>
    </div>
  );
}
