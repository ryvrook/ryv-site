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
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          overflow: 'hidden',
          background: '#050506',
          color: '#f0f1f4',
          fontFamily: 'serif',
          fontWeight: 700,
          border: '2px solid #252532',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 45,
            right: 62,
            display: 'flex',
            width: 310,
            height: 150,
            border: '1px solid #302b50',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 69,
            right: 86,
            display: 'flex',
            width: 310,
            height: 150,
            border: '1px solid #1d2d3d',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'flex',
            width: 320,
            height: 5,
            background: '#8177c9',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#718087',
            fontSize: 23,
          }}
        >
          <span style={{ display: 'flex', color: '#8177c9' }}>/</span>
          <span>{site.name.toLowerCase()} / blog</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              display: 'flex',
              maxWidth: 1020,
              fontSize: post.title.length > 70 ? 47 : 57,
              fontWeight: 700,
              lineHeight: 1.16,
              letterSpacing: '-0.035em',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              display: 'flex',
              maxWidth: 980,
              color: '#bcc1cb',
              fontSize: 26,
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
          <span style={{ color: '#9a91dc', fontWeight: 600 }}>ryvrook.com</span>
        </div>
      </div>
    ),
    size,
  );
}
