import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { CATEGORIES, CONTACT_PRODUCTS } from "@/lib/contact";
import { LINKS, SITE } from "@/lib/site";

export const metadata = {
  title: "Contact support",
  description: "Send a message to the Fades support team.",
};

export default async function ContactPage({ searchParams }) {
  const sp = await searchParams;
  const pick = (v) => (Array.isArray(v) ? v[0] : v);
  const product = CONTACT_PRODUCTS.some((p) => p.value === pick(sp?.product)) ? pick(sp.product) : "other";
  const category = CATEGORIES.some((c) => c.value === pick(sp?.category)) ? pick(sp.category) : "question";

  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Contact support" }]} />

      <div className="block-head">
        <div>
          <h1 className="page-title">Contact support</h1>
          <p>Tell us what's going on and we'll get back to you by email.</p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="card form-card">
          <ContactForm defaultProduct={product} defaultCategory={category} />
        </div>

        <aside className="contact-side">
          <div className="side-card">
            <h4>Faster ways to get help</h4>
            <a className="side-row" href={LINKS.discord} target="_blank" rel="noopener noreferrer">
              <Icon name="discord" size={18} />
              <span>
                <strong>Discord</strong>
                <small>Usually the quickest reply</small>
              </span>
            </a>
            <Link className="side-row" href="/search">
              <Icon name="search" size={18} />
              <span>
                <strong>Search the help center</strong>
                <small>Most questions already have an answer</small>
              </span>
            </Link>
            <Link className="side-row" href="/status">
              <Icon name="pulse" size={18} />
              <span>
                <strong>Check service status</strong>
                <small>See if something is down</small>
              </span>
            </Link>
          </div>

          <div className="side-card">
            <h4>Prefer email?</h4>
            <a className="side-row" href={`mailto:${SITE.supportEmail}`}>
              <Icon name="mail" size={18} />
              <span>
                <strong>{SITE.supportEmail}</strong>
                <small>We reply to most within 1 to 2 business days</small>
              </span>
            </a>
          </div>

          <div className="side-card">
            <h4>Include for a faster fix</h4>
            <p className="side-text">
              The product and version, what you tried, the exact error message, and when it happened.{" "}
              <Link href="/articles/write-support-request">See the full checklist</Link>.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
