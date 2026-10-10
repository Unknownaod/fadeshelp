import { p, h, steps, ul, note, warn } from "../blocks.js";

const U = "2026-10-10";

export const mailArticles = [
  {
    slug: "mail-getting-started",
    title: "Get started with Fades Mail",
    summary: "Sign in and find your way around your inbox.",
    product: "mail",
    topic: "getting-started",
    updated: U,
    body: [
      p("Fades Mail is private email with a clean, simple inbox."),
      steps([
        "Open [mail.fades.lol](https://mail.fades.lol).",
        "Sign in with your Fades account. New here? [Create an account](/articles/create-account).",
        "Your inbox opens. Select a message to read it.",
        "Use Compose to write a new message.",
      ]),
      h("Next steps"),
      ul([
        "[Send, reply, and organize email](/articles/mail-basics)",
        "[Use Fades Mail on your phone](/articles/mail-mobile)",
        "[Spot and report phishing](/articles/phishing)",
      ]),
    ],
  },
  {
    slug: "mail-basics",
    title: "Send, reply, and organize email",
    summary: "The everyday things you do in Fades Mail.",
    product: "mail",
    topic: "getting-started",
    updated: U,
    body: [
      h("Send a message"),
      steps([
        "Select Compose.",
        "Add a recipient, a subject, and your message.",
        "Select Send.",
      ]),
      h("Reply"),
      p("Open a message and choose Reply, or Reply all to answer everyone on it. Check the recipients before you send."),
      h("Find a message"),
      p("Use the search box to search by sender, subject, or words in the message."),
      h("Keep it tidy"),
      ul(["Delete what you don't need.", "Report spam instead of replying to it.", "Unsubscribe from newsletters you don't read."]),
    ],
  },
  {
    slug: "mail-mobile",
    title: "Use Fades Mail on your phone",
    summary: "Open Fades Mail on iPhone or Android and add it to your home screen.",
    product: "mail",
    topic: "getting-started",
    updated: U,
    body: [
      p("Fades Mail works in your phone's browser, and you can add it to your home screen so it opens like an app."),
      h("Open it"),
      steps(["Open your phone's browser.", "Go to [mail.fades.lol](https://mail.fades.lol).", "Sign in with your Fades account."]),
      h("Add it to your home screen"),
      ul([
        "**iPhone (Safari):** tap Share, then Add to Home Screen.",
        "**Android (Chrome):** tap the menu, then Add to Home screen or Install app.",
      ]),
    ],
  },
  {
    slug: "mail-not-receiving",
    title: "I'm not receiving email",
    summary: "Why messages might not arrive and how to fix it.",
    product: "mail",
    topic: "troubleshooting",
    updated: U,
    body: [
      steps([
        "Check your spam or junk folder.",
        "Refresh your inbox and check your internet connection.",
        "Confirm the sender used the right address. A single typo sends mail elsewhere.",
        "Ask the sender to resend and check whether they get a bounce-back error.",
        "Check the [status page](/status).",
      ]),
      p("If it's still missing, [contact support](/contact) with the sender's address and roughly when it was sent."),
    ],
  },
  {
    slug: "mail-wont-send",
    title: "My email won't send or bounced",
    summary: "What a bounce means and how to fix it.",
    product: "mail",
    topic: "troubleshooting",
    updated: U,
    body: [
      p("A bounce is an automatic reply saying a message wasn't delivered. The message usually explains why."),
      h("Common causes"),
      ul([
        "**Address doesn't exist:** check the spelling of the recipient's address.",
        "**Mailbox full:** the recipient needs to free up space.",
        "**Blocked as spam:** avoid ALL CAPS subjects, lots of links, or large attachments.",
        "**Attachment too large:** share a link to the file instead.",
      ]),
      p("If it won't send at all, refresh, check your connection, and see the [status page](/status)."),
    ],
  },
  {
    slug: "phishing",
    title: "Spot and report phishing",
    summary: "How to recognize scam emails and what to do with them.",
    product: "mail",
    topic: "privacy-security",
    updated: U,
    body: [
      p("Phishing emails try to trick you into giving up passwords or money."),
      h("Warning signs"),
      ul([
        "A sense of urgency: 'act now or your account will be closed'.",
        "A sender address that looks almost right but isn't.",
        "Links that go somewhere other than where they say.",
        "Requests for passwords, codes, or payment details.",
        "Unexpected attachments.",
      ]),
      h("What to do"),
      steps([
        "Don't click links or open attachments.",
        "Never reply with personal information.",
        "Report it as spam or phishing and delete it.",
        "If you already clicked and entered a password, [reset it](/articles/reset-password) immediately.",
      ]),
      warn("Fades will never ask for your password by email."),
    ],
  },
];
