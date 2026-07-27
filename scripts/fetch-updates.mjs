// Fetches recent GitHub activity and prints ready-to-paste content updates:
// RECENT candidates for data/site.ts, changelog lines and updated dates for
// data/projects.ts. Prints only, never writes. Run: bun run updates
import { execFileSync } from 'node:child_process';

// Slug -> repo. Keep in sync with data/projects.ts.
const repos = {
  'friday-bot': 'ryvrook/friday-bot',
  dotfiles: 'ryvrook/dotfiles',
  'endpoint-game': 'ryvrook/endpoint-game',
  'enterprise-vectordns': 'ryvrook/enterprise-vectordns',
  roadrunner: 'ryvrook/roadrunner',
  treecreeper: 'ryvrook/treecreeper',
  qwuickswap: 'ryvrook/qwuickswap',
  'qwuick-bot': 'ryvrook/qwuick-bot',
  'this-site': 'ryvrook/ryv-site',
  ternix: 'ryvrook/ternix',
  wrensmith: 'ryvrook/wrensmith',
  askfriday: 'ryvrook/AskFriday',
  swallowtail: 'ryvrook/Swallowtail',
  corviddata: 'ryvrook/corviddata',
  randomizr: 'ryvrook/Randomizr',
  agenttailor: 'ryvrook/agenttailor',
  'vdns-tui': 'Vector-DNS/vdns-tui',
  vectordns: 'ryvrook/VectorDNS',
  'vectordns-server': 'ryvrook/vectordns-server',
  'vdns-cli': 'Vector-DNS/vdns-cli',
  'lotus-mail': 'ryvrook/lotus-mail',
  'vectordns-admin': 'ryvrook/vectordns-admin',
  webhaptics: 'ryvrook/WebHapticsTest',
};

const COMMITS_PER_REPO = 5;

// Falls back to the old account name until the GitHub rename lands.
function ghJson(path) {
  const attempt = (p) => {
    try {
      return JSON.parse(execFileSync('gh', ['api', p], { encoding: 'utf8' }));
    } catch {
      return null;
    }
  };
  return attempt(path) ?? attempt(path.replace('ryvrook/', 'DevVoxel/'));
}

const results = [];
for (const [slug, repo] of Object.entries(repos)) {
  const commits = ghJson(`repos/${repo}/commits?per_page=${COMMITS_PER_REPO}`);
  if (!commits) {
    console.error(`skip ${slug}: no data for ${repo}`);
    continue;
  }
  const entries = commits
    .filter((c) => c.parents?.length < 2) // drop merge commits
    .map((c) => ({
      date: c.commit.author.date.slice(0, 10),
      message: c.commit.message.split('\n')[0],
    }));
  if (entries.length) results.push({ slug, entries });
}

results.sort((a, b) => b.entries[0].date.localeCompare(a.entries[0].date));

console.log('\n== changelog candidates (data/projects.ts) ==');
console.log('newest first per project. Reword into terse changelog lines.\n');
for (const { slug, entries } of results) {
  console.log(`${slug}  (updated: '${entries[0].date}')`);
  for (const e of entries) {
    console.log(`  { date: '${e.date}', message: '${e.message.replaceAll("'", "\\'")}' },`);
  }
  console.log('');
}

console.log('== RECENT candidates (data/site.ts) ==');
console.log('three most recently touched projects. Rewrite text in your own voice.\n');
for (const { slug, entries } of results.slice(0, 3)) {
  const e = entries[0];
  console.log(`  {
    date: '${e.date}',
    text: '${slug}: ${e.message.replaceAll("'", "\\'")}',
    href: '/projects/${slug}',
    label: '${slug}',
  },`);
}
