import type { Project } from "~/types/project";

export function sortProjectsByTimeline(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const byStart = a.startDate.localeCompare(b.startDate);
    if (byStart !== 0) {
      return byStart;
    }

    return a.order - b.order;
  });
}

export function formatTimelineRange(project: Project): string {
  return project.year;
}
