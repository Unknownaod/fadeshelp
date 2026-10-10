import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { COMMUNITY } from "@/lib/site";

export const metadata = {
  title: "Community",
  description: "Join the Fades community on Discord, GitHub, X, and YouTube.",
};

const RULES = [
  "Be kind and respectful. We're all here to help each other.",
  "Never share your password, recovery codes, or full card numbers, even with people claiming to be staff.",
  "Fades staff will never DM you first asking for account details.",
  "Search the help center before asking. Many answers are already here.",
  "Include details when asking for help: the product, what happened, and any error message.",
  "Report security problems privately through the contact form, not in public channels.",
];

export default function CommunityPage() {
  const [discord, ...rest] = COMMUNITY;

  return (
    <div className="block page-top">
      <Breadcrumbs items={[{ label: "Community" }]} />

      <div className="block-head">
        <div>
          <h1 className="page-title">Community</h1>
          <p>Real people, across every channel.</p>
        </div>
      </div>

      <div className="community">
        <a href={discord.url} className="card discord" target="_blank" rel="noopener noreferrer">
          <span className="icon-box big">
            <Icon name="discord" size={30} />
          </span>
          <div>
            <h3>Join the Fades Discord</h3>
            <p>
              The fastest way to get an answer. Chat with the team, get setup help, share feedback, and see
              what we're building next.
            </p>
          </div>
          <span className="btn">
            Join the server <Icon name="external" size={15} />
          </span>
        </a>

        <div className="channels">
          {rest.map((c) => {
            const external = c.url.startsWith("http") || c.url.startsWith("mailto");
            const inner = (
              <>
                <span className="icon-box small">
                  <Icon name={c.icon} size={19} />
                </span>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.text}</p>
                  <span className="channel-cta">{c.cta}</span>
                </div>
              </>
            );
            return external ? (
              <a key={c.name} href={c.url} className="card channel" target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <Link key={c.name} href={c.url} className="card channel">
                {inner}
              </Link>
            );
          })}
        </div>
      </div>

      <h2 className="section-title">Community guidelines</h2>
      <div className="card rules">
        <ul>
          {RULES.map((r) => (
            <li key={r}>
              <Icon name="check" size={16} />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
