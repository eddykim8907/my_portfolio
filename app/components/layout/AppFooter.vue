<script setup lang="ts">
const { site } = useSite()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-neutral-800">
    <UContainer class="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-neutral-500">
        &copy; {{ year }} {{ site.name }}
      </p>

      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <a
          v-for="link in site.social"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-500 transition hover:text-white"
        >
          {{ link.label }}
        </a>
      </div>
    </UContainer>
  </footer>
</template>
