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
  // Lower numbers appear first among pinned projects.
  pinnedOrder?: number;
  // deployment link
  url?: string;
  // Absent = private repo although I have been ignoring this tbh
  repo?: string;
  mirror?: { href: string; label: string };
  // Square brand mark or representative project image.
  image?: string;
  // Wide hero capture of the live site, shown at the top of the project page.
  banner?: string;
  summary: string;
  body: string[];
  diagram?: string;
  changelog: { date: string; message: string }[];
};

export const projects: Project[] = [
  {
    slug: 'presentelle',
    name: 'Presentelle',
    status: 'EXPERIMENTAL',
    lang: 'TypeScript / Swift',
    updated: '2026-09-07',
    complexity: 4,
    pinned: false,
    image: '/projects/presentelle-logo.svg',
    summary:
      'Experimental visual thinking workspace connecting physical boards, a durable working record, and AI-assisted drafts that the user reviews and confirms.',
    body: [
      'Presentelle is a workspace for developing ideas from a physical board without losing the history behind them. Projects hold sessions, captured boards, pinned checkpoints, corrected records, selected CSV evidence, and editable outputs, so the work can be resumed and revised later.',
      'The local implementation combines a React web workspace with a Bun and SQLite service. It includes session lifecycle controls, live updates, versioned drafts, portable exports, and local data recovery. Assistant proposals stay separate from confirmed records until the user reviews them.',
      'Capture work spans a native SwiftUI app with pairing, cropping, and a durable upload queue, plus browser webcam capture. An MCP service exposes scoped session tools intended for the user\'s own supported AI account.',
      'This is in active development as an experimental private preview. Real provider-account integration and physical-device capture still need validation; the implemented local workflows and automated checks do not establish production readiness.',
    ],
    changelog: [
      { date: '2026-09-07', message: 'added atomic local migrations and operational diagnostics' },
      { date: '2026-09-07', message: 'implemented session lifecycle, live updates, and traceable assistant drafts' },
    ],
  },
  {
    slug: 'directflock',
    name: 'Direct Flock',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-08-31',
    complexity: 4,
    pinned: true,
    pinnedOrder: 2,
    repo: 'https://github.com/ryvrook/directflock',
    image: '/projects/directflock-logo.svg',
    summary:
      'Operator dashboard for the Flock Directories network and the production line around it: acquisition, lead research, site audits, outreach, generation, release, and monitoring.',
    body: [
      'A single-operator dashboard that runs the whole flock. It sits over the Flock Directories template and the acquisition pipeline, so scaffolding a site, drafting its content, building it, releasing it, and watching its deployment all happen in one place instead of a pile of terminal sessions.',
      'The dashboard never becomes a second source of truth. Site content stays in each directory\'s validated JSON file, written only through the template\'s canonical serializer, and every change lands as a git commit. When work needs doing, Direct Flock shells out to the template\'s own scripts and the pipeline\'s CLI as child processes, so each tree\'s own validators always apply.',
      'A new site goes from nothing to a live custom domain as one job. The wizard explores real Overture data for the chosen industry, generates a validated preset, runs the acquisition, ingests what the crawl found as draft listings, curates the drafts, and provisions the Cloudflare Pages project. The deployments page then compares what each production domain actually serves against the latest build-affecting commit and flags any site that has fallen behind.',
      'The same business records now feed a lead center. Direct Flock imports acquisitions and directories into consolidated records, audits their existing sites with quoted evidence, scores the opportunities, drafts grounded outreach, and can hand a qualified prospect to Wrensmith as a versioned site brief. Twenty CRM workflows sit at the other end when a lead needs to leave the dashboard.',
      'Acquisition mappings carry crawled service areas and social links into directory imports. The mapping can also be generated from the command line, with a report of unresolved categories and locations before anything is ingested.',
      'Site generation is evidence-first rather than a one-shot prompt. It carries a real design system and copy mode into the build, reads the generated site back whole, refuses unreadable sources, and can continue or repair a generation that stopped short of its plan.',
      'It runs on my Dokploy VPS with Postgres holding operational data only. Job history, build and deploy records, and acquisition run links live in the database, while git stays the audit trail for content and secrets stay in the deployment environment.',
    ],
    diagram: `  operator
    |
    |  cloudflare access policy -> cloudflared tunnel
    |  the container publishes no ports of its own
    v
+--------------------------------------------------------------------+
| DIRECT FLOCK            next.js + bun · docker on a dokploy vps    |
+--------------------------------------------------------------------+
| /new       /site/[dir]    /acquire     /jobs      /deployments     |
| scaffold   editors+gate   presets      run log    drift check      |
|    |            |            |            |            |           |
|    +------------+-----+------+------------+------------+           |
|                       |                                            |
|                       v                                            |
| job runner · 12 kinds · every step journaled, logs on /data        |
| release-class jobs take a single slot; cancel signals the child    |
+---------------------|----------------------------------------------+
                      | spawns child processes, cwd = a git tree
         +------------+--+-------------+------------------+
         v               v             v                  v
 +--------------+ +------------+ +-----------+ +--------------------+
 | scrape_flock | | flock      | | claude    | | wrangler           |
 | cli          | | template   | | code cli  | | + cf rest api      |
 |              | | scripts    | |           | |                    |
 | explore      | |            | | drafts    | | create pages proj  |
 | plan         | | scaffold   | | guides,   | | deploy the build   |
 | crawl        | | compose    | | landing   | | attach a domain    |
 | ingest       | | validate   | | pages,    | | poll until active  |
 |              | | --launch   | | seo copy  | | fetch / + verify   |
 | overture     | | release    | |           | |                    |
 | + duckdb     | |            | |           | |                    |
 +-------|------+ +------|-----+ +-----|-----+ +----------|---------+
         +-------+-------+-------------+                  |
                 v                                        v
 +---------------------------------+   +-----------------------------+
 | git working trees on /data      |   | cloudflare pages            |
 |                                 |   |                             |
 | a validated directory.json per  |   | one project per site, plain |
 | site, written only through the  |   | static output, no node      |
 | canonical serializer            |   | runtime, its own domain     |
 | commit + push -> github         |   +-----------------------------+
 | = the content audit trail       |                  |
 +---------------------------------+                  | polled from
                                                      | outside
 +---------------------------------+                  v
 | postgres 17 · ops data only     |   +-----------------------------+
 |                                 |   | monitor worker (cf worker)  |
 | job history, build and deploy   |   |                             |
 | records, acquisition run links. |   | every ten minutes; a status |
 | never content, never secrets    |   | change emails, /deployments |
 +---------------------------------+   | reads it for drift checks   |
                                       +-----------------------------+`,
    changelog: [
      { date: '2026-08-31', message: 'added command-line mapping generation and checks for the acquisition handoff' },
      { date: '2026-08-31', message: 'carried crawled service areas and social links into directory mappings' },
      { date: '2026-08-16', message: 'continue and repair site generations that stop short of the plan' },
      { date: '2026-08-14', message: 'ground site generation in evidence, copy modes, and a real design system' },
      { date: '2026-08-14', message: 'add Twenty CRM sync and workflow definitions' },
      { date: '2026-08-13', message: 'show the full production line on one page per site' },
      { date: '2026-08-09', message: 'audit, score, and consolidate prospects before handing them to Wrensmith' },
      { date: '2026-08-06', message: 'curate a site\'s draft listings and publish what stands up' },
      { date: '2026-08-06', message: 'take a site from scaffold to a live custom domain as one job' },
      { date: '2026-08-06', message: 'generate industry presets from the vendored Overture taxonomy' },
      { date: '2026-08-06', message: 'deployments page flags sites serving a stale build' },
    ],
  },
  {
    slug: 'flock-directories',
    name: 'Flock Directories',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-09-01',
    complexity: 4,
    pinned: true,
    pinnedOrder: 3,
    url: 'https://flockdirectories.com',
    banner: '/projects/flock-directories-banner.webp',
    repo: 'https://github.com/ryvrook/flockdirectories',
    image: '/projects/flock-logo.png',
    summary:
      'Template for running many independent local business directories, where one validated data file becomes a static site on its own domain.',
    body: [
      'A network of focused local business directories and the template they all come from. One directory is one schema-validated JSON file holding brand, taxonomy, locations, guides, editorial landing pages, and every business record, so adding a directory means writing data rather than copying page components.',
      'Every site now lives in its own directory on main, so one working tree builds them all and a template fix reaches every site at once. Each directory still builds to plain static files, which means a deployed site needs no Node runtime and no database, and sites are never hosted together and never share a deployment.',
      'The product rules are the interesting part. Verification, claimed, featured, and sponsored stay four distinct states, payment never buys verification or organic ranking, and every listing carries the source behind its record along with the open data license that source requires. Only approved category and location pairs produce public pages, so filter URLs never compete with real ones.',
      'The flock has moved beyond its first Columbus directories. The same template now supports regional directories such as the Virginia meadery list and newer service directories for tree care and septic services, while Direct Flock operates all of them from one dashboard.',
      'The template now treats discovery and page quality as build requirements. It emits complete structured-data graphs, crawlable category and location hubs, and agent-facing discovery artifacts; thin listing pages stay out of the index, and a separate readiness gate catches sites that are not ready for ads or crawlers.',
    ],
    diagram: `  operator / Direct Flock         acquisition export + mapping
           |                                  |
           +----------------+-----------------+
                            v
+------------------------------------------------------------------+
| FLOCK DIRECTORIES     one shared template, one working tree      |
|                                                                  |
| directories/<id>/directory.json + per-site logos                 |
| brand, taxonomy, locations, guides, pages, sourced listings      |
|                                                                  |
| ingest as drafts -> review -> publish                            |
| all content writers use the canonical serializer                 |
+------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------+
| validate schema + references + launch requirements               |
| compile the selected brand; stage only that site's logos         |
+------------------------------------------------------------------+
                            |
             +--------------+---------------+
             v                              v
 +------------------------+   +----------------------------+
 | compiled manifest      |   | optional Postgres import   |
 | in-memory store        |   | tenant-scoped build data    |
 +-----------+------------+   +-------------+--------------+
             +--------------+---------------+
                            v
+------------------------------------------------------------------+
| DirectoryStore -> shared Next.js pages -> static export          |
|                                                                  |
| listing pages, approved category/location hubs, guides           |
| structured data, sitemap, robots, discovery artifacts            |
+------------------------------------------------------------------+
                            |
                            v
+------------------------------------------------------------------+
| out/ -> one Cloudflare Pages project per directory               |
| each site has its own deployment and custom domain               |
| public pages need no Node process or database at runtime         |
+------------------------------------------------------------------+

  optional browser forms -> contributions worker -> moderation
  submitted changes are reviewed before a content rebuild`,
    changelog: [
      { date: '2026-09-01', message: 'published 142 reviewed septic service listings' },
      { date: '2026-08-31', message: 'accepted JSON and delimited list fields on import and rejected empty taxonomy mappings' },
      { date: '2026-08-24', message: 'scaffolded the septic services directory from a new industry preset' },
      { date: '2026-08-18', message: 'completed listing enrichment for the tree care directory' },
      { date: '2026-08-16', message: 'deepened listing descriptions from source evidence and gated thin pages' },
      { date: '2026-08-13', message: 'added agent discovery, structured data graphs, and crawlable taxonomy hubs' },
      { date: '2026-08-08', message: 'expanded the meadery directory across Virginia' },
      { date: '2026-08-06', message: 'collapsed every site branch onto main, one tree builds all sites' },
      { date: '2026-08-06', message: 'per-brand compile and per-site logo staging keep builds flat' },
      { date: '2026-08-04', message: 'contributions worker can deliver by email instead of a database' },
      { date: '2026-08-04', message: 'launched the Columbus pet care directory with 112 reviewed listings' },
      { date: '2026-08-04', message: 'published the network landing page' },
      { date: '2026-08-01', message: 'initial directory template with schema validation and static builds' },
    ],
  },
  {
    slug: 'friday-bot',
    name: 'AskFriday Bot',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-08-20',
    complexity: 3,
    pinned: false,
    url: 'https://askfriday.ryvrook.com',
    banner: '/projects/friday-bot-banner.webp',
    repo: 'https://github.com/ryvrook/friday-bot',
    image: '/projects/friday-logo.png',
    summary:
      'Private-server Discord bot with slash commands, mention and reply triggers, bounded channel context, and per-server provider and model settings.',
    body: [
      'The standalone Discord counterpart to the AskFriday Vencord extension. It answers slash commands, mentions, and replies to existing messages, with enough recent channel context to follow the conversation. Public and ephemeral responses are both supported.',
      'Each allowlisted server can choose its own provider and model, while the host keeps control of credentials and defaults. Settings persist across restarts, incompatible model overrides are cleared when providers change, and readable Discord errors replace raw quota and rate-limit failures.',
      'Built with Bun and discord.js, deployed as a locked-down systemd service. It only responds in explicitly allowlisted servers and never operates in direct messages.',
    ],
    changelog: [
      { date: '2026-07-27', message: 'documented systemd deployment and production setup' },
      { date: '2026-07-27', message: 'added provider choices, per-server models, and usage-limit handling' },
      { date: '2026-07-27', message: 'initial Discord bot release' },
    ],
  },
  {
    slug: 'boobies-media',
    name: 'Boobies Media',
    status: 'ACTIVE',
    lang: 'Go',
    updated: '2026-08-20',
    complexity: 4,
    pinned: false,
    url: 'https://boobies.ryvrook.com',
    repo: 'https://github.com/ryvrook/boobies-media',
    image: '/projects/boobies-media-logo.png',
    banner: '/projects/boobies-media-banner.webp',
    summary:
      'Private media library for a small group, with resumable uploads, remote ingestion, folders, tags, share pages, and automatic thumbnails.',
    body: [
      'A private image and video library built for a small group. It accepts files, whole folders, ZIP archives, chunked resumable uploads, and remote links from Discord, Twitter/X, YouTube, TikTok, and Medal, then probes the media, generates thumbnails, and deduplicates it by content.',
      'The library has folders, tags, search, bulk actions, anonymous share pages with Discord-friendly embeds, and user administration. External downloads are handled as background jobs with SSRF protections, and missing media tools degrade only the features that need them.',
      'The server is a single Go application with an embedded TypeScript interface and SQLite storage. It ships as a production container for Dokploy behind a Cloudflare Tunnel, with nightly rotating backups and no publicly exposed application port.',
    ],
    changelog: [
      { date: '2026-08-20', message: 'added folder and ZIP archive uploads' },
      { date: '2026-07-27', message: 'fixed Discord embeds for animated media' },
      { date: '2026-07-26', message: 'added remote-ingestion fallbacks and media tooling checks' },
      { date: '2026-07-23', message: 'initial private media library release' },
    ],
  },
  {
    slug: 'booby-bot',
    name: 'booby-bot',
    status: 'STABLE',
    lang: 'Go',
    updated: '2026-07-29',
    complexity: 3,
    license: 'MIT',
    pinned: false,
    url: 'https://boobies.ryvrook.com',
    repo: 'https://github.com/ryvrook/booby-bot',
    banner: '/projects/boobies-media-banner.webp',
    summary:
      'Discord bot that saves attachments and supported media links into a boobies-media library through reactions, watched channels, commands, and message actions.',
    body: [
      'The Discord client for boobies-media. React to a message, post in a watched channel, use /upload, or choose Save to media from a message menu, and the bot sends each attachment or supported link to the library with the right folder and attribution tags.',
      'A small worker pool handles ingestion while per-user and per-server rate limits control admission. A local SQLite ledger deduplicates Discord attachments by snowflake, preserves channel mappings and watch lists, and resumes unfinished jobs after a restart.',
      'Written in Go and deployed as a static distroless container alongside boobies-media. It never downloads or processes media itself: the server handles extraction, probing, thumbnails, and storage while the bot keeps only the Discord integration and ingestion state.',
    ],
    changelog: [
      { date: '2026-07-29', message: 'accepted typed folder paths in command options' },
      { date: '2026-07-29', message: 'documented usage, administration, and deployment' },
      { date: '2026-07-29', message: 'fixed the container build after a dependency revert' },
    ],
  },
  {
    slug: 'aut-script',
    name: 'AUT Script',
    status: 'STABLE',
    lang: 'Go',
    updated: '2026-07-30',
    complexity: 4,
    pinned: false,
    summary:
      'Linux CLI for recording, running, and scheduling durable browser workflows against a dedicated Chrome profile. One binary, journaled runs, resumable.',
    body: [
      'A command-line application that records browser workflows and runs them as compiled Go programs against a dedicated Chrome or Chromium profile. The recorder produces a reviewable draft rather than something that executes blind, and captured POST requests can be converted into reviewable request workflow drafts the same way.',
      'Runs are durable and auditable. Every step is journaled, outputs are checkpointed, and an interrupted run can be inspected, paused, resumed, or aborted rather than silently restarted. A cross-process browser lease keeps concurrent invocations from fighting over the same profile.',
      'The read-only side does data harvesting: a persistent scheduler keeps harvested values fresh, everything lands in SQLite with diagnostics, and freshness checks tell you when a value has gone stale. Workflow inputs are supported at runtime, including secret inputs that are never persisted.',
    ],
    diagram: `                        +------------------------+
                        | aut · one go binary    |
                        | a linux cli            |
                        +-----------|------------+
            +-----------------------+-----------------------+
            v                       v                       v
 +---------------------+ +---------------------+ +---------------------+
 | record              | | run                 | | harvest             |
 |                     | |                     | |                     |
 | drive the browser   | | each workflow is a  | | the read-only side  |
 | once; the recorder  | | compiled go program | | of the tool         |
 | emits a reviewable  | |                     | |                     |
 | draft, never a      | | inputs supplied at  | | a persistent        |
 | blind replay        | | run time; secret    | | scheduler keeps     |
 |                     | | inputs are never    | | values fresh and    |
 | captured POSTs      | | persisted           | | freshness checks    |
 | become request      | |                     | | flag a stale one    |
 | workflow drafts too | |                     | |                     |
 +----------|----------+ +----------|----------+ +----------|----------+
            +-------+---------------+                       |
                    v                                       |
   +---------------------------------+                      |
   | dedicated chrome / chromium     |                      |
   | profile                         |                      |
   |                                 |                      |
   | a cross-process lease means     |                      |
   | two invocations never fight     |                      |
   | over the same profile           |                      |
   +----------------|----------------+                      |
                    |                                       |
                    v                                       v
+----------------------------------------------------------------------+
| sqlite                                                               |
|                                                                      |
| run journal, one row per step  ->  inspect, pause, resume, or        |
| checkpointed step outputs          abort an interrupted run          |
| harvested values + diagnostics     rather than restart it blind      |
+----------------------------------------------------------------------+`,
    changelog: [
      { date: '2026-07-30', message: 'renamed the project and binary to AUT Script' },
      { date: '2026-07-28', message: 'completed recording and request workflow tooling' },
      { date: '2026-07-27', message: 'harvest scheduling and freshness safeguards' },
    ],
  },
  {
    slug: 'dotfiles',
    name: 'dotfiles',
    status: 'ACTIVE',
    lang: 'Nix',
    updated: '2026-07-26',
    complexity: 3,
    pinned: true,
    pinnedOrder: 4,
    repo: 'https://github.com/ryvrook/dotfiles',
    summary:
      'Flake-based NixOS system configuration plus GNU Stow-managed application dotfiles, with physical-host and disposable QEMU VM targets.',
    body: [
      'My NixOS system configuration and day-to-day application settings. Nix owns packages and the system. GNU Stow keeps application dotfiles as plain symlinked files you can edit without rebuilding the machine.',
      'The flake exposes both the physical host and a disposable QEMU VM, so the complete desktop can be tested from another Linux host before it reaches the real machine. The configuration covers the Niri desktop, shell, editors, terminal tools, gaming utilities, and supporting services.',
    ],
    changelog: [
      { date: '2026-07-26', message: 'added NixOS flake and QEMU VM target' },
      { date: '2026-07-26', message: 'moved the VM to the Niri session and host QEMU' },
      { date: '2026-07-26', message: 'fixed VM cursor integration' },
    ],
  },
  {
    slug: 'nef-list',
    name: 'nef-list',
    status: 'STABLE',
    lang: 'JavaScript',
    updated: '2026-07-17',
    complexity: 2,
    pinned: false,
    url: 'https://nef.ryvrook.com',
    banner: '/projects/nef-list-banner.webp',
    repo: 'https://github.com/ryvrook/nef-list',
    summary:
      'Stupid list for friends. Drop your name, pfp, socials, and a message. No accounts, dark mode only, one plain-JS file on Cloudflare Workers + D1.',
    body: [
      'A list anyone can add themselves to: name, pfp, social handles (Discord, Telegram, Twitter/X, Bluesky, Steam friend code), and a message. No accounts. Posting hands your browser a secret edit token in localStorage, and that token is what lets you edit or delete your own entry later.',
      'Every entry gets a permalink with proper Open Graph and oEmbed tags so it embeds nicely in Discord and Telegram. Social fields take usernames only. Paste a full profile URL and it gets stripped down to the handle. The only rule is no links in name, message, or handles.',
      'One plain-JS file on Cloudflare Workers with D1 storage. No build step. Wrangler bundles it on deploy.',
    ],
    changelog: [
      { date: '2026-07-17', message: 'initial release: entries, edit tokens, embeds' },
    ],
  },
  {
    slug: 'endpoint-game',
    name: 'endpoint-game',
    status: 'EXPERIMENTAL',
    lang: 'GDScript',
    updated: '2026-07-16',
    complexity: 2,
    pinned: false,
    summary: '2D roguelike built in Godot. Early and changing shape weekly.',
    body: [
      'A 2D roguelike in Godot 4. I\'m deep in the item system right now, mapping out an expansion roadmap and getting the plumbing right before the content volume arrives.',
      'I fixed sprite bleed and deepened the signal wall effect. It\'s still early enough that the interesting writeup is ahead of it.',
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
    updated: '2026-08-31',
    complexity: 4,
    pinned: true,
    pinnedOrder: 5,
    url: 'https://vectordns.dev',
    banner: '/projects/enterprise-vectordns-banner.webp',
    image: '/projects/vectordns-logo.png',
    summary:
      'Enterprise DNS monitoring in a single Go binary. REST API, WebSockets, admin panel, org dashboard. No microservices, no JS build step.',
    body: [
      'VectorDNS rebuilt for enterprise use as one Go binary that serves everything. The same process handles the REST API, WebSocket change notifications, the admin panel, and an org-facing dashboard rendered with htmx. No microservices and no JavaScript build step. Accounts can also enter through Corvid ID while the application keeps its own organization and permission boundaries.',
      'Org-scoped access control, webhook integrations, and append-style audit logging all live in the same binary. Ships as a Docker Compose stack with PostgreSQL, Redis, Prometheus, and Grafana. Staging and production modes enforce strict security checks like verify-full Postgres TLS.',
      'The recent work has been the less visible enterprise layer: contracted billing and capacity statements, TOTP and recovery codes, SSO boundaries, retention guarantees, queue recovery, operational digests, external health checks, and acceptance tests around export and disaster recovery.',
      'Monitoring quality still sits underneath all of it. DNS, certificate, and WHOIS scanners now canonicalize what they observe, record how each fact was captured, and refuse to turn scanner noise into a fabricated history change.',
    ],
    diagram: ` browser dashboard      api clients, go sdk,      status pages on
 (htmx) + admin         vdns-cli, ~189 org        customer domains
 panel                  routes                    (txt-verified)
        |                      |                         |
        +----------------------+----+--------------------+
                                    v
+----------------------------------------------------------------------+
| built-in acme listener · cloudflare origin ca + authenticated        |
| origin pulls · X-Forwarded-For honoured only from TRUSTED_PROXIES    |
| host routing: MAIN_HOST is the app, any other host is a status page  |
+-----------------------------------|----------------------------------+
                                    v
+======================================================================+
| ENTERPRISE VECTORDNS      one go binary, no js build step            |
|                           embedded migrations, templates, assets     |
+----------------------------------------------------------------------+
| middleware  csp nonces · session-bound csrf · rbac · per-org rate    |
|             limits · rls guc bind · rfc 7807 problem responses       |
|                                                                      |
| surfaces    rest api · htmx dashboard · admin panel · /docs          |
|             /ws, six org channels · /metrics behind basic auth       |
|                                                                      |
| scheduler   dns cadence by plan 8h/2h/1h/10min · flap auto-          |
|             throttle · cert scan · ct poll · whois + expiry          |
|             sweep · subdomain discovery · health recompute           |
|                                                                      |
| queue       redis streams jobs · 12h analytics rollups · nightly     |
|             prune, retention sweeps, stripe reconciliation           |
+=======|=================================================|============+
        | state                                           | egress
        v                                                 v
 +---------------------------------+ +---------------------------------+
 | postgres 16                     | | dns egress                      |
 |                                 | |                                 |
 | row-level security per org      | | ~24 public resolvers, 6 regions |
 | hmac hash-chained audit log     | | rdap / whois, team cymru asn    |
 | aes-256-gcm on secret columns   | | crt.sh transparency logs        |
 +---------------------------------+ +---------------------------------+
 | redis 7                         | | byo-key enrichment              |
 |                                 | |                                 |
 | rate limits, streams job queue  | | securitytrails, whoisxml, whoxy |
 +---------------------------------+ +---------------------------------+
 | ha profile                      | | fan-out                         |
 |                                 | |                                 |
 | pgbouncer in transaction mode,  | | webhooks, hmac-sha256 signed,   |
 | redis primary + 2 replicas      | | ssrf-guarded · smtp · siem push |
 | + 3 sentinels                   | | · stripe billing events         |
 +---------------------------------+ +---------------------------------+

 /metrics -> prometheus -> grafana
   a per-org proxy rewrites promql to force-inject org_id, so
   one tenant can never read another tenant's series`,
    changelog: [
      { date: '2026-08-31', message: 'hardened DNS, certificate, and WHOIS history against fabricated changes' },
      { date: '2026-08-20', message: 'closed tenant-boundary gaps across admin, billing, jobs, webhooks, and realtime' },
      { date: '2026-08-18', message: 'added Corvid ID sign-in and product-network reporting' },
      { date: '2026-08-12', message: 'shipped enterprise billing, two-factor auth, retention, recovery, and acceptance tests' },
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
    updated: '2026-09-05',
    complexity: 3,
    pinned: true,
    pinnedOrder: 7,
    url: 'https://roadrunnerlog.com',
    banner: '/projects/roadrunner-banner.webp',
    image: '/projects/roadrunner-logo.png',
    summary:
      'Maintenance logbook for every vehicle you own, on web and mobile. Service records, parts, costs, odometer history, file uploads.',
    body: [
      'Tracks maintenance for bicycles, motorcycles, cars, and trucks. Service records, parts used, costs, odometer readings, and file uploads (OBD-II dumps, receipts, photos, manuals). It replaces the "replaced oil at 82,450 mi" note in your phone with structured, searchable history.',
      'Three containers: Postgres 16, an Express API with JWT auth that runs its own migrations on boot, and nginx serving the React SPA. An Expo mobile app talks to the same API. The stack refuses to start without a real JWT secret. There is no insecure default.',
      'Reminders show overdue dates or mileage and export to your calendar. The mobile app now covers the web feature set, including personal parts lists and community guides, with controls for hiding guides and blocking authors. Recent work is focused on iOS release preparation, sign-in, and reliable photo uploads.',
    ],
    changelog: [
      { date: '2026-09-05', message: 'polished mobile parts lists, photo uploads, and request recovery for iOS release preparation' },
      { date: '2026-09-03', message: 'added calendar exports, Apple and Facebook sign-in, and community guide moderation' },
      { date: '2026-09-02', message: 'brought the mobile app to feature parity with web and added a public landing page' },
      { date: '2026-07-13', message: 'overdue reminder labels include date or mileage' },
      { date: '2026-06-26', message: 'reminder list visual pass' },
    ],
  },
  {
    slug: 'treecreeper',
    name: 'treecreeper',
    status: 'EXPERIMENTAL',
    lang: 'TypeScript',
    updated: '2026-08-17',
    complexity: 3,
    pinned: true,
    pinnedOrder: 9,
    summary:
      'Website scanner for SEO readiness and AI-search readiness. Crawls a site, runs a catalog of checks, produces a diffable JSON report.',
    body: [
      'Crawls a site and runs a catalog of checks covering classic SEO readiness and the newer question of AI-search readiness, then produces a diffable JSON report so you can track a site check-over-check.',
      'One Docker image contains a Bun server on a Playwright/Chromium base, serving both the API and SPA, with Postgres alongside it. Migrations run on boot and interrupted scans recover automatically. It runs behind Dokploy with Cloudflare in front. The runbook covers the SSRF guard, egress hardening, and backups.',
      'Recurring scans are managed through the schedules page. Reports distinguish unmeasured categories from low scores, and the image optimizer shows thumbnail previews. The service can also run behind the Corvid gateway in pass-through mode.',
    ],
    diagram: `  a scan is started by hand or by the schedules page
    |
    v
+--------------------------------------------------------------------+
| TREECREEPER      one docker image: a bun server on a               |
|                  playwright / chromium base, api + spa in          |
|                  one process, postgres alongside it                |
+--------------------------------------------------------------------+
| scheduler   recurring scans; an interrupted scan is recovered      |
|             automatically instead of silently restarting           |
|      |                                                             |
|      v                                                             |
| crawler     ssrf guard on every fetch, hardened egress,            |
|             chromium renders the page before checks run            |
|      |                                                             |
|      v                                                             |
| catalog     classic seo readiness · ai-search readiness,           |
|             one catalog of checks run over the crawl               |
|      |                                                             |
|      v                                                             |
| report      one diffable json document per scan, so a site         |
|             can be tracked check over check                        |
+-----|--------------------------------------------------------------+
      |
      v
+------------------------------------+  +------------------------------+
| postgres                           |  | edge                         |
|                                    |  |                              |
| migrations run on boot             |  | cloudflare                   |
| scan state, reports, schedules     |  |    -> dokploy                |
| nightly backups                    |  |    -> the container          |
+------------------------------------+  |                              |
                                        | no exposed app port          |
                                        +------------------------------+`,
    changelog: [
      { date: '2026-08-17', message: 'added pass-through operation behind the Corvid gateway' },
      { date: '2026-07-22', message: 'added image previews and kept unmeasured categories distinct in reports and comparisons' },
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
    pinned: true,
    pinnedOrder: 10,
    url: 'https://qwuickswap.com',
    banner: '/projects/qwuickswap-banner.webp',
    image: '/projects/qwuickswap-logo.png',
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
    url: 'https://qwuick.aidensmith.dev',
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
    updated: '2026-09-06',
    complexity: 1,
    pinned: true,
    pinnedOrder: 1,
    repo: 'https://github.com/ryvrook/ryv-site',
    url: 'https://ryvrook.com',
    summary:
      'This site. Next.js, one column, two data files and a folder of markdown. You\'re looking at it.',
    body: [
      'This site is a fully static Next.js App Router project styled with Tailwind. Identity and projects live in typed data files, blog posts are plain markdown, and everything else renders from those, including the RSS feed and sitemap.',
      'It grew up in my old portfolio repo through a heavier "personal OS" concept before this design replaced it with a single column and fewer ideas. Now it lives in its own repo, which is where the old one felt it deserved to end up.',
    ],
    changelog: [
      { date: '2026-09-06', message: 'refreshed Now, Recent, and project entries from recent development history' },
      { date: '2026-08-07', message: 'added collapsible architecture diagrams to five project pages' },
      { date: '2026-08-06', message: 'published a post on how Direct Flock runs the flock' },
      { date: '2026-07-17', message: 'moved to its own repo, posts are markdown now' },
      { date: '2026-07-17', message: 'terminal redesign, file-based content' },
      { date: '2026-07-03', message: 'personal-os iteration' },
    ],
  },
  {
    slug: 'ternix',
    name: 'ternix',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-08-21',
    complexity: 3,
    pinned: false,
    url: 'https://ternix.org',
    banner: '/projects/ternix-banner.webp',
    image: '/projects/ternix-logo.png',
    summary:
      'Build a NixOS config in the browser from real nixpkgs data, then push it to your repo as a pull request. Btw, this project sucks.',
    body: [
      'A Git-backed web workspace for assembling a NixOS / Home-Manager configuration. Search across nixpkgs packages, NixOS options, and Home-Manager options with popularity-boosted ranking, browse curated collections, and read detail pages built from real metadata pinned to the exact nixpkgs revision.',
      'The builder collects packages and options into a selection, takes a GPU driver and channel choice, and generates plain, valid Nix for configuration.nix, home.nix, or a flake. Signed-in users can push the result to one of their repos as an additive, collision-checked pull request. It never overwrites anything.',
      'All data comes from official sources (the search.nixos.org index, the rendered Home-Manager manual). If a source is down the UI says so rather than showing fake results.',
    ],
    changelog: [
      { date: '2026-08-21', message: 'hardened application security boundaries' },
      { date: '2026-07-02', message: 'preset gallery, HM option browsing, builder UI overhaul' },
      { date: '2026-07-02', message: 'nix generation overhaul: configs work out of the box' },
    ],
  },
  {
    slug: 'wrensmith',
    name: 'wrensmith',
    status: 'ACTIVE',
    lang: 'TypeScript',
    updated: '2026-08-31',
    complexity: 4,
    pinned: false,
    image: '/projects/wrensmith-logo.png',
    summary:
      'Website production engine that turns a versioned business handoff into a grounded client site, then safely carries later drafts into an existing build.',
    body: [
      'Wrensmith takes a versioned handoff containing the business evidence, offer, positioning, and site brief, then creates and tracks the client site through generation and preview. Industry manifests define what each kind of site can accept, and every generated project exposes agent-ready artifacts rather than hiding its structure inside a prompt.',
      'The engine can use multiple model transports per generation, including authenticated CLI transports, while the dashboard records which transport actually ran and what it cost. Production runs as a small set of containerized services backed by Postgres, with idempotent mutation routes and a durable generation queue.',
      'It now handles existing sites as well as new ones. A draft update is applied through a bounded workflow that preserves the site around it, giving the operator a safe revision path instead of asking the model to regenerate everything.',
    ],
    changelog: [
      { date: '2026-08-31', message: 'added safe draft updates for existing sites' },
      { date: '2026-08-21', message: 'added production services, idempotent APIs, and per-generation model transports' },
      { date: '2026-08-21', message: 'registered Wrensmith with the Corvid product network' },
      { date: '2026-08-13', message: 'shipped the handoff-driven site creation, tracking, and preview pipeline' },
      { date: '2026-06-11', message: 'research layer: keyword strategy and positioning' },
      { date: '2026-06-11', message: 'operator workbench: document saves, logo upload, fresh previews' },
    ],
  },
  {
    slug: 'askfriday',
    name: 'AskFriday',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-07-27',
    complexity: 3,
    pinned: false,
    url: 'https://askfriday.ryvrook.dev',
    license: 'Apache-2.0',
    repo: 'https://github.com/ryvrook/AskFriday',
    image: '/projects/friday-logo.png',
    summary:
      'Vencord plugin. Hover a Discord message and an LLM drafts a human-sounding reply into your compose box, using the surrounding conversation as context.',
    body: [
      'A Vencord userplugin. Hover any Discord message, hit Ask Friday, and an LLM drafts a reply using the recent messages around the target (before and after) so the reply actually follows the thread. The draft lands in your compose box to review, edit, and send. Nothing goes out automatically.',
      'Three providers (Anthropic, OpenAI, Google) and two auth modes: bring-your-own API key, or a local CLI mode that reuses your existing subscription through the official CLI login. Tone controls cover style, length, emoji use, and language matching, and regenerate replaces the previous untouched draft instead of stacking a second one.',
      'Desktop and Vesktop only. Requests route through the Electron main process to dodge browser CORS, which web Vencord can\'t do.',
    ],
    changelog: [
      { date: '2026-07-27', message: 'updated the landing page, policies, branding, and Worker observability' },
      { date: '2026-06-28', message: 'style modal replaces re-roll submenu, humanized replies' },
      { date: '2026-06-28', message: 'landing page served via Cloudflare Worker' },
    ],
  },
  {
    slug: 'swallowtail',
    name: 'Swallowtail',
    status: 'STABLE',
    lang: 'Go',
    updated: '2026-08-17',
    complexity: 4,
    pinned: true,
    pinnedOrder: 8,
    url: 'https://swallowtail.app',
    banner: '/projects/swallowtail-banner.webp',
    image: '/projects/swallowtail-logo.svg',
    summary:
      'Multi-tenant redirect-mapping SaaS. Upload an old sitemap, get back a CSV or htaccess of 301s with deterministic wildcard pattern detection.',
    body: [
      'Upload the sitemap of a site being migrated and get back a redirect map: CSV, htaccess, or nginx rules, with deterministic wildcard pattern detection. Built as a multi-tenant SaaS with a Next.js frontend and a Go backend split into API, background worker, and an opt-in SSRF-isolated headless-Chromium renderer for JS-heavy pages.',
      'The tenancy model is Postgres row-level security bound to an org GUC, with an append-only hash-chained audit log. The worker queue uses SELECT FOR UPDATE SKIP LOCKED with claim-epoch fencing and heartbeats that abort themselves strictly inside the requeue deadline.',
      'The match engine runs exact and wildcard matching first, then fuzzy matching on residuals (slug Jaccard plus depth and segment alignment), streaming progress to the review table over SSE. The match engine is merged, review interactions are in progress, and exports are next.',
    ],
    diagram: `  operator uploads the sitemap of the site being migrated
    |
    v
+--------------------------------------------------------------------+
| frontend        next.js · better auth · org switcher               |
+--------------------------------------------------------------------+
    |  eddsa jwt, 5 minute ttl
    v
+--------------------------------------------------------------------+
| api (go)        org-scoped rest · enqueues work · streams sse      |
+-----|---------------------------------------------------|----------+
      |  claim: select for update skip locked,            |
      |  claim-epoch fencing, heartbeats that             |  sse
      |  abort strictly inside the requeue deadline       |  progress
      v                                                   |
+---------------------------------------------+           |
| worker (go)                                 |           |
|                                             |           |
| sitemap discovery                           |           |
|       |  robots, common roots               |           |
|       v                                     |           |
| bfs crawl ---> +----------------------+     |           |
|       |        | renderer, opt-in     |     |           |
|       |        | headless chromium in |     |           |
|       |        | an ssrf-isolated     |     |           |
|       |        | sandbox, for js-     |     |           |
|       |        | heavy pages          |     |           |
|       |        +----------------------+     |           |
|       v                                     |           |
| match engine                                |           |
|   1 exact      old path == new path         |           |
|   2 wildcard   deterministic patterns       |           |
|   3 fuzzy      residuals only: slug         |           |
|                jaccard + depth +            |           |
|                segment alignment            |           |
+------------------|--------------------------+           |
                   |                                      |
                   v                                      v
+----------------------------------+        +--------------------------+
| postgres                         |        | review table             |
|                                  |        |                          |
| row-level security bound to an   |        | rows land as the engine  |
| org guc                          |        | streams them             |
| append-only hash-chained audit   |        +--------------------------+
| job queue tables                 |                     |
+----------------------------------+                     |
                                                         v
                                            exports: csv · htaccess
                                                     · nginx rules`,
    changelog: [
      { date: '2026-08-17', message: 'accepted authenticated Corvid gateway requests on read routes' },
      { date: '2026-06-23', message: 'per-side URL CSV download, admin cap override' },
      { date: '2026-06-20', message: 'optional headless rendering with SSRF-isolated renderer' },
      { date: '2026-06-19', message: 'sitemap autodiscovery, full-site crawler' },
    ],
  },
  {
    slug: 'corvid-platform',
    name: 'Corvid Platform',
    status: 'ACTIVE',
    lang: 'Go',
    updated: '2026-08-31',
    complexity: 4,
    pinned: false,
    summary:
      'Shared API gateway and operator console for the Corvid product network. API keys, consumers, usage metering, jobs, leads, and deployments.',
    body: [
      'A shared platform for the Corvid product APIs. One Go binary handles the authenticated gateway, consumer and API key management, usage metering, and upstream health checks, while a Next.js console provides the operator interface.',
      'Direct Flock runs as a product service behind the gateway. The console brings its sites, acquisitions, leads, jobs, mappings, and deployments into one workspace, alongside the other registered products. Recent work added clearer job outcomes, mapping review, deployment readiness, and existing-site update workflows.',
    ],
    diagram: `  operator browser                         API consumers
         |                                       |
         v                                       |
  Next.js admin console                          |
         | Clerk JWT                             | API key
         v                                       v
+------------------------------------------------------------------+
| CORVID PLATFORM          Go service behind Cloudflare Tunnel     |
|                                                                  |
| /admin/v1/*                  /apis/{product}/*                   |
| products, consumers, keys    authenticated product gateway       |
| jobs, leads, deployments     entitlements, quotas, rate limits   |
|                                                                  |
| background work: usage batches, rollups, retention, health       |
+------------------------------------------------------------------+
         |                                       |
         v                                       v
 +------------------------+   +----------------------------+
 | platform Postgres      |   | registered product APIs    |
 | consumers, keys, plans |   | private upstream services  |
 | usage, audit, registry |   | over corvid-products       |
 +------------------------+   +-------------+--------------+
                                            |
             +------------------------------+
             |                              |
             v                              v
 +------------------------+   +----------------------------+
 | Direct Flock           |   | other product services     |
 | sites, leads, mappings |   | Treecreeper, Starling,      |
 | acquisition + jobs     |   | Lyrebird, VectorDNS, ...   |
 +-----------+------------+   +-------------+--------------+
             |                              |
             v                              v
 +------------------------+   +----------------------------+
 | template working trees |   | product-owned data         |
 | build + deploy tools   |   | APIs and workers keep      |
 | git content history    |   | their domain state         |
 +------------------------+   +----------------------------+

  products report metrics and health back to the platform
  platform and products keep separate database boundaries
  the gateway reaches product data through HTTP, not shared SQL`,
    changelog: [
      { date: '2026-08-31', message: 'expanded operator workflows with job outcomes, mapping review, deployment readiness, and site updates' },
    ],
  },
  {
    slug: 'corviddata',
    name: 'corviddata',
    status: 'STABLE',
    lang: 'TypeScript',
    updated: '2026-08-05',
    complexity: 1,
    pinned: false,
    url: 'https://corviddata.com',
    banner: '/projects/corviddata-banner.webp',
    summary: 'Landing page for Corvid Data LLC.',
    body: [
      'Landing page for Corvid Data LLC. Services, branding, contact. Small on purpose.',
    ],
    changelog: [
      { date: '2026-08-05', message: 'added Flock Directories to the system map' },
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
    pinned: true,
    pinnedOrder: 6,
    url: 'https://therandomizr.com',
    banner: '/projects/randomizr-banner.webp',
    repo: 'https://github.com/ryvrook/Randomizr',
    image: '/projects/randomizr-logo.svg',
    summary:
      'Randomize anything. Any list, any source, twenty-plus methods from roulette wheel to plinko. Descendant of a 2012 original that still lives in og/.',
    body: [
      'Feed in data from any source (typed lists, CSV, Google Sheets, images, Letterboxd and Goodreads RSS, Wikipedia, number ranges) and pick a method: roulette wheel, card draw, slot machine, amidakuji ladder, single-elimination tournament, team splitter, sort race, canvas-physics plinko, and more. Results record to local history and any list can travel as a share link.',
      'The tool also includes The Entropy Press, with short articles on how the randomness works, and Discover, with nine channels pulling random things from public APIs. There is also a documented URL scheme for sharing lists and verdicts.',
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
    image: '/projects/vectordns-logo.png',
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
    url: 'https://vectordns.io',
    banner: '/projects/vectordns-banner.webp',
    image: '/projects/vectordns-logo.png',
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
    image: '/projects/vectordns-logo.png',
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
    image: '/projects/vectordns-logo.png',
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
    image: '/projects/lotus-mail-logo.png',
    summary:
      'Self-hosted web client for Resend. Compose, contacts, broadcasts, a visual template editor, and live delivery events.',
    body: [
      'Turns a Resend API key into a full email workspace. It handles delivery tracking, batch sends to hundreds of recipients, contacts and segments, scheduled broadcasts, and domain management with DNS verification.',
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
    image: '/projects/vectordns-logo.png',
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
