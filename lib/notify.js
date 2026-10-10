// Delivers contact-form messages and feedback to Discord and/or email (Resend).
// Configure in .env. Returns { configured, delivered }.

const clip = (s, n) => String(s ?? "").slice(0, n);

export async function notify({ subject, fields = [], replyTo, text }) {
  const discord = process.env.DISCORD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.SUPPORT_TO_EMAIL;
  const from = process.env.SUPPORT_FROM_EMAIL;

  const configured = Boolean(discord || (resendKey && to && from));
  if (!configured) return { configured: false, delivered: false };

  const jobs = [];

  if (discord) {
    jobs.push(
      fetch(discord, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allowed_mentions: { parse: [] },
          embeds: [
            {
              title: clip(subject, 250),
              color: 0xd6a85c,
              fields: fields.slice(0, 20).map((f) => ({
                name: clip(f.name, 250) || "-",
                value: clip(f.value, 1000) || "-",
                inline: Boolean(f.inline),
              })),
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).then((r) => r.ok)
    );
  }

  if (resendKey && to && from) {
    const body =
      text ||
      fields.map((f) => `${f.name}: ${f.value}`).join("\n\n");

    const payload = { from, to: [to], subject: clip(subject, 200), text: body };
    if (replyTo) payload.reply_to = replyTo;

    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((r) => r.ok)
    );
  }

  const results = await Promise.allSettled(jobs);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  return { configured: true, delivered };
}
