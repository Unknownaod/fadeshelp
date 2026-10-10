// Run with: npm run validate
// Checks that every article has a valid product/topic and that internal links resolve.
import { ARTICLES } from "../lib/articles/index.js";
import { PRODUCTS } from "../lib/products.js";
import { TOPICS } from "../lib/topics.js";
import { FAQS } from "../lib/faqs.js";

const STATIC = ["/", "/products", "/topics", "/search", "/contact", "/community", "/status", "/legal/privacy", "/legal/terms"];
const slugs = new Set(ARTICLES.map((a) => a.slug));
const products = new Set(PRODUCTS.map((p) => p.slug));
const topics = new Set(TOPICS.map((t) => t.slug));
const errors = [];

if (slugs.size !== ARTICLES.length) errors.push("Duplicate article slugs found.");

function checkLink(href, where) {
  if (!href.startsWith("/")) return;
  const path = href.split("#")[0].split("?")[0];
  if (STATIC.includes(path)) return;
  const [, kind, slug] = path.split("/");
  if (kind === "articles" && slugs.has(slug)) return;
  if (kind === "products" && products.has(slug)) return;
  if (kind === "topics" && topics.has(slug)) return;
  errors.push(`Broken link ${href} in ${where}`);
}

const linkRe = /\]\(([^)]+)\)/g;
for (const a of ARTICLES) {
  if (!products.has(a.product)) errors.push(`${a.slug}: unknown product ${a.product}`);
  if (!topics.has(a.topic)) errors.push(`${a.slug}: unknown topic ${a.topic}`);
  if (!a.title || !a.summary || !a.body?.length) errors.push(`${a.slug}: missing title/summary/body`);
  for (const b of a.body) {
    const texts = Array.isArray(b.v) ? b.v : [b.v];
    for (const t of texts) for (const m of String(t).matchAll(linkRe)) checkLink(m[1], a.slug);
  }
}
for (const f of FAQS) checkLink(f.link, `FAQ "${f.q}"`);

const uncovered = [...products].filter((p) => !ARTICLES.some((a) => a.product === p));
if (uncovered.length) errors.push(`Products with no articles: ${uncovered.join(", ")}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${ARTICLES.length} articles, ${PRODUCTS.length} products, ${TOPICS.length} topics, ${FAQS.length} FAQs.`);
