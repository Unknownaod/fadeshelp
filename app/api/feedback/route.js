import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { rateLimit, clientIp } from "@/lib/ratelimit";
import { getArticle } from "@/lib/articles";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!rateLimit(`feedback:${clientIp(request)}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const article = getArticle(String(data.slug || ""));
  if (!article || typeof data.helpful !== "boolean") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const comment = String(data.comment || "").trim().slice(0, 1000);

  // Only forward the useful signals: "not helpful" votes and written comments.
  if (!data.helpful || comment) {
    await notify({
      subject: `Article feedback: ${article.title} (${data.helpful ? "helpful" : "not helpful"})`,
      fields: [
        { name: "Article", value: `/articles/${article.slug}` },
        { name: "Helpful", value: data.helpful ? "Yes" : "No", inline: true },
        { name: "Comment", value: comment || "(none)" },
      ],
    });
  }

  return NextResponse.json({ ok: true });
}
