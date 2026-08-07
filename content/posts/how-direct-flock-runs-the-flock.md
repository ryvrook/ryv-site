---
title: How Direct Flock Runs the Flock
date: 2026-08-06
blurb: The control plane behind the directory network, and why it shells out instead of importing anything.
tags: [directflock, flock-directories, cloudflare, infrastructure]
---

The Flock Directories network is a set of independent static sites. Each one is
a single validated JSON file inside the template repo, and each one gets its own
Cloudflare Pages project and its own domain. That design is great for the sites
and terrible for the operator, because every task used to mean another terminal
session in the right tree with the right environment.

Direct Flock is the fix. It is a Next.js dashboard running on my VPS that acts
as the control plane over two repos. The template repo builds the sites. The
acquisition repo crawls the real world and hands over business records. The
dashboard's job is to drive both and then watch what came out the other end.

```
                 Direct Flock (dashboard on the VPS)
                   jobs, logs, Postgres ops data
                                |
                shells out to each repo's own tooling
                                |
        +-----------------------+-----------------------+
        |                                               |
        v                                               v
  scrape_flock                                  flockdirectories
  the acquisition pipeline                      the site template
  crawl -> immutable run -> handoff             one JSON file per site
        |                                               |
        |         ingest turns a handoff into           |
        +--------> draft listings, curation ----------->|
                   decides what publishes               |
                                                        v
                                          validate -> build -> release
                                          (static files, no runtime)
                                                        |
                                                        v
                                             Cloudflare Pages projects
                                             one per site, own domain
                                                        |
                                                        v
                                        deployments page compares what
                                        production serves against the
                                        latest build-affecting commit
```

The rule that shapes everything is that files stay canonical. A site's content
lives in its `directory.json`, written only through the template's own
serializer and checked by the template's own validators. The dashboard never
becomes a second writable source of truth. When it needs something done, it
runs the target repo's scripts as child processes in that repo's tree, so the
version of the validator that ships with the template is always the one that
judges the data.

That choice sounds boring and pays off constantly. Git stays the audit trail
for every content change. The dashboard's Postgres holds operational data only,
meaning job history, build and deploy records, and links back to acquisition
runs. If the dashboard vanished tomorrow, every site would still build from its
repo exactly as it did before.

As a service, Direct Flock is a job runner with opinions. A new site is one
job that walks from an industry preset through acquisition, draft ingest,
curation, release, and Pages provisioning until a custom domain is live.
The deployments page closes the loop by doing a git ancestor check per site,
so a site serving a build older than the latest relevant commit gets flagged
as behind instead of silently drifting. That exact failure happened once, when
a security fix on main never reached the live sites, and it is the reason the
check exists.
