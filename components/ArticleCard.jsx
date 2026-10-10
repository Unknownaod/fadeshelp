import Link from "next/link";
import Icon from "./Icon";
import { getProduct } from "@/lib/products";

export default function ArticleCard({ article }) {
  const product = getProduct(article.product);

  return (
    <Link href={`/articles/${article.slug}`} className="article">
      <span className="icon-box small">
        <Icon name={product ? product.icon : "book"} size={18} />
      </span>
      <span className="article-copy">
        <span className="article-title">{article.title}</span>
        <span className="article-summary">{article.summary}</span>
      </span>
      <span className="article-product">{product ? product.name : ""}</span>
      <Icon name="arrow" size={15} />
    </Link>
  );
}
