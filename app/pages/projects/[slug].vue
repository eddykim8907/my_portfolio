<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

useSeoMeta({
  title: () => `${slug.value} — Projects`,
})
</script>

<template>
  <UContainer class="py-16">
    <div class="mx-auto max-w-3xl space-y-4 text-center">
      <h1 class="text-3xl font-bold capitalize text-white">
        {{ slug }}
      </h1>
      <p class="text-neutral-400">
        Case study page — content coming in Phase 2.
      </p>
      <UButton to="/projects" variant="ghost" color="neutral">
        Back to projects
      </UButton>
    </div>
  </UContainer>
</template>
