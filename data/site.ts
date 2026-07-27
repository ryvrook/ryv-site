export type RecentEntry = {
  date: string; // YYYY-MM-DD
  text: string;
  href?: string;
  label?: string;
};

export const site = {
  url: 'https://ryvrook.com',
  name: 'Ryv',
  handle: '@ryvrook',
  role: 'software engineer',
  email: 'nothing yet',
  github: 'https://github.com/ryvrook',
  socials: [
    { label: 'github', href: 'https://github.com/ryvrook' },
    { label: 'x', href: 'https://x.com/ryvrook' },
    { label: 'bluesky', href: '#' },
    { label: 'youtube', href: '#' },
    { label: 'discord', href: '#' },
    // { label: 'linkedin', href: '#' },
  ],
  stationId: 'DVX-01',
  avatar: 'https://avatars.githubusercontent.com/u/29802327?v=4' as string | null,
  bio: 'I build software mostly to find out how things work, which means I end up rebuilding a lot of things other people consider solved.',
  now: [
    'Sharpening treecreeper reports, missed AI points and unmeasured categories.',
    'Building a 2D roguelike in Godot.',
    'Hardening enterprise-vectordns monitoring.',
  ],
  recent: [
    {
      date: '2026-07-27',
      text: 'Released Friday Bot, a private-server Discord bot with contextual slash commands, mentions, replies, and per-server model settings.',
      href: '/projects/friday-bot',
      label: 'Friday Bot',
    },
    {
      date: '2026-07-27',
      text: 'Polished the AskFriday landing page and added policies and Worker observability.',
      href: '/projects/askfriday',
      label: 'AskFriday',
    },
    {
      date: '2026-07-26',
      text: 'Published my dotfiles: a flake-based NixOS configuration with Stow-managed app settings and a disposable QEMU target.',
      href: '/projects/dotfiles',
      label: 'dotfiles',
    },
    {
      date: '2026-07-22',
      text: 'Improved treecreeper reports to explain missed AI-readiness points and flag categories the scan could not measure.',
      href: '/projects/treecreeper',
      label: 'treecreeper',
    },
    {
      date: '2026-07-20',
      text: 'Published a guide to oEmbed metadata and added syntax highlighting to code blocks on this site.',
      href: '/projects/this-site',
      label: 'this site',
    },
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
