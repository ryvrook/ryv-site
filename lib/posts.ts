import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
);

marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title.replaceAll('"', '&quot;')}"` : '';
      const externalAttrs = /^https?:\/\//i.test(href)
        ? ' target="_blank" rel="noreferrer"'
        : '';
      return `<a href="${href.replaceAll('"', '&quot;')}"${titleAttr}${externalAttrs}>${text}</a>`;
    },
  },
});

export type Post = {
  slug: string;
  date: string;
  title: string;
  blurb: string;
  tags: string[];
  html: string;
  minutes: number;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
  const { data, content } = matter(raw);

  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_>\[\]()!`-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  // YAML parses bare dates as Date objects.
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? '');

  return {
    slug,
    date,
    title: String(data.title ?? slug),
    blurb: String(data.blurb ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html: marked.parse(content, { async: false }).replaceAll('<pre>', '<pre tabindex="0" aria-label="Code block">'),
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
