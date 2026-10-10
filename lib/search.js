import { PRODUCTS } from "./products.js";
import { TOPICS } from "./topics.js";
import { ARTICLES } from "./articles/index.js";
import { FAQS } from "./faqs.js";
import { searchItems } from "./searchCore.js";

export function bodyToText(body) {
  return body
    .map((b) => (Array.isArray(b.v) ? b.v.join(" ") : b.v))
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*]/g, "");
}

export function buildIndex({ full = false } = {}) {
  const productName = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
  const topicTitle = Object.fromEntries(TOPICS.map((t) => [t.slug, t.title]));

  const items = [];

  for (const p of PRODUCTS) {
    items.push({
      title: p.name,
      kind: "Product",
      url: `/products/${p.slug}`,
      icon: p.icon,
      text: `${p.short} ${p.intro}`,
    });
  }

  for (const t of TOPICS) {
    items.push({
      title: t.title,
      kind: "Topic",
      url: `/topics/${t.slug}`,
      icon: t.icon,
      text: t.blurb,
    });
  }

  for (const a of ARTICLES) {
    const prod = productName[a.product];
    items.push({
      title: a.title,
      kind: `${prod ? prod.name : "Help"} · ${topicTitle[a.topic] || "Article"}`,
      url: `/articles/${a.slug}`,
      icon: prod ? prod.icon : "book",
      text: full ? `${a.summary} ${bodyToText(a.body)}` : a.summary,
    });
  }

  for (const f of FAQS) {
    items.push({
      title: f.q,
      kind: "FAQ",
      url: f.link,
      icon: "info",
      text: f.a,
    });
  }

  return items;
}

export function search(query, limit = 20) {
  return searchItems(buildIndex({ full: true }), query, limit);
}
