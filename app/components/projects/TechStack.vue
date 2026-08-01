<script setup lang="ts">
defineProps<{
  items: string[]
  limit?: number
}>()
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li
      v-for="item in limit ? items.slice(0, limit) : items"
      :key="item"
    >
      <UBadge color="neutral" variant="subtle">
        {{ item }}
      </UBadge>
    </li>
    <li v-if="limit && items.length > limit">
      <UBadge color="neutral" variant="outline">
        +{{ items.length - limit }}
      </UBadge>
    </li>
  </ul>
</template>
