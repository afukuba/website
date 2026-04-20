# website-pvo

Patrick O'Melveny's personal website — [pvomelveny.com](https://pvomelveny.com).

Plain static HTML, CSS, and a few lines of JS. No build step, no framework.

## Local preview

Any static file server will do. From the repo root:

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy

Sync the repo root to S3, excluding the files that aren't part of the served site:

```sh
aws s3 sync ./ s3://pvomelveny.com \
  --exclude ".git/*" \
  --exclude ".gitignore" \
  --exclude "LICENSE" \
  --exclude "README.md"
```

## Layout

```text
index.html           — home + works (single page, hash-routed)
styles.css           — page styles
colors_and_type.css  — design system tokens (colors, typography, spacing)
script.js            — hash router
fonts/               — Yuji Syuku (display) + Karla (body)
img/                 — photos
papers/              — paper PDFs
cv/                  — CV PDF
```
