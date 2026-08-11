import { parse } from 'yaml'

import type { Project } from '~/types/project'
import { sortProjectsByTimeline } from '~/utils/project-timeline'

const yamlModules = import.meta.glob<string>('@content/projects/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function loadProjects(): Project[] {
  return Object.values(yamlModules).map((raw) => {
    const project = parse(raw) as Project

    if (project.contribution?.length) {
      project.contribution = project.contribution.map((item) => {
        if (typeof item === 'string') {
          return item
        }

        // Unquoted YAML `key: value` list items parse as objects — flatten them.
        if (item && typeof item === 'object') {
          return Object.entries(item as Record<string, string>)
            .map(([key, value]) => `${key}: ${value}`)
            .join(' ')
        }

        return String(item)
      })
    }

    return project
  })
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
