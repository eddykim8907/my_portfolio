<script setup lang="ts">
const props = defineProps<{
  /** Extra classes for the scroll container */
  class?: string
}>()

const root = ref<HTMLElement | null>(null)

useScrollChain(root)
</script>

<template>
  <div
    ref="root"
    class="min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable]"
    :class="props.class"
  >
    <slot />
  </div>
</template>
