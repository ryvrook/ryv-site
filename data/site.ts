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
      date: '2026-07-22',
      text: 'treecreeper reports now call out missed ai points and unmeasured categories',
      href: '/projects/treecreeper',
      label: 'treecreeper',
    },
    {
      date: '2026-07-20',
      text: 'wrote about oembed metadata, code blocks here get highlighting now',
      href: '/projects/this-site',
      label: 'this site',
    },
    {
      date: '2026-07-16',
      text: 'endpoint-game: fixed sprite bleed, programs hit harder',
      href: '/projects/endpoint-game',
      label: 'endpoint-game',
    },
    {
      date: '2026-07-15',
      text: 'enterprise-vectordns: status history, daily expiry sweep',
      href: '/projects/enterprise-vectordns',
      label: 'enterprise-vectordns',
    },
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
