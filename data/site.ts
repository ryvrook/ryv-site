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
    'Building Eternal Love for my brother, with a storefront and owner dashboard for his hand-forged metal roses.',
    'Developing DuckRelay, with rubber-duck passports, shared journeys, and a mobile companion.',
    'Improving Enterprise VectorDNS monitoring, analytics, and operational reporting.',
  ],
  recent: [
    {
      date: '2026-10-07',
      text: 'Hardened checkout, uploads, and public endpoints for Eternal Love, the metal-rose shop I built for my brother.',
      href: '/projects/eternal-love',
      label: 'Eternal Love',
    },
    {
      date: '2026-10-05',
      text: 'Updated Ternix after rebuilding config generation around a Nix parser and tightening imports.',
      href: '/projects/ternix',
      label: 'Ternix',
    },
    {
      date: '2026-09-30',
      text: 'Made Enterprise VectorDNS show the latest observed certificate state, including broken scans.',
      href: '/projects/enterprise-vectordns',
      label: 'Enterprise VectorDNS',
    },
    {
      date: '2026-09-29',
      text: 'Added tag-free duck registration and passkeys to DuckRelay, and prepared the iOS app for review.',
      href: '/projects/duckrelay',
      label: 'DuckRelay',
    },
    {
      date: '2026-09-15',
      text: 'Added profile pictures and phone layouts to Back2Paper after deploying the site and rebuilding its printable books.',
      href: '/projects/back2paper',
      label: 'Back2Paper',
    },
    {
      date: '2026-09-14',
      text: 'Added App Store and Android download links to Roadrunner after building its store screenshot pipeline.',
      href: '/projects/roadrunner',
      label: 'Roadrunner',
    },
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
