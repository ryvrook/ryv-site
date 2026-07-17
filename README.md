# ryv-site

Terminal-styled personal site: dark single-column layout, IBM Plex Mono,
Next.js 15 app router, Tailwind 4, fully static.

## Content

- `data/site.ts` - identity, bio, NOW list, RECENT log, socials, contact
- `data/projects.ts` - project entries (summary, writeup, optional ASCII
  diagram, changelog)
- `content/posts/*.md` - blog posts as markdown. Filename is the slug,
  frontmatter carries `title`, `date`, `blurb`, `tags`. Inline formatting,
  fenced code blocks, and images all pick up the site styling.
- `data/languages.ts` - language chart on the home page, hand-edited
- `data/activity.ts` - per-project commit graphs, generated

Edit those and the whole site follows: indexes, detail pages, RSS at
`/feed.xml`, and the sitemap all render from them. The avatar tracks the
GitHub profile picture via `avatar` in `data/site.ts`, or point it at a
path under `public/` instead.

## Pages

`/` home · `/projects` and `/projects/[slug]` · `/blog` and `/blog/[slug]` ·
`/contact` · `/feed.xml` · `sitemap.xml`

## Develop

```bash
bun install
bun run dev
```

`bun run build` produces the site.

`bun run activity` (needs an authenticated gh CLI) regenerates the commit
graphs and prints the current GitHub language share to paste into
`data/languages.ts`.
