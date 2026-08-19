<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div
    v-if="project.stackGroups?.length"
    class="space-y-4"
  >
    <div
      v-for="group in project.stackGroups"
      :key="group.category"
      class="space-y-2"
    >
      <p class="text-xs font-medium uppercase tracking-widest text-neutral-500">
        {{ group.category }}
      </p>
      <TechStack :items="group.items" />
    </div>
  </div>
  <TechStack
    v-else
    :items="project.stack"
  />
</template>
