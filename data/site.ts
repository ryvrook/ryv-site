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
    'Building Direct Flock, the control plane that runs every Flock Directories site from one dashboard.',
    'Hardening the Flock Directories template after collapsing all the site branches onto main.',
    'Moving my daily setup into a flake-based NixOS configuration.',
  ],
  recent: [
    {
      date: '2026-08-06',
      text: 'Built Direct Flock, a control plane dashboard that scaffolds, releases, and monitors the whole flock of directory sites from one place.',
      href: '/projects/directflock',
      label: 'Direct Flock',
    },
    {
      date: '2026-08-06',
      text: 'Collapsed every Flock Directories site branch onto main, so one working tree now builds and ships every site in the flock.',
      href: '/projects/flock-directories',
      label: 'Flock Directories',
    },
    {
      date: '2026-08-05',
      text: 'Wrote up AUT Script, a Linux CLI that records browser workflows and replays them as durable, journaled runs against a dedicated Chrome profile.',
      href: '/projects/aut-script',
      label: 'AUT Script',
    },
    {
      date: '2026-08-05',
      text: 'Added live-site banners to the project pages on this site, so each write-up links straight to its running deployment.',
      href: '/projects/this-site',
      label: 'this site',
    },
    {
      date: '2026-08-01',
      text: 'Published the Flock Directories template, where one validated data file builds a whole directory site.',
      href: '/projects/flock-directories',
      label: 'Flock Directories',
    },
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
