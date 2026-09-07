---
title: What the Browser Learns From a URL
date: 2026-07-23
blurb: How the browser turns a URL into the record used for origins, requests, and everything after the #.
tags: [browsers, url, web, enter-to-pixels]
series: from-enter-to-pixels
seriesOrder: 1
---

Before the browser can load a page, it needs to work out what URL you gave it.

The browser first has to decide whether the text in the address bar is a URL at all. `example.com` probably is. `how does dns work` probably is not. That decision belongs to the address bar and differs between browsers. Chromium calls this part of the browser the omnibox, and it has its own rules for choosing between navigation and search ([Chromium Omnibox](https://chromium.googlesource.com/playground/chromium-org-site/+/refs/heads/main/user-experience/omnibox/index.md)).

This post starts just after that decision. The browser has something it intends to navigate to. Now it needs to turn that string into a form the rest of the browser can use.

A URL does not stay a string for long. The parser turns it into a record containing a scheme, username, password, host, port, path, query, and fragment.

That record determines the origin and request target. It also supplies the host and port used by the networking stack. Everything after the `#` stays with the browser and never becomes part of the HTTP request.

## The URL browsers actually parse

RFC 3986 defines the generic syntax for a URI. It is useful protocol grammar, but browsers need more than a grammar. They need all implementations to make the same decisions when the input is messy.

That is what the [WHATWG URL Standard](https://url.spec.whatwg.org/) is for. It defines a state-machine parser, error handling, relative URL resolution, and a serializer. One of its goals is to make parsing as consistent as HTML parsing, including behavior for the odd URLs that already exist across the web ([WHATWG URL goals](https://url.spec.whatwg.org/#goals)).

Take a URL with a little of everything.

```text
https://user:pass@bücher.example:443/articles/a%20path?q=one%2Ftwo#part-3
```

The parsed record looks roughly like this.

| Component | Parsed value | What happened |
| --- | --- | --- |
| Scheme | `https` | Selects a special URL scheme with a default port of 443 |
| Username | `user` | Stored in the URL record |
| Password | `pass` | Stored in the URL record and preserved by serialization |
| Host | `xn--bcher-kva.example` | The Unicode domain was converted to ASCII |
| Port | `null` | `443` was removed because it is the default for HTTPS |
| Path | `/articles/a%20path` | Stored as path segments |
| Query | `q=one%2Ftwo` | Kept separate from the path |
| Fragment | `part-3` | Kept by the client and excluded from the request target |

Some of this is extraction. Some of it is normalization.

The scheme and ASCII domain are lowercase. The domain goes through IDNA processing. The port is parsed as a number, then set to null when it matches the default for the scheme. That is why the following URL changes when serialized.

```text
HTTPS://EXAMPLE.COM:443/
```

It serializes back to this.

```text
https://example.com/
```

That spelling comes from parsing and serializing the URL. The address bar can make its own choices about how to display it.

## Percent encoding depends on where you are

Percent encoding looks simple until the same character means different things in different parts of a URL.

The standard defines separate encode sets for paths, queries, fragments, user information, and form data. A literal `?` can live inside a query, but it has to be encoded if it is data inside a path. A literal `#` starts the fragment, so data containing one has to be encoded before the parser reaches it ([WHATWG percent-encode sets](https://url.spec.whatwg.org/#percent-encoded-bytes)).

This is why decoding a URL too early can be a real bug.

Take an encoded ampersand in a query value.

```javascript
const query = "q=one%26two"
console.log(new URLSearchParams(query).get("q"))
// one&two
console.log(new URLSearchParams(decodeURIComponent(query)).get("q"))
// one
```

Decoding the whole query first turns `%26` into a separator before
`URLSearchParams` can read it as part of the value. Now `two` is a separate
parameter. The [form parser](https://url.spec.whatwg.org/#concept-urlencoded-parser)
splits on `&` before it percent-decodes the names and values. Doing that work
in the other order changes the result.

I let `URL` separate the components and `URLSearchParams` handle query parameters. Decoding the whole thing up front loses information those parsers need.

## A Unicode host does not stay Unicode

`bücher.example` is readable to a person. It is not the host representation used at the protocol boundary.

For a domain, the URL parser runs the label through the standard's domain-to-ASCII operation. Here is the result.

```text
xn--bcher-kva.example
```

Unicode domain names also create a display problem. Two labels can use different code points while looking almost identical. Parsing cannot decide whether showing one of those labels is safe, so browsers apply separate display policies and may show the ASCII form instead ([Chromium IDN policy](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/idn.md)).

That is a browser UI decision. The parsed host remains the same either way.

## What reaches the server

For a normal HTTP/1.1 request sent directly to the origin, the request target contains the path and optional query. The host is sent separately in the `Host` field ([RFC 9112 §3.2.1](https://www.rfc-editor.org/rfc/rfc9112.html#section-3.2.1)).

The request from the example might begin like this.

```http
GET /articles/a%20path?q=one%2Ftwo HTTP/1.1
Host: xn--bcher-kva.example
```

The fragment is gone. It stays in the browser because fragments are interpreted by the client after retrieval, not by the server ([RFC 3986 §3.5](https://www.rfc-editor.org/rfc/rfc3986.html#section-3.5)).

That is why changing only the fragment can scroll to another element and update history without making another network request. Client-side routers can also read the fragment, but that is application behavior built on the same rule.

The username and password do not appear in the request target either. They do remain in the URL record, and serializing the URL keeps them. Logging `url.href` can therefore leak credentials even if the request line looks harmless.

HTTP/2 and HTTP/3 carry the same basic request information through the `:method`, `:scheme`, `:authority`, and `:path` pseudo-fields.

## Why a regular expression is not enough

This is the example I reach for whenever parsing a URL with a regular expression starts to look reasonable.

Run this in Node.js 20 or a current browser console.

```javascript
const input = "https://user:pass@example.com:443/a?next=https://evil.test/#x"
const naive = /^(https?):\/\/([^/:]+)(?::(\d+))?(\/[^?#]*)?/.exec(input)
const real = new URL(input)

console.log("regex host:", naive?.[2])
console.log("WHATWG host:", real.hostname)
console.log("WHATWG port:", JSON.stringify(real.port))
console.log("WHATWG query:", real.search)
```

It prints the following output.

```text
regex host: user
WHATWG host: example.com
WHATWG port: ""
WHATWG query: ?next=https://evil.test/
```

The expression reads the username as the host. It also has no idea that port 443 should disappear for an HTTPS URL.

More capture groups can patch these two cases. Then IPv6, Unicode domains, escaped characters, relative URLs, opaque paths, or one of the parser's compatibility rules finds the next hole. At some point the regular expression turns into a less accurate URL parser.

`new URL()` is already there.

## Running a few cases

This version keeps each input next to its output, which makes the normalization easier to see.

```javascript
const cases = [
  "HTTPS://EXAMPLE.COM:443/a%20b?q=x%2Fy#client-only",
  "https://bücher.example/",
  "https://alice:secret@example.com/private"
]

for (const input of cases) {
  const u = new URL(input)
  console.log({
    input,
    href: u.href,
    hostname: u.hostname,
    port: u.port,
    pathname: u.pathname,
    search: u.search,
    hash: u.hash,
    username: u.username,
    passwordPresent: u.password.length > 0
  })
}
```

The first URL loses the explicit default port but keeps its encoded path, query, and fragment. The second gets an ASCII hostname. The third keeps its credentials in `href`, which is why the example reports only whether a password exists.

Do not send the full output from that third case to logs, traces, analytics, or error reports without redacting it first.

## The warm path

<span class="path-marker warm">warm path</span>

A second visit still needs a URL record. Having visited the site before does not change how its scheme, host, path, and query are interpreted.

The browser may already have some of the network state it needs. The normalized host can match cached DNS state. The origin and the browser's partitioning keys contribute to whether an existing connection can be reused. A stored HSTS policy can also replace an insecure HTTP URL with HTTPS before an insecure request is sent.

And if only the fragment changed, there may be no network work to reuse at all.

## What I left out

This is only the ordinary HTTP and HTTPS path.

`file:`, `blob:`, non-special schemes, opaque paths, IPv6 details, relative URL resolution, sandboxed origins, and browser anti-spoofing UI all add their own rules. The address bar's choice between search and navigation is also a separate system. It happens before the parsing described here.

For the next part of the page load, the browser has a scheme, a host, a port, and a request target to work with. That gets us far enough to start looking at the connection.
