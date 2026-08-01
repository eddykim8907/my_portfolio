import { parse } from 'yaml'

import type { Project } from '~/types/project'
import { sortProjectsByTimeline } from '~/utils/project-timeline'

const yamlModules = import.meta.glob<string>('@content/projects/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function loadProjects(): Project[] {
  return Object.values(yamlModules).map((raw) => parse(raw) as Project)
}

export function getProjectsByOrder(): Project[] {
  return [...loadProjects()].sort((a, b) => a.order - b.order)
}

export function getProjects(): Project[] {
  return sortProjectsByTimeline(loadProjects())
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadProjects().find((project) => project.slug === slug)
}

export function getProjectSlugs(): string[] {
  return loadProjects().map((project) => project.slug)
}
