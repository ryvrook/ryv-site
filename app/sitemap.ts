import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { getPosts } from '@/lib/posts';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/projects', '/blog', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
  }));
  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: p.updated,
  }));
  const postPages = getPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.date,
  }));
  return [...staticPages, ...projectPages, ...postPages];
}
