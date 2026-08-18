<script setup lang="ts">
const { projectsByOrder } = useProjects()
const gsLandProjects = computed(() =>
  projectsByOrder.value.filter((project) => project.slug.startsWith('gs-land-')),
)
const forsitProjects = computed(() =>
  projectsByOrder.value.filter((project) => !project.slug.startsWith('gs-land-')),
)

usePortfolioSeo({
  title: 'Projects',
  description: 'GS Land and Forsit projects: web products from B2C launches to internal ops and creator platforms.',
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
          Seven projects across GS Land and Forsit, from B2C web launches to internal
          tools, brand portals, and creator platforms.
        </p>
      </div>

      <section class="space-y-4">
        <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
          GS Land
        </h2>
        <ProjectGrid :projects="gsLandProjects" />
      </section>

      <section class="space-y-4">
        <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Forsit
        </h2>
        <ProjectGrid :projects="forsitProjects" />
      </section>
    </div>
  </UContainer>
</template>
