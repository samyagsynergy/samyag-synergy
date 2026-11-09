// Diwali Tambola - Cloudflare Worker
// Needs: KV namespace bound as TAMBOLA, and a variable named PIN (your host PIN)
const H = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Cache-Control": "no-store"
};
const J = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { ...H, "Content-Type": "application/json" } });

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: H });
    const p = new URL(req.url).pathname;
    let called = JSON.parse((await env.TAMBOLA.get("called")) || "[]");

    if (p === "/state") return J({ called });

    if (req.method === "POST" && (p === "/roll" || p === "/reset")) {
      const b = await req.json().catch(() => ({}));
      if (b.pin !== env.PIN) return J({ error: "pin" }, 401);
      if (p === "/reset") called = [];
      else {
        const left = [];
        for (let i = 1; i <= 90; i++) if (!called.includes(i)) left.push(i);
        if (left.length) called.push(left[Math.floor(Math.random() * left.length)]);
      }
      await env.TAMBOLA.put("called", JSON.stringify(called));
      return J({ called });
    }
    return J({ error: "not found" }, 404);
  }
};
