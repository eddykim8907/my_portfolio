<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-neutral-800">
    <UContainer class="flex h-14 items-center justify-between text-sm text-neutral-500">
      <p>&copy; {{ year }} Eddy</p>
      <p>Built with Nuxt</p>
    </UContainer>
  </footer>
</template>
