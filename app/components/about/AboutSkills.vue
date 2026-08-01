<script setup lang="ts">
const { site } = useSite()
</script>

<template>
  <section class="space-y-3">
    <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
      Skills
    </h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="group in site.skills"
        :key="group.category"
        class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
      >
        <h3 class="mb-3 font-medium text-white">
          {{ group.category }}
        </h3>
        <TechStack :items="[...group.items]" />
      </div>
    </div>
  </section>
</template>
