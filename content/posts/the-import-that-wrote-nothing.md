---
title: The Import That Wrote Nothing
date: 2026-09-06
blurb: The importer could skip every business and still exit successfully. The mapping was the problem.
tags: [directflock, flock-directories, data, typescript]
---

The Flock Directories importer had a way to finish successfully without adding
anything. Give it a file full of businesses and an empty category or location
mapping, and it would explain why it skipped every row. Then exit normally.

Very thorough about doing nothing.

I wrote about the dashboard around this in
[How Direct Flock Runs the Flock](/blog/how-direct-flock-runs-the-flock).
This part sits between the crawler's export and the directory's draft listings.
The crawler can find a perfectly usable business, but the importer still needs
to know where to put it.

## The example mapping was still an example

The export carries source categories and locality names. The directory uses
its own category and location slugs. A mapping connects the two.

```json
{
  "taxonomy": {
    "categories": { "plumber": "plumbing-repair" },
    "locations": { "Austin": "austin", "Round Rock": "round-rock" }
  }
}
```

Those tables depend on the directory. The reference file leaves them empty
because it can't know what the next site will contain.

The terminal instructions pointed at that file. The dashboard could generate
a filled-in mapping from the industry preset and the export, but there wasn't
a command for doing the same thing outside the dashboard. Following the docs
could leave you with two empty tables and a lot of skipped businesses.

So the importer now checks those tables before it starts reading rows. If a
required category or location field needs a lookup and that table is empty,
it stops and tells you which one to fill in.

A single unknown category still skips that business with a reason. That's
useful when some rows don't belong in the directory. An empty lookup table
needs fixing before any of them have a chance.

## The list was in the wrong format

Service areas and social profiles had another problem. The crawler was
collecting them, but the generated mapping left those columns out because the
importer couldn't read the lists inside them.

A service-area cell, after the CSV parser had read it, could look like this.

```text
["Columbus","Dublin"]
```

The importer expected this.

```text
Columbus|Dublin
```

Split the first one on a pipe and you still have one string, brackets and all.
There aren't two place names to look up.

I added a `json` transform ahead of the existing split.

```json
{
  "column": "service_areas",
  "transforms": ["json", "split:|", "collapse"]
}
```

The JSON step unpacks arrays of simple values. If the text isn't an array it
can parse, it leaves it alone for the split step. The mapping can read either
format, and `collapse` cleans up repeated whitespace afterward.

Each service area still has to match a place declared in the directory.
Unknown areas are dropped and reported. They don't fall back to the anchor
city. Saying a business serves Dublin doesn't tell me it serves Columbus.

Bad social URLs get dropped and reported too. One malformed link shouldn't
keep an otherwise usable business out of the import.

## The command the docs needed

The dashboard already had the mapping generator, so I exposed it through a
script in Direct Flock.

```bash
bun scripts/generate-mapping.ts --directory <id> --run <run-slug>
```

Run it from the Direct Flock checkout. It writes the mapping beside the export
and lists the category matches, unresolved codes, locality mappings, and
service areas it couldn't keep. It also prints the import command with
`--dry-run`. You can inspect what it generated before changing the directory.

The checks now compare the generated mapping with a saved fixture and run the
real importer against temporary directory data. Both list formats have to
produce the expected listings. A bad social URL or unknown service area has
to drop that value, while an unknown required category skips the row.

And an empty required lookup table has to fail before the first row. Checking
the exit code alone was how this looked fine in the first place.

[Direct Flock](/projects/directflock) · [Flock Directories](/projects/flock-directories)
