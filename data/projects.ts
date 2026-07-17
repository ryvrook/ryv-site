export type ProjectStatus = 'ACTIVE' | 'STABLE' | 'EXPERIMENTAL' | 'ARCHIVED';

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  lang: string;
  updated: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  license?: string;
  pinned?: boolean;
  // deployment link
  url?: string;
  // Absent = private repo
  repo?: string;
  mirror?: { href: string; label: string };
  summary: string;
  body: string[];
  diagram?: string;
  changelog: { date: string; message: string }[];
};

export const projects: Project[] = [
  {
    slug: 'endpoint-game',
    name: 'endpoint-game',
    status: 'ACTIVE',
    lang: 'GDScript',
    updated: '2026-07-16',
    complexity: 2,
    pinned: false,
    summary: '2D roguelike built in Godot. Early and changing shape weekly.',
    body: [
      'A 2D roguelike in Godot 4. I\'m deep in the item system right now, mapping out an expansion roadmap and getting the plumbing right before the content volume arrives.',
      'On the rendering side I fixed sprite bleed and deepened the signal wall effect. Still early enough that the interesting writeup is ahead of it.',
    ],
    changelog: [
      { date: '2026-07-16', message: 'item expansion technical roadmap' },
      { date: '2026-07-16', message: 'fixed sprite bleed, deepened signal wall' },
    ],
  },
  {
    slug: 'enterprise-vectordns',
    name: 'enterprise-vectordns',
    status: 'ACTIVE',
    lang: 'Go',
    updated: '2026-07-15',
    complexity: 4,
    pinned: false,
    summary:
      'Enterprise DNS monitoring in a single Go binary. REST API, WebSockets, admin panel, org dashboard. No microservices, no JS build step.',
    body: [
      'VectorDNS rebuilt for enterprise use as one Go binary that serves everything. The same process handles the REST API, WebSocket change notifications, the admin panel, and an org-facing dashboard rendered with htmx. No microservices, no JavaScript build step, no external auth providers.',
      'Built around org-scoped access control, webhook integrations, and append-style audit logging. Ships as a Docker Compose stack with PostgreSQL, Redis, Prometheus, and Grafana. Staging and production modes enforce strict security checks like verify-full Postgres TLS.',
      'The current push is monitoring quality. Status transitions now get recorded as history, a daily sweep catches expiring domains, and flapping domains auto-throttle down to daily checks with a per-domain override.',
    ],
    changelog: [
      { date: '2026-07-15', message: 'status transition history, partial snapshot sync, daily expiry sweep' },
      { date: '2026-07-06', message: 'auto-throttle flapping domains to daily checks' },
      { date: '2026-07-06', message: 'htmx redirects converted to HX-Redirect' },
    ],
  },
  {
    slug: 'roadrunner',
    name: 'roadrunner',
    status: 'ACTIVE',
    lang: 'JavaScript',
    updated: '2026-07-13',
    complexity: 3,
    pinned: false,
    url: 'https://roadrunnerlog.com',
    summary:
      'Self-hosted maintenance logbook for every vehicle you own. Service records, parts, costs, odometer history, file uploads.',
    body: [
      'Tracks maintenance for bicycles, motorcycles, cars, and trucks. Service records, parts used, costs, odometer readings, and file uploads (OBD-II dumps, receipts, photos, manuals). It replaces the "replaced oil at 82,450 mi" note in your phone with structured, searchable history.',
      'Three containers: Postgres 16, an Express API with JWT auth that runs its own migrations on boot, and nginx serving the React SPA. An Expo mobile app talks to the same API. The stack refuses to start without a real JWT secret. There is no insecure default.',
      'Right now I\'m on the reminders system. Overdue labels show a date or a mileage, and overdue service is visually separated from upcoming.',
    ],
    changelog: [
      { date: '2026-07-13', message: 'overdue reminder labels include date or mileage' },
      { date: '2026-06-26', message: 'reminder list visual pass' },
    ],
  },
  {
    slug: 'treecreeper',
    name: 'treecreeper',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-07-13',
    complexity: 3,
    pinned: false,
    summary:
      'Website scanner for SEO readiness and AI-search readiness. Crawls a site, runs a catalog of checks, produces a diffable JSON report.',
    body: [
      'Crawls a site and runs a catalog of checks covering classic SEO readiness and the newer question of AI-search readiness, then produces a diffable JSON report so you can track a site check-over-check.',
      'The whole thing is one Docker image, a Bun server on a Playwright/Chromium base serving both the API and the SPA, with Postgres next to it. Migrations run on boot and interrupted scans recover automatically. Deployed behind Dokploy with Cloudflare in front, and the runbook covers the SSRF guard, egress hardening, and backups.',
      'The schedules management page just landed, which wraps up phase 7 of the build.',
    ],
    changelog: [
      { date: '2026-07-13', message: 'schedules management page, phase 7 complete' },
      { date: '2026-07-13', message: 'dokploy and cloudflare deployment runbook' },
    ],
  },
  {
    slug: 'qwuickswap',
    name: 'qwuickswap',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-07-04',
    complexity: 3,
    pinned: false,
    url: 'https://qwuickswap.com',
    summary:
      'Self-hosted media multitool. Image conversion runs in the browser on WASM codecs, video trims and audio extraction run server-side through ffmpeg.',
    body: [
      'Images convert, resize, and compress entirely in the browser using the Squoosh WASM codecs (mozjpeg, WebP, AVIF, JPEG XL, OxiPNG, QOI), so those files never leave your machine. Video trimming, MP3 extraction, and short soundboard clips with waveform picking, volume, and fades run server-side through ffmpeg.',
      'The server-side tools sit behind a shared access key with queue depth limits, ffmpeg timeouts, and temp file TTLs, all tunable by env var. Runs as one Docker container behind a Cloudflare Tunnel.',
      'Newest thing in the studio is a gif mode, with gif creation as a first-class job type.',
    ],
    changelog: [
      { date: '2026-07-04', message: 'gif mode in studio, gif creation job' },
      { date: '2026-07-03', message: 'initial release' },
    ],
  },
  {
    slug: 'qwuick-bot',
    name: 'qwuick-bot',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-07-04',
    complexity: 2,
    pinned: false,
    summary:
      'Discord front-end for qwuickswap. Paste a link, get back a trimmed video, an MP3, or a soundboard clip without leaving the channel.',
    body: [
      'QwuickSwap\'s Discord face. Paste a media link in a channel and get a trimmed video, an extracted MP3, or a short soundboard clip back. Embeds, buttons, and modals mean nobody has to memorize slash-command syntax. Sources are whatever the server can fetch through yt-dlp, which in practice means YouTube, TikTok, X, and embed-proxy links.',
      'The bot does no media processing itself. It holds the API secret and drives four endpoints: fetch the source, enqueue an ffmpeg job, poll progress into the Discord reply, then download and attach the result. Fetched sources live about 15 minutes server-side, so the same source can be re-edited from the Trim / MP3 / Clip buttons without re-downloading.',
    ],
    changelog: [
      { date: '2026-07-04', message: 'gif command and button' },
      { date: '2026-07-04', message: 'preserve entry point command on global register' },
    ],
  },
  {
    slug: 'this-site',
    name: 'this site',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-07-17',
    complexity: 1,
    pinned: false,
    repo: 'https://github.com/ryvrook/ryv-site',
    url: 'https://ryvrook.com',
    summary:
      'This site. Next.js, one column, two data files and a folder of markdown. You\'re looking at it.',
    body: [
      'This site. Next.js app router, Tailwind, fully static. Identity and projects live in typed data files, blog posts are plain markdown, and everything else renders from those, including the RSS feed and sitemap.',
      'It grew up in my old portfolio repo through a heavier "personal OS" concept before this design replaced it with a single column and fewer ideas. Now it lives in its own repo, which is where the old one felt it deserved to end up.',
    ],
    changelog: [
      { date: '2026-07-17', message: 'moved to its own repo, posts are markdown now' },
      { date: '2026-07-17', message: 'terminal redesign, file-based content' },
      { date: '2026-07-03', message: 'personal-os iteration' },
    ],
  },
  {
    slug: 'ternix',
    name: 'ternix',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-07-02',
    complexity: 3,
    pinned: false,
    summary:
      'Build a NixOS config in the browser from real nixpkgs data, then push it to your repo as a pull request. Btw, this project sucks.',
    body: [
      'A Git-backed web workspace for assembling a NixOS / Home-Manager configuration. Search across nixpkgs packages, NixOS options, and Home-Manager options with popularity-boosted ranking, browse curated collections, and read detail pages built from real metadata pinned to the exact nixpkgs revision.',
      'The builder collects packages and options into a selection, takes a GPU driver and channel choice, and generates plain, valid Nix for configuration.nix, home.nix, or a flake. Signed-in users can push the result to one of their repos as an additive, collision-checked pull request. It never overwrites anything.',
      'All data comes from official sources (the search.nixos.org index, the rendered Home-Manager manual). If a source is down the UI says so rather than showing fake results.',
    ],
    changelog: [
      { date: '2026-07-02', message: 'preset gallery, HM option browsing, builder UI overhaul' },
      { date: '2026-07-02', message: 'nix generation overhaul: configs work out of the box' },
    ],
  },
  {
    slug: 'wrensmith',
    name: 'wrensmith',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-07-02',
    complexity: 3,
    pinned: false,
    summary:
      'Tooling behind a freelance website service. An operator workbench plus a research layer that grounds every site in keyword strategy and positioning.',
    body: [
      'The workbench side manages business profiles, documents, logos, and previews for client sites, with an attention view that surfaces exactly which facts are still missing from a profile.',
      'Underneath, keyword strategy and positioning research feed into every generation prompt, so a client site starts from its actual market rather than a template.',
    ],
    changelog: [
      { date: '2026-06-11', message: 'research layer: keyword strategy and positioning' },
      { date: '2026-06-11', message: 'operator workbench: document saves, logo upload, fresh previews' },
    ],
  },
  {
    slug: 'askfriday',
    name: 'AskFriday',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-06-28',
    complexity: 3,
    pinned: false,
    license: 'Apache-2.0',
    repo: 'https://github.com/ryvrook/AskFriday',
    summary:
      'Vencord plugin. Hover a Discord message and an LLM drafts a human-sounding reply into your compose box, using the surrounding conversation as context.',
    body: [
      'A Vencord userplugin. Hover any Discord message, hit Ask Friday, and an LLM drafts a reply using the recent messages around the target (before and after) so the reply actually follows the thread. The draft lands in your compose box to review, edit, and send. Nothing goes out automatically.',
      'Three providers (Anthropic, OpenAI, Google) and two auth modes: bring-your-own API key, or a local CLI mode that reuses your existing subscription through the official CLI login. Tone controls cover style, length, emoji use, and language matching, and regenerate replaces the previous untouched draft instead of stacking a second one.',
      'Desktop and Vesktop only. Requests route through the Electron main process to dodge browser CORS, which web Vencord can\'t do.',
    ],
    changelog: [
      { date: '2026-06-28', message: 'style modal replaces re-roll submenu, humanized replies' },
      { date: '2026-06-28', message: 'landing page served via Cloudflare Worker' },
    ],
  },
  {
    slug: 'swallowtail',
    name: 'Swallowtail',
    status: 'ACTIVE',
    lang: 'Go',
    updated: '2026-06-23',
    complexity: 4,
    pinned: false,
    summary:
      'Multi-tenant redirect-mapping SaaS. Upload an old sitemap, get back a CSV or htaccess of 301s with deterministic wildcard pattern detection.',
    body: [
      'Upload the sitemap of a site being migrated and get back a redirect map: CSV, htaccess, or nginx rules, with deterministic wildcard pattern detection. Built as a multi-tenant SaaS with a Next.js frontend and a Go backend split into API, background worker, and an opt-in SSRF-isolated headless-Chromium renderer for JS-heavy pages.',
      'The tenancy model is Postgres row-level security bound to an org GUC, with an append-only hash-chained audit log. The worker queue uses SELECT FOR UPDATE SKIP LOCKED with claim-epoch fencing and heartbeats that abort themselves strictly inside the requeue deadline.',
      'The match engine runs exact and wildcard matching first, then fuzzy matching on residuals (slug Jaccard plus depth and segment alignment), streaming progress to the review table over SSE. Currently mid-build: match engine merged, review interactions in progress, exports next.',
    ],
    diagram:
      'frontend (Next.js + Better Auth)\n        |  EdDSA JWT, 5 min TTL\n        v\napi (Go) ----> Postgres (RLS per org, hash-chained audit)\n        \\\n         worker: sitemap discovery -> BFS crawl -> match engine\n                  \\-> renderer (headless Chromium, SSRF-isolated, opt-in)',
    changelog: [
      { date: '2026-06-23', message: 'per-side URL CSV download, admin cap override' },
      { date: '2026-06-20', message: 'optional headless rendering with SSRF-isolated renderer' },
      { date: '2026-06-19', message: 'sitemap autodiscovery, full-site crawler' },
    ],
  },
  {
    slug: 'corviddata',
    name: 'corviddata',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-06-16',
    complexity: 1,
    pinned: false,
    summary: 'Landing page for Corvid Data LLC.',
    body: [
      'Landing page for Corvid Data LLC. Services, branding, contact. Small on purpose.',
    ],
    changelog: [
      { date: '2026-06-16', message: 'services and logo update' },
    ],
  },
  {
    slug: 'randomizr',
    name: 'Randomizr',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-06-14',
    complexity: 3,
    pinned: false,
    repo: 'https://github.com/ryvrook/Randomizr',
    summary:
      'Randomize anything. Any list, any source, twenty-plus methods from roulette wheel to plinko. Descendant of a 2012 original that still lives in og/.',
    body: [
      'Feed in data from any source (typed lists, CSV, Google Sheets, images, Letterboxd and Goodreads RSS, Wikipedia, number ranges) and pick a method: roulette wheel, card draw, slot machine, amidakuji ladder, single-elimination tournament, team splitter, sort race, canvas-physics plinko, and more. Results record to local history and any list can travel as a share link.',
      'Around the tool sit The Entropy Press, short articles on how the randomness actually works, and Discover, nine channels pulling random things live from public APIs. There is also a documented URL scheme for sharing lists and verdicts.',
      'The design is monochrome like the 2010 original: ink on warm paper, halftone dots, hard offset shadows, the original BPdots brand font. This is a rebuild of the first website I ever made, in 2012, to help my brothers and me pick a movie. The original site is preserved in the og/ directory.',
    ],
    changelog: [
      { date: '2026-06-14', message: 'self-hosted CORS proxy for Letterboxd/Goodreads RSS' },
      { date: '2026-06-11', message: 'navigation polish, dotted loading placeholders' },
    ],
  },
  {
    slug: 'agenttailor',
    name: 'Agent Tailor',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-05-18',
    complexity: 2,
    pinned: false,
    summary:
      'Pixel-art workshop where dressing an AI agent configures it for real. Hat = LLM, goggles = vision, tool belt = MCPs.',
    body: [
      'A pixel-art workshop where you dress AI agents in clothing that maps to real capabilities. Pick a hat, pick an LLM. Strap on goggles, enable vision. Tie a tool belt, add MCPs and function tools. The dressed agent exports as JSON or generated TypeScript and Python code.',
      'The v1 ships a roster, four archetypes, a unified drag tailor built on dnd-kit with seven slots, about 22 starter items, and a library room where agents wander and speak when clicked. Cloud save through Supabase with RLS is opt-in. Without it everything lives in localStorage, and an importer migrates offline agents when you sign in.',
    ],
    changelog: [
      { date: '2026-05-18', message: 'localStorage to Supabase migration shipped' },
      { date: '2026-05-18', message: 'offline to online agent import on sign-in' },
    ],
  },
  {
    slug: 'vdns-tui',
    name: 'vdns-tui',
    status: 'STABLE',
    lang: 'Go',
    updated: '2026-04-03',
    complexity: 2,
    pinned: false,
    repo: 'https://github.com/Vector-DNS/vdns-tui',
    summary: 'Terminal UI companion to the VectorDNS CLI. Full report view, interactive settings, account login.',
    body: [
      'VectorDNS for people who live in the terminal. A full report view (including rate limit warnings) and a settings view with account login for the remote features.',
      'Sits alongside vdns-cli in the Vector-DNS org. The CLI is the scriptable interface. This is the one you sit in.',
    ],
    changelog: [
      { date: '2026-04-03', message: 'full report view with rate limit warning' },
      { date: '2026-04-03', message: 'interactive settings view with login' },
    ],
  },
  {
    slug: 'vectordns',
    name: 'VectorDNS',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-03-30',
    complexity: 4,
    pinned: false,
    license: 'GPL-2.0',
    url: 'https://vectordns.io',
    summary:
      'DNS lookup, WHOIS, and domain monitoring platform. Tracks DNS changes over time with visual diffs, plus teams and Stripe billing.',
    body: [
      'The core is DNS record lookup across all the common types, WHOIS via RDAP, domain availability, propagation checks across resolvers worldwide, and DNSSEC validation. Saved domains go on a dashboard where automated re-checks detect changes and show visual diffs of exactly what moved.',
      'Around that sit teams with role-based access, tagging with auto-tag rules based on record patterns, an in-app notification feed plus email alerts, data export in five formats, and Stripe subscription tiers. A tri-view UI (Simple, Standard, Advanced) keeps the same data usable at different experience levels.',
      'The architecture is split on purpose. Next.js on Vercel for the app, Supabase for auth and Postgres with RLS, and a Go microservice on a VPS doing the actual DNS work with direct UDP/TCP resolution.',
    ],
    changelog: [
      { date: '2026-03-30', message: 'propagation ignores timed-out resolvers' },
      { date: '2026-03-30', message: 'higher anonymous lookup limit' },
    ],
  },
  {
    slug: 'vectordns-server',
    name: 'vectordns-server',
    status: 'STABLE',
    lang: 'Go',
    updated: '2026-03-30',
    complexity: 3,
    pinned: false,
    summary:
      'The Go microservice behind VectorDNS. Direct UDP/TCP resolution on miekg/dns, DNSSEC validation, propagation checks from 28 global resolvers.',
    body: [
      'Where VectorDNS actually does DNS. A Go microservice built on miekg/dns doing direct UDP/TCP resolution rather than shelling out to a stub resolver. It handles record lookups, DNSSEC chain validation, and propagation checks across 28 global resolver locations.',
      'It also owns the scheduled work, monitoring re-checks and monthly usage report emails. Runs on a VPS behind the Vercel frontend, deliberately outside the serverless sandbox so it can speak raw DNS.',
    ],
    changelog: [
      { date: '2026-03-30', message: 'propagation resolvers expanded to 28 locations' },
      { date: '2026-03-26', message: 'fixed false availability without RDAP coverage' },
      { date: '2026-03-24', message: 'monthly usage report emails' },
    ],
  },
  {
    slug: 'vdns-cli',
    name: 'vdns-cli',
    status: 'STABLE',
    lang: 'Go',
    updated: '2026-03-27',
    complexity: 3,
    pinned: false,
    license: 'GPL-3.0',
    repo: 'https://github.com/Vector-DNS/vdns-cli',
    summary:
      'DNS and domain lookup CLI with colored output. Works with no account via local resolution. Connect VectorDNS for WHOIS, availability, and SSL.',
    body: [
      'A DNS and domain CLI that works out of the box. Pure Go resolution through your system resolver, no account, no rate limits. You get shorthand commands per record type, multi-domain lookups, propagation checks, side-by-side domain comparison, resolver benchmarking, and watch modes including prop --until-consistent.',
      'Logging in to VectorDNS unlocks WHOIS/RDAP data, domain availability, SSL certificate details, and DNSSEC-validated lookups.',
      'Ships as a Homebrew tap (brew install Vector-DNS/tap/vdns), go install, or prebuilt binaries for Linux, macOS, and Windows, with man pages.',
    ],
    changelog: [
      { date: '2026-03-27', message: 'compare and benchmark commands, expanded resolver list' },
      { date: '2026-03-27', message: 'man pages, DNS and client tests' },
    ],
  },
  {
    slug: 'lotus-mail',
    name: 'Lotus Mail',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-03-25',
    complexity: 3,
    pinned: false,
    summary:
      'Self-hosted web client for Resend. Compose, contacts, broadcasts, a visual template editor, and live delivery events.',
    body: [
      'Turns a Resend API key into a full email workspace. Sending with delivery tracking, batch sends to hundreds of recipients, contacts with audiences and segments, scheduled broadcasts, and domain management with DNS verification.',
      'Templates come two ways, a Monaco code editor for HTML and React Email or a visual block-based builder with starter presets. Delivery webhooks stream into the UI live over SSE. The API key is encrypted at rest, and the whole thing runs on Docker Compose or Kubernetes.',
    ],
    changelog: [
      { date: '2026-03-25', message: 'production readiness overhaul' },
      { date: '2026-03-23', message: 'visual editor improvements for non-technical users' },
    ],
  },
  {
    slug: 'vectordns-admin',
    name: 'vectordns-admin',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-03-25',
    complexity: 2,
    pinned: false,
    summary:
      'Admin panel for VectorDNS. Invite codes with expiry, support email with threading, operational controls.',
    body: [
      'The ops panel for VectorDNS. Invite code management with expiry dates, plus a support email workflow where replies go through a full compose form with threading, CC/BCC, and scheduling.',
      'Kept separate from the customer-facing platform on purpose. Different audience, different blast radius.',
    ],
    changelog: [
      { date: '2026-03-25', message: 'invite code expiry and deletion' },
      { date: '2026-03-18', message: 'support replies: threading, CC/BCC, scheduling' },
    ],
  },
  {
    slug: 'webhaptics',
    name: 'WebHapticsTest',
    status: 'EXPERIMENTAL',
    lang: 'TypeScript',
    updated: '2026-03-04',
    complexity: 1,
    pinned: false,
    summary: 'Test bench for web haptics. A page of buttons, each firing a different vibration pattern.',
    body: [
      'A small Vite/React test bench for the web Vibration API. Buttons fire different haptic patterns so you can feel what phones actually do with the values you send.',
      'Exists to answer a question, not to ship. The answers feed into other projects.',
    ],
    changelog: [
      { date: '2026-03-04', message: 'more haptic test buttons and styles' },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
