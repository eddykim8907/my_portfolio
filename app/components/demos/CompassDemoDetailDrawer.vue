<script setup lang="ts">
import type { CompassDemoSelection } from '~/data/demos/compass'
import {
  compassDelta,
  compassDemoSkus,
  formatCompassCurrency,
  formatCompassNumber,
} from '~/data/demos/compass'

const props = defineProps<{
  selection: CompassDemoSelection | null
}>()

const emit = defineEmits<{
  close: []
}>()

const title = computed(() => {
  if (!props.selection) {
    return ''
  }

  return props.selection.type === 'account'
    ? props.selection.row.account
    : props.selection.row.product
})

const subtitle = computed(() => {
  if (!props.selection) {
    return ''
  }

  if (props.selection.type === 'account') {
    const row = props.selection.row
    return `${row.platform} · ${row.country}`
  }

  return `${props.selection.row.account} · ${props.selection.row.sku}`
})

const relatedSkus = computed(() => {
  if (props.selection?.type !== 'account') {
    return []
  }

  return compassDemoSkus.filter(
    (sku) => sku.account === props.selection!.row.account,
  )
})

function metric(label: string, current: number, previous: number, format: 'currency' | 'number' | 'percent') {
  const delta = compassDelta(current, previous)
  const value = format === 'currency'
    ? formatCompassCurrency(current)
    : format === 'percent'
      ? `${current.toFixed(2)}%`
      : formatCompassNumber(current)

  return { label, value, delta }
}

function close() {
  emit('close')
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
      v-if="selection"
      type="button"
      class="absolute inset-0 z-20 bg-black/50"
      aria-label="Close detail panel"
      @click="close"
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
      v-if="selection"
      class="absolute inset-y-0 right-0 z-30 flex w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl"
      @click.stop
    >
      <div class="flex shrink-0 items-start justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div class="min-w-0 pr-3">
          <p class="text-xs uppercase tracking-wide text-[#29AAE1]">
            {{ selection.type === 'account' ? 'Account detail' : 'SKU detail' }}
          </p>
          <h3 class="mt-1 truncate text-base font-medium text-slate-800">
            {{ title }}
          </h3>
          <p class="truncate text-sm text-slate-500">
            {{ subtitle }}
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-200 hover:text-slate-700"
          @click="close"
        >
          ✕
        </button>
      </div>

      <div class="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 text-sm text-slate-700">
        <template v-if="selection.type === 'account'">
          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="item in [
                metric('Sales', selection.row.sales, selection.row.salesPrev, 'currency'),
                metric('Ad sales', selection.row.adSales, selection.row.adSalesPrev, 'currency'),
                metric('Orders', selection.row.orders, selection.row.ordersPrev, 'number'),
                metric('Units', selection.row.units, selection.row.unitsPrev, 'number'),
                metric('Page views', selection.row.pageViews, selection.row.pageViews * 0.94, 'number'),
                metric('Conversion', selection.row.conversionRate, selection.row.conversionRate - 0.4, 'percent'),
              ]"
              :key="item.label"
              class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <p class="text-[11px] uppercase tracking-wide text-slate-400">
                {{ item.label }}
              </p>
              <p class="mt-1 font-medium text-slate-800">
                {{ item.value }}
              </p>
              <p
                class="text-xs font-medium"
                :class="item.delta.positive ? 'text-green-500' : 'text-red-500'"
              >
                {{ item.delta.label }} vs prev
              </p>
            </div>
          </div>

          <div>
            <p class="mb-2 text-[11px] uppercase tracking-wide text-slate-400">
              5-day trend
            </p>
            <CompassDemoHoverChart
              :points="selection.row.trend"
              :width="300"
              :height="64"
              :stroke-width="2.5"
              class="h-20 rounded-lg border border-slate-200 bg-white p-2"
            />
          </div>

          <div v-if="relatedSkus.length">
            <p class="mb-2 text-[11px] uppercase tracking-wide text-slate-400">
              Top SKUs in account
            </p>
            <ul class="divide-y divide-slate-100 rounded-lg border border-slate-200">
              <li
                v-for="sku in relatedSkus"
                :key="sku.sku"
                class="flex items-center justify-between px-3 py-2"
              >
                <div>
                  <p class="font-medium text-slate-700">
                    {{ sku.product }}
                  </p>
                  <p class="text-xs text-slate-400">
                    {{ sku.sku }}
                  </p>
                </div>
                <p class="font-medium text-slate-700">
                  {{ formatCompassCurrency(sku.sales) }}
                </p>
              </li>
            </ul>
          </div>
        </template>

        <template v-else>
          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="item in [
                metric('Sales', selection.row.sales, selection.row.salesPrev, 'currency'),
                metric('Orders', selection.row.orders, selection.row.ordersPrev, 'number'),
                metric('Available', selection.row.available, selection.row.available - 40, 'number'),
                metric('Inbound', selection.row.inbound, selection.row.inbound, 'number'),
                metric('Daily velocity', selection.row.dailyVelocity, selection.row.dailyVelocity - 0.6, 'number'),
                metric('Conversion', selection.row.conversionRate, selection.row.conversionRate - 0.3, 'percent'),
              ]"
              :key="item.label"
              class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <p class="text-[11px] uppercase tracking-wide text-slate-400">
                {{ item.label }}
              </p>
              <p class="mt-1 font-medium text-slate-800">
                {{ item.value }}
              </p>
              <p
                class="text-xs font-medium"
                :class="item.delta.positive ? 'text-green-500' : 'text-red-500'"
              >
                {{ item.delta.label }} vs prev
              </p>
            </div>
          </div>

          <div>
            <p class="mb-2 text-[11px] uppercase tracking-wide text-slate-400">
              Daily breakdown
            </p>
            <div class="overflow-hidden rounded-lg border border-slate-200">
              <table class="min-w-full text-left text-xs">
                <thead class="bg-slate-50 text-slate-500">
                  <tr>
                    <th class="px-3 py-2 font-medium">
                      Day
                    </th>
                    <th class="px-3 py-2 font-medium">
                      Sales
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr
                    v-for="point in selection.row.trend"
                    :key="point.label"
                  >
                    <td class="px-3 py-2 text-slate-600">
                      {{ point.label }}
                    </td>
                    <td class="px-3 py-2 font-medium text-slate-700">
                      {{ formatCompassCurrency(point.value) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>

        <p class="text-xs text-slate-400">
          Sample Compass item-metrics style detail view. All values are anonymized demo data.
        </p>
      </div>
    </aside>
  </Transition>
</template>
