"use client";

import { useState } from "react";
import Icon from "./Icon";
import { CATEGORIES, CONTACT_PRODUCTS } from "@/lib/contact";

export default function ContactForm({ defaultProduct = "other", defaultCategory = "question" }) {
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="form-done">
        <span className="icon-box big">
          <Icon name="check" size={28} />
        </span>
        <h2>Message sent</h2>
        <p>
          Thanks. We'll reply to the email you gave us, usually within one to two business days. For a faster
          answer, ask in Discord.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Account email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="product">Product</label>
          <select id="product" name="product" defaultValue={defaultProduct}>
            {CONTACT_PRODUCTS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="category">What is this about?</label>
          <select id="category" name="category" defaultValue={defaultCategory}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          placeholder="What were you trying to do, and what happened instead? Include any error message."
        />
      </div>

      {/* Honeypot field. Hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="form-warn">Never include your password, full card number, or recovery codes.</p>

      {state === "error" && (
        <div className="callout warn" role="alert">
          <Icon name="alert" size={18} />
          <div>{error}</div>
        </div>
      )}

      <button type="submit" className="btn" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
