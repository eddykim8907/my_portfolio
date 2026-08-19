<script setup lang="ts">
const { featuredProjects } = useProjects()
</script>

<template>
  <section
    id="projects"
    class="py-20 sm:py-24"
  >
    <UContainer>
      <div class="mx-auto max-w-4xl space-y-12">
        <div class="space-y-3 text-center sm:text-left">
          <p class="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Selected work
          </p>
          <h2 class="text-3xl font-bold text-white sm:text-4xl">
            Project timeline
          </h2>
          <p class="mx-auto max-w-xl text-neutral-400 sm:mx-0">
            Seven products I've worked on, including small B2C launches,
            internal ops consoles, and creator campaign platforms.
          </p>
        </div>

        <ProjectTimeline :projects="featuredProjects" />
      </div>
    </UContainer>
  </section>
</template>
