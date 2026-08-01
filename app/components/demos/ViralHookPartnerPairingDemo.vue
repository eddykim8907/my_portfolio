<script setup lang="ts">
import type {
  ViralHookPairingItem,
  ViralHookPartnerPairingRow,
} from '~/data/demos/viralhook'
import {
  formatViralHookCurrency,
  formatViralHookMonth,
  viralhookDemoCreators,
  viralHookMissingProductSvg,
  viralHookPairingStatusStyle,
} from '~/data/demos/viralhook'

const viewMode = ref<'grid' | 'table'>('grid')
const selectedCreator = ref<ViralHookPartnerPairingRow | null>(null)
const selectedPairing = ref<{
  pairing: ViralHookPairingItem
  creator: ViralHookPartnerPairingRow
} | null>(null)

const drawerOpen = computed(() => Boolean(selectedCreator.value || selectedPairing.value))

function openCreator(creator: ViralHookPartnerPairingRow) {
  selectedPairing.value = null
  selectedCreator.value = creator
}

function openPairing(pairing: ViralHookPairingItem, creator: ViralHookPartnerPairingRow) {
  if (!pairing.status) {
    return
  }

  selectedCreator.value = null
  selectedPairing.value = { pairing, creator }
}

function openPairingFromCreator(pairing: ViralHookPairingItem) {
  if (!selectedCreator.value) {
    return
  }

  openPairing(pairing, selectedCreator.value)
}

function closeDetail() {
  selectedPairing.value = null
  selectedCreator.value = null
}
</script>

