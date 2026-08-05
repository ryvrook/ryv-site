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
    'Building focused local business directories on the Flock Directories template.',
    'Standing up the Columbus pet care and tree care sites on their own domains.',
    'Moving my daily setup into a flake-based NixOS configuration.',
  ],
  recent: [
    {
      date: '2026-08-04',
      text: 'Launched the Columbus pet care directory with 112 reviewed listings, each one carrying the source behind its record.',
      href: '/projects/flock-directories',
      label: 'Flock Directories',
    },
    {
      date: '2026-08-04',
      text: 'Gave sites a way to receive contribution entries by email instead of running a moderation database.',
      href: '/projects/flock-directories',
      label: 'Flock Directories',
    },
    {
      date: '2026-08-01',
      text: 'Published the Flock Directories template, where one validated data file builds a whole directory site.',
      href: '/projects/flock-directories',
      label: 'Flock Directories',
    },
    {
      date: '2026-07-27',
      text: 'Released Friday Bot, a private-server Discord bot with contextual slash commands, mentions, replies, and per-server model settings.',
      href: '/projects/friday-bot',
      label: 'Friday Bot',
    },
    {
      date: '2026-07-26',
      text: 'Published my dotfiles, a flake-based NixOS configuration with Stow-managed app settings and a disposable QEMU target.',
      href: '/projects/dotfiles',
      label: 'dotfiles',
    },
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
