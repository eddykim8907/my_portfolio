<script setup lang="ts">
import type { Project } from '~/types/project'
import { sortProjectsByTimeline } from '~/utils/project-timeline'

const props = defineProps<{
  projects: Project[]
}>()

interface TimelineMarker {
  id: string
  label: string
  dateLabel: string
  dateKey: string
  color: string
  logo: string
}

type TimelineEntry =
  | { type: 'marker'; marker: TimelineMarker }
  | { type: 'project'; project: Project }

const markers: TimelineMarker[] = [
  {
    id: 'joined-gs-land',
    label: 'Joined GS Land',
    dateLabel: '2023.03',
    dateKey: '2023-03',
    color: '#F59E0B',
    logo: '/projects/gs-land/logo.svg',
  },
  {
    id: 'joined-forsit',
    label: 'Joined Forsit',
    dateLabel: '2025.05',
    dateKey: '2025-05',
    color: '#7C5CFC',
    logo: '/projects/forsit/forsit-logo.png',
  },
]

const timelineEntries = computed<TimelineEntry[]>(() => {
  const sortedProjects = sortProjectsByTimeline(props.projects)
  const entries: TimelineEntry[] = []
  const usedMarkerIds = new Set<string>()

  for (const project of sortedProjects) {
    for (const marker of markers) {
      if (!usedMarkerIds.has(marker.id) && marker.dateKey <= project.startDate) {
        entries.push({ type: 'marker', marker })
        usedMarkerIds.add(marker.id)
      }
    }

    entries.push({ type: 'project', project })
  }

  for (const marker of markers) {
    if (!usedMarkerIds.has(marker.id)) {
      entries.push({ type: 'marker', marker })
    }
  }

  return entries
})
</script>

<template>
  <div class="relative">
    <div
      class="absolute left-[0.6875rem] top-0 bottom-0 w-px bg-neutral-800 md:hidden"
      aria-hidden="true"
    />

    <div class="space-y-0">
      <article
        v-for="(entry, index) in timelineEntries"
        :key="entry.type === 'project' ? entry.project.slug : entry.marker.id"
        class="grid gap-6 md:grid-cols-[7.5rem_1.5rem_minmax(0,1fr)] md:gap-x-6"
      >
        <div class="hidden pt-1 md:block">
          <time class="block text-right text-sm leading-snug text-neutral-500">
            {{ entry.type === 'project' ? entry.project.year : entry.marker.dateLabel }}
          </time>
        </div>

        <div
          class="relative hidden md:flex md:justify-center"
          :class="index === timelineEntries.length - 1 ? '' : 'md:pb-12'"
        >
          <div
            class="absolute top-0 bottom-0 w-px bg-neutral-800"
            aria-hidden="true"
          />
          <span
            class="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4 ring-neutral-950"
            :style="{ backgroundColor: entry.type === 'project' ? entry.project.brandColor : entry.marker.color }"
            aria-hidden="true"
          />
        </div>

        <div :class="index === timelineEntries.length - 1 ? '' : 'pb-12 md:pb-12'">
          <div class="mb-3 flex items-center gap-3 md:hidden">
            <span
              class="h-2.5 w-2.5 shrink-0 rounded-full"
              :style="{ backgroundColor: entry.type === 'project' ? entry.project.brandColor : entry.marker.color }"
              aria-hidden="true"
            />
            <time class="text-sm text-neutral-500">
              {{ entry.type === 'project' ? entry.project.year : entry.marker.dateLabel }}
            </time>
          </div>

          <div
            v-if="entry.type === 'marker'"
            class="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3"
          >
            <img
              :src="entry.marker.logo"
              :alt="`${entry.marker.label} logo`"
              class="h-8 w-8 rounded object-contain"
            >
            <p class="text-sm font-medium text-neutral-200">
              {{ entry.marker.label }}
            </p>
          </div>
          <ProjectCard
            v-else
            :project="entry.project"
          />
        </div>
      </article>
    </div>
  </div>
</template>
