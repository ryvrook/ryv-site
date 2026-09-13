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
    'Getting Roadrunner ready for its iOS release, polishing the mobile app, photo uploads, and community moderation.',
    'Connecting the Corvid products through Direct Flock, from business discovery and website audits to reviewed listings and finished sites.',
    'Making Enterprise VectorDNS monitoring history more trustworthy, with cleaner DNS, certificate, and WHOIS change detection.',
  ],
  recent: [
    {
      date: '2026-09-10',
      text: 'Finished the local build of Back2Paper, with 233 reviewed lessons across nine tracks and three printable level books.',
      href: '/projects/back2paper',
      label: 'Back2Paper',
    },
    {
      date: '2026-09-05',
      text: 'Polished Roadrunner on mobile with personal parts lists, iPhone photo uploads, and fixes for stalled requests.',
      href: '/projects/roadrunner',
      label: 'Roadrunner',
    },
    {
      date: '2026-09-03',
      text: 'Added calendar exports for Roadrunner reminders, Apple and Facebook sign-in, and controls for hiding guides and blocking authors.',
      href: '/projects/roadrunner',
      label: 'Roadrunner',
    },
    {
      date: '2026-09-01',
      text: 'Built out the septic services directory from acquisition through curation, publishing 142 reviewed listings.',
      href: '/projects/flock-directories',
      label: 'septic services directory',
    },
    {
      date: '2026-08-31',
      text: 'Joined the Corvid product network into one operator platform with shared workflows, jobs, leads, mappings, and deployment views.',
      href: '/projects/corvid-platform',
      label: 'Corvid product network',
    },
    {
      date: '2026-08-31',
      text: 'Hardened the Enterprise VectorDNS scanners so DNS, certificate, and WHOIS history records real changes instead of noise.',
      href: '/projects/enterprise-vectordns',
      label: 'Enterprise VectorDNS',
    },
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
