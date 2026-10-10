"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function FeedbackWidget({ slug }) {
  const [stage, setStage] = useState("ask"); // ask | comment | done
  const [helpful, setHelpful] = useState(null);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  async function send(value, text) {
    setSending(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, helpful: value, comment: text }),
      });
    } catch {
      // Feedback is best effort. The reader doesn't need to see an error.
    }
    setSending(false);
    setStage("done");
  }

  if (stage === "done") {
    return (
      <div className="feedback">
        <Icon name="check" size={18} />
        <span>
          {helpful ? "Thanks, glad it helped." : "Thanks. We'll use this to improve the article."}
        </span>
      </div>
    );
  }

  if (stage === "comment") {
    return (
      <div className="feedback feedback-col">
        <label htmlFor="fb-comment">What were you looking for? (optional)</label>
        <textarea
          id="fb-comment"
          rows={3}
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what was missing or unclear. Please don't include passwords or personal details."
        />
        <div className="feedback-actions">
          <button type="button" className="btn btn-small" disabled={sending} onClick={() => send(helpful, comment)}>
            {sending ? "Sending..." : "Send feedback"}
          </button>
          <a className="text-link" href="/contact">
            Need help now? Contact support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback">
      <span>Was this article helpful?</span>
      <div className="feedback-buttons">
        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={() => {
            setHelpful(true);
            send(true, "");
          }}
        >
          <Icon name="thumbsUp" size={15} /> Yes
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={() => {
            setHelpful(false);
            setStage("comment");
          }}
        >
          <Icon name="thumbsDown" size={15} /> No
        </button>
      </div>
    </div>
  );
}
