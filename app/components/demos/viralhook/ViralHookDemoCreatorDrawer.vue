<script setup lang="ts">
import type {
  ViralHookPairingItem,
  ViralHookPartnerPairingRow,
} from '~/data/demos/viralhook'
import {
  formatViralHookCurrency,
  formatViralHookFollowers,
  formatViralHookMonth,
  viralHookDecisionContentLabel,
  viralHookMissingProductSvg,
  viralHookPairingStatusCounts,
  viralHookPairingStatusStyle,
  viralHookPlatformIcon,
  viralHookTierStyle,
} from '~/data/demos/viralhook'

const props = defineProps<{
  creator: ViralHookPartnerPairingRow | null
}>()

const emit = defineEmits<{
  close: []
  'select-pairing': [pairing: ViralHookPairingItem]
}>()

const statusCounts = computed(() =>
  props.creator ? viralHookPairingStatusCounts(props.creator) : {},
)

function close() {
  emit('close')
}

function selectPairing(pairing: ViralHookPairingItem) {
  if (!pairing.status) {
    return
  }

  emit('select-pairing', pairing)
}
</script>

<template>
  <aside
    v-if="creator"
    class="absolute inset-y-0 right-0 z-30 flex w-full max-w-xl flex-col border-l border-zinc-700 bg-zinc-950 shadow-2xl"
    @click.stop
  >
    <div class="flex shrink-0 items-start justify-between border-b border-zinc-700 px-4 py-3">
      <div class="min-w-0 pr-3">
        <p class="text-xs text-zinc-400">
          Partner Pairing
        </p>
        <h4 class="truncate font-bold text-white">
          {{ creator.tiktok_handle }}
        </h4>
        <p class="truncate text-sm text-zinc-400">
          {{ creator.creator_first_name }} · {{ creator.creator_code }}
        </p>
      </div>
      <button
        type="button"
        class="shrink-0 rounded-md px-2 py-1 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
        @click="close"
      >
        ✕
      </button>
    </div>

    <div class="min-h-0 flex-1 overflow-y-auto p-4">
      <!-- Status counts -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(count, status) in statusCounts"
          :key="status"
          class="inline-flex h-[22px] items-center gap-1 rounded-md border px-2"
          :class="[
            viralHookPairingStatusStyle(status).bg,
            viralHookPairingStatusStyle(status).border,
          ]"
        >
          <span
            class="text-[10.5px] font-bold leading-none"
            :class="viralHookPairingStatusStyle(status).text"
          >
            {{ count }}
          </span>
          <span
            class="text-[10px] leading-none"
            :class="viralHookPairingStatusStyle(status).text"
          >
            {{ viralHookPairingStatusStyle(status).label }}
          </span>
        </div>
      </div>

      <!-- Creator summary -->
      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Dealmaking
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ creator.dealmaking_code }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Creator code
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ creator.creator_code }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Followers
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ formatViralHookFollowers(creator.tiktok_follower) }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Tier
          </p>
          <span
            class="mt-1 inline-flex rounded px-2 py-0.5 text-[10px] font-medium text-white"
            :class="viralHookTierStyle(creator.tiktok_tier).bg"
          >
            {{ creator.tiktok_tier }}
          </span>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Per post
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ formatViralHookCurrency(creator.per_post) }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Dedicated
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ creator.dedicated }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Integration
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ creator.integration }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Affiliate
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ creator.affiliate }}
          </p>
        </div>
        <div class="rounded-lg border border-zinc-700 p-3">
          <p class="text-[11px] text-zinc-400">
            Added
          </p>
          <p class="mt-1 text-sm font-semibold text-white">
            {{ formatViralHookMonth(creator.added_at) }}
          </p>
        </div>
      </div>

      <!-- Pairing items -->
      <div class="mt-5">
        <div class="mb-3 flex items-center gap-2">
          <h5 class="text-sm font-bold text-white">
            Pairing Items
          </h5>
          <span class="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-md border border-zinc-100 bg-zinc-500 px-1.5 text-[10.5px] leading-none text-white">
            {{ creator.pairing_items.length }}
          </span>
        </div>

        <div class="overflow-hidden rounded-xl border border-zinc-700">
          <table class="min-w-full text-left text-xs">
            <thead class="border-b border-zinc-700 bg-zinc-900 text-zinc-400">
              <tr>
                <th class="px-3 py-2 font-medium">
                  Code
                </th>
                <th class="px-3 py-2 font-medium">
                  Product
                </th>
                <th class="px-3 py-2 font-medium">
                  Type
                </th>
                <th class="px-3 py-2 font-medium">
                  Status
                </th>
                <th class="px-3 py-2 font-medium">
                  Channel
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-800">
              <tr
                v-for="pairing in creator.pairing_items"
                :key="pairing.item_id"
                class="transition"
                :class="pairing.status ? 'cursor-pointer hover:bg-zinc-900' : ''"
                @click="selectPairing(pairing)"
              >
                <td class="px-3 py-2.5 font-medium text-zinc-300">
                  {{ pairing.pairing_item_no ?? pairing.item_id }}
                </td>
                <td class="px-3 py-2.5">
                  <div class="flex items-center gap-2">
                    <div
                      class="h-8 w-8 shrink-0"
                      v-html="viralHookMissingProductSvg(viralHookPairingStatusStyle(pairing.status).strokeColor)"
                    />
                    <div class="min-w-0">
                      <p class="truncate font-medium text-white">
                        {{ pairing.product_info.product_name }}
                      </p>
                      <p class="truncate text-zinc-500">
                        {{ pairing.product_info.asin }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-2.5 text-zinc-300">
                  {{ pairing.pairing_type }}
                </td>
                <td class="px-3 py-2.5">
                  <span
                    class="inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium"
                    :class="[
                      viralHookPairingStatusStyle(pairing.status).bg,
                      viralHookPairingStatusStyle(pairing.status).border,
                      viralHookPairingStatusStyle(pairing.status).text,
                    ]"
                  >
                    {{ viralHookPairingStatusStyle(pairing.status).label }}
                  </span>
                </td>
                <td class="px-3 py-2.5">
                  <div class="flex items-center gap-1.5 capitalize text-zinc-300">
                    <img
                      :src="viralHookPlatformIcon(pairing.decision_info.decision_channel)"
                      :alt="pairing.decision_info.decision_channel"
                      class="h-4 w-4"
                      draggable="false"
                    >
                    {{ viralHookDecisionContentLabel(pairing.decision_info.decision_content) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </aside>
</template>
