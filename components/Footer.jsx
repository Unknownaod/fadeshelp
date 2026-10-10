import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { PRODUCTS } from "@/lib/products";
import { TOPICS } from "@/lib/topics";
import { LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div className="foot-about">
          <div className="foot-brand">
            <Logo size={26} />
            <span>Fades Support</span>
          </div>
          <p>Guides, answers, and people for everything in the Fades ecosystem.</p>
          <div className="foot-social">
            <a href={LINKS.discord} aria-label="Discord"><Icon name="discord" size={18} /></a>
            <a href={LINKS.github} aria-label="GitHub"><Icon name="github" size={18} /></a>
            <a href={LINKS.x} aria-label="X"><Icon name="x" size={18} /></a>
            <a href={LINKS.youtube} aria-label="YouTube"><Icon name="youtube" size={18} /></a>
            <a href={LINKS.email} aria-label="Email"><Icon name="mail" size={18} /></a>
          </div>
        </div>

        <div className="foot-col">
          <h4>Products</h4>
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`}>{p.name}</Link>
          ))}
        </div>

        <div className="foot-col">
          <h4>Topics</h4>
          {TOPICS.map((t) => (
            <Link key={t.slug} href={`/topics/${t.slug}`}>{t.title}</Link>
          ))}
        </div>

        <div className="foot-col">
          <h4>Help</h4>
          <Link href="/contact">Contact support</Link>
          <Link href="/community">Community</Link>
          <Link href="/status">Service status</Link>
          <Link href="/search">Search</Link>
          <a href={LINKS.main}>fades.lol</a>
        </div>
      </div>

      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} Fades</span>
        <span className="foot-legal">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
        </span>
      </div>
    </footer>
  );
}
