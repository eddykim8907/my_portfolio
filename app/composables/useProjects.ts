import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjects,
  getProjectsByOrder,
} from '~/utils/projects'

export function useProjects() {
  const projects = useState('projects', () => getProjects())
  const projectsByOrder = useState('projects-by-order', () => getProjectsByOrder())

  return {
    projects: readonly(projects),
    projectsByOrder: readonly(projectsByOrder),
    featuredProjects: computed(() => getFeaturedProjects()),
  }
}

export function useProject(slug: MaybeRefOrGetter<string>) {
  const slugValue = computed(() => toValue(slug))

  const project = computed(() => getProjectBySlug(slugValue.value))

  return {
    project,
  }
}
