<script setup lang="ts">
const { site } = useSite()

usePortfolioSeo({
  title: 'About',
  description: `About ${site.name} - ${site.title}. ${site.bio}`,
})
</script>

<template>
  <UContainer class="py-16 sm:py-20">
    <div class="mx-auto max-w-3xl space-y-12">
      <header class="space-y-4">
        <p class="text-sm font-medium uppercase tracking-widest text-neutral-500">
          About
        </p>
        <h1 class="text-3xl font-bold text-white sm:text-4xl">
          {{ site.name }}
        </h1>
        <p class="text-lg text-neutral-300">
          {{ site.title }}
          <span class="text-neutral-600">·</span>
          {{ site.location }}
        </p>
      </header>

      <section class="space-y-4">
        <p
          v-for="(paragraph, index) in site.about.paragraphs"
          :key="index"
          class="text-lg leading-relaxed text-neutral-400"
        >
          {{ paragraph }}
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
          {{ site.about.aiAssisted.title }}
        </h2>
        <p class="text-lg leading-relaxed text-neutral-400">
          {{ site.about.aiAssisted.paragraph }}
        </p>
      </section>

      <AboutSkills />

      <section class="flex flex-wrap gap-3 border-t border-neutral-800 pt-10">
        <UButton
          to="/projects"
          variant="outline"
          color="neutral"
          size="lg"
        >
          View projects
        </UButton>
      </section>

      <section class="space-y-4">
        <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Contact
        </h2>
        <ul class="flex flex-wrap gap-4">
          <li
            v-for="link in site.social"
            :key="link.label"
          >
            <a
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition hover:text-white hover:decoration-neutral-500"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </section>
    </div>
  </UContainer>
</template>
