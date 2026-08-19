<script setup lang="ts">
import type { BloomkareQueueItem } from '~/data/demos/bloomkare'
import {
  bloomkareRiskClass,
  formatBloomkareFollowers,
  formatBloomkareRelativeTime,
} from '~/data/demos/bloomkare'

defineProps<{
  item: BloomkareQueueItem | null
}>()

const emit = defineEmits<{
  close: []
}>()

function title(item: BloomkareQueueItem) {
  return item.row.displayName
}

function subtitle(item: BloomkareQueueItem) {
  return item.row.handle
}
</script>

<template>
  <Transition
    appear
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="item"
      type="button"
      class="absolute inset-0 z-20 bg-black/45"
      aria-label="Close detail"
      @click="emit('close')"
    />
  </Transition>

  <Transition
    appear
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <aside
      v-if="item"
      class="absolute inset-y-0 right-0 z-30 flex w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-2xl"
      @click.stop
    >
      <div class="flex shrink-0 items-start justify-between gap-3 border-b border-neutral-200 px-4 py-3">
        <div class="min-w-0">
          <p class="text-xs capitalize text-neutral-500">
            {{ item.kind }} queue
          </p>
          <h4 class="truncate text-base font-semibold text-neutral-900">
            {{ title(item) }}
          </h4>
          <p class="truncate text-sm text-neutral-500">
            {{ subtitle(item) }}
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-md px-2 py-1 text-sm text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <DemoScrollArea>
        <div class="space-y-5 p-4">
          <div class="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              :class="item.row.avatarTone"
            >
              {{ item.row.initials }}
            </span>
            <div class="min-w-0">
              <p class="font-semibold text-neutral-900">
                {{ item.row.displayName }}
              </p>
              <p class="text-sm text-[#EE5FA4]">
                {{ item.row.handle }}
              </p>
            </div>
          </div>

          <template v-if="item.kind === 'application'">
            <div class="flex flex-wrap gap-2">
              <span :class="bloomkareRiskClass(item.row.risk)">
                {{ item.row.risk }} risk
              </span>
              <span class="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
                #{{ item.row.niche }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-neutral-200 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                  Followers
                </p>
                <p class="mt-1 text-lg font-semibold text-neutral-900">
                  {{ formatBloomkareFollowers(item.row.followers) }}
                </p>
              </div>
              <div class="rounded-xl border border-neutral-200 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                  Applied
                </p>
                <p class="mt-1 text-lg font-semibold text-neutral-900">
                  {{ formatBloomkareRelativeTime(item.row.appliedAt) }}
                </p>
              </div>
            </div>
            <div class="rounded-xl border border-neutral-200 p-4">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                Campaign
              </p>
              <p class="mt-1 font-semibold text-neutral-900">
                {{ item.row.campaignName }}
              </p>
            </div>
          </template>

          <template v-else-if="item.kind === 'submission'">
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-neutral-200 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                  Platform
                </p>
                <p class="mt-1 text-lg font-semibold text-neutral-900">
                  {{ item.row.platform }}
                </p>
              </div>
              <div class="rounded-xl border border-neutral-200 p-3">
                <p class="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                  Submitted
                </p>
                <p class="mt-1 text-lg font-semibold text-neutral-900">
                  {{ formatBloomkareRelativeTime(item.row.submittedAt) }}
                </p>
              </div>
            </div>
            <div class="rounded-xl border border-neutral-200 p-4">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                Campaign
              </p>
              <p class="mt-1 font-semibold text-neutral-900">
                {{ item.row.campaignName }}
              </p>
            </div>
          </template>

          <template v-else>
            <span :class="bloomkareRiskClass(item.row.risk)">
              {{ item.row.risk }} risk
            </span>
            <div class="rounded-xl border border-red-100 bg-red-50 p-4">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-red-400">
                Flag reason
              </p>
              <p class="mt-1 text-sm leading-relaxed text-red-800">
                {{ item.row.reason }}
              </p>
            </div>
          </template>

          <p class="text-xs leading-relaxed text-neutral-400">
            Sample admin Operations data. Not connected to production Bloomkare.
          </p>
        </div>
      </DemoScrollArea>
    </aside>
  </Transition>
</template>
