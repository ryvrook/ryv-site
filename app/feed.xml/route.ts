import { getPosts } from '@/lib/posts';
import { site } from '@/data/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function GET() {
  const items = getPosts()
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.blurb)}</description>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<rss version="2.0"><channel>' +
    `<title>${escapeXml(site.name)}</title>` +
    `<link>${site.url}</link>` +
    `<description>${escapeXml(site.bio)}</description>` +
    items +
    '</channel></rss>';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
