import Icon from "./Icon";
import Inline from "./Inline";
import { slugify } from "@/lib/slug";

export default function ArticleBody({ body }) {
  return (
    <div className="prose">
      {body.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.v} />
              </p>
            );
          case "h":
            return (
              <h2 key={i} id={slugify(b.v)}>
                {b.v}
              </h2>
            );
          case "steps":
            return (
              <ol key={i} className="steps">
                {b.v.map((s, j) => (
                  <li key={j}>
                    <Inline text={s} />
                  </li>
                ))}
              </ol>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.v.map((s, j) => (
                  <li key={j}>
                    <Inline text={s} />
                  </li>
                ))}
              </ul>
            );
          case "note":
            return (
              <div key={i} className="callout note">
                <Icon name="info" size={18} />
                <div>
                  <Inline text={b.v} />
                </div>
              </div>
            );
          case "warn":
            return (
              <div key={i} className="callout warn">
                <Icon name="alert" size={18} />
                <div>
                  <Inline text={b.v} />
                </div>
              </div>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{b.v}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
