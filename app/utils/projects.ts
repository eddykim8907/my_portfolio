import { parse } from 'yaml'

import type { Project } from '~/types/project'

const yamlModules = import.meta.glob<string>('@content/projects/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseProjects(): Project[] {
  return Object.values(yamlModules)
    .map((raw) => parse(raw) as Project)
    .sort((a, b) => a.order - b.order)
}

export function getProjects(): Project[] {
  return parseProjects()
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug)
}

export function getProjectSlugs(): string[] {
  return getProjects().map((project) => project.slug)
}
