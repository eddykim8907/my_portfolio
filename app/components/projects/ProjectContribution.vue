<script setup lang="ts">
import type { Project } from '~/types/project'

const props = defineProps<{
  project: Project
}>()

const groups = computed(() => {
  if (props.project.contributionGroups?.length) {
    return props.project.contributionGroups
  }

  if (props.project.contribution?.length) {
    return [{ title: '', items: props.project.contribution }]
  }

  return []
})
</script>

<template>
  <section
    v-if="groups.length"
    class="space-y-6"
  >
    <h2 class="text-sm font-medium uppercase tracking-widest text-neutral-500">
      My contribution
    </h2>

    <div
      v-for="group in groups"
      :key="group.title || 'contribution'"
      class="space-y-3"
    >
      <h3
        v-if="group.title"
        class="text-sm font-medium text-white"
      >
        {{ group.title }}
      </h3>
      <ul class="space-y-3">
        <li
          v-for="item in group.items"
          :key="item"
          class="flex gap-3 text-neutral-300"
        >
          <span
            class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            :style="{ backgroundColor: project.brandColor }"
          />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
