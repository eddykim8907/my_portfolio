<script setup lang="ts">
const { featuredProjects } = useProjects();
</script>

<template>
  <section class="py-20 sm:py-24">
    <UContainer>
      <div class="mx-auto max-w-5xl space-y-12">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div class="space-y-3">
            <p
              class="text-sm font-medium uppercase tracking-widest text-neutral-500"
            >
              Selected work
            </p>
            <h2 class="text-3xl font-bold text-white sm:text-4xl">
              Featured projects
            </h2>
            <p class="max-w-xl text-neutral-400">
              Four products I've helped build — from creator campaign platforms
              to client-facing brand dashboards and internal ops tools.
            </p>
          </div>

          <UButton
            to="/projects"
            variant="ghost"
            color="neutral"
            class="shrink-0 self-start sm:self-auto"
          >
            View all →
          </UButton>
        </div>

        <ProjectGrid :projects="featuredProjects" />
      </div>
    </UContainer>
  </section>
</template>
