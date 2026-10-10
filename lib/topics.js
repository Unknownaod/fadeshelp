export const TOPICS = [
  {
    slug: "getting-started",
    title: "Getting started",
    icon: "rocket",
    blurb: "Set up your account and your first Fades product.",
  },
  {
    slug: "account-sign-in",
    title: "Account and sign in",
    icon: "key",
    blurb: "Passwords, sign in problems, and your account details.",
  },
  {
    slug: "privacy-security",
    title: "Privacy and security",
    icon: "shield",
    blurb: "Control your data and keep your account safe.",
  },
  {
    slug: "billing",
    title: "Billing and charges",
    icon: "card",
    blurb: "Charges, receipts, and refunds.",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    icon: "wrench",
    blurb: "Fix errors, crashes, and things that won't load.",
  },
  {
    slug: "developers",
    title: "Developers",
    icon: "code",
    blurb: "Build with Fades accounts and understand API errors.",
  },
];

export const getTopic = (slug) => TOPICS.find((t) => t.slug === slug);
