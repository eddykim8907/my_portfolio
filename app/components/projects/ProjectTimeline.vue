<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <div class="relative">
    <div
      class="absolute left-[0.6875rem] top-0 bottom-0 w-px bg-neutral-800 md:hidden"
      aria-hidden="true"
    />

    <div class="space-y-0">
      <ProjectTimelineItem
        v-for="(project, index) in projects"
        :key="project.slug"
        :project="project"
        :is-last="index === projects.length - 1"
      />
    </div>
  </div>
</template>
