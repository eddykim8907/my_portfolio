<script setup lang="ts">
import { siteConfig } from "~/config/site";
</script>

<template>
  <section class="relative overflow-hidden border-b border-neutral-800">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950 to-neutral-950"
      aria-hidden="true"
    />

    <UContainer class="relative py-24 sm:py-32">
      <div class="mx-auto max-w-3xl space-y-8 text-center">
        <p
          class="text-sm font-medium uppercase tracking-widest text-neutral-500"
        >
          {{ siteConfig.title }}
        </p>

        <div class="space-y-4">
          <h1
            class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Hi, I'm {{ siteConfig.name }}.
          </h1>
          <p class="text-xl text-neutral-300 sm:text-2xl">
            {{ siteConfig.tagline }}
          </p>
        </div>

        <p class="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400">
          {{ siteConfig.bio }}
        </p>

        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <UButton to="/projects" size="lg"> View projects </UButton>
          <UButton to="/about" variant="outline" size="lg" color="neutral">
            About me
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>
