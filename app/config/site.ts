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
  bio: 'Software developer based in Gangnam with about four years of experience, from creator campaign platforms to internal ops consoles and brand portals.',
  email: 'eddykim8907@gmail.com',
  location: 'Gangnam, Seoul, KR',
  about: {
    paragraphs: [
      '안녕하세요! I\'m a software developer based in Gangnam with about four years of experience building web applications. Over that time, I have worked on numerous projects, ranging from creator-facing campaign platforms to internal ops consoles and portals for brand clients.',
      'Although I began my journey as a self-taught frontend developer, I was able to leverage the rise in popularity of AI to accelerate my learning and expand my focus toward full-stack development. While I recognize the immense power of AI in software, I see it as a tool to deepen understanding rather than a replacement for critical thinking and proper planning.',
      'My approach to starting any project, regardless of whether AI is involved, is to build with a focus on scalability, modularity, and clear documentation.',
      'I am always willing and eager to learn new tools, practices, and ways of thinking, especially if it will benefit my team or contribute to a project\'s success. I am a strong collaborator and communicator, while also being comfortable working independently and taking ownership of tasks and projects.',
      'I want to continue growing as an engineer by taking on new challenges, absorbing as much knowledge and experience as I can from my peers, and making contributions that are useful and meaningful.',
    ],
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
    { label: 'Email', href: 'mailto:eddykim8907@gmail.com', icon: 'email' },
  ] satisfies SiteSocialLink[],
  resume: '/resume.pdf',
} as const

export type SiteConfig = typeof siteConfig
