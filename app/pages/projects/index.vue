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
  description: 'GS Land and Forsit projects: B2C sites, internal tools, brand portals, and creator platforms.',
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
          Seven projects at GS Land and Forsit: B2C sites, internal tools,
          brand portals, and creator platforms.
        </p>
      </div>

      <section class="space-y-4">
        <h2 class="flex items-center gap-2.5 text-sm font-medium uppercase tracking-widest text-neutral-500">
          <img
            src="/projects/gs-land/logo.svg"
            alt=""
            class="h-7 w-7 shrink-0 rounded-md object-contain"
          >
          GS Land
        </h2>
        <ProjectGrid :projects="gsLandProjects" />
      </section>

      <section class="space-y-4">
        <h2 class="flex items-center gap-2.5 text-sm font-medium uppercase tracking-widest text-neutral-500">
          <img
            src="/projects/forsit/forsit-logo.png"
            alt=""
            class="h-7 w-7 shrink-0 rounded-md object-contain"
          >
          Forsit
        </h2>
        <ProjectGrid :projects="forsitProjects" />
      </section>
    </div>
  </UContainer>
</template>
