export interface SiteSkillGroup {
  category: string
  items: string[]
}

export type SiteSocialIcon = 'github' | 'linkedin' | 'email'

export interface SiteSocialLink {
  label: string
  href: string
  icon: SiteSocialIcon
}

export const siteConfig = {
  name: 'Edward Kim',
  title: 'Full-stack & frontend developer',
  tagline: 'Full-stack product work',
  bio: 'Building creator platforms, brand portals, and internal ops tools at Forsit — with Nuxt, Vue, and Supabase.',
  email: 'eddykim8907@gmail.com',
  location: 'Seoul, KR',
  about: {
    paragraphs: [
      "I'm a developer focused on Nuxt and Vue applications — from creator-facing campaign platforms to internal ops consoles and client brand portals.",
      'At Forsit, I contributed across Bloomkare (full-stack), Compass, ForsitHub, and ViralHook (frontend): shipping features from Supabase schema and Nitro APIs to PrimeVue dashboards and data-heavy admin UI.',
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
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:eddykim8907@gmail.com', icon: 'email' },
  ] satisfies SiteSocialLink[],
  resume: '/resume.pdf',
} as const

export type SiteConfig = typeof siteConfig
