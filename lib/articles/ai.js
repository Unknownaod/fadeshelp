import { p, h, steps, ul, note, warn } from "../blocks.js";

const U = "2026-10-10";

export const aiArticles = [
  {
    slug: "ai-getting-started",
    title: "Get started with Fades AI",
    summary: "Sign in and ask your first question.",
    product: "ai",
    topic: "getting-started",
    updated: U,
    body: [
      p("Fades AI is a conversational workspace. You type what you need and it responds, and you can keep going to refine the result."),
      steps([
        "Open [www.fades.lol](https://www.fades.lol).",
        "Sign in with your Fades account. New here? [Create an account](/articles/create-account).",
        "Type your question or task in the message box.",
        "Read the response, then reply to refine it, for example: make it shorter, or explain step 2.",
      ]),
      h("Good first things to try"),
      ul([
        "Summarize a long piece of text.",
        "Draft an email or message.",
        "Explain a topic in simple terms.",
        "Help debug a piece of code.",
      ]),
      note("Want better results? Read [Write prompts that get better answers](/articles/ai-better-prompts)."),
    ],
  },
  {
    slug: "ai-better-prompts",
    title: "Write prompts that get better answers",
    summary: "Practical ways to ask so Fades AI gives you what you actually want.",
    product: "ai",
    topic: "getting-started",
    updated: U,
    body: [
      p("The clearer your request, the better the answer. A few habits make a big difference."),
      h("Be specific"),
      p("Instead of 'write about dogs', try 'write a friendly 100 word intro for a dog grooming website'."),
      h("Give context"),
      p("Say who it's for and what you'll use it for. 'Explain recursion to a first-year student' gets a different answer than 'explain recursion to a senior engineer'."),
      h("Say what format you want"),
      ul(["A short list, a table, or paragraphs.", "A length: 'in 3 sentences'.", "A tone: friendly, formal, or direct."]),
      h("Iterate"),
      p("You don't have to get it perfect the first time. Reply with changes: 'shorter', 'more formal', 'add an example'."),
      h("Paste the material"),
      p("If you want help with text or code, paste it in rather than describing it."),
    ],
  },
  {
    slug: "ai-wrong-answers",
    title: "Why Fades AI gave a wrong or incomplete answer",
    summary: "AI can be wrong. Here's how to check and improve results.",
    product: "ai",
    topic: "troubleshooting",
    updated: U,
    body: [
      p("AI assistants can make mistakes, state things with confidence that aren't true, or miss recent events. Always double-check anything important."),
      h("What helps"),
      ul([
        "**Verify important facts** (medical, legal, financial, safety) with a trusted source or professional.",
        "**Ask it to show its reasoning** or sources, then check them.",
        "**Add more detail** to your request. Vague questions lead to vague answers.",
        "**Break big tasks into smaller steps.**",
        "**Start a new conversation** if a long thread has gotten confused.",
      ]),
      warn("Don't rely on Fades AI as your only source for decisions that affect your health, money, legal position, or safety."),
    ],
  },
  {
    slug: "ai-sensitive-info",
    title: "Keep sensitive information out of AI chats",
    summary: "What not to type into any AI tool.",
    product: "ai",
    topic: "privacy-security",
    updated: U,
    body: [
      p("As a rule for any AI tool, treat what you type as something you'd be comfortable having stored."),
      h("Avoid sharing"),
      ul([
        "Passwords, recovery codes, or API keys.",
        "Full card or bank account numbers.",
        "Government ID numbers.",
        "Private details about other people.",
      ]),
      p("For how we handle data, see our [Privacy Policy](/legal/privacy), or [ask a privacy question](/articles/data-requests)."),
    ],
  },
  {
    slug: "ai-not-responding",
    title: "Fades AI isn't responding",
    summary: "Fixes for when answers are slow, stuck, or fail to load.",
    product: "ai",
    topic: "troubleshooting",
    updated: U,
    body: [
      steps([
        "Check the [status page](/status) to see if Fades AI is having problems.",
        "Refresh the page and try again.",
        "Check your internet connection and turn off any VPN to test.",
        "[Clear cache and cookies](/articles/clear-cache), then sign in again.",
        "Try a different browser or a private window.",
      ]),
      p("If it's still failing, [contact support](/contact) with the time it happened and any error message you saw."),
    ],
  },
];
