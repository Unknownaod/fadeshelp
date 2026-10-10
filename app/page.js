"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   CONFIG — edit these to match your real links
========================================================= */

const LOGO_SRC = "/logo.png";

const LINKS = {
  discord: "https://discord.gg/fades", // replace with your real invite
  github: "https://github.com/Unknownaod",
  x: "https://x.com/fadeslol", // replace with your real handle
  youtube: "https://youtube.com/@fades", // replace with your real channel
  email: "mailto:support@fades.lol",
  status: "https://status.fades.lol",
  ticket: "mailto:support@fades.lol?subject=Support%20request",
  home: "https://fades.lol",
};

const PRODUCTS = [
  {
    slug: "ai",
    name: "Fades AI",
    description: "Your intelligent AI workspace.",
    status: "Available",
    icon: "spark",
    url: "/help/ai",
    site: "https://www.fades.lol",
  },
  {
    slug: "mail",
    name: "Fades Mail",
    description: "Private email, beautifully simple.",
    status: "Available",
    icon: "mail",
    url: "/help/mail",
    site: "https://mail.fades.lol",
  },
  {
    slug: "browser",
    name: "Fades Browser",
    description: "A browser built for the Fades ecosystem.",
    status: "In development",
    icon: "browser",
    url: "/help/browser",
    site: "https://browse.fades.lol",
  },
  {
    slug: "chat",
    name: "Fades Chat",
    description: "Simple, private conversations.",
    status: "Coming soon",
    icon: "chat",
    url: "/help/chat",
    site: "https://chat.fades.lol",
  },
  {
    slug: "domains",
    name: "Fades Domains",
    description: "Simple, easy domain management.",
    status: "Coming soon",
    icon: "globe",
    url: "/help/domains",
    site: "https://domains.fades.lol",
  },
  {
    slug: "account",
    name: "Fades Account",
    description: "One account for every Fades product.",
    status: "Available",
    icon: "user",
    url: "/help/account",
    site: "https://fades.lol",
  },
];

const TOPICS = [
  {
    title: "Getting started",
    icon: "rocket",
    blurb: "Set up your account and your first product.",
    articles: [
      { title: "Create a Fades account", url: "/help/account/create" },
      { title: "Tour of the Fades ecosystem", url: "/help/getting-started/tour" },
      { title: "Install Fades Browser", url: "/help/browser/install" },
    ],
  },
  {
    title: "Account and sign in",
    icon: "key",
    blurb: "Passwords, sessions, and Sign in with Fades.",
    articles: [
      { title: "Reset your password", url: "/help/account/reset-password" },
      { title: "Turn on two-step verification", url: "/help/account/2fa" },
      { title: "Use Sign in with Fades on other sites", url: "/help/account/sign-in-with-fades" },
    ],
  },
  {
    title: "Privacy and security",
    icon: "shield",
    blurb: "Control your data and keep your account safe.",
    articles: [
      { title: "What data Fades stores", url: "/help/privacy/data" },
      { title: "Report a security issue", url: "/help/security/report" },
      { title: "Review where you're signed in", url: "/help/security/sessions" },
    ],
  },
  {
    title: "Billing and plans",
    icon: "card",
    blurb: "Subscriptions, invoices, and refunds.",
    articles: [
      { title: "Change or cancel your plan", url: "/help/billing/plans" },
      { title: "Download an invoice", url: "/help/billing/invoices" },
      { title: "Request a refund", url: "/help/billing/refunds" },
    ],
  },
  {
    title: "Troubleshooting",
    icon: "wrench",
    blurb: "Fix errors, crashes, and things that won't load.",
    articles: [
      { title: "Fades Browser won't update", url: "/help/browser/update" },
      { title: "I'm not receiving email", url: "/help/mail/not-receiving" },
      { title: "Clear cache and cookies", url: "/help/troubleshooting/cache" },
    ],
  },
  {
    title: "Developers",
    icon: "code",
    blurb: "Build with Fades accounts and APIs.",
    articles: [
      { title: "Register an OAuth app", url: "/help/developers/oauth-app" },
      { title: "Add Sign in with Fades to your site", url: "/help/developers/sign-in" },
      { title: "API errors and rate limits", url: "/help/developers/errors" },
    ],
  },
];

