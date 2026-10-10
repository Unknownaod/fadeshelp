import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { PRODUCTS, getProduct } from "@/lib/products";
import { TOPICS } from "@/lib/topics";
import { articlesByProduct } from "@/lib/articles";
import { LINKS } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} help`, description: p.intro };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const articles = articlesByProduct(product.slug);
  const groups = TOPICS.map((t) => ({
    topic: t,
    items: articles.filter((a) => a.topic === t.slug),
  })).filter((g) => g.items.length > 0);

  const live = product.status === "Available";

  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: product.name }]} />

      <div className="product-hero">
        <span className="icon-box big">
          <Icon name={product.icon} size={30} />
        </span>
        <div className="product-hero-copy">
          <div className="product-hero-title">
            <h1 className="page-title">{product.name}</h1>
            <span className={`tag ${live ? "live" : ""}`}>
              <span className="dot" />
              {product.status}
            </span>
          </div>
          <p>{product.intro}</p>
          <div className="hero-actions left">
            <a href={product.site} className="btn" target="_blank" rel="noopener noreferrer">
              Open {product.name} <Icon name="external" size={15} />
            </a>
            <Link href={`/contact?product=${product.slug}`} className="btn btn-ghost">
              Contact support
            </Link>
          </div>
        </div>
      </div>

      {!live && (
        <div className="callout note wide">
          <Icon name="info" size={18} />
          <div>
            {product.name} is {product.status.toLowerCase()}. Features and guides here may change, and some
            things aren't available yet. Follow the <Link href="/community">community</Link> for updates.
          </div>
        </div>
      )}

      <h2 className="section-title">What it does</h2>
      <div className="grid-3 features">
        {product.features.map((f) => (
          <div key={f.title} className="card feature">
            <span className="icon-box small">
              <Icon name={f.icon} size={19} />
            </span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Help articles</h2>
      {groups.map((g) => (
        <div key={g.topic.slug} className="group">
          <h3 className="group-title">
            <Icon name={g.topic.icon} size={17} /> {g.topic.title}
          </h3>
          <div className="article-list one">
            {g.items.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      ))}

      <div className="cta inline-cta">
        <span className="icon-box big">
          <Icon name="lifebuoy" size={30} />
        </span>
        <div className="cta-copy">
          <h2>Can't find what you need?</h2>
          <p>Ask the community or contact the team about {product.name}.</p>
        </div>
        <div className="cta-actions">
          <Link href={`/contact?product=${product.slug}`} className="btn">
            Contact support
          </Link>
          <a href={LINKS.discord} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            <Icon name="discord" size={17} /> Discord
          </a>
        </div>
      </div>
    </div>
  );
}