<template>
  <div
    class="vh-demo flex h-[min(720px,75vh)] min-h-0 items-stretch overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-200 shadow-xl shadow-black/40"
    style="font-family: Inter, ui-sans-serif, system-ui, sans-serif"
  >
    <ViralHookDemoSidebar />

    <!-- Main -->
    <div class="relative flex min-h-0 min-w-0 flex-1 flex-col">
      <header class="vh-page-header z-10 flex shrink-0 items-center justify-between px-4 py-3.5">
        <div class="flex items-center gap-2">
          <h3 class="text-base font-bold tracking-tight text-white">
            Partner Pairing
          </h3>
          <span class="vh-count-tag inline-flex h-[22px] min-w-[22px] items-center justify-center px-1.5 text-[10.5px] font-medium leading-none tabular-nums">
            {{ viralhookDemoCreators.length }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <div class="vh-segmented inline-flex rounded-lg p-0.5">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150"
              :class="viewMode === 'table'
                ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-white/10'
                : 'text-zinc-500 hover:text-zinc-300'"
              title="Table view"
              @click="viewMode = 'table'"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150"
              :class="viewMode === 'grid'
                ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-white/10'
                : 'text-zinc-500 hover:text-zinc-300'"
              title="Grid view"
              @click="viewMode = 'grid'"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            class="vh-icon-btn flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all duration-150 hover:text-zinc-200"
            title="Refresh"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
        </div>
      </header>

      <DemoScrollArea
        v-if="viewMode === 'grid'"
        class="bg-zinc-900 pb-3.5 pr-3.5 pt-3.5"
      >
        <div class="flex flex-col gap-3.5">
          <div
            v-for="creator in viralhookDemoCreators"
            :key="creator.id"
            class="vh-creator-row border-b-2 border-zinc-700 pb-0 last:border-b-0"
          >
            <div class="flex w-full gap-0">
              <div class="vh-handle-container relative shrink-0 pr-0">
                <ViralHookDemoHandleCard
                  :creator="creator"
                  @click="openCreator"
                />
              </div>

              <div class="min-w-0 flex-1 overflow-x-auto">
                <div class="flex w-max gap-[21px] px-3 pb-4 pt-2">
                  <ViralHookDemoPairingCard
                    v-for="pairing in creator.pairing_items"
                    :key="pairing.item_id"
                    :pairing="pairing"
                    :creator="creator"
                    @click="openPairing($event, creator)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoScrollArea>

      <DemoScrollArea
        v-else
        class="bg-zinc-900 p-3.5"
      >
        <div class="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950">
          <table class="min-w-full text-left text-xs">
            <thead class="border-b border-zinc-700 text-zinc-400">
              <tr>
                <th class="px-4 py-2 font-medium">
                  Creator
                </th>
                <th class="px-4 py-2 font-medium">
                  Tier
                </th>
                <th class="px-4 py-2 font-medium">
                  Dealmaking
                </th>
                <th class="px-4 py-2 font-medium">
                  Per post
                </th>
                <th class="px-4 py-2 font-medium">
                  Pairings
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-800">
              <tr
                v-for="creator in viralhookDemoCreators"
                :key="creator.id"
                class="cursor-pointer transition hover:bg-zinc-900"
                @click="openCreator(creator)"
              >
                <td class="px-4 py-3">
                  <p class="font-medium text-white">
                    {{ creator.tiktok_handle }}
                  </p>
                  <p class="text-zinc-500">
                    {{ creator.creator_code }}
                  </p>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex rounded px-2 py-0.5 text-[10px] font-medium text-white"
                    :class="creator.tiktok_tier === 'Nano' ? 'bg-gray-500' : creator.tiktok_tier === 'Macro 1' ? 'bg-red-500' : 'bg-sky-500'"
                  >
                    {{ creator.tiktok_tier }}
                  </span>
                </td>
                <td class="px-4 py-3 text-zinc-400">
                  {{ creator.dealmaking_code }}
                </td>
                <td class="px-4 py-3 font-medium text-zinc-200">
                  {{ formatViralHookCurrency(creator.per_post) }}
                </td>
                <td class="px-4 py-3 text-zinc-400">
                  {{ creator.pairing_items.length }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DemoScrollArea>

      <!-- Detail panel -->
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
          v-if="drawerOpen"
          type="button"
          class="absolute inset-0 z-20 bg-black/50"
          aria-label="Close detail panel"
          @click="closeDetail"
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
        <ViralHookDemoCreatorDrawer
          v-if="selectedCreator"
          :creator="selectedCreator"
          @close="closeDetail"
          @select-pairing="openPairingFromCreator"
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
          v-if="selectedPairing"
          class="absolute inset-y-0 right-0 z-30 flex w-full max-w-sm flex-col border-l border-zinc-700 bg-zinc-950 shadow-2xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <div>
              <p class="text-xs text-zinc-400">
                Pairing detail
              </p>
              <h4 class="font-bold text-white">
                {{ selectedPairing.pairing.product_info.product_name }}
              </h4>
            </div>
            <button
              type="button"
              class="rounded-md px-2 py-1 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
              @click="closeDetail"
            >
              ✕
            </button>
          </div>

          <div class="space-y-4 overflow-y-auto p-4">
            <div
              class="h-14 w-14 shrink-0"
              v-html="viralHookMissingProductSvg(viralHookPairingStatusStyle(selectedPairing.pairing.status).strokeColor)"
            />

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-lg border border-zinc-700 p-3">
                <p class="text-[11px] text-zinc-400">
                  Status
                </p>
                <p
                  class="mt-1 text-sm font-semibold"
                  :class="viralHookPairingStatusStyle(selectedPairing.pairing.status).text"
                >
                  {{ viralHookPairingStatusStyle(selectedPairing.pairing.status).label }}
                </p>
              </div>
              <div class="rounded-lg border border-zinc-700 p-3">
                <p class="text-[11px] text-zinc-400">
                  Pairing type
                </p>
                <p class="mt-1 text-sm font-semibold text-white">
                  {{ selectedPairing.pairing.pairing_type }}
                </p>
              </div>
              <div class="rounded-lg border border-zinc-700 p-3">
                <p class="text-[11px] text-zinc-400">
                  Platform
                </p>
                <p class="mt-1 text-sm font-semibold capitalize text-white">
                  {{ selectedPairing.pairing.decision_info.decision_channel }}
                </p>
              </div>
              <div class="rounded-lg border border-zinc-700 p-3">
                <p class="text-[11px] text-zinc-400">
                  Added
                </p>
                <p class="mt-1 text-sm font-semibold text-white">
                  {{ formatViralHookMonth(selectedPairing.pairing.added_at) }}
                </p>
              </div>
            </div>

            <div class="rounded-lg border border-zinc-700 p-3">
              <p class="text-[11px] text-zinc-400">
                Creator
              </p>
              <p class="mt-1 font-medium text-white">
                {{ selectedPairing.creator.tiktok_handle }}
              </p>
              <p class="text-xs text-zinc-500">
                {{ selectedPairing.creator.creator_code }} · {{ selectedPairing.creator.dealmaking_code }}
              </p>
              <p class="mt-2 text-sm text-zinc-300">
                Rate: {{ formatViralHookCurrency(selectedPairing.creator.per_post) }} / post
              </p>
            </div>
          </div>
        </aside>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.vh-page-header {
  background: linear-gradient(180deg, rgb(12 12 14) 0%, rgb(9 9 11) 100%);
  border-bottom: 1px solid rgb(39 39 42 / 0.95);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.15);
}

.vh-count-tag {
  border-radius: 6px;
  border: 1px solid rgb(228 228 231 / 0.35);
  background: rgb(113 113 122 / 0.35);
  color: white;
}

.vh-segmented {
  border: 1px solid rgb(63 63 70 / 0.75);
  background: rgb(9 9 11 / 0.85);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
}

.vh-icon-btn {
  border: 1px solid rgb(63 63 70 / 0.75);
  background: rgb(24 24 27 / 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.vh-icon-btn:hover {
  border-color: rgb(82 82 91);
  background: rgb(39 39 42);
}

.vh-handle-container {
  padding: 8px 12px 16px 12px;
}

.vh-handle-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: -4px;
  width: 4px;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(24, 24, 27, 1) 0%,
    rgba(24, 24, 27, 0.9) 20%,
    rgba(24, 24, 27, 0) 100%
  );
  pointer-events: none;
  z-index: 10;
}
</style>
