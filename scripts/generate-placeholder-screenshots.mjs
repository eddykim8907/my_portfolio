#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname

const projects = [
  {
    slug: 'bloomkare',
    name: 'Bloomkare',
    brandColor: '#EE5FA4',
    frames: [
      { file: 'hero.svg', label: 'Campaign dashboard' },
      { file: 'campaigns.svg', label: 'Creator applications' },
      { file: 'admin.svg', label: 'Admin operations' },
    ],
  },
  {
    slug: 'compass',
    name: 'Compass',
    brandColor: '#29AAE1',
    frames: [
      { file: 'hero.svg', label: 'Analytics overview' },
      { file: 'metrics.svg', label: 'Item metrics' },
      { file: 'logistics.svg', label: 'Logistics planning' },
    ],
  },
  {
    slug: 'forsit-hub',
    name: 'ForsitHub',
    brandColor: '#10B981',
    frames: [
      { file: 'hero.svg', label: 'Sales dashboard' },
      { file: 'metrics.svg', label: 'Brand metrics' },
      { file: 'plans.svg', label: 'Plan confirmation' },
    ],
  },
  {
    slug: 'viralhook',
    name: 'ViralHook',
    brandColor: '#6366F1',
    frames: [
      { file: 'hero.svg', label: 'Creator pipeline' },
      { file: 'campaigns.svg', label: 'Campaign workflow' },
      { file: 'matchmaking.svg', label: 'Partner matchmaking' },
    ],
  },
]

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function createPlaceholder({ name, label, brandColor }) {
  const safeName = escapeXml(name)
  const safeLabel = escapeXml(label)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" role="img" aria-label="${safeName} ${safeLabel} placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="800" fill="url(#bg)"/>
  <rect width="1280" height="56" fill="#262626"/>
  <circle cx="28" cy="28" r="7" fill="${brandColor}"/>
  <circle cx="52" cy="28" r="7" fill="#525252"/>
  <circle cx="76" cy="28" r="7" fill="#525252"/>
  <rect x="112" y="20" width="320" height="16" rx="8" fill="#404040"/>
  <rect x="56" y="96" width="220" height="608" rx="16" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
  <rect x="96" y="136" width="140" height="12" rx="6" fill="${brandColor}" opacity="0.85"/>
  <rect x="96" y="168" width="100" height="10" rx="5" fill="#404040"/>
  <rect x="96" y="192" width="120" height="10" rx="5" fill="#333"/>
  <rect x="96" y="216" width="90" height="10" rx="5" fill="#333"/>
  <rect x="304" y="96" width="920" height="120" rx="16" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
  <rect x="336" y="128" width="180" height="14" rx="7" fill="${brandColor}"/>
  <rect x="336" y="154" width="260" height="10" rx="5" fill="#525252"/>
  <rect x="304" y="240" width="440" height="200" rx="16" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
  <rect x="304" y="460" width="440" height="200" rx="16" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
  <rect x="768" y="240" width="456" height="420" rx="16" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
  <rect x="800" y="272" width="200" height="12" rx="6" fill="${brandColor}" opacity="0.7"/>
  <rect x="800" y="300" width="360" height="10" rx="5" fill="#404040"/>
  <rect x="800" y="324" width="300" height="10" rx="5" fill="#333"/>
  <rect x="800" y="348" width="340" height="10" rx="5" fill="#333"/>
  <text x="640" y="760" text-anchor="middle" fill="#737373" font-family="system-ui, sans-serif" font-size="22">${safeName} — ${safeLabel}</text>
  <text x="640" y="786" text-anchor="middle" fill="#525252" font-family="system-ui, sans-serif" font-size="14">Replace with a real screenshot</text>
</svg>
`
}

for (const project of projects) {
  const dir = join(root, 'public', 'projects', project.slug)
  await mkdir(dir, { recursive: true })

  for (const frame of project.frames) {
    const svg = createPlaceholder({
      name: project.name,
      label: frame.label,
      brandColor: project.brandColor,
    })
    await writeFile(join(dir, frame.file), svg, 'utf8')
  }
}

console.log('Generated placeholder screenshots for 4 projects.')
