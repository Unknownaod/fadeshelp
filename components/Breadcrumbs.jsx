import Link from "next/link";
import Icon from "./Icon";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/">Help center</Link>
      {items.map((item, i) => (
        <span key={i} className="crumb">
          <Icon name="chevron" size={13} />
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