const POPULAR = [
  { title: "Reset your password", product: "Account", url: "/help/account/reset-password" },
  { title: "Set up Fades Mail on your phone", product: "Mail", url: "/help/mail/mobile" },
  { title: "Fades Browser won't update", product: "Browser", url: "/help/browser/update" },
  { title: "Use your own domain with Fades Mail", product: "Mail", url: "/help/mail/custom-domain" },
  { title: "Turn on two-step verification", product: "Account", url: "/help/account/2fa" },
  { title: "Get better answers from Fades AI", product: "AI", url: "/help/ai/prompts" },
];

const FAQS = [
  {
    q: "What is a Fades account?",
    a: "One login that works across Fades AI, Fades Mail, Fades Browser, and every other Fades product. You can also use it to sign in to other websites with Sign in with Fades.",
    url: "/help/account",
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Open the sign-in page, choose Forgot password, and enter your email. We'll send a reset link that works for one hour.",
    url: "/help/account/reset-password",
  },
  {
    q: "Which Fades products are available right now?",
    a: "Fades AI and Fades Mail are live. Fades Browser is in development, and Fades Chat and Fades Domains are coming soon. Each product page shows its current status.",
    url: "/help/getting-started/tour",
  },
  {
    q: "How do I report a bug or a security problem?",
    a: "Bugs: post in the support channel on Discord or email support@fades.lol with what you did and what happened. Security issues: email us directly instead of posting publicly so we can fix it first.",
    url: "/help/security/report",
  },
  {
    q: "How fast will I get a reply?",
    a: "Discord is usually quickest. Email and tickets are answered in order, and we reply to most within one to two business days.",
    url: "/help/contact",
  },
  {
    q: "Can I delete my account and data?",
    a: "Yes. Go to Account settings, choose Delete account, and confirm. Your data is removed from every Fades product.",
    url: "/help/privacy/delete",
  },
];

const COMMUNITY = [
  {
    name: "Discord",
    icon: "discord",
    text: "Ask the community and the team. Fastest way to get help.",
    cta: "Join the server",
    url: LINKS.discord,
  },
  {
    name: "GitHub",
    icon: "github",
    text: "Report bugs, request features, and follow releases.",
    cta: "Open GitHub",
    url: LINKS.github,
  },
  {
    name: "X",
    icon: "x",
    text: "Product news and service updates.",
    cta: "Follow us",
    url: LINKS.x,
  },
  {
    name: "YouTube",
    icon: "youtube",
    text: "Walkthroughs and setup guides.",
    cta: "Watch videos",
    url: LINKS.youtube,
  },
  {
    name: "Email",
    icon: "mail",
    text: "For account, billing, and private issues.",
    cta: "support@fades.lol",
    url: LINKS.email,
  },
  {
    name: "Service status",
    icon: "pulse",
    text: "Live uptime and incident history.",
    cta: "View status",
    url: LINKS.status,
  },
];

/* =========================================================
   ICONS — custom line icons, one consistent style
========================================================= */

