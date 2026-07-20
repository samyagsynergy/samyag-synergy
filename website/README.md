# Samyag Synergy — Website with Decap CMS

Every section of this site (Hero, About, Services, Tools, Resources, Blog, Contact) is stored
as data in the `/content` folder and rendered live by `index.html`. Edit that data through the
`/admin` panel — no coding, no manual redeploy needed.

## 1. Put this in a GitHub repository

1. Create a new **GitHub repository** (e.g. `samyag-synergy-website`).
2. Upload this entire folder to it (keep the folder structure exactly as-is:
   `index.html`, `/admin`, `/content`, `/uploads`).

## 2. Connect it to Netlify

1. In Netlify: **Add new site → Import an existing project → connect to your GitHub repo.**
2. Build settings: leave **Build command empty** and set **Publish directory** to `/` (the repo root).
   There is no build step — the site is plain HTML/JS.
3. Deploy. Your site should load immediately at the Netlify URL.

## 3. Turn on the CMS (one-time setup)

1. In your Netlify site dashboard: **Site configuration → Identity → Enable Identity.**
2. Under Identity **Registration**, set it to **Invite only** (so strangers can't sign up).
3. Under Identity → **Services**, enable **Git Gateway**. This lets the CMS commit content
   changes to your GitHub repo on your behalf.
4. Under Identity → **Invite users**, invite your own email address. You'll get an email —
   click it to set a password.

## 4. Start editing

Go to `yoursite.com/admin` and log in. You'll see six sections in the sidebar:

- **Site Settings** — hero text, about bio, contact details, socials, UEN, logo & photo
- **Services** — add/remove/reorder service cards
- **Tools** — add/remove tools, set category, badge (e.g. "Beta"), link, optional demo video
- **Resources** — featured downloadable kits + official links, both taggable by category
  (e.g. IFRS, Sustainability, Singapore Business, Business Processes) for the filter pills
- **Blog** — add new posts (title, category, byline, date, body in Markdown)

Every save commits directly to the `content/*.json` files in your GitHub repo. Netlify
redeploys automatically (a few seconds, no build step), and the live site reflects your
change on next page load — no code, no manual redeploy.

## How it works (for reference)

- `index.html` fetches the JSON files in `/content` at page load and renders each section.
- `/admin/config.yml` defines the CMS forms Decap generates for each JSON file.
- Uploaded images/files (logo, photo, downloadable resources, demo videos) all live in
  `/uploads` — the CMS media picker also saves new uploads there automatically.
- Adding a new **category** to a Tool or Resource is just typing a new value into that
  field in the CMS — the filter pills on the live site pick it up automatically.

## Notes

- The founder photo, logo, IFRS S1 Starter Kit files, and payroll demo video are already
  in `/uploads` and wired up in the content files — nothing further needed for launch.
- If you ever want to reorder items (services, tools, blog posts), drag them within the
  CMS list editor — order there is the order shown on the site.
