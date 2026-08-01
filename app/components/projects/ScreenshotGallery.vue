<script setup lang="ts">
const props = defineProps<{
  images: string[]
  altPrefix: string
}>()

const selectedSrc = ref<string | null>(null)
const isOpen = computed({
  get: () => selectedSrc.value !== null,
  set: (open: boolean) => {
    if (!open) {
      selectedSrc.value = null
    }
  },
})

function openImage(src: string) {
  selectedSrc.value = src
}

function altFor(index: number) {
  return `${props.altPrefix} screenshot ${index + 1}`
}
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <button
      v-for="(src, index) in images"
      :key="src"
      type="button"
      class="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 text-left transition hover:border-neutral-700"
      @click="openImage(src)"
    >
      <NuxtImg
        :src="src"
        :alt="altFor(index)"
        class="aspect-video w-full object-cover object-top transition group-hover:scale-[1.02]"
      />
    </button>
  </div>

  <UModal v-model:open="isOpen">
    <template #content>
      <div class="p-2">
        <NuxtImg
          v-if="selectedSrc"
          :src="selectedSrc"
          :alt="altPrefix"
          class="max-h-[80vh] w-full rounded-lg object-contain"
        />
      </div>
    </template>
  </UModal>
</template>
