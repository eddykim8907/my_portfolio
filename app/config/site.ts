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
  tagline: '~3 years building product web apps',
  bio: 'From creator campaign platforms to internal ops consoles and brand portals — starting in frontend, now focused on fullstack.',
  email: 'eddykim8907@gmail.com',
  location: 'Seoul, KR',
  about: {
    paragraphs: [
      '안녕하세요! I\'m a software developer with about three years of experience building web applications — from creator-facing campaign platforms to internal ops consoles and portals for brand clients. I started as a frontend developer; as AI accelerated how I learn and ship, I shifted more of my focus toward fullstack work.',
      'Regardless of whether AI is part of the process, I aim to start every project well-documented, scalable, and modular.',
      'I enjoy collaborating with a team to solve problems, and I\'m equally comfortable working independently — including taking full ownership of tasks and projects end to end.',
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
    { label: 'GitHub', href: 'https://github.com/edwardkim088', icon: 'github' },
    { label: 'Email', href: 'mailto:eddykim8907@gmail.com', icon: 'email' },
  ] satisfies SiteSocialLink[],
  resume: '/resume.pdf',
} as const

export type SiteConfig = typeof siteConfig
