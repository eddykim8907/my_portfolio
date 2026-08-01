<script setup lang="ts">
import type { Project } from '~/types/project'

const props = withDefaults(
  defineProps<{
    project: Project
    size?: 'card' | 'detail'
  }>(),
  {
    size: 'card',
  },
)

const markClass = computed(() =>
  props.size === 'detail' ? 'h-12 w-auto' : 'h-10 w-auto',
)

const textClass = computed(() =>
  props.size === 'detail' ? 'h-5 w-auto' : 'h-4 w-auto',
)

const containerClass = computed(() =>
  props.size === 'detail' ? 'max-w-[280px]' : 'max-w-[220px]',
)
</script>

<template>
  <div
    class="flex items-center gap-3"
    :class="containerClass"
  >
    <NuxtImg
      :src="project.logo"
      :alt="`${project.name} logo`"
      :class="[markClass, 'shrink-0 object-contain']"
    />
    <NuxtImg
      v-if="project.logoText"
      :src="project.logoText"
      :alt="project.name"
      :class="[textClass, 'shrink-0 object-contain']"
    />
  </div>
</template>