const ICONS = {
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m12 8 1.6 2.4L16 12l-2.4 1.6L12 16l-1.6-2.4L8 12l2.4-1.6z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 8 8 5.5L20 8" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r=".6" />
      <circle cx="9" cy="6.5" r=".6" />
    </>
  ),
  chat: (
    <>
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.5-4-9s1.4-6.6 4-9z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M4.5 20c.8-3.6 3.7-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 4c3.5 0 6 2.5 6 6-2.2 4-5 6.5-8 8l-4-4c1.5-3 4-5.8 6-10z" />
      <circle cx="14.5" cy="9.5" r="1.4" />
      <path d="M8 14c-2 .5-3.5 2-4 5 3-.5 4.5-2 5-4M6 10l3-1M14 18l-1 3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8M16 7l2.5 2.5M14 9l2 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 2.8 7.6 7 9.5 4.2-1.9 7-5.1 7-9.5V6z" />
      <path d="m9 12 2.3 2.3L15.5 10" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.5 6.5a4 4 0 0 0 4.9 5l-1.3-1.3-2.4.5-.5-2.4L14 6.5z" />
      <path d="M14 7.5 5 16.5a1.8 1.8 0 0 0 2.5 2.5L16.5 10" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.2 5.5l-2.4 13" />
    </>
  ),
  discord: (
    <>
      <path d="M8.2 6.6c1.2-.4 2.5-.6 3.8-.6s2.6.2 3.8.6c1.6 2.3 2.5 5 2.7 8.4-1.2.9-2.4 1.5-3.7 1.9l-.9-1.5c.5-.2 1-.4 1.4-.7-2.3 1-4.8 1-7.2 0 .4.3.9.5 1.4.7l-.9 1.5c-1.3-.4-2.5-1-3.7-1.9.2-3.4 1.1-6.1 2.7-8.4z" />
      <circle cx="9.5" cy="12.2" r="1.1" />
      <circle cx="14.5" cy="12.2" r="1.1" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  x: (
    <>
      <path d="M4.5 4.5h3.8l11.2 15h-3.8z" />
      <path d="m4.8 19.5 6.1-6.7M13.2 11.2l6-6.7" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.3 5 2.7-5 2.7z" />
    </>
  ),
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="m19 5-8 8" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  book: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" />
      <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a2 2 0 0 1 0-4v0a2 2 0 0 0 0-4V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1z" />
      <path d="M14 6v12" strokeDasharray="1.5 2.5" />
    </>
  ),
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function Logo({ size = 38 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Fades"
      style={{ width: size, height: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

/* =========================================================
   SEARCH INDEX
========================================================= */

const INDEX = [
  ...PRODUCTS.map((p) => ({
    title: p.name,
    kind: "Product",
    text: p.description,
    url: p.url,
    icon: p.icon,
  })),
  ...TOPICS.flatMap((t) =>
    t.articles.map((a) => ({
      title: a.title,
      kind: t.title,
      text: t.blurb,
      url: a.url,
      icon: t.icon,
    }))
  ),
  ...FAQS.map((f) => ({
    title: f.q,
    kind: "FAQ",
    text: f.a,
    url: f.url,
    icon: "book",
  })),
];

const QUICK = [
  "Reset password",
  "Two-step verification",
  "Fades Mail setup",
  "Browser update",
  "Sign in with Fades",
];

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function onKey(event) {
      const tag = (event.target && event.target.tagName) || "";
      if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        event.preventDefault();
        inputRef.current && inputRef.current.focus();
      }
      if (event.key === "Escape") {
        setSearch("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const query = search.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    const words = query.split(/\s+/);
    return INDEX.filter((item) => {
      const hay = `${item.title} ${item.kind} ${item.text}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    }).slice(0, 7);
  }, [query]);

  return (
    <main className="support">
      <header className="top">
        <a href="/" className="brand">
          <Logo size={34} />
          <span className="brand-text">
            <strong>Fades</strong>
            <span>Support</span>
          </span>
        </a>

        <nav className="top-nav" aria-label="Main">
          <a href="#products">Products</a>
          <a href="#topics">Help topics</a>
          <a href="#community">Community</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a href={LINKS.ticket} className="btn btn-small">
          Contact support
        </a>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <a href={LINKS.status} className="status-pill">
          <span className="dot ok" />
          All systems operational
        </a>

        <h1>How can we help?</h1>

        <p>
          Guides, answers, and people for everything in the Fades ecosystem.
        </p>

        <div className="search-wrap">
          <div className="search">
            <Icon name="search" size={18} />
            <input
              ref={inputRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help, e.g. reset password"
              aria-label="Search the Fades help center"
              autoComplete="off"
            />
            {search ? (
              <button
                type="button"
                className="clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            ) : (
              <kbd>/</kbd>
            )}
          </div>

          {query && (
            <div className="results" role="listbox">
              {results.length > 0 ? (
                results.map((r) => (
                  <a href={r.url} key={`${r.kind}-${r.title}`} className="result">
                    <span className="result-icon">
                      <Icon name={r.icon} size={17} />
                    </span>
                    <span className="result-copy">
                      <strong>{r.title}</strong>
                      <span>{r.kind}</span>
                    </span>
                    <Icon name="arrow" size={15} />
                  </a>
                ))
              ) : (
                <div className="result-empty">
                  <strong>No matches for "{search.trim()}"</strong>
                  <span>
                    Try fewer words, or{" "}
                    <a href={LINKS.discord}>ask in Discord</a> /{" "}
                    <a href={LINKS.ticket}>email support</a>.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="quick">
          <span>Popular:</span>
          {QUICK.map((q) => (
            <button type="button" key={q} onClick={() => setSearch(q)}>
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- PRODUCTS ---------------- */}
      <section className="block" id="products">
        <div className="block-head">
          <div>
            <h2>Get help with a product</h2>
            <p>Pick the product you're using to see its guides and known issues.</p>
          </div>
        </div>

        <div className="grid-3">
          {PRODUCTS.map((p) => (
            <a href={p.url} key={p.slug} className="card product">
              <div className="card-top">
                <span className="icon-box">
                  <Icon name={p.icon} size={22} />
                </span>
                <span className={`tag ${p.status === "Available" ? "live" : ""}`}>
                  <span className="dot" />
                  {p.status}
                </span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <span className="card-foot">
                Open help center <Icon name="arrow" size={15} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- TOPICS ---------------- */}
      <section className="block" id="topics">
        <div className="block-head">
          <div>
            <h2>Browse by topic</h2>
            <p>Not sure which product it's about? Start here.</p>
          </div>
        </div>

        <div className="grid-3">
          {TOPICS.map((t) => (
            <div key={t.title} className="card topic">
              <span className="icon-box small">
                <Icon name={t.icon} size={19} />
              </span>
              <h3>{t.title}</h3>
              <p>{t.blurb}</p>
              <ul>
                {t.articles.map((a) => (
                  <li key={a.url}>
                    <a href={a.url}>{a.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- POPULAR ---------------- */}
      <section className="block">
        <div className="block-head">
          <div>
            <h2>Most read articles</h2>
          </div>
          <a href="/help" className="text-link">
            All articles <Icon name="arrow" size={15} />
          </a>
        </div>

        <div className="article-list">
          {POPULAR.map((a) => (
            <a href={a.url} key={a.url} className="article">
              <span className="icon-box small">
                <Icon name="book" size={18} />
              </span>
              <span className="article-title">{a.title}</span>
              <span className="article-product">{a.product}</span>
              <Icon name="arrow" size={15} />
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- COMMUNITY ---------------- */}
      <section className="block" id="community">
        <div className="block-head">
          <div>
            <h2>Talk to us</h2>
            <p>Real people, across every channel.</p>
          </div>
        </div>

        <div className="community">
          <a href={COMMUNITY[0].url} className="card discord">
            <span className="icon-box big">
              <Icon name="discord" size={30} />
            </span>
            <div>
              <h3>Join the Fades Discord</h3>
              <p>
                The fastest way to get an answer. Chat with the team, get setup
                help, share feedback, and see what we're building next.
              </p>
            </div>
            <span className="btn">
              Join the server <Icon name="external" size={15} />
            </span>
          </a>

          <div className="channels">
            {COMMUNITY.slice(1).map((c) => (
              <a
                href={c.url}
                key={c.name}
                className="card channel"
                {...(c.url.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="icon-box small">
                  <Icon name={c.icon} size={19} />
                </span>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.text}</p>
                  <span className="channel-cta">{c.cta}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STATUS ---------------- */}
      <section className="block">
        <div className="block-head">
          <div>
            <h2>Service status</h2>
            <p>Is something down? Check here before you troubleshoot.</p>
          </div>
          <a href={LINKS.status} className="text-link">
            Full status page <Icon name="arrow" size={15} />
          </a>
        </div>

        <div className="status-list">
          {PRODUCTS.map((p) => {
            const live = p.status === "Available";
            return (
              <div key={p.slug} className="status-row">
                <span className="status-name">
                  <Icon name={p.icon} size={17} />
                  {p.name}
                </span>
                <span className={`status-state ${live ? "ok" : ""}`}>
                  <span className={`dot ${live ? "ok" : ""}`} />
                  {live ? "Operational" : p.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="block" id="faq">
        <div className="block-head">
          <div>
            <h2>Common questions</h2>
          </div>
        </div>

        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <Icon name="chevron" size={18} />
              </summary>
              <div className="faq-body">
                <p>{f.a}</p>
                <a href={f.url} className="text-link">
                  Read the full guide <Icon name="arrow" size={14} />
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT CTA ---------------- */}
      <section className="cta">
        <span className="icon-box big">
          <Icon name="lifebuoy" size={30} />
        </span>
        <div className="cta-copy">
          <h2>Still stuck?</h2>
          <p>
            Tell us what happened and which product you were using. We'll get
            back to you.
          </p>
        </div>
        <div className="cta-actions">
          <a href={LINKS.ticket} className="btn">
            <Icon name="ticket" size={17} />
            Open a ticket
          </a>
          <a href={LINKS.discord} className="btn btn-ghost">
            <Icon name="discord" size={17} />
            Ask on Discord
          </a>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="foot">
        <div className="foot-brand">
          <Logo size={24} />
          <span>Fades Support</span>
        </div>

        <span>© {new Date().getFullYear()} Fades</span>

        <div className="foot-links">
          <a href={LINKS.discord} aria-label="Discord">
            <Icon name="discord" size={18} />
          </a>
          <a href={LINKS.github} aria-label="GitHub">
            <Icon name="github" size={18} />
          </a>
          <a href={LINKS.x} aria-label="X">
            <Icon name="x" size={18} />
          </a>
          <a href={LINKS.youtube} aria-label="YouTube">
            <Icon name="youtube" size={18} />
          </a>
          <a href={LINKS.home}>
            fades.lol <Icon name="external" size={14} />
          </a>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --background: #0c0c0d;
          --surface: #121214;
          --surface-hover: #171719;
          --line: rgba(255, 255, 255, 0.09);
          --line-hover: rgba(255, 255, 255, 0.17);
          --text: #f1f1f1;
          --muted: #8d8d91;
          --subtle: #5e5e63;
          --accent: #d6a85c;
          --ok: #5fbf8a;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--background);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input {
          font: inherit;
        }

        :focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        .support {
          min-height: 100vh;
          background: radial-gradient(
              circle at 50% 0%,
              rgba(214, 168, 92, 0.07),
              transparent 40%
            ),
            var(--background);
        }

        /* ---------- header ---------- */
        .top {
          width: min(1180px, calc(100% - 40px));
          height: 76px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid var(--line);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-text strong {
          font-size: 15px;
          letter-spacing: -0.02em;
        }

        .brand-text span {
          margin-top: 4px;
          color: var(--muted);
          font-size: 12px;
        }

        .top-nav {
          display: flex;
          gap: 28px;
        }

        .top-nav a {
          color: var(--muted);
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .top-nav a:hover {
          color: var(--text);
        }

        /* ---------- buttons ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 18px;
          border: 1px solid transparent;
          border-radius: 11px;
          background: var(--text);
          color: #0c0c0d;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease, background 0.2s ease;
        }

        .btn:hover {
          opacity: 0.88;
        }

        .btn-small {
          padding: 9px 14px;
          font-size: 12px;
        }

        .btn-ghost {
          background: transparent;
          color: var(--text);
          border-color: var(--line-hover);
        }

        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.05);
          opacity: 1;
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .text-link:hover {
          color: var(--text);
        }

        /* ---------- hero ---------- */
        .hero {
          width: min(820px, calc(100% - 40px));
          margin: 0 auto;
          padding: 92px 0 76px;
          text-align: center;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 13px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
          color: var(--muted);
          font-size: 12px;
          transition: border-color 0.2s ease;
        }

        .status-pill:hover {
          border-color: var(--line-hover);
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        .dot.ok {
          background: var(--ok);
          box-shadow: 0 0 10px rgba(95, 191, 138, 0.55);
        }

        .hero h1 {
          margin: 26px 0 16px;
          font-size: clamp(46px, 8vw, 84px);
          line-height: 0.98;
          letter-spacing: -0.06em;
          font-weight: 700;
        }

        .hero > p {
          max-width: 480px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.7;
        }

        .search-wrap {
          position: relative;
          width: min(620px, 100%);
          margin: 36px auto 0;
          text-align: left;
        }

        .search {
          height: 58px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 17px;
          border: 1px solid var(--line-hover);
          border-radius: 15px;
          background: var(--surface);
          color: var(--subtle);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .search:focus-within {
          border-color: rgba(214, 168, 92, 0.55);
          box-shadow: 0 0 0 4px rgba(214, 168, 92, 0.08);
        }

        .search svg {
          flex-shrink: 0;
        }

        .search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text);
          font-size: 15px;
        }

        .search input::placeholder {
          color: var(--subtle);
        }

        .search input::-webkit-search-cancel-button {
          display: none;
        }

        .search kbd {
          padding: 3px 8px;
          border: 1px solid var(--line);
          border-radius: 6px;
          color: var(--subtle);
          font-size: 12px;
          font-family: inherit;
        }

        .search .clear {
          border: 0;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          font-size: 24px;
          line-height: 1;
        }

        .results {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 20;
          padding: 6px;
          border: 1px solid var(--line-hover);
          border-radius: 15px;
          background: #101012;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        }

        .result {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 10px;
          color: var(--subtle);
          transition: background 0.15s ease, color 0.15s ease;
        }

        .result:hover,
        .result:focus-visible {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }

        .result-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 9px;
          color: var(--muted);
          flex-shrink: 0;
        }

        .result-copy {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .result-copy strong {
          color: var(--text);
          font-size: 14px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .result-copy span {
          color: var(--muted);
          font-size: 12px;
        }

        .result-empty {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 22px 16px;
          text-align: center;
          font-size: 13px;
          color: var(--muted);
        }

        .result-empty strong {
          color: var(--text);
          font-size: 14px;
        }

        .result-empty a {
          color: var(--accent);
        }

        .quick {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
          color: var(--subtle);
          font-size: 12px;
        }

        .quick button {
          padding: 6px 12px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: transparent;
          color: var(--muted);
          font-size: 12px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .quick button:hover {
          color: var(--text);
          border-color: var(--line-hover);
        }

        /* ---------- blocks ---------- */
        .block {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 0 0 84px;
          scroll-margin-top: 20px;
        }

        .block-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .block-head h2 {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.035em;
        }

        .block-head p {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 14px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .card {
          display: flex;
          flex-direction: column;
          padding: 22px;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--surface);
          transition: transform 0.2s ease, border-color 0.2s ease,
            background 0.2s ease;
        }

        a.card:hover {
          transform: translateY(-3px);
          border-color: var(--line-hover);
          background: var(--surface-hover);
        }

        .card h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.025em;
        }

        .card p {
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.65;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.025);
          color: var(--text);
          flex-shrink: 0;
        }

        .icon-box.small {
          width: 40px;
          height: 40px;
          border-radius: 11px;
        }

        .icon-box.big {
          width: 62px;
          height: 62px;
          border-radius: 17px;
        }

        /* product cards */
        .product {
          min-height: 225px;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 26px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--subtle);
          font-size: 12px;
        }

        .tag.live {
          color: var(--ok);
        }

        .card-foot {
          margin-top: auto;
          padding-top: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--muted);
          font-size: 13px;
          font-weight: 500;
        }

        .product:hover .card-foot {
          color: var(--text);
        }

        .card-foot svg {
          transition: transform 0.2s ease;
        }

        .product:hover .card-foot svg {
          transform: translateX(3px);
        }

        /* topic cards */
        .topic .icon-box {
          margin-bottom: 18px;
        }

        .topic ul {
          list-style: none;
          margin: 18px 0 0;
          padding: 16px 0 0;
          border-top: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .topic li a {
          color: var(--muted);
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .topic li a:hover {
          color: var(--accent);
        }

        /* articles */
        .article-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .article {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px 14px 14px;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: var(--surface);
          color: var(--subtle);
          transition: border-color 0.2s ease, background 0.2s ease,
            color 0.2s ease;
        }

        .article:hover {
          border-color: var(--line-hover);
          background: var(--surface-hover);
          color: var(--text);
        }

        .article-title {
          flex: 1;
          min-width: 0;
          color: var(--text);
          font-size: 14px;
          font-weight: 500;
        }

        .article-product {
          color: var(--muted);
          font-size: 12px;
        }

        /* community */
        .community {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 12px;
        }

        .discord {
          justify-content: space-between;
          gap: 28px;
          padding: 30px;
          border-color: rgba(214, 168, 92, 0.28);
          background: radial-gradient(
              circle at 90% 0%,
              rgba(214, 168, 92, 0.14),
              transparent 55%
            ),
            var(--surface);
        }

        a.discord:hover {
          border-color: rgba(214, 168, 92, 0.5);
          background: radial-gradient(
              circle at 90% 0%,
              rgba(214, 168, 92, 0.18),
              transparent 55%
            ),
            var(--surface-hover);
        }

        .discord .icon-box {
          border-color: rgba(214, 168, 92, 0.3);
          color: var(--accent);
        }

        .discord h3 {
          font-size: 24px;
          letter-spacing: -0.035em;
        }

        .discord p {
          font-size: 14px;
          max-width: 380px;
        }

        .discord .btn {
          align-self: flex-start;
        }

        .channels {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .channel {
          flex-direction: row;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
        }

        .channel h3 {
          font-size: 15px;
        }

        .channel p {
          margin-top: 4px;
          font-size: 12px;
          line-height: 1.55;
        }

        .channel-cta {
          display: inline-block;
          margin-top: 10px;
          color: var(--muted);
          font-size: 12px;
          font-weight: 500;
        }

        .channel:hover .channel-cta {
          color: var(--accent);
        }

        /* status */
        .status-list {
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
        }

        .status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 22px;
          border-bottom: 1px solid var(--line);
          font-size: 14px;
        }

        .status-row:last-child {
          border-bottom: 0;
        }

        .status-name {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text);
        }

        .status-name svg {
          color: var(--muted);
        }

        .status-state {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--subtle);
          font-size: 13px;
        }

        .status-state.ok {
          color: var(--ok);
        }

        /* faq */
        .faq {
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
        }

        .faq details {
          border-bottom: 1px solid var(--line);
        }

        .faq details:last-child {
          border-bottom: 0;
        }

        .faq summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 22px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          list-style: none;
          transition: background 0.2s ease;
        }

        .faq summary::-webkit-details-marker {
          display: none;
        }

        .faq summary:hover {
          background: rgba(255, 255, 255, 0.025);
        }

        .faq summary svg {
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .faq details[open] summary svg {
          transform: rotate(180deg);
        }

        .faq-body {
          padding: 0 22px 22px;
          max-width: 720px;
        }

        .faq-body p {
          margin: 0 0 14px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }

        /* cta */
        .cta {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto 84px;
          padding: 36px;
          display: flex;
          align-items: center;
          gap: 28px;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: radial-gradient(
              circle at 100% 100%,
              rgba(214, 168, 92, 0.1),
              transparent 50%
            ),
            var(--surface);
        }

        .cta-copy {
          flex: 1;
        }

        .cta h2 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .cta p {
          margin: 8px 0 0;
          max-width: 460px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* footer */
        .foot {
          width: min(1180px, calc(100% - 40px));
          min-height: 84px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid var(--line);
          color: var(--subtle);
          font-size: 12px;
        }

        .foot-brand {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .foot-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .foot-links a {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--muted);
          transition: color 0.2s ease;
        }

        .foot-links a:hover {
          color: var(--text);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 960px) {
          .grid-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .community {
            grid-template-columns: 1fr;
          }

          .top-nav {
            display: none;
          }
        }

        @media (max-width: 680px) {
          .top {
            height: 68px;
          }

          .hero {
            padding: 64px 0 56px;
          }

          .hero > p {
            font-size: 14px;
          }

          .grid-3,
          .article-list,
          .channels {
            grid-template-columns: 1fr;
          }

          .block-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .block {
            padding-bottom: 64px;
          }

          .cta {
            flex-direction: column;
            align-items: flex-start;
            padding: 26px;
          }

          .foot {
            flex-wrap: wrap;
            padding: 22px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
