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

Sync the `_site/` build output to S3:

```sh
npm run build
aws s3 sync _site/ s3://pvomelveny.com --delete
```

`_site/` contains only the files that should be served.

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
