# help.fades.lol

The Fades help and support center. Next.js (App Router), no database, no UI libraries.

## Run it

```bash
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run dev                    # http://localhost:3000
npm run validate               # checks every article and internal link
npm run build && npm start     # production
```

Your logo: copy it to `public/logo.png`, then set `logo: "/logo.png"` in `lib/site.js`
(a placeholder `public/logo.svg` ships so nothing is broken).

## What's included

| Route | What it is |
| --- | --- |
| `/` | Home: search, products, topics, popular articles, community, FAQ, live status pill |
| `/products` and `/products/[slug]` | A page per product: AI, Mail, Browser, Account, Chat, Domains |
| `/topics` and `/topics/[slug]` | Getting started, Account, Privacy and security, Billing, Troubleshooting, Developers |
| `/articles/[slug]` | 49 articles with table of contents, related articles, and "was this helpful?" |
| `/search` | Full-text search over everything (also a live dropdown on every search box) |
| `/contact` | Support form (needs delivery set up, see below) |
| `/community` | Discord, GitHub, X, YouTube, email, plus guidelines |
| `/status` | Live status: pings each live product's site every minute |
| `/legal/privacy`, `/legal/terms` | Starting drafts, replace before launch |
| `/sitemap.xml`, `/robots.txt` | Generated |

## Set up message delivery (required for /contact)

The contact form and article feedback are sent by `lib/notify.js`. Set at least one in `.env.local`:

- **Discord:** create a webhook in your support channel, put the URL in `DISCORD_WEBHOOK_URL`.
- **Email:** create a [Resend](https://resend.com) key and set `RESEND_API_KEY`, `SUPPORT_FROM_EMAIL`
  (a verified sender) and `SUPPORT_TO_EMAIL`.

In production, if neither is set the form returns an error instead of silently dropping messages.

## Edit content

Everything lives in `lib/`:

- `lib/products.js`: products, statuses, feature lists. Change a status and the whole site updates.
- `lib/topics.js`: the topic categories.
- `lib/articles/*.js`: articles, grouped by product. Add one by copying an existing entry.
- `lib/faqs.js`: home page FAQ.
- `lib/site.js`: **links (Discord, X, YouTube...), support email, logo.**

Article bodies use small helpers from `lib/blocks.js`: `p`, `h`, `steps`, `ul`, `note`, `warn`, `code`.
Inside text you can use `` `code` ``, `**bold**`, and `[label](/articles/some-slug)`.
Run `npm run validate` after editing. It fails on broken internal links or unknown products/topics.

## Deploy

Works on Vercel as is: import the repo, add the env vars, then point `help.fades.lol` at it
(CNAME `help` to the target Vercel gives you). Set `NEXT_PUBLIC_SITE_URL=https://help.fades.lol`.

## Before launch: review these

The articles were written from what is known about each product, so check them against reality:

1. **Fades AI, Mail, Chat, Domains articles** describe the products in general terms. Confirm features
   and flows, and add specifics (limits, settings screens, screenshots).
2. **Account articles** assume email + password sign in, a Forgot password link, account settings, and
   Delete account. Adjust to match your real flows.
3. **Billing articles** are deliberately generic. Update them if you have paid plans.
4. **Sign in with Fades articles** are marked Preview. The endpoints and scopes are illustrative.
   Update them to match the real OAuth implementation.
5. **Placeholders:** Discord invite, X and YouTube links, support response times
   ("1 to 2 business days"), and `/legal/*` text.
6. **Fades Browser articles** assume Windows 10/11 and installers from GitHub releases.
