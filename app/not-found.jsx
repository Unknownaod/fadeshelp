import Link from "next/link";
import Icon from "@/components/Icon";
import SearchBox from "@/components/SearchBox";
import { buildIndex } from "@/lib/search";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="hero hero-small">
      <span className="icon-box big">
        <Icon name="search" size={28} />
      </span>
      <h1>We couldn't find that page</h1>
      <p>It may have moved or never existed. Try searching, or head back to the help center.</p>
      <SearchBox index={buildIndex()} />
      <div className="hero-actions">
        <Link href="/" className="btn">Back to help center</Link>
        <Link href="/contact" className="btn btn-ghost">Contact support</Link>
      </div>
    </section>
  );
}
