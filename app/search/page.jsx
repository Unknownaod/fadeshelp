import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchBox from "@/components/SearchBox";
import { buildIndex, search } from "@/lib/search";
import { TOPICS } from "@/lib/topics";

export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp?.q) ? sp.q[0] : sp?.q;
  const q = String(raw || "").slice(0, 200);
  const results = q.trim() ? search(q, 30) : [];

  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Search" }]} />

      <div className="search-page-head">
        <h1 className="page-title">Search</h1>
        <SearchBox index={buildIndex()} initial={q} autoFocus={!q} />
      </div>

      {q.trim() ? (
        <>
          <p className="muted-line">
            {results.length} {results.length === 1 ? "result" : "results"} for "{q.trim()}"
          </p>

          {results.length > 0 ? (
            <div className="article-list one">
              {results.map((r) => (
                <Link key={`${r.url}-${r.title}`} href={r.url} className="article">
                  <span className="icon-box small">
                    <Icon name={r.icon} size={18} />
                  </span>
                  <span className="article-copy">
                    <span className="article-title">{r.title}</span>
                    <span className="article-summary">{r.kind}</span>
                  </span>
                  <Icon name="arrow" size={15} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No results</h3>
              <p>Try fewer or different words, or browse by topic below. You can also contact support.</p>
              <Link href="/contact" className="btn">Contact support</Link>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="section-title">Browse by topic</h2>
          <div className="grid-3">
            {TOPICS.map((t) => (
              <Link key={t.slug} href={`/topics/${t.slug}`} className="card product">
                <span className="icon-box small">
                  <Icon name={t.icon} size={19} />
                </span>
                <h3 className="mt">{t.title}</h3>
                <p>{t.blurb}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
