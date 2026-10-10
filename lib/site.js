export const SITE = {
  name: "Fades Support",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://help.fades.lol",
  logo: "/logo.svg", // swap for "/logo.png" after copying your real logo into /public
  supportEmail: "support@fades.lol",
  securityEmail: "support@fades.lol", // change if you set up security@fades.lol
};

export const LINKS = {
  discord: "https://discord.gg/fades", // replace with your real invite
  browserReleases: "https://github.com/Unknownaod/fadesbrowsers/releases",
  x: "https://x.com/fadeslol", // replace with your real handle
  youtube: "https://youtube.com/@fades", // replace with your real channel
  email: "mailto:support@fades.lol",
  main: "https://fades.lol",
  login: "https://fades.lol/login",
};

export const COMMUNITY = [
  {
    name: "Discord",
    icon: "discord",
    text: "Ask the community and the team. The fastest way to get help.",
    cta: "Join the server",
    url: LINKS.discord,
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
    text: "Live uptime for every Fades product.",
    cta: "View status",
    url: "/status",
  },
];
