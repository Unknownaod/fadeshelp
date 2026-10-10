import { accountArticles } from "./account.js";
import { browserArticles } from "./browser.js";
import { aiArticles } from "./ai.js";
import { mailArticles } from "./mail.js";
import { soonArticles } from "./soon.js";
import { developerArticles } from "./developers.js";
import { generalArticles } from "./general.js";

export const ARTICLES = [
  ...accountArticles,
  ...browserArticles,
  ...aiArticles,
  ...mailArticles,
  ...soonArticles,
  ...developerArticles,
  ...generalArticles,
];

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);
export const articlesByProduct = (slug) => ARTICLES.filter((a) => a.product === slug);
export const articlesByTopic = (slug) => ARTICLES.filter((a) => a.topic === slug);

// Most read, shown on the home page
export const POPULAR_SLUGS = [
  "reset-password",
  "install-browser",
  "browser-wont-update",
  "mail-getting-started",
  "ai-better-prompts",
  "cant-sign-in",
  "oauth-overview",
  "phishing",
];

export function related(article, limit = 4) {
  return ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.product === article.product || a.topic === article.topic)
  )
    .sort((a, b) => {
      const score = (x) => (x.product === article.product ? 2 : 0) + (x.topic === article.topic ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}
