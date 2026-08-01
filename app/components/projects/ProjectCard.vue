<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  project: Project
}>()
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 transition hover:border-neutral-700 hover:bg-neutral-900"
    :style="{ '--project-accent': project.brandColor }"
  >
    <div
      v-if="project.hero"
      class="overflow-hidden border-b border-neutral-800"
    >
      <NuxtImg
        :src="project.hero"
        :alt="`${project.name} preview`"
        class="aspect-video w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
      />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="mb-5">
        <ProjectLogo :project="project" size="card" />
      </div>

      <div class="mb-3 flex items-center gap-2">
        <span
          class="h-2 w-2 rounded-full"
          :style="{ backgroundColor: project.brandColor }"
        />
        <span class="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {{ project.status }}
        </span>
      </div>

      <h2 class="mb-2 text-xl font-semibold text-white group-hover:text-[var(--project-accent)]">
        {{ project.name }}
      </h2>

      <p class="mb-5 flex-1 text-sm leading-relaxed text-neutral-400">
        {{ project.tagline }}
      </p>

      <TechStack :items="project.stack" :limit="4" />
    </div>
  </NuxtLink>
</template>
