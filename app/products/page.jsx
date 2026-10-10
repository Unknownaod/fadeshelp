import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PRODUCTS } from "@/lib/products";
import { articlesByProduct } from "@/lib/articles";

export const metadata = {
  title: "Products",
  description: "Help for every Fades product: Fades AI, Fades Mail, Fades Browser, Fades Account, Fades Chat, and Fades Domains.",
};

export default function ProductsPage() {
  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Products" }]} />
      <div className="block-head">
        <div>
          <h1 className="page-title">Products</h1>
          <p>Pick a product to see its guides, features, and known issues.</p>
        </div>
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
              {articlesByProduct(p.slug).length} articles <Icon name="arrow" size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
