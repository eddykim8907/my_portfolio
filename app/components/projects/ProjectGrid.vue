<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <ProjectCard
      v-for="project in projects"
      :key="project.slug"
      :project="project"
    />
  </div>
</template>
