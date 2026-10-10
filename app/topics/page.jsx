import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TOPICS } from "@/lib/topics";
import { articlesByTopic } from "@/lib/articles";

export const metadata = {
  title: "Help topics",
  description: "Browse Fades help by topic: getting started, account, privacy and security, billing, troubleshooting, and developers.",
};

export default function TopicsPage() {
  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Topics" }]} />
      <div className="block-head">
        <div>
          <h1 className="page-title">Help topics</h1>
          <p>Not sure which product it's about? Browse by what you're trying to do.</p>
        </div>
      </div>

      <div className="grid-3">
        {TOPICS.map((t) => (
          <Link href={`/topics/${t.slug}`} key={t.slug} className="card product">
            <span className="icon-box">
              <Icon name={t.icon} size={22} />
            </span>
            <h3 className="mt">{t.title}</h3>
            <p>{t.blurb}</p>
            <span className="card-foot">
              {articlesByTopic(t.slug).length} articles <Icon name="arrow" size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
