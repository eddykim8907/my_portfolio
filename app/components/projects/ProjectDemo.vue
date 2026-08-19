<script setup lang="ts">
import type { Project } from '~/types/project'
import { resolveProjectDemo } from '~/utils/project-demos'

const props = defineProps<{
  project: Project
}>()

const demoComponent = computed(() => resolveProjectDemo(props.project.demo))
</script>

<template>
  <section
    v-if="demoComponent"
    class="space-y-4"
  >
    <div class="space-y-2">
      <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
        Interactive preview
      </h2>
      <p class="text-sm text-neutral-400">
        Reconstructed UI with sample data. Not connected to production systems.
      </p>
    </div>

    <ClientOnly>
      <div class="overflow-hidden rounded-xl">
        <component :is="demoComponent" />
      </div>
      <template #fallback>
        <div class="flex h-48 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 text-sm text-neutral-500">
          Loading preview…
        </div>
      </template>
    </ClientOnly>
  </section>
</template>
