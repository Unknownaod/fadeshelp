import Link from "next/link";

const RE = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

// Renders tiny inline markup: `code`, **bold**, [label](url)
export default function Inline({ text }) {
  const parts = String(text).split(RE);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }

        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          const [, label, href] = m;
          if (href.startsWith("/")) {
            return (
              <Link key={i} href={href}>
                {label}
              </Link>
            );
          }
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }

        return part;
      })}
    </>
  );
}
