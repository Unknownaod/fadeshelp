import { PRODUCTS } from "./products.js";

// Pings each live product's website. Anything under 500 counts as up.
// Pages that use this should set `export const revalidate = 60`.
export async function getStatus() {
  const services = await Promise.all(
    PRODUCTS.map(async (p) => {
      const base = { slug: p.slug, name: p.name, icon: p.icon, site: p.site };

      if (p.status !== "Available") {
        return { ...base, state: "stage", label: p.status };
      }

      try {
        const res = await fetch(p.site, {
          method: "GET",
          redirect: "follow",
          signal: AbortSignal.timeout(6000),
          next: { revalidate: 60 },
        });
        try {
          await res.body?.cancel();
        } catch {}
        return res.status < 500
          ? { ...base, state: "up", label: "Operational" }
          : { ...base, state: "down", label: "Having problems" };
      } catch {
        return { ...base, state: "down", label: "Not responding" };
      }
    })
  );

  const live = services.filter((s) => s.state !== "stage");
  const down = live.filter((s) => s.state === "down");

  return {
    services,
    allOperational: down.length === 0,
    downCount: down.length,
    checkedAt: new Date().toISOString(),
  };
}
