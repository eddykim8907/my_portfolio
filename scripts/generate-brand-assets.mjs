#!/usr/bin/env node
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const publicDir = join(root, 'public')

const name = 'Edward Kim'
const title = 'Full-stack & frontend developer'

const ogImage = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${name} Portfolio">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="80" width="1040" height="470" rx="24" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
  <circle cx="140" cy="140" r="12" fill="#a3a3a3"/>
  <circle cx="176" cy="140" r="12" fill="#525252"/>
  <circle cx="212" cy="140" r="12" fill="#525252"/>
  <text x="120" y="280" fill="#ffffff" font-family="system-ui, sans-serif" font-size="56" font-weight="700">${name}</text>
  <text x="120" y="350" fill="#d4d4d4" font-family="system-ui, sans-serif" font-size="32">${title}</text>
  <text x="120" y="420" fill="#737373" font-family="system-ui, sans-serif" font-size="24">Bloomkare · Compass · ForsitHub · ViralHook</text>
  <rect x="120" y="460" width="160" height="8" rx="4" fill="#EE5FA4"/>
  <rect x="292" y="460" width="160" height="8" rx="4" fill="#29AAE1"/>
  <rect x="464" y="460" width="160" height="8" rx="4" fill="#10B981"/>
  <rect x="636" y="460" width="160" height="8" rx="4" fill="#6366F1"/>
</svg>
`

const favicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" role="img" aria-label="${name}">
  <rect width="32" height="32" rx="8" fill="#171717"/>
  <text x="16" y="22" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="700">E</text>
</svg>
`

const appleTouchIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="${name}">
  <rect width="180" height="180" rx="40" fill="#171717"/>
  <text x="90" y="118" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="96" font-weight="700">E</text>
</svg>
`

await writeFile(join(publicDir, 'og-image.svg'), ogImage, 'utf8')
await writeFile(join(publicDir, 'favicon.svg'), favicon, 'utf8')
await writeFile(join(publicDir, 'apple-touch-icon.svg'), appleTouchIcon, 'utf8')

console.log('Generated og-image.svg, favicon.svg, and apple-touch-icon.svg')
