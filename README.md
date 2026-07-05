# Projects Detail Template

Static (SSG) Next.js 14 app that renders one detail page per project from the
[Barbarpotato Projects API](https://api-barbarpotato.vercel.app/projects).

Built with the same stack, SSG method, and design system as
[`labs-detail-template`](https://github.com/Barbarpotato/labs-detail-template):
Next.js 14 (`output: 'export'`), Chakra UI v2, Framer Motion, and the shared
dark-cosmos design system (see `docs/DESIGN_SYSTEM.md` in the main
Barbarpotato repo).

## Data source

- `getStaticPaths` — `GET /projects` → one static path per `slug`.
- `getStaticProps` — `GET /projects?slug=<slug>` → project detail, plus the
  full list (minus the current project) for the "Proyek Lainnya" section.

Unlike `labs-detail-template`, project data has no `index`/sharding field, so
this template builds every project into a single repo/deploy — no
multi-node webhook sync is needed.

## Scripts

```bash
npm install
npm run dev     # local dev server
npm run build   # SSG export to /out, then generates sitemap.xml
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yaml`, which builds the app
and publishes `/out` to GitHub Pages under the `/Projects` basePath
(`barbarpotato.github.io/Projects`).
