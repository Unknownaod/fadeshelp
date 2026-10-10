import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleBody from "@/components/ArticleBody";
import FeedbackWidget from "@/components/FeedbackWidget";
import { ARTICLES, getArticle, related } from "@/lib/articles";
import { getProduct } from "@/lib/products";
import { getTopic } from "@/lib/topics";
import { slugify } from "@/lib/slug";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.summary };
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const product = getProduct(article.product);
  const topic = getTopic(article.topic);
  const toc = article.body.filter((b) => b.t === "h");
  const more = related(article, 4);

  const crumbs = [];
  if (product) crumbs.push({ label: product.name, href: `/products/${product.slug}` });
  crumbs.push({ label: article.title });

  return (
    <div className="block page-top">
      <Breadcrumbs items={crumbs} />

      <div className="article-layout">
        <article className="article-main">
          <header className="article-head">
            <div className="article-meta">
              {product && (
                <Link href={`/products/${product.slug}`} className="meta-chip">
                  <Icon name={product.icon} size={14} /> {product.name}
                </Link>
              )}
              {topic && (
                <Link href={`/topics/${topic.slug}`} className="meta-chip">
                  {topic.title}
                </Link>
              )}
              {article.badge && <span className="meta-chip accent">{article.badge}</span>}
            </div>
            <h1>{article.title}</h1>
            <p className="lede">{article.summary}</p>
            <span className="updated">
              <Icon name="clock" size={14} /> Updated {formatDate(article.updated)}
            </span>
          </header>

          <ArticleBody body={article.body} />

          <FeedbackWidget slug={article.slug} />

          <div className="cta inline-cta">
            <span className="icon-box big">
              <Icon name="lifebuoy" size={28} />
            </span>
            <div className="cta-copy">
              <h2>Still need help?</h2>
              <p>Tell us what's happening and we'll take a look.</p>
            </div>
            <div className="cta-actions">
              <Link href={`/contact?product=${article.product}`} className="btn">
                Contact support
              </Link>
            </div>
          </div>
        </article>

        <aside className="article-side">
          {toc.length > 1 && (
            <div className="side-card">
              <h4>On this page</h4>
              <nav>
                {toc.map((t) => (
                  <a key={t.v} href={`#${slugify(t.v)}`}>
                    {t.v}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {more.length > 0 && (
            <div className="side-card">
              <h4>Related articles</h4>
              <nav>
                {more.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`}>
                    {a.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
