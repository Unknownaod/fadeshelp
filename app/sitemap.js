import { SITE } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";
import { PRODUCTS } from "@/lib/products";
import { TOPICS } from "@/lib/topics";

export default function sitemap() {
  const now = new Date();
  const staticPaths = ["", "/products", "/topics", "/search", "/contact", "/community", "/status", "/legal/privacy", "/legal/terms"];

  return [
    ...staticPaths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now })),
    ...PRODUCTS.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, lastModified: now })),
    ...TOPICS.map((t) => ({ url: `${SITE.url}/topics/${t.slug}`, lastModified: now })),
    ...ARTICLES.map((a) => ({ url: `${SITE.url}/articles/${a.slug}`, lastModified: new Date(a.updated) })),
  ];
}
