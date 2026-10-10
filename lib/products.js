// status: "Available" | "In development" | "Coming soon"
export const PRODUCTS = [
  {
    slug: "account",
    name: "Fades Account",
    short: "One account for every Fades product.",
    status: "Available",
    icon: "user",
    site: "https://fades.lol",
    intro:
      "Your Fades account is the single login behind everything in the ecosystem. Sign in once and the same identity follows you across products, and soon to other websites with Sign in with Fades.",
    features: [
      { icon: "key", title: "One login", text: "Use the same email and password across Fades products." },
      { icon: "shield", title: "Account security", text: "Reset your password, change your details, and keep your account protected." },
      { icon: "lock", title: "Sign in with Fades", text: "In development: use your Fades account to sign in to other websites." },
      { icon: "trash", title: "Your data, your call", text: "Request your data or delete your account at any time." },
    ],
  },
  {
    slug: "ai",
    name: "Fades AI",
    short: "Your intelligent AI workspace.",
    status: "Available",
    icon: "spark",
    site: "https://www.fades.lol",
    intro:
      "Fades AI is an AI workspace for writing, thinking, research, and getting things done. Ask questions, draft content, and work through problems in conversation.",
    features: [
      { icon: "chat", title: "Conversational workspace", text: "Ask follow-ups and refine answers in one thread." },
      { icon: "book", title: "Writing and research help", text: "Draft, summarize, brainstorm, and explain." },
      { icon: "code", title: "Code assistance", text: "Get help reading, writing, and debugging code." },
      { icon: "user", title: "Signed in with Fades", text: "Uses your Fades account, no separate signup." },
    ],
  },
  {
    slug: "mail",
    name: "Fades Mail",
    short: "Private email, beautifully simple.",
    status: "Available",
    icon: "mail",
    site: "https://mail.fades.lol",
    intro:
      "Fades Mail is private email built to stay out of your way: a clean inbox, fast search, and a focus on keeping your messages yours.",
    features: [
      { icon: "mail", title: "Clean inbox", text: "Read, reply, and organize without clutter." },
      { icon: "search", title: "Fast search", text: "Find any message by sender, subject, or words inside." },
      { icon: "shield", title: "Privacy first", text: "Built around keeping your mail private." },
      { icon: "user", title: "Signed in with Fades", text: "Uses your Fades account." },
    ],
  },
  {
    slug: "browser",
    name: "Fades Browser",
    short: "A browser built for the Fades ecosystem.",
    status: "In development",
    icon: "browser",
    site: "https://browse.fades.lol",
    intro:
      "Fades Browser is a desktop browser for Windows built for the Fades ecosystem. It signs in with your Fades account, has built-in search, keeps itself up to date, and puts gaming news on your new tab page.",
    features: [
      { icon: "user", title: "Fades account sign-in", text: "Sign in with the same account you use everywhere in Fades." },
      { icon: "search", title: "Built-in search", text: "Search straight from the address bar and new tab page." },
      { icon: "gamepad", title: "Gaming news", text: "Fresh gaming headlines on your new tab page." },
      { icon: "refresh", title: "Automatic updates", text: "New versions download in the background and install on restart." },
      { icon: "download", title: "Windows installer", text: "A standard Windows installer for fast setup." },
    ],
  },
  {
    slug: "chat",
    name: "Fades Chat",
    short: "Simple, private conversations.",
    status: "Coming soon",
    icon: "chat",
    site: "https://chat.fades.lol",
    intro:
      "Fades Chat is on the way: simple, private messaging for the Fades ecosystem. Guides will appear here as soon as it launches.",
    features: [
      { icon: "chat", title: "Simple conversations", text: "Message people without noise." },
      { icon: "lock", title: "Private by design", text: "Built with your privacy in mind." },
      { icon: "user", title: "Your Fades account", text: "No new account to create." },
    ],
  },
  {
    slug: "domains",
    name: "Fades Domains",
    short: "Simple, easy domain management.",
    status: "Coming soon",
    icon: "globe",
    site: "https://domains.fades.lol",
    intro:
      "Fades Domains is on the way: simple domain management for the Fades ecosystem. While you wait, our DNS guide covers the basics.",
    features: [
      { icon: "globe", title: "Simple domain management", text: "Manage your domains in one place." },
      { icon: "code", title: "DNS records", text: "Add and edit records without the jargon." },
      { icon: "user", title: "Your Fades account", text: "One login for domains and everything else." },
    ],
  },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
