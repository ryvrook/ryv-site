import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/posts';
import { site } from '@/data/site';

export const alt = 'Blog post preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0c0e10',
          color: '#d4dde2',
          fontFamily: 'monospace',
          border: '2px solid #242c34',
        }}
      >
        <div style={{ display: 'flex', color: '#5c6870', fontSize: 24 }}>
          {site.name.toLowerCase()} / blog
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              display: 'flex',
              maxWidth: 1020,
              fontSize: post.title.length > 70 ? 48 : 58,
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: '-0.035em',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              display: 'flex',
              maxWidth: 980,
              color: '#9aa6ad',
              fontSize: 27,
              lineHeight: 1.45,
            }}
          >
            {post.blurb}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#5c6870',
            fontSize: 22,
          }}
        >
          <span>{post.date}</span>
          <span style={{ color: '#62a8b3' }}>ryvrook.com</span>
        </div>
      </div>
    ),
    size,
  );
}
