<script setup lang="ts">
const { projects } = useProjects()

useSeoMeta({
  title: 'Projects',
  description: 'Bloomkare, Compass, ForsitHub, and ViralHook.',
})
</script>

<template>
  <UContainer class="py-16">
    <div class="mx-auto max-w-5xl space-y-10">
      <div class="mx-auto max-w-2xl space-y-4 text-center">
        <p class="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Work
        </p>
        <h1 class="text-3xl font-bold text-white sm:text-4xl">
          Projects
        </h1>
        <p class="text-neutral-400">
          Four products built at Forsit — creator platforms, brand portals, and
          internal ops tools.
        </p>
      </div>

      <ProjectGrid :projects="projects" />
    </div>
  </UContainer>
</template>
