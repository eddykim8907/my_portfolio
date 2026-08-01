# Portfolio

Personal portfolio site showcasing four products built at Forsit:

| Project | Description |
|---------|-------------|
| **Bloomkare** | Creator–brand campaign platform for inbound seeding marketing |
| **Compass** | Internal Forsit ops console (Amazon, TikTok Shop, Shopify analytics) |
| **ForsitHub** | Client-facing brand portal and multi-platform sales dashboard |
| **ViralHook** | Creator pipeline tool — matchmaking through delivery and payment |

## Stack

- [Nuxt 4](https://nuxt.com) — Vue framework with static generation
- [Nuxt UI](https://ui.nuxt.com) — UI components and Tailwind CSS v4
- [@nuxt/image](https://image.nuxt.com) — Optimized screenshots and assets

## Setup

```bash
npm install
cp .env.example .env   # optional — set NUXT_PUBLIC_SITE_URL for production
npm run dev
```

Dev server: [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (SSR) |
| `npm run generate` | Pre-render static site to `.output/public` |
| `npm run preview` | Preview production build locally |

## Project structure

```text
app/
├── pages/                  # Routes
│   ├── index.vue           # Home
│   ├── about.vue
│   └── projects/
│       ├── index.vue       # Project grid
│       └── [slug].vue      # Case study detail
├── components/
│   ├── layout/             # Header, footer
│   ├── home/               # Hero, featured projects
│   └── projects/           # ProjectCard, TechStack, etc.
├── layouts/
│   └── default.vue
└── assets/

content/
└── projects/               # One YAML file per project (Phase 2)

public/
└── projects/               # Logos and screenshots per project
    ├── bloomkare/
    ├── compass/
    ├── forsit-hub/
    └── viralhook/
```

## Adding a project

1. Add a YAML file in `content/projects/<slug>.yaml`
2. Add logo and screenshots under `public/projects/<slug>/`
3. The project grid and detail pages will pick it up automatically (Phase 2+)

## Asset guidelines

- **Screenshots:** 1440×900 or 1280×800, WebP preferred. Blur PII, client names, and real revenue figures.
- **Logos:** Copy from source repos into `public/projects/<slug>/`. Do not hotlink from private repos.
- **OG image:** Place a 1200×630 image at `public/og-image.png` before deploying.

## Deployment

Static output via `npm run generate`. Deploy `.output/public` to Vercel, Cloudflare Pages, or Netlify.

Set `NUXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://yourname.dev`).

## License

Code: MIT. Project screenshots and logos remain property of their respective products/clients.
