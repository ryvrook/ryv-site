---
title: How Direct Flock Runs the Flock
date: 2026-08-06
blurb: The dashboard that runs my directories by calling the tools each repo already has.
tags: [directflock, flock-directories, cloudflare, infrastructure]
---

Every Flock directory has its own Cloudflare Pages project and domain. Its
content lives in one validated JSON file in the template repo. I like that
setup for the sites. Running all of them meant opening another terminal in
the right checkout with the right environment every time I wanted to do
anything.

Direct Flock puts those jobs in a Next.js dashboard on my VPS. It works with
two repos: `scrape_flock`, which finds and crawls businesses, and
`flockdirectories`, which turns their records into directory sites. The
dashboard starts the work, keeps the logs, and checks what actually deployed.

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

The dashboard doesn't keep its own copy of a site's content. It edits the
site's `directory.json` through the template's serializer and runs the
validators that belong to that checkout.

That means starting child processes. When Direct Flock needs to build or
import something, it calls the repo's script from that repo's working tree.
I don't have to copy the validation rules into the dashboard and remember to
update both versions.

Git records the content changes. Postgres holds the job history, build and
deploy records, and links to acquisition runs. If I stop the dashboard, the
sites still have everything they need to build from their repos.

Creating a site is one job in the dashboard, though there's a fair amount
inside it. It starts with an industry preset, acquires businesses, imports
drafts, curates them, builds the site, and provisions Pages and the custom
domain. Each step has a log to look at when something fails.

The deployments page handles a problem I already managed to have once: a
security fix landed on main without reaching the live sites. It checks whether
the deployed commit contains the latest change that affects that site's build.
If it doesn't, the site is marked behind. Having the fix in git is useful, but
I'd also quite like it to be on the website.
