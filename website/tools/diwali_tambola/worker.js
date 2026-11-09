// Diwali Tambola - one Cloudflare Worker: serves the page (public/) and keeps the game state.
// Game state lives in a Durable Object, so every phone sees the same numbers instantly.
export class Game {
  constructor(state, env) { this.state = state; this.env = env; }
  async fetch(req) {
    const p = new URL(req.url).pathname;
    let s = (await this.state.storage.get("s")) || { g: 1, n: 15, called: [] };
    const J = (o, c = 200) => new Response(JSON.stringify(o), {
      status: c, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
    if (p === "/state") return J(s);
    if (req.method === "POST" && (p === "/roll" || p === "/new")) {
      const b = await req.json().catch(() => ({}));
      if (!this.env.PIN || b.pin !== this.env.PIN) return J({ error: "pin" }, 401);
      if (p === "/new") {
        s = { g: s.g + 1, n: Math.min(Math.max(parseInt(b.n) || 15, 1), 60), called: [] };
      } else {
        const left = [];
        for (let i = 1; i <= 90; i++) if (!s.called.includes(i)) left.push(i);
        if (left.length) s.called.push(left[Math.floor(Math.random() * left.length)]);
      }
      await this.state.storage.put("s", s);
      return J(s);
    }
    return J({ error: "not found" }, 404);
  }
}

export default {
  async fetch(req, env) {
    const p = new URL(req.url).pathname;
    if (p === "/state" || p === "/roll" || p === "/new") {
      return env.GAME.get(env.GAME.idFromName("main")).fetch(req);
    }
    return env.ASSETS.fetch(req);
  }
};
