<script setup lang="ts">
const route = useRoute();
const slug = computed(() => route.params.slug as string);
const { project } = useProject(slug);

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
  });
}

const galleryImages = computed(() =>
  project.value?.demo ? [] : (project.value?.screenshots ?? []),
)

const showHero = computed(() => project.value?.hero && !project.value?.demo)

usePortfolioSeo({
  title: () => project.value!.name,
  description: () => project.value!.tagline,
  ogImage: () => project.value!.hero ?? undefined,
});
</script>

<template>
  <UContainer v-if="project" class="py-16">
    <div
      class="mx-auto space-y-12"
      :class="project.demo ? 'max-w-5xl' : 'max-w-4xl'"
    >
      <div>
        <UButton to="/projects" variant="ghost" color="neutral" class="mb-8">
          ← All projects
        </UButton>

        <div
          v-if="showHero"
          class="mb-10 overflow-hidden rounded-xl border border-neutral-800"
        >
          <NuxtImg
            :src="project.hero"
            :alt="`${project.name} hero screenshot`"
            class="aspect-video w-full object-cover object-top"
            priority
          />
        </div>

        <div class="mb-6">
          <ProjectLogo :project="project" size="detail" />
        </div>

        <div
          class="mb-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500"
        >
          <span
            class="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1"
          >
            <span
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: project.brandColor }"
            />
            {{ project.status }}
          </span>
          <span>{{ project.year }}</span>
          <span>{{ project.role }}</span>
        </div>

        <h1 class="text-3xl font-bold text-white sm:text-4xl">
          {{ project.name }}
        </h1>
        <p class="mt-4 text-lg text-neutral-400">
          {{ project.tagline }}
        </p>
      </div>

      <ProjectDemo
        v-if="project.demo"
        :project="project"
      />

      <section v-if="galleryImages.length" class="space-y-4">
        <h2
          class="text-sm font-medium uppercase tracking-widest text-neutral-500"
        >
          Screenshots
        </h2>
        <ScreenshotGallery :images="galleryImages" :alt-prefix="project.name" />
      </section>

      <section class="space-y-4">
        <h2
          class="text-sm font-medium uppercase tracking-widest text-neutral-500"
        >
          Highlights
        </h2>
        <ul class="space-y-3">
          <li
            v-for="highlight in project.highlights"
            :key="highlight"
            class="flex gap-3 text-neutral-300"
          >
            <span
              class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              :style="{ backgroundColor: project.brandColor }"
            />
            <span>{{ highlight }}</span>
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2
          class="text-sm font-medium uppercase tracking-widest text-neutral-500"
        >
          Stack
        </h2>
        <TechStack :items="project.stack" />
      </section>
    </div>
  </UContainer>
</template>
