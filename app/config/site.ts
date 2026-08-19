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
  title: 'Web Developer',
  tagline: '~4 years building product web apps',
  bio: 'Software developer in Gangnam. About four years of work on creator campaign platforms, internal ops consoles, and brand portals.',
  email: 'eddykim8907@gmail.com',
  location: 'Gangnam, Seoul, KR',
  about: {
    paragraphs: [
      '안녕하세요! I\'m a software developer in Gangnam. I\'ve been building web applications for about four years, including creator campaign tools, internal ops consoles, and portals for brand clients.',
      'I started as a self-taught frontend developer. When AI tools got good, I used them to learn faster and take on more full-stack work. I still treat AI as a tool. It helps me get unstuck and understand new things quicker, but it doesn\'t replace thinking through a problem or planning the work.',
      'On any project, I try to keep the architecture scalable, the code modular, and the docs clear enough that someone else can pick it up.',
      'I like picking up new tools and ways of working if they help the team or the product. I\'m comfortable collaborating, and I\'m also fine owning something end to end on my own.',
      'I want to keep growing as an engineer: take on harder problems, learn from the people around me, and ship work that actually helps.',
    ],
    aiAssisted: {
      title: 'AI-assisted development',
      paragraph:
        'I use coding agents like Cursor and Claude day to day: looking things up, writing code, debugging, refactoring, and getting up to speed on tools I haven\'t used before. I still own the architecture, the technical calls, and what ships to production.',
    },
  },
  skills: [
    {
      category: 'Frontend',
      items: ['Vue 3', 'Nuxt 3/4', 'TypeScript', 'Tailwind CSS', 'AG Grid'],
    },
    {
      category: 'Backend & data',
      items: ['Nitro', 'Supabase', 'PostgreSQL', 'MySQL', 'REST APIs', 'Webhooks'],
    },
    {
      category: 'Integrations & ops',
      items: ['TikTok OAuth', 'Amazon SP-API', 'Docker', 'CI/CD', 'Sentry'],
    },
  ] satisfies SiteSkillGroup[],
  social: [
    { label: 'GitHub', href: 'https://github.com/edwardkim088', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edward-kim-5a6821375/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:eddykim8907@gmail.com', icon: 'email' },
  ] satisfies SiteSocialLink[],
  resume: '/resume.pdf',
} as const

export type SiteConfig = typeof siteConfig
