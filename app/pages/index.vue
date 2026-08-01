<script setup lang="ts">
useSeoMeta({
  title: 'Eddy Portfolio',
  description:
    'Full-stack developer portfolio — Bloomkare, Compass, ForsitHub, and ViralHook.',
})
</script>

<template>
  <UContainer class="py-20">
    <section class="mx-auto max-w-3xl space-y-6 text-center">
      <p class="text-sm font-medium uppercase tracking-widest text-neutral-500">
        Portfolio
      </p>
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Full-stack product work
      </h1>
      <p class="text-lg text-neutral-400">
        Showcasing Bloomkare, Compass, ForsitHub, and ViralHook — creator platforms,
        brand portals, and internal ops tools built with Nuxt and Vue.
      </p>
      <div class="flex flex-wrap justify-center gap-3 pt-4">
        <UButton to="/projects" size="lg">
          View projects
        </UButton>
        <UButton to="/about" variant="outline" size="lg" color="neutral">
          About me
        </UButton>
      </div>
    </section>
  </UContainer>
</template>
