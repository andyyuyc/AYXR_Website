# AYXR Website

Source for [ayxr.net](https://ayxr.net) — built with Hugo, deployed on Cloudflare Pages.

## Develop

```sh
hugo server
```

Visit http://localhost:1313.

## Build

```sh
hugo --minify
```

Output goes to `public/`.

## Deploy

Pushes to `main` auto-deploy via Cloudflare Pages.

- Build command: `hugo --minify`
- Output directory: `public`
- Hugo version: pinned via `HUGO_VERSION` env var on Cloudflare Pages
