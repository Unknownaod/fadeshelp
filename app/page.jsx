import Link from "next/link";
import Icon from "@/components/Icon";
import SearchBox from "@/components/SearchBox";
import ArticleCard from "@/components/ArticleCard";
import { PRODUCTS } from "@/lib/products";
import { TOPICS } from "@/lib/topics";
import { ARTICLES, POPULAR_SLUGS, articlesByTopic, getArticle } from "@/lib/articles";
import { FAQS } from "@/lib/faqs";
import { COMMUNITY, LINKS } from "@/lib/site";
import { buildIndex } from "@/lib/search";
import { getStatus } from "@/lib/status";

export const revalidate = 60;

const QUICK = ["Reset password", "Install browser", "Browser update", "Mail not receiving", "Sign in with Fades"];

export default async function Home() {
  const status = await getStatus();
  const index = buildIndex();
  const popular = POPULAR_SLUGS.map(getArticle).filter(Boolean);

  return (
    <>
      <section className="hero">
        <Link href="/status" className="status-pill">
          <span className={`dot ${status.allOperational ? "ok" : "bad"}`} />
          {status.allOperational ? "All systems operational" : "Some services are having problems"}
        </Link>

        <h1>How can we help?</h1>
        <p>Guides, answers, and people for everything in the Fades ecosystem.</p>

        <SearchBox index={index} quick={QUICK} />
      </section>

      <section className="block" id="products">
        <div className="block-head">
          <div>
            <h2>Get help with a product</h2>
            <p>Pick the product you're using to see its guides and known issues.</p>
          </div>
          <Link href="/products" className="text-link">
            All products <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="grid-3">
          {PRODUCTS.map((p) => (
            <Link href={`/products/${p.slug}`} key={p.slug} className="card product">
              <div className="card-top">
                <span className="icon-box">
                  <Icon name={p.icon} size={22} />
                </span>
                <span className={`tag ${p.status === "Available" ? "live" : ""}`}>
                  <span className="dot" />
                  {p.status}
                </span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <span className="card-foot">
                Open help <Icon name="arrow" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="block" id="topics">
        <div className="block-head">
          <div>
            <h2>Browse by topic</h2>
            <p>Not sure which product it's about? Start here.</p>
          </div>
          <Link href="/topics" className="text-link">
            All topics <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="grid-3">
          {TOPICS.map((t) => (
            <div key={t.slug} className="card topic">
              <span className="icon-box small">
                <Icon name={t.icon} size={19} />
              </span>
              <h3>
                <Link href={`/topics/${t.slug}`}>{t.title}</Link>
              </h3>
              <p>{t.blurb}</p>
              <ul>
                {articlesByTopic(t.slug)
                  .slice(0, 3)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                    </li>
                  ))}
              </ul>
              <Link href={`/topics/${t.slug}`} className="text-link topic-more">
                {articlesByTopic(t.slug).length} articles <Icon name="arrow" size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="block-head">
          <div>
            <h2>Most read articles</h2>
          </div>
          <Link href="/search?q=" className="text-link">
            Search all {ARTICLES.length} articles <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="article-list">
          {popular.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="block" id="community">
        <div className="block-head">
          <div>
            <h2>Talk to us</h2>
            <p>Real people, across every channel.</p>
          </div>
          <Link href="/community" className="text-link">
            Community <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="community">
          <a href={COMMUNITY[0].url} className="card discord" target="_blank" rel="noopener noreferrer">
            <span className="icon-box big">
              <Icon name="discord" size={30} />
            </span>
            <div>
              <h3>Join the Fades Discord</h3>
              <p>
                The fastest way to get an answer. Chat with the team, get setup help, share feedback, and see
                what we're building next.
              </p>
            </div>
            <span className="btn">
              Join the server <Icon name="external" size={15} />
            </span>
          </a>

          <div className="channels">
            {COMMUNITY.slice(1).map((c) => {
              const external = c.url.startsWith("http") || c.url.startsWith("mailto");
              const inner = (
                <>
                  <span className="icon-box small">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.text}</p>
                    <span className="channel-cta">{c.cta}</span>
                  </div>
                </>
              );
              return external ? (
                <a key={c.name} href={c.url} className="card channel" target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <Link key={c.name} href={c.url} className="card channel">
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="block" id="faq">
        <div className="block-head">
          <div>
            <h2>Common questions</h2>
          </div>
        </div>

        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <Icon name="chevron" size={18} />
              </summary>
              <div className="faq-body">
                <p>{f.a}</p>
                <Link href={f.link} className="text-link">
                  Read the full guide <Icon name="arrow" size={14} />
                </Link>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="cta">
        <span className="icon-box big">
          <Icon name="lifebuoy" size={30} />
        </span>
        <div className="cta-copy">
          <h2>Still stuck?</h2>
          <p>Tell us what happened and which product you were using. We'll get back to you.</p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn">
            <Icon name="ticket" size={17} />
            Contact support
          </Link>
          <a href={LINKS.discord} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            <Icon name="discord" size={17} />
            Ask on Discord
          </a>
        </div>
      </section>
    </>
  );
}
