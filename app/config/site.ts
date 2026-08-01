export interface SiteSkillGroup {
  category: string
  items: string[]
}

export interface SiteSocialLink {
  label: string
  href: string
}

export const siteConfig = {
  name: 'Eddy',
  title: 'Full-stack developer',
  tagline: 'Full-stack product work',
  bio: 'Building creator platforms, brand portals, and internal ops tools at Forsit — with Nuxt, Vue, and Supabase.',
  location: 'Seoul, KR',
  about: {
    paragraphs: [
      "I'm a full-stack developer focused on Nuxt and Vue applications — from creator-facing campaign platforms to internal ops consoles and client brand portals.",
      'At Forsit, I work across Bloomkare, Compass, ForsitHub, and ViralHook: shipping features end-to-end, from Supabase schema and Nitro APIs to PrimeVue dashboards and deployment pipelines.',
      "I'm especially interested in well-structured product codebases, static-friendly Nuxt apps, and tools that help brands and creators work together at scale.",
    ],
  },
  skills: [
    {
      category: 'Frontend',
      items: ['Vue 3', 'Nuxt 3/4', 'TypeScript', 'Tailwind CSS', 'PrimeVue', 'AG Grid'],
    },
    {
      category: 'Backend & data',
      items: ['Nitro', 'Supabase', 'PostgreSQL', 'MySQL', 'REST APIs', 'Webhooks'],
    },
    {
      category: 'Integrations & ops',
      items: ['TikTok OAuth', 'Amazon SP-API', 'ShipStation', 'Docker', 'CI/CD', 'Sentry'],
    },
  ] satisfies SiteSkillGroup[],
  social: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ] satisfies SiteSocialLink[],
  resume: '/resume.pdf',
} as const

export type SiteConfig = typeof siteConfig
