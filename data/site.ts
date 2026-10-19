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
    'Building Schematic Blueprints, a Hytale mod that lets Adventure mode players build saved prefabs from their own inventory.',
    'Maintaining my twelve Hytale server mods and their wiki at mods.ryvrook.com, with Polyglot next for CurseForge.',
    'Developing DuckRelay, with sticker tag packs, moderation tools, and a mobile companion.',
  ],
  recent: [
    {
      date: '2026-10-19',
      text: 'Published Workbench Chest Link, the eleventh of my Hytale mods on CurseForge, where the suite has 445 downloads.',
      href: '/projects/hytale-mods',
      label: 'Hytale mods',
    },
    {
      date: '2026-10-16',
      text: 'Launched mods.ryvrook.com, a wiki covering every command, permission, and setting across my Hytale mods.',
      href: '/projects/hytale-mods',
      label: 'Hytale mods',
    },
    {
      date: '2026-10-14',
      text: 'Published Feats and Lullaby, my first two Hytale mods on CurseForge.',
      href: '/projects/hytale-mods',
      label: 'Hytale mods',
    },
    {
      date: '2026-10-11',
      text: 'Added free paper tags, sticker tag packs, and moderation tools to DuckRelay.',
      href: '/projects/duckrelay',
      label: 'DuckRelay',
    },
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
  ] as RecentEntry[],
  copyrightYears: '2012-2026',
  contactNote:
    'No email right now. DM on my socials.',
};

export type Site = typeof site;
