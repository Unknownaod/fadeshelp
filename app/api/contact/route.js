import { NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { rateLimit, clientIp } from "@/lib/ratelimit";
import { CATEGORIES, CONTACT_PRODUCTS } from "@/lib/contact";

const CATEGORY_VALUES = CATEGORIES.map((c) => c.value);
const PRODUCT_SLUGS = CONTACT_PRODUCTS.map((p) => p.value);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (data.website) return NextResponse.json({ ok: true });

  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const category = String(data.category || "");
  const product = String(data.product || "other");
  const message = String(data.message || "").trim();

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!CATEGORY_VALUES.includes(category)) {
    return NextResponse.json({ error: "Please choose a topic." }, { status: 400 });
  }
  if (!PRODUCT_SLUGS.includes(product)) {
    return NextResponse.json({ error: "Please choose a product." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { error: "Please write a message between 10 and 4000 characters." },
      { status: 400 }
    );
  }

  const result = await notify({
    subject: `[${category}] ${product} - ${name}`,
    replyTo: email,
    fields: [
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Topic", value: category, inline: true },
      { name: "Product", value: product, inline: true },
      { name: "Message", value: message },
    ],
  });

  if (!result.configured) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Support form isn't set up yet. Please email support@fades.lol." },
        { status: 503 }
      );
    }
    console.log("[contact:dev, no delivery configured]", { name, email, category, product, message });
    return NextResponse.json({ ok: true });
  }

  if (!result.delivered) {
    return NextResponse.json(
      { error: "We couldn't send your message. Please email support@fades.lol." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
