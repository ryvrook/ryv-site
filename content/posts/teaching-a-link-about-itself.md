---
title: Teaching a Link About Itself
date: 2026-07-20
blurb: The small pile of metadata behind a friends-list link that actually looks like something.
tags: [opengraph, oembed, cloudflare, web]
---

A link to a nef-list entry isn't much to look at if all it says is nef-list.

Every entry has its own permalink at `/e/<id>`. What I actually wanted was for
one of those to turn into a proper card when someone drops it in Discord. Name,
message, profile picture, whatever handles they left.

That card is really three separate things. OpenGraph is the main card. The Twitter
Card tag is me asking for the small summary layout instead of the big banner one.
And oEmbed is what gives you that faint grey "provider, by author" line Discord
tucks underneath.

So the share page just stuffs all three into its head:

```html
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc + (handles ? `\n${handles}` : ""))}">
<meta name="twitter:card" content="summary">
<link rel="alternate" type="application/json+oembed"
      href="${esc(origin)}/api/oembed?id=${entry.id}" title="${esc(title)}">
```

oEmbed is the slightly weird one. Discord wants a `provider_name` and an
`author_name` for that byline, but an entry is just somebody's name and a message.
There's no author to hand it. So I use the handles given by the user.

```js
const author = [
  entry.discord ? `dc:${entry.discord}` : null,
  entry.telegram ? `tg:@${entry.telegram}` : null,
  entry.twitter ? `x:@${entry.twitter}` : null,
  entry.bluesky ? `bsky:@${entry.bluesky}` : null,
].filter(Boolean).join(" · ");
```

The main list is plain client-side JavaScript, which is fine for people, but the
share page can't work that way. A preview bot grabs the HTML and leaves. It
doesn't run your JavaScript. So if the tags only show up after the page boots, the
bot sees nothing.

So the Worker reads the entry out of D1 and builds `/e/<id>` as a plain HTML
string, tags already baked into the head. Not pretty, but it's tiny and it hands
the bot something it can actually read.

The catch with building HTML by hand is that a message is user input, and it's
going straight into an attribute in the head. Everything runs through `esc()`
first. Skip it and someone's message just closes the tag and starts writing its
own HTML, which is exactly as fun as it sounds.

And that's about it. The tags are correct. Whether any given app shows them the
way I picture is a different story, because preview bots cache like crazy and
change their minds without telling anyone. Most of my testing was pasting links
into chats and waiting for them to forget what they saw last time.

[nef.ryvrook.com](https://nef.ryvrook.com)
[github.com/ryvrook/nef-list](https://github.com/ryvrook/nef-list)
