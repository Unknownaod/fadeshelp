import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { TOPICS, getTopic } from "@/lib/topics";
import { articlesByTopic } from "@/lib/articles";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = getTopic(slug);
  if (!t) return {};
  return { title: t.title, description: t.blurb };
}

export default async function TopicPage({ params }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const articles = articlesByTopic(topic.slug);

  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Topics", href: "/topics" }, { label: topic.title }]} />

      <div className="product-hero">
        <span className="icon-box big">
          <Icon name={topic.icon} size={30} />
        </span>
        <div className="product-hero-copy">
          <h1 className="page-title">{topic.title}</h1>
          <p>{topic.blurb}</p>
        </div>
      </div>

      <div className="article-list one">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>

      <p className="muted-line">
        Didn't find it? <Link href="/contact">Contact support</Link>.
      </p>
    </div>
  );
}
