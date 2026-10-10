import { p, h, steps, ul, note, warn } from "../blocks.js";

const U = "2026-10-10";

export const generalArticles = [
  {
    slug: "clear-cache",
    title: "Clear cache and cookies",
    summary: "Fix many loading and sign in problems by clearing stored site data.",
    product: "account",
    topic: "troubleshooting",
    updated: U,
    body: [
      p("Old stored data can cause pages to load wrong or sign in to fail. Clearing it is safe, but you'll be signed out of sites."),
      h("Chrome and Edge"),
      steps([
        "Press `Ctrl + Shift + Delete`.",
        "Set the time range to All time.",
        "Check Cookies and other site data and Cached images and files.",
        "Select Clear data.",
      ]),
      h("Firefox"),
      steps(["Press `Ctrl + Shift + Delete`.", "Choose Everything for the time range.", "Check Cookies and Cache, then select OK."]),
      h("Safari"),
      steps(["Open Safari settings, then Privacy.", "Select Manage Website Data.", "Search for fades.lol, then Remove All."]),
      note("Want to test first? Open a private or incognito window and try there."),
    ],
  },
  {
    slug: "site-wont-load",
    title: "A Fades website won't load",
    summary: "What to check when a Fades page is blank, slow, or shows an error.",
    product: "account",
    topic: "troubleshooting",
    updated: U,
    body: [
      steps([
        "Check the [status page](/status). If the product shows a problem, it's on our side and we're on it.",
        "Refresh the page, then try again in a few minutes.",
        "Check you can open other websites. If not, it's your connection.",
        "Turn off any VPN, proxy, or ad blocker and try again.",
        "[Clear cache and cookies](/articles/clear-cache).",
        "Try a different browser, device, or network (for example, mobile data).",
      ]),
      p("Still broken? [Contact support](/contact) with the page address, what you see, and your browser."),
    ],
  },
  {
    slug: "error-messages",
    title: "Common error messages",
    summary: "What the most common error pages and messages mean.",
    product: "account",
    topic: "troubleshooting",
    updated: U,
    body: [
      ul([
        "**404, page not found:** the address is wrong or the page moved. Check the link or search the [help center](/search).",
        "**401 or 'please sign in':** your session expired. [Sign in again](/articles/sign-in).",
        "**403, forbidden:** your account doesn't have access to that page.",
        "**429, too many requests:** you've tried too many times too fast. Wait a few minutes.",
        "**500, server error:** something broke on our side. Try again shortly.",
        "**502 or 503, service unavailable:** a service is down or restarting. Check the [status page](/status).",
        "**Network error or can't connect:** check your internet connection, VPN, and firewall.",
      ]),
      p("For developers, see [API errors and status codes](/articles/api-errors)."),
    ],
  },
  {
    slug: "write-support-request",
    title: "How to write a great support request",
    summary: "What to include so we can fix your problem faster.",
    product: "account",
    topic: "troubleshooting",
    updated: U,
    body: [
      p("The more we know, the faster we can help. Include as much of this as you can."),
      ul([
        "**Your account email.**",
        "**The product**, and the version if it's Fades Browser.",
        "**What you tried to do** and **what happened instead.**",
        "**The exact error message**, or a screenshot.",
        "**When it happened**, including your time zone.",
        "**Your device**: Windows version, browser, or phone.",
        "**What you already tried.**",
      ]),
      warn("Never send your password, full card number, CVV, or recovery codes."),
      p("Ready? [Contact support](/contact)."),
    ],
  },
];
