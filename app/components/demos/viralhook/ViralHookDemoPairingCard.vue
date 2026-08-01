<script setup lang="ts">
import type {
  ViralHookPairingItem,
  ViralHookPartnerPairingRow,
} from '~/data/demos/viralhook'
import {
  formatViralHookMonth,
  viralHookDecisionContentLabel,
  viralHookMissingProductSvg,
  viralHookPairingStatusStyle,
  viralHookPlatformIcon,
  viralHookProfileInitials,
} from '~/data/demos/viralhook'

const props = defineProps<{
  pairing: ViralHookPairingItem
  creator: ViralHookPartnerPairingRow
}>()

const emit = defineEmits<{
  click: [pairing: ViralHookPairingItem]
}>()

const statusStyle = computed(() => viralHookPairingStatusStyle(props.pairing.status))

const cardTheme = computed(() => {
  switch (props.pairing.status) {
    case 'Pairing Confirm':
      return { accent: '#60a5fa', overlay: 'rgba(59,130,246,0.14)', border: 'rgba(96,165,250,0.45)' }
    case 'Pending':
      return { accent: '#fb923c', overlay: 'rgba(249,115,22,0.14)', border: 'rgba(251,146,60,0.45)' }
    case 'On Campaign':
      return { accent: '#34d399', overlay: 'rgba(16,185,129,0.14)', border: 'rgba(52,211,153,0.45)' }
    case 'Reject':
      return { accent: '#f87171', overlay: 'rgba(239,68,68,0.14)', border: 'rgba(248,113,113,0.45)' }
    default:
      return { accent: '#a1a1aa', overlay: 'rgba(161,161,170,0.1)', border: 'rgba(161,161,170,0.3)' }
  }
})

const isClickable = computed(() => Boolean(props.pairing.status))
const missingProductSvg = computed(() =>
  viralHookMissingProductSvg(statusStyle.value.strokeColor),
)

function handleClick() {
  if (isClickable.value) {
    emit('click', props.pairing)
  }
}
</script>

<template>
  <button
    type="button"
    class="vh-pairing-card group relative h-[82.5px] w-[176px] shrink-0 overflow-hidden rounded-lg p-[7px] text-left transition-all duration-200 ease-out"
    :class="isClickable
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)] active:translate-y-0'
      : 'cursor-default'"
    :style="{
      '--vh-accent': cardTheme.accent,
      '--vh-overlay': cardTheme.overlay,
      '--vh-border': cardTheme.border,
    }"
    @click="handleClick"
  >
    <div class="relative flex h-[68.5px] flex-col justify-between">
      <div class="flex h-5 items-center justify-between gap-1">
        <div class="flex min-w-0 items-center gap-1.5">
          <span
            class="flex h-[14px] w-[14px] shrink-0 items-center justify-center"
            :class="statusStyle.text"
          >
            <svg
              v-if="pairing.status === 'Pairing Confirm'"
              class="h-[14px] w-[14px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <svg
              v-else-if="pairing.status === 'Pending'"
              class="h-[14px] w-[14px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
            </svg>
            <svg
              v-else-if="pairing.status === 'On Campaign'"
              class="h-[14px] w-[14px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 11V9h2v6h-2v-3.41zM13 7h5v2h-3v4h-2V7z" />
            </svg>
            <svg
              v-else-if="pairing.status === 'Reject'"
              class="h-[14px] w-[14px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>
            <svg
              v-else
              class="h-[14px] w-[14px] opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" stroke-dasharray="3 2" />
            </svg>
          </span>

          <img
            :src="viralHookPlatformIcon(pairing.decision_info.decision_channel)"
            :alt="pairing.decision_info.decision_channel"
            class="h-[15.75px] w-[15.75px] shrink-0 drop-shadow-sm"
            draggable="false"
          >

          <span class="truncate text-[10.5px] font-medium tracking-wide text-zinc-100">
            {{ viralHookDecisionContentLabel(pairing.decision_info.decision_content) }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1 pl-1">
          <span class="text-[8px] tabular-nums text-zinc-500">
            {{ formatViralHookMonth(creator.added_at) }}
          </span>
          <div
            v-if="pairing.added_by"
            class="flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-zinc-500 to-zinc-600 text-[6px] font-semibold text-white ring-1 ring-zinc-800"
          >
            {{ viralHookProfileInitials(pairing.added_by) }}
          </div>
        </div>
      </div>

      <div class="flex h-8 items-center gap-2.5">
        <div class="vh-product-thumb flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-zinc-900/80 ring-1 ring-white/5">
          <div
            class="h-full w-full"
            v-html="missingProductSvg"
          />
        </div>
        <div class="relative min-w-0 flex-1 pr-3">
          <p class="truncate text-[10.25px] font-medium leading-tight text-zinc-400">
            {{ pairing.product_info.product_name }}
          </p>
          <p class="truncate text-[12.25px] font-bold leading-tight tracking-tight text-white">
            {{ pairing.product_info.asin }}
          </p>
          <svg
            class="absolute right-0 bottom-0.5 h-2.5 w-2.5 text-zinc-600 transition-colors group-hover:text-zinc-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.vh-pairing-card {
  background: linear-gradient(155deg, rgb(28 28 31) 0%, rgb(9 9 11) 100%);
  border: 1px solid color-mix(in srgb, var(--vh-border) 55%, rgb(63 63 70));
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.vh-pairing-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--vh-overlay);
  pointer-events: none;
}

.vh-pairing-card::after {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 0;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--vh-accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--vh-accent) 45%, transparent);
}

.vh-pairing-card:hover::after {
  box-shadow: 0 0 16px color-mix(in srgb, var(--vh-accent) 65%, transparent);
}

.vh-product-thumb :deep(svg) {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
