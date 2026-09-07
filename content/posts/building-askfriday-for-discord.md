---
title: Moving AskFriday Into a Discord Bot
date: 2026-07-27
blurb: The reply shortcut worked in my Discord client. I wanted the rest of the server to be able to ask Friday things too.
tags: [discord, ai, typescript, bun]
---

AskFriday started as a sparkle button next to a Discord message. Click it and
a possible reply lands in the compose box. I read it, change whatever needs
changing, and hit send myself.

That's the Vencord extension. It collects the message I'm replying to and some
nearby conversation, then hands the request to Vencord's native process. The
native side makes the provider request, which avoids trying to do it through
Discord's browser-like renderer.

It can use an API key or an already signed-in provider CLI. In CLI mode, Friday
just starts the process and reads its answer. The CLI handles its own login.
Friday doesn't need to go looking for the token.

The problem was that all of this lived in my client. Nobody else in the server
could ask Friday anything. So I made a bot.

## Asking from the channel

The straightforward version is a slash command.

```text
/ask question:Why does DNS propagation take time?
```

You can also mention Friday, or reply to a message like this.

```text
Friday, is this true?
```

For a reply, the bot gets the original message and a limited amount of recent
channel history. Otherwise, “is this true?” isn't much of a question. I want it
to follow what we're talking about without feeding it the entire channel.

It only runs in the servers I've allowed and ignores DMs. There's an optional
user allowlist too. While it's private, the slash commands are registered per
server, which means I don't have to wait for global registration every time
I change one.

## Choosing what answers

I don't want an expensive model answering every small question in a Discord
channel. Each server gets a saved provider and model choice, and its admins
can change both through the command picker.

```text
/friday provider set
/friday model set
```

The options have readable labels, so nobody has to remember a model ID.
The OpenAI default in this version is GPT-5.4 mini. A server can choose a
larger model if it needs one.

The saved settings contain the preferences. API keys and signed-in CLI
sessions stay on the host. An admin choosing another model in Discord doesn't
need access to either.

Provider errors needed some translation as well. A weekly limit, session
limit, or quota failure can arrive as a wall of CLI output. Friday catches
the common cases and gives the channel a shorter explanation of what went
wrong.

## Keeping it running

The bot is TypeScript on Bun, running under systemd on my VPS. An update timer
checks the main branch. It accepts fast-forward changes, installs the locked
dependencies, checks and builds the project, then restarts the service.

A failed check or build leaves the running bot alone. I don't want an update
breaking the copy people are using.

I still use the extension when I want a draft in my own compose box. The bot
is for asking something where everyone in the channel can see the answer.

- [AskFriday](https://askfriday.ryvrook.com)
- [Vencord extension](https://github.com/ryvrook/AskFriday)
- [Discord bot](https://github.com/ryvrook/friday-bot)
