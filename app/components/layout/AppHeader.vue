<script setup lang="ts">
const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header class="border-b border-neutral-800">
    <UContainer class="flex h-16 items-center justify-between">
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-white transition hover:text-neutral-300"
      >
        Eddy
      </NuxtLink>

      <nav class="flex items-center gap-6">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-neutral-400 transition hover:text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </UContainer>
  </header>
</template>
