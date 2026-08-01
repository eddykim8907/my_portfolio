<script setup lang="ts">
import type { ViralHookPartnerPairingRow } from '~/data/demos/viralhook'
import {
  formatViralHookFollowers,
  viralHookPlatformIcon,
  viralHookTierStyle,
} from '~/data/demos/viralhook'

defineProps<{
  creator: ViralHookPartnerPairingRow
}>()

const emit = defineEmits<{
  click: [creator: ViralHookPartnerPairingRow]
}>()
</script>

<template>
  <button
    type="button"
    class="vh-handle-card group relative h-[82.5px] w-[176px] cursor-pointer overflow-hidden rounded-lg p-[7px] text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)] active:translate-y-0"
    @click="emit('click', creator)"
  >
    <div class="relative flex h-[68.5px] flex-col justify-between">
      <div class="flex h-4 items-center justify-between">
        <span class="text-[10.5px] font-medium tracking-wide text-zinc-500">
          {{ creator.creator_code }}
        </span>
        <svg
          class="h-3 w-3 text-zinc-600 opacity-0 transition-opacity group-hover:text-zinc-400 group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </div>

      <div class="flex h-[15px] items-center gap-[3.5px]">
        <span class="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[4px] bg-zinc-900 ring-1 ring-white/5">
          <img
            :src="viralHookPlatformIcon('tiktok')"
            alt="TikTok"
            class="h-[13px] w-[13px]"
            draggable="false"
          >
        </span>
        <span class="w-[150px] truncate text-[12.25px] font-semibold leading-none tracking-tight text-white">
          {{ creator.tiktok_handle }}
        </span>
      </div>

      <div class="flex h-5 w-full items-center justify-between gap-2">
        <div
          class="relative flex h-[22px] min-w-[60px] items-center justify-center rounded-md px-1.5 shadow-sm ring-1 ring-black/20"
          :class="viralHookTierStyle(creator.tiktok_tier).bg"
        >
          <svg
            class="absolute left-1 h-3 w-3 text-white/90"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              v-if="viralHookTierStyle(creator.tiktok_tier).starFilled"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            />
            <path
              v-else
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <span class="pl-[17.5px] text-[10px] leading-none tracking-wide text-white">
            {{ creator.tiktok_tier }}
          </span>
        </div>

        <div class="flex items-center gap-1 rounded-md bg-zinc-900/90 px-1.5 py-0.5 text-zinc-400 ring-1 ring-zinc-700/80">
          <svg
            class="h-3 w-3 shrink-0 text-zinc-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span class="text-[11px] font-medium tabular-nums leading-none">
            {{ formatViralHookFollowers(creator.tiktok_follower) }}
          </span>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.vh-handle-card {
  background: linear-gradient(155deg, rgb(32 32 36) 0%, rgb(12 12 14) 100%);
  border: 1px solid rgb(63 63 70 / 0.75);
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.vh-handle-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 42%);
  pointer-events: none;
}

.vh-handle-card:hover {
  border-color: rgb(82 82 91 / 0.9);
}
</style>
