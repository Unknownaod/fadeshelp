import { p, h, steps, ul, note, code } from "../blocks.js";

const U = "2026-10-10";

export const soonArticles = [
  {
    slug: "chat-coming-soon",
    title: "What to expect from Fades Chat",
    summary: "Fades Chat is coming soon. Here's where to follow progress.",
    product: "chat",
    topic: "getting-started",
    badge: "Coming soon",
    updated: U,
    body: [
      p("Fades Chat is being built as simple, private messaging for the Fades ecosystem. It isn't available yet, so there are no setup guides yet."),
      h("What we can tell you now"),
      ul([
        "You'll sign in with your existing Fades account.",
        "Help articles for Fades Chat will be added here when it launches.",
      ]),
      h("Follow along"),
      p("Join the [community](/community) for launch news, and keep an eye on the [status page](/status)."),
      note("Already have a Fades account? You're ready. See [Create a Fades account](/articles/create-account)."),
    ],
  },
  {
    slug: "domains-coming-soon",
    title: "What to expect from Fades Domains",
    summary: "Fades Domains is coming soon. Here's where to follow progress.",
    product: "domains",
    topic: "getting-started",
    badge: "Coming soon",
    updated: U,
    body: [
      p("Fades Domains is being built to make domain management simple. It isn't available yet, so there are no setup guides yet."),
      h("While you wait"),
      ul([
        "Read [DNS basics](/articles/dns-basics) to learn how domains work.",
        "[Create a Fades account](/articles/create-account) so you're ready on day one.",
      ]),
      p("Join the [community](/community) for launch news."),
    ],
  },
  {
    slug: "dns-basics",
    title: "DNS basics: what records are and what they do",
    summary: "A plain-language guide to the DNS records you'll meet when managing a domain.",
    product: "domains",
    topic: "getting-started",
    updated: U,
    body: [
      p("DNS is the internet's address book. It turns a name like example.com into the address of a server. You control it with records."),
      h("Common record types"),
      ul([
        "**A**: points a name to an IPv4 address.",
        "**AAAA**: points a name to an IPv6 address.",
        "**CNAME**: makes one name an alias of another name.",
        "**MX**: says which servers receive email for the domain.",
        "**TXT**: holds text, often used to prove ownership or for email security.",
        "**NS**: says which name servers are in charge of the domain.",
      ]),
      h("An example"),
      code("Type   Name   Value\nA      @      203.0.113.10\nCNAME  www    example.com\nMX     @      mail.example.com (priority 10)"),
      h("Changes take time"),
      p("DNS changes can take from a few minutes to 48 hours to spread. This is called propagation. If a change hasn't appeared yet, wait before changing it again."),
      steps(["Add or edit the record.", "Save it.", "Wait, then check with a DNS lookup tool."]),
    ],
  },
];
