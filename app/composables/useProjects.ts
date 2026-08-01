import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjects,
} from '~/utils/projects'

export function useProjects() {
  const projects = useState('projects', () => getProjects())

  return {
    projects: readonly(projects),
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
