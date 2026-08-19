<script setup lang="ts">
import type { Project } from "~/types/project";

defineProps<{
  project: Project;
}>();
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 transition hover:border-neutral-700 hover:bg-neutral-900"
    :style="{ '--project-accent': project.brandColor }"
  >
    <div
      v-if="project.demo || project.hero || project.logoText"
      class="flex h-24 items-center justify-center border-b border-neutral-800 px-4 sm:h-28"
      :style="{
        background: `linear-gradient(145deg, color-mix(in srgb, ${project.brandColor} 22%, transparent) 0%, transparent 55%)`,
      }"
    >
      <ProjectLogo
        :project="project"
        size="hero"
        class="transition duration-300 group-hover:scale-[1.02]"
      />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          class="h-2 w-2 rounded-full"
          :style="{ backgroundColor: project.brandColor }"
        />
        <span
          class="text-xs font-medium uppercase tracking-wide text-neutral-500"
        >
          {{ project.status }}
        </span>
        <span class="text-neutral-700">·</span>
        <span class="text-xs text-neutral-400">
          {{ project.role }}
        </span>
      </div>

      <h2
        class="mb-2 text-xl font-semibold text-white group-hover:text-[var(--project-accent)]"
      >
        {{ project.name }}
      </h2>

      <p class="flex-1 text-sm leading-relaxed text-neutral-400">
        {{ project.tagline }}
      </p>
      <p
        v-if="project.highlight"
        class="mt-3 text-sm leading-relaxed text-neutral-300"
      >
        {{ project.highlight }}
      </p>

      <div class="mt-5">
        <TechStack :items="project.stack" :limit="4" />
      </div>
    </div>
  </NuxtLink>
</template>
