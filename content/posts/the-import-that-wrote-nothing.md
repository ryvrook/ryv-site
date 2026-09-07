---
title: The Import That Wrote Nothing
date: 2026-09-06
blurb: How an unfinished mapping could skip every business in an acquisition export, and the smaller format mismatch that left useful facts behind.
tags: [directflock, flock-directories, data, typescript]
---

An import can read every row, explain why it skipped each one, and exit
successfully without adding a single listing.

That was a path through the Flock Directories importer. The acquisition pipeline
could hand it a file full of businesses, but if the mapping's category and
location tables were empty, none of those businesses had anywhere to go. The
script printed the skips and finished. The directory had nothing new in it.

I wrote about the dashboard around this in
[How Direct Flock Runs the Flock](/blog/how-direct-flock-runs-the-flock).
This is the smaller part between the crawler finding a business and the
template accepting it as a draft listing.

## A mapping nobody finished

The acquisition export and the directory use different names for things. The
export carries source categories and locality names. The directory wants the
category and location slugs declared in its own data file.

The mapping connects them. A small example looks like this:

```json
{
  "taxonomy": {
    "categories": { "plumber": "plumbing-repair" },
    "locations": { "Austin": "austin", "Round Rock": "round-rock" }
  }
}
```

Those tables belong to a particular directory. The reference mapping leaves
them empty because it cannot know which categories or places the next site
will use.

The problem was that the documented terminal path pointed at that reference
file. The dashboard could derive a real mapping from the industry preset and
the export, but the terminal workflow did not have the same command available.
Following the instructions could get you an import with no usable taxonomy.

So I made the importer check the mapping before it gets to the rows. If a
required category or location field reads through an empty table, it now
refuses the mapping and names the table that needs filling in.

An individual source category can still be unresolved. That row gets skipped
with a reason. The empty table is caught earlier, where there is one
configuration problem to explain instead of a file full of rejected businesses.

## Two ways to write a list

There was another mismatch in the same handoff. The crawler had already
collected service areas and social profiles, but the generated mapping left
those columns out because the importer could not unpack their format.

After reading the CSV cell, a service-area value could look like this:

```text
["Columbus","Dublin"]
```

The importer understood delimiter-separated lists:

```text
Columbus|Dublin
```

Splitting the first value on a pipe gives you one string with brackets and
quotes still attached. It never becomes two places to look up.

I added a `json` transform and kept the existing split transform. A mapping can
now ask for both:

```json
{
  "column": "service_areas",
  "transforms": ["json", "split:|", "collapse"]
}
```

The JSON step unpacks array values. Text it cannot parse passes through, so the
split step can handle the other format. The same mapping reads either export.

Getting the list out of the cell is only half of it. Each service area still
has to resolve to a place the directory declares. An unknown area is dropped
with a note. It does not get folded into the directory's anchor city, because
a business saying it serves somewhere else is not evidence that it serves here.

Social links get a similar check. A malformed profile URL is dropped and named
in the report, so one bad link does not make the validator reject the whole
import. The business can stay without that link.

## Making the terminal path work too

Direct Flock now exposes the dashboard's mapping generator as a command:

```bash
bun scripts/generate-mapping.ts --directory <id> --run <run-slug>
```

Run from the Direct Flock checkout, it writes the mapping beside the export and
prints what it decided: category matches, unresolved codes, locality mappings,
and service areas it could not keep. It also prints the import command with
`--dry-run`, so writing the mapping does not immediately change a directory.

I added checks on both sides. The generator is compared against a saved fixture
mapping. The template runs its real importer against temporary data, including
both list formats, a bad social URL, an unknown category, and an empty taxonomy
table.

That last case now fails before a row is processed. The other cases check what
actually reaches the listing. A command finishing successfully was already
easy to test. What I needed to know was whether the businesses and the facts
collected about them made it through.

[Direct Flock](/projects/directflock) · [Flock Directories](/projects/flock-directories)
