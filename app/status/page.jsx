import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getStatus } from "@/lib/status";

export const revalidate = 60;
export const metadata = {
  title: "Service status",
  description: "Live status of every Fades product.",
};

export default async function StatusPage() {
  const status = await getStatus();
  const checked = new Date(status.checkedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Status" }]} />

      <div className="block-head">
        <div>
          <h1 className="page-title">Service status</h1>
          <p>Is something down? Check here before you troubleshoot.</p>
        </div>
      </div>

      <div className={`banner ${status.allOperational ? "ok" : "bad"}`}>
        <span className={`dot ${status.allOperational ? "ok" : "bad"}`} />
        <strong>
          {status.allOperational
            ? "All systems operational"
            : `${status.downCount} ${status.downCount === 1 ? "service is" : "services are"} having problems`}
        </strong>
      </div>

      <div className="status-list">
        {status.services.map((s) => (
          <div key={s.slug} className="status-row">
            <span className="status-name">
              <Icon name={s.icon} size={17} />
              <Link href={`/products/${s.slug}`}>{s.name}</Link>
            </span>
            <span className={`status-state ${s.state}`}>
              <span className={`dot ${s.state === "up" ? "ok" : s.state === "down" ? "bad" : ""}`} />
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <p className="muted-line">
        Checked automatically about once a minute. Last check: {checked} UTC. Seeing a problem that isn't listed?{" "}
        <Link href="/contact">Let us know</Link>.
      </p>
    </div>
  );
}
