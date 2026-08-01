<script setup lang="ts">
import type { CompassDemoSelection } from '~/data/demos/compass'
import {
  compassDelta,
  compassDemoAccounts,
  compassDemoDate,
  compassDemoSkus,
  compassDemoTotals,
  formatCompassCurrency,
  formatCompassNumber,
} from '~/data/demos/compass'

const totalsDelta = compassDelta(compassDemoTotals.sales, compassDemoTotals.salesPrev)
const chartWidth = 220
const chartHeight = 56

const drawerSelection = ref<CompassDemoSelection | null>(null)

function openAccount(row: (typeof compassDemoAccounts)[number]) {
  drawerSelection.value = { type: 'account', row }
}

function openSku(row: (typeof compassDemoSkus)[number]) {
  drawerSelection.value = { type: 'sku', row }
}

function closeDrawer() {
  drawerSelection.value = null
}
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white text-sm text-slate-700 shadow-xl shadow-black/20">
    <!-- App header -->
    <div class="flex h-11 items-center gap-3 bg-[#29AAE1] px-4">
      <img
        src="/projects/compass/logo.svg"
        alt=""
        class="h-6 w-auto"
      >
      <span class="text-sm font-medium text-white">Compass</span>
      <span class="ml-auto rounded bg-white/15 px-2 py-0.5 text-[11px] text-white/90">
        Demo · sample data
      </span>
    </div>

    <div class="border-b border-slate-200 bg-slate-50 px-4 py-3">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs text-slate-500">
            Analysis <span class="text-slate-400">›</span> Daily
          </p>
          <h3 class="text-lg font-medium text-slate-700">
            Daily sales pulse
          </h3>
        </div>
        <div class="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
          {{ compassDemoDate }}
        </div>
      </div>
      <p class="mt-2 text-xs text-slate-500">
        Click any account or SKU row to open a detail panel.
      </p>
    </div>

    <!-- KPI strip -->
    <div class="grid gap-px border-b border-slate-200 bg-slate-200 md:grid-cols-6">
      <div class="bg-white p-4 md:col-span-1">
        <p class="text-[11px] uppercase tracking-wide text-slate-400">
          Period
        </p>
        <p class="mt-1 font-medium text-slate-700">
          Today
        </p>
        <p class="text-xs text-slate-500">
          vs yesterday
        </p>
      </div>

      <div class="bg-white p-4 md:col-span-1">
        <p class="text-[11px] uppercase tracking-wide text-slate-400">
          Total sales
        </p>
        <p class="mt-1 text-xl font-medium text-slate-700">
          {{ formatCompassCurrency(compassDemoTotals.sales) }}
        </p>
        <p
          class="text-xs font-medium"
          :class="totalsDelta.positive ? 'text-green-500' : 'text-red-500'"
        >
          {{ totalsDelta.label }}
        </p>
      </div>

      <div class="bg-white p-4 md:col-span-2">
        <p class="mb-2 text-[11px] uppercase tracking-wide text-slate-400">
          Sales trend
        </p>
        <CompassDemoHoverChart
          :points="compassDemoTotals.trend"
          :width="chartWidth"
          :height="chartHeight"
          show-area
          class="h-14 max-w-[220px]"
        />
      </div>

      <div class="bg-white p-4 md:col-span-1">
        <p class="text-[11px] uppercase tracking-wide text-slate-400">
          Orders
        </p>
        <p class="mt-1 text-xl font-medium text-slate-700">
          {{ formatCompassNumber(compassDemoTotals.orders) }}
        </p>
        <p
          class="text-xs font-medium"
          :class="compassDelta(compassDemoTotals.orders, compassDemoTotals.ordersPrev).positive ? 'text-green-500' : 'text-red-500'"
        >
          {{ compassDelta(compassDemoTotals.orders, compassDemoTotals.ordersPrev).label }}
        </p>
      </div>

      <div class="bg-white p-4 md:col-span-1">
        <p class="text-[11px] uppercase tracking-wide text-slate-400">
          Units sold
        </p>
        <p class="mt-1 text-xl font-medium text-slate-700">
          {{ formatCompassNumber(compassDemoTotals.units) }}
        </p>
        <p
          class="text-xs font-medium"
          :class="compassDelta(compassDemoTotals.units, compassDemoTotals.unitsPrev).positive ? 'text-green-500' : 'text-red-500'"
        >
          {{ compassDelta(compassDemoTotals.units, compassDemoTotals.unitsPrev).label }}
        </p>
      </div>
    </div>

    <!-- Account rows -->
    <div class="divide-y divide-slate-200">
      <button
        v-for="account in compassDemoAccounts"
        :key="account.id"
        type="button"
        class="grid w-full cursor-pointer gap-3 bg-white px-4 py-3 text-left transition hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#29AAE1] md:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]"
        @click="openAccount(account)"
      >
        <div class="min-w-0">
          <p class="text-xs text-slate-400">
            {{ account.platform }} · {{ account.country }}
          </p>
          <p class="truncate font-medium text-slate-700">
            {{ account.account }}
          </p>
        </div>
        <div>
          <p class="text-[11px] text-slate-400">
            Sales
          </p>
          <p class="font-medium">
            {{ formatCompassCurrency(account.sales) }}
          </p>
        </div>
        <div>
          <p class="text-[11px] text-slate-400">
            Orders
          </p>
          <p class="font-medium">
            {{ formatCompassNumber(account.orders) }}
          </p>
        </div>
        <div>
          <p class="text-[11px] text-slate-400">
            Units
          </p>
          <p class="font-medium">
            {{ formatCompassNumber(account.units) }}
          </p>
        </div>
        <div
          class="hidden md:block"
          @click.stop
        >
          <CompassDemoHoverChart
            :points="account.trend"
            :width="100"
            :height="28"
            :stroke="compassDelta(account.sales, account.salesPrev).positive ? '#22c55e' : '#ef4444'"
            :accent="compassDelta(account.sales, account.salesPrev).positive ? '#22c55e' : '#ef4444'"
            class="h-7"
          />
        </div>
      </button>
    </div>

    <!-- SKU table -->
    <div class="border-t border-slate-200 bg-white">
      <div class="border-b border-slate-200 px-4 py-3">
        <p class="text-[11px] uppercase tracking-wide text-slate-400">
          Top SKUs
        </p>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th class="px-4 py-2 font-medium">
                Account
              </th>
              <th class="px-4 py-2 font-medium">
                Product
              </th>
              <th class="px-4 py-2 font-medium">
                Sales
              </th>
              <th class="px-4 py-2 font-medium">
                Orders
              </th>
              <th class="px-4 py-2 font-medium">
                Trend
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="sku in compassDemoSkus"
              :key="sku.sku"
              class="cursor-pointer transition hover:bg-slate-50 focus-within:bg-slate-50"
              tabindex="0"
              role="button"
              @click="openSku(sku)"
              @keydown.enter.prevent="openSku(sku)"
              @keydown.space.prevent="openSku(sku)"
            >
              <td class="px-4 py-3 text-slate-600">
                {{ sku.account }}
              </td>
              <td class="px-4 py-3">
                <p class="font-medium text-slate-700">
                  {{ sku.product }}
                </p>
                <p class="text-slate-400">
                  {{ sku.sku }}
                </p>
              </td>
              <td class="px-4 py-3">
                <p class="font-medium text-slate-700">
                  {{ formatCompassCurrency(sku.sales) }}
                </p>
                <p
                  :class="compassDelta(sku.sales, sku.salesPrev).positive ? 'text-green-500' : 'text-red-500'"
                >
                  {{ compassDelta(sku.sales, sku.salesPrev).label }}
                </p>
              </td>
              <td class="px-4 py-3 text-slate-700">
                {{ formatCompassNumber(sku.orders) }}
              </td>
              <td
                class="px-4 py-3"
                @click.stop
              >
                <CompassDemoHoverChart
                  :points="sku.trend"
                  :width="80"
                  :height="24"
                  :stroke="compassDelta(sku.sales, sku.salesPrev).positive ? '#22c55e' : '#ef4444'"
                  :accent="compassDelta(sku.sales, sku.salesPrev).positive ? '#22c55e' : '#ef4444'"
                  class="h-6 w-20"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CompassDemoDetailDrawer
      :selection="drawerSelection"
      @close="closeDrawer"
    />
  </div>
</template>
