"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "./Icon";
import { searchItems } from "@/lib/searchCore";

export default function SearchBox({ index, initial = "", autoFocus = false, quick = [] }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => (q.trim() ? searchItems(index, q, 7) : []), [index, q]);

  useEffect(() => {
    function onKey(e) {
      const tag = (e.target && e.target.tagName) || "";
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
        e.preventDefault();
        inputRef.current && inputRef.current.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current && inputRef.current.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit(e) {
    e.preventDefault();
    const value = q.trim();
    if (value) {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  }

  return (
    <div className="search-wrap">
      <form className="search" action="/search" method="get" onSubmit={submit} role="search">
        <Icon name="search" size={18} />
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="Search for help, e.g. reset password"
          aria-label="Search the Fades help center"
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {q ? (
          <button type="button" className="clear" onClick={() => setQ("")} aria-label="Clear search">
            ×
          </button>
        ) : (
          <kbd>/</kbd>
        )}
      </form>

      {open && q.trim() && (
        <div className="results">
          {results.length > 0 ? (
            <>
              {results.map((r) => (
                <Link href={r.url} key={`${r.url}-${r.title}`} className="result">
                  <span className="result-icon">
                    <Icon name={r.icon} size={17} />
                  </span>
                  <span className="result-copy">
                    <strong>{r.title}</strong>
                    <span>{r.kind}</span>
                  </span>
                  <Icon name="arrow" size={15} />
                </Link>
              ))}
              <Link href={`/search?q=${encodeURIComponent(q.trim())}`} className="result result-all">
                See all results for "{q.trim()}"
              </Link>
            </>
          ) : (
            <div className="result-empty">
              <strong>No matches for "{q.trim()}"</strong>
              <span>
                Try fewer words, or <Link href="/contact">contact support</Link>.
              </span>
            </div>
          )}
        </div>
      )}

      {quick.length > 0 && (
        <div className="quick">
          <span>Popular:</span>
          {quick.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => {
                setQ(s);
                setOpen(true);
                inputRef.current && inputRef.current.focus();
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
