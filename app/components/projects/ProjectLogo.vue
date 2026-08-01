<script setup lang="ts">
import type { Project } from '~/types/project'

const props = withDefaults(
  defineProps<{
    project: Project
    size?: 'card' | 'detail' | 'hero'
  }>(),
  {
    size: 'card',
  },
)

const hasSplitLockup = computed(() => Boolean(props.project.logoText))

const markClass = computed(() => {
  if (props.size === 'detail') {
    return 'h-12 w-auto'
  }

  if (props.size === 'hero') {
    if (hasSplitLockup.value) {
      return 'h-12 w-12 shrink-0 object-contain'
    }

    return 'max-h-10 max-w-[min(100%,220px)] h-auto w-auto object-contain'
  }

  return 'h-10 w-auto'
})

const textClass = computed(() => {
  if (props.size === 'detail') {
    return 'h-5 w-auto'
  }

  if (props.size === 'hero') {
    if (hasSplitLockup.value) {
      return 'h-5 w-auto max-w-[min(100%,200px)] object-contain'
    }

    return 'max-h-4 max-w-[min(100%,160px)] h-auto w-auto object-contain'
  }

  return 'h-4 w-auto'
})

const containerClass = computed(() => {
  if (props.size === 'detail') {
    return 'max-w-[280px]'
  }

  if (props.size === 'hero') {
    return hasSplitLockup.value
      ? 'max-w-full justify-center gap-3 px-1'
      : 'max-w-full justify-center gap-2.5 px-1'
  }

  return 'max-w-[220px]'
})
</script>

<template>
  <div
    class="flex items-center gap-3"
    :class="containerClass"
  >
    <img
      :src="project.logo"
      :alt="`${project.name} logo`"
      :class="[markClass, 'shrink-0 object-contain']"
    >
    <img
      v-if="project.logoText"
      :src="project.logoText"
      :alt="project.name"
      :class="[textClass, 'shrink-0 object-contain']"
    >
  </div>
</template>
