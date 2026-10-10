import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/topics", label: "Topics" },
  { href: "/community", label: "Community" },
  { href: "/status", label: "Status" },
];

export default function Header() {
  return (
    <header className="top">
      <Link href="/" className="brand">
        <Logo size={34} />
        <span className="brand-text">
          <strong>Fades</strong>
          <span>Support</span>
        </span>
      </Link>

      <nav className="top-nav" aria-label="Main">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>

      <div className="top-actions">
        <Link href="/search" className="icon-btn" aria-label="Search">
          <Icon name="search" size={18} />
        </Link>
        <Link href="/contact" className="btn btn-small">
          Contact support
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Menu">
            <Icon name="menu" size={20} />
          </summary>
          <div className="mobile-panel">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            <Link href="/contact">Contact support</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
