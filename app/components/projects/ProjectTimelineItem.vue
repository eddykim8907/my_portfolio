<script setup lang="ts">
import type { Project } from '~/types/project'
import { formatTimelineRange } from '~/utils/project-timeline'

defineProps<{
  project: Project
  isLast?: boolean
}>()
</script>

<template>
  <article class="grid gap-6 md:grid-cols-[7.5rem_1.5rem_minmax(0,1fr)] md:gap-x-6">
    <div class="hidden pt-1 md:block">
      <time
        :datetime="`${project.startDate}/${project.endDate}`"
        class="block text-right text-sm leading-snug text-neutral-500"
      >
        {{ formatTimelineRange(project) }}
      </time>
    </div>

    <div
      class="relative hidden md:flex md:justify-center"
      :class="isLast ? '' : 'md:pb-12'"
    >
      <div
        class="absolute top-0 bottom-0 w-px bg-neutral-800"
        aria-hidden="true"
      />
      <span
        class="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4 ring-neutral-950"
        :style="{ backgroundColor: project.brandColor }"
        aria-hidden="true"
      />
    </div>

    <div :class="isLast ? '' : 'pb-12 md:pb-12'">
      <div class="mb-3 flex items-center gap-3 md:hidden">
        <span
          class="h-2.5 w-2.5 shrink-0 rounded-full"
          :style="{ backgroundColor: project.brandColor }"
          aria-hidden="true"
        />
        <time
          :datetime="`${project.startDate}/${project.endDate}`"
          class="text-sm text-neutral-500"
        >
          {{ formatTimelineRange(project) }}
        </time>
      </div>

      <ProjectCard :project="project" />
    </div>
  </article>
</template>
