# website-pvo

Patrick O'Melveny's personal website — [pvomelveny.com](https://pvomelveny.com).

Static site built with [Eleventy](https://www.11ty.dev/). All visible
content lives in plain YAML files; Nunjucks templates render the HTML.
No design-system or CSS framework — hand-written CSS plus a few lines
of JS for hash routing and an axiom-card hover animation.

## Editing site content

Open one of the YAML files under [`src/_data/`](src/_data/) and change the text:

| File | What's in it |
| --- | --- |
| [`src/_data/home.yaml`](src/_data/home.yaml) | Home page — hero, about, quick facts, works (papers & writing) |
| [`src/_data/cv.yaml`](src/_data/cv.yaml) | CV — education, research, teaching, experience, presentations, conferences, outreach, skills |
| [`src/_data/site.yaml`](src/_data/site.yaml) | Site-wide — brand, author, email, GitHub |
| [`src/_data/axioms.yaml`](src/_data/axioms.yaml) | Shared "axioms" manifesto strip (appears on both pages) |

Plain text is safe to edit. Fields ending in `_html` accept inline HTML
(e.g. `<strong>`, `<em>`, `<a href="…">`) — leave them alone if unsure.

Run `npm run dev` to preview changes with live reload, then `npm run build`
before deploying.

## Local development

```sh
npm install
npm run dev      # live-reloading preview at http://localhost:8080
```

## Production build

```sh
npm run build    # writes _site/
```

## Deploy

Pushes to the `trunk` branch deploy automatically via GitHub Actions
(see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
Edit a YAML file on github.com → click **Commit changes** → the site is
live in roughly 30 seconds.

If a deploy fails (for example, malformed YAML), the previously deployed
version stays up. The failure shows on the **Actions** tab of the repo
next to the offending commit. Open the failed run to see the error,
then push a fix.

You can also trigger a deploy manually: **Actions** tab → **Build and
deploy site** workflow → **Run workflow**.

### One-time setup (after the upstream PR merges)

Done once by the repo owner in repo settings:

1. **Settings → Pages → Build and deployment → Source**: choose
   **GitHub Actions**.
2. Push any commit to `trunk` (or run the workflow manually) to confirm
   the first deploy succeeds. The site will be live at
   `https://<owner>.github.io/<repo>/`.

### Custom domain

The site is currently served at `pvomelveny.com` via AWS. To move the
custom domain onto GitHub Pages:

1. **Confirm the GitHub Pages URL works first** at
   `https://<owner>.github.io/<repo>/`. Don't change DNS until this is
   green.
2. **Repo → Settings → Pages → Custom domain**: enter `pvomelveny.com`
   and save. GitHub writes a `CNAME` file into the deployed site;
   leave it there.
3. **Update DNS** at the domain registrar to point at GitHub Pages:
   - For the apex (`pvomelveny.com`), set **A** records to GitHub's
     Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - For `www`, set a **CNAME** record pointing to
     `<owner>.github.io` (no path, no trailing slash).
   - Remove the existing AWS / CloudFront records for the same names.
4. **Wait for HTTPS provisioning**. Once DNS resolves to GitHub,
   the **Settings → Pages** screen offers an **Enforce HTTPS** checkbox
   — tick it once it's available (usually within a few minutes to an
   hour after DNS propagates).
5. **Tear down AWS** once the site has been observed healthy on the
   new host for a burn-in period (a couple of weeks is reasonable).

## Layout

```text
src/
  _data/          — YAML content files (edit these)
  _includes/
    layouts/      — base page skeleton
    partials/     — nav, footer, axioms, reusable cards
  index.njk       — home page template
  cv/index.njk    — CV page template

.eleventy.js      — Eleventy config
colors_and_type.css — design tokens (colors, typography, spacing)
styles.css        — shared page styles
script.js         — home/works hash router + axiom card animation
fonts/            — Yuji Syuku (display) + Karla (body)
img/              — photos
papers/           — paper PDFs
cv/omelveny-cv.pdf — CV PDF
```
