---
title: Moving AskFriday Into a Discord Bot
date: 2026-07-27
blurb: AskFriday began as a reply shortcut in Vencord. The bot keeps the same idea, but puts it somewhere the rest of a server can use.
tags: [discord, ai, typescript, bun]
---

AskFriday started with a small interaction. Hover over a Discord message, click a sparkle, and get a possible reply in the compose box.

The reply stayed a draft. Friday could read the nearby conversation and suggest something that fit, but I still had to look it over and press send. It worked as a writing shortcut rather than another chatbot to talk to.

I built that version as a Vencord extension. The client side collects the message being replied to and some recent conversation around it. The native side sends that context to whichever provider I selected.

That split is mostly there because Discord's renderer has the same restrictions as a browser. Vencord's native process can make the API request or hand it to a local provider CLI.

The extension works with regular API keys, but it can also use tools like Claude Code and Codex when they are already signed in locally. Friday never needs to dig through a browser session or handle the OAuth token itself. It just asks the CLI to do the work.

## Moving it out of my client

The extension worked well when I wanted help writing my own reply. The problem was that it only existed inside my Discord client.

If someone else in a server wanted to ask Friday something, they couldn't. So I kept the same context and provider ideas and moved them into a bot that only runs in servers I allowlist.

There are two ways to ask it something:

```text
/ask question:Why does DNS propagation take time?
```

Or reply to an existing message:

```text
Friday, is this true?
```

The second form is the more interesting one. Friday gets the message being replied to along with a limited amount of recent channel history. It can answer based on the conversation that is actually happening instead of treating “is this true?” as a complete question.

The context is bounded on purpose. A bot sitting in a channel does not need an unlimited transcript just to answer one question.

It also ignores direct messages and refuses to run outside the configured servers. I can restrict it to particular Discord users too. Slash commands are registered per server while the bot is private, so changes show up without waiting for global command registration.

## Picking a model per server

I did not want every small question going to the largest model available. Checking a claim in a conversation and working through a difficult technical problem are different jobs.

Friday stores a provider and model choice for each server. Administrators choose from the slash-command picker, with readable labels that give a rough idea of cost and capability. They do not need to find and paste a model ID.

```text
/friday provider set
/friday model set
```

The default matters here. Switching to OpenAI starts with GPT-5.4 mini instead of quietly choosing the largest option.

Only the provider and model preference belong to the Discord server. API keys and CLI sessions stay on the machine running Friday. Changing a model never moves credentials through Discord.

Provider failures needed a little cleanup too. Weekly limits, exhausted sessions, quotas, and rate limits tend to arrive as output written for developers rather than people asking a question in a channel. Friday recognizes the common cases and gives the channel a shorter explanation.

## Keeping it running

The bot is written in TypeScript and runs on Bun. Mine lives behind a small systemd service.

There is also a one-shot update service that checks the main branch. It only accepts fast-forward changes, installs the locked dependencies, runs the checks, builds the project, and restarts the bot after all of that succeeds.

The bot needs more infrastructure than the extension, but the core behavior did not change much. Friday should read enough of the conversation to be useful, use the provider and model I selected, and do nothing until somebody asks.

The extension is still the better interface when I am writing my own message. It can place a draft directly into the composer and leave the final decision with me.

The bot is better when a server needs a shared answer. Both versions use the same basic idea through different Discord interfaces.

- [AskFriday](https://askfriday.ryvrook.com)
- [Vencord extension](https://github.com/ryvrook/AskFriday)
- [Discord bot](https://github.com/ryvrook/friday-bot)
