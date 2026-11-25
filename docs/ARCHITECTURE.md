# Architecture

## Stack
| Layer | Choice | Why |
|---|---|---|
| Build | Vite 7 + React + TypeScript | Fast dev, simple static output |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first, theme tokens in CSS |
| Animation | Framer Motion | Scroll reveals, hover, counters |
| 3D | three.js + @react-three/fiber | Neural-network hero background |
| Icons | lucide-react | Light, consistent icons |
| Hosting | Vercel / Netlify / Cloudflare Pages | Static, free tier |

## Structure
```
roshan-portfolio/
├── docs/                 PLAN, PRD, ARCHITECTURE, CONTENT
├── src/
│   ├── content/data.ts   ALL editable content
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx      typewriter + CTA
│   │   ├── NeuralBg.tsx  R3F particle network
│   │   ├── Sections.tsx  About, Skills, Projects, Experience, Contact
│   │   └── ui.tsx        Section wrapper, Tag
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         Tailwind + theme tokens
└── vite.config.ts
```

## Design system
- Colors: bg `#05060d`, panel `#0c0e1a`, neon `#7c5cff`, cyan `#22d3ee`, lime `#a3e635`
- Fonts: Inter (UI), JetBrains Mono (labels and code feel)
- Patterns: glass cards, gradient text, glow on hover, `// kicker` section labels

## Data flow
`content/data.ts` -> components import typed constants -> rendered statically. No runtime backend in MVP.

## Performance notes
- 3D scene: 90 points, capped DPR 1.5
- Future: `React.lazy` the canvas, pause rendering when off-screen, disable on reduced-motion

## Future backend (Phase 3)
Small Go or Python service: `/chat` endpoint doing RAG over resume and project docs with streaming responses; deployed separately and called from the site.
