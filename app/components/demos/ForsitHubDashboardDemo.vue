<script setup lang="ts">
import {
  forsitHubAcos,
  forsitHubAreaPath,
  forsitHubBrandChange,
  forsitHubChartPlotPoints,
  forsitHubDelta,
  forsitHubDemoBrands,
  forsitHubDemoChart,
  forsitHubDemoDate,
  forsitHubDemoPlatforms,
  forsitHubDemoPpc,
  forsitHubDemoSkus,
  forsitHubDemoTotals,
  forsitHubPlatformAccent,
  forsitHubRoas,
  forsitHubSparklinePath,
  formatForsitHubCurrency,
  formatForsitHubNumber,
} from '~/data/demos/forsit-hub'

const periodOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const
const activePeriod = ref<(typeof periodOptions)[number]>('Daily')

const chartWidth = 520
const chartHeight = 160
const plotPoints = computed(() => forsitHubChartPlotPoints(forsitHubDemoChart, chartWidth, chartHeight))
const areaPath = forsitHubAreaPath(forsitHubDemoChart, chartWidth, chartHeight)
const linePath = forsitHubSparklinePath(forsitHubDemoChart, chartWidth, chartHeight)

const chartSurfaceRef = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)

const activePoint = computed(() => {
  if (activeIndex.value === null) {
    return null
  }

  return plotPoints.value[activeIndex.value] ?? null
})

function updateActivePoint(event: MouseEvent) {
  const surface = chartSurfaceRef.value
  if (!surface || forsitHubDemoChart.length === 0) {
    return
  }

  const rect = surface.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  const index = Math.round(ratio * (forsitHubDemoChart.length - 1))

  activeIndex.value = Math.max(0, Math.min(forsitHubDemoChart.length - 1, index))
}

function clearActivePoint() {
  activeIndex.value = null
}

const totalsSalesDelta = forsitHubDelta(forsitHubDemoTotals.currSales, forsitHubDemoTotals.prevSales)
const totalsOrdersDelta = forsitHubDelta(forsitHubDemoTotals.currOrders, forsitHubDemoTotals.prevOrders)
const totalsUnitsDelta = forsitHubDelta(forsitHubDemoTotals.currUnits, forsitHubDemoTotals.prevUnits)

const ppcCards = computed(() => [
  {
    label: 'Total ad sales',
    value: formatForsitHubCurrency(forsitHubDemoPpc.currSales),
  },
  {
    label: 'Total ad spends',
    value: formatForsitHubCurrency(forsitHubDemoPpc.currSpends),
  },
  {
    label: 'ACOS',
    value: forsitHubAcos(forsitHubDemoPpc.currSpends, forsitHubDemoPpc.currSales),
  },
  {
    label: 'ROAS',
    value: forsitHubRoas(forsitHubDemoPpc.currSales, forsitHubDemoPpc.currSpends),
  },
])
</script>

<template>
  <div class="flex max-h-[min(720px,75vh)] overflow-hidden rounded-xl border border-slate-200 bg-white text-sm text-slate-700 shadow-xl shadow-black/20">
    <!-- Sidebar -->
    <aside class="hidden w-36 shrink-0 flex-col bg-[#022C22] sm:flex">
      <div class="flex h-12 shrink-0 items-center justify-center border-b border-white/10 bg-white px-3">
        <img
          src="/projects/forsit-hub/logo-dark.svg"
          alt=""
          class="h-5 w-auto"
        >
      </div>
      <nav class="space-y-1 p-3">
        <div class="rounded-md bg-[#10B981] px-3 py-2 text-xs font-medium text-white">
          Dashboard
        </div>
        <div class="rounded-md px-3 py-2 text-xs text-emerald-100/70">
          Analysis
        </div>
        <div class="rounded-md px-3 py-2 text-xs text-emerald-100/70">
          Plans
        </div>
      </nav>
    </aside>

    <!-- Main -->
    <div class="flex min-h-0 min-w-0 flex-1 flex-col bg-[#F8FAFC]">
      <header class="z-10 flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div class="flex items-center gap-2 sm:hidden">
          <img
            src="/projects/forsit-hub/logo-dark.svg"
            alt=""
            class="h-5 w-auto"
          >
          <span class="text-sm font-medium text-slate-700">ForsitHub</span>
        </div>
        <span class="hidden text-sm font-medium text-slate-700 sm:inline">
          Client portal
        </span>
        <span class="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
          Demo · sample data
        </span>
      </header>

      <DemoScrollArea>
        <div class="space-y-4 p-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-xs text-slate-500">
                Dashboard overview
              </p>
              <h3 class="text-lg font-medium text-slate-800">
                Multi-platform sales pulse
              </h3>
            </div>
            <div class="flex items-center gap-2">
              <div class="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
                <button
                  v-for="option in periodOptions"
                  :key="option"
                  type="button"
                  class="rounded-md px-2.5 py-1 text-xs transition"
                  :class="activePeriod === option
                    ? 'bg-[#10B981] font-medium text-white'
                    : 'text-slate-500 hover:text-slate-700'"
                  @click="activePeriod = option"
                >
                  {{ option }}
                </button>
              </div>
              <div class="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                {{ forsitHubDemoDate }}
              </div>
            </div>
          </div>

          <!-- Chart + total panel -->
          <div class="grid gap-4 lg:grid-cols-12">
            <div class="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-9">
              <div class="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-base font-medium text-slate-800">
                    Total sales
                  </p>
                  <p class="text-xs text-slate-500">
                    Jul 18 – Aug 1, 2026
                  </p>
                </div>
                <p class="text-xl font-semibold text-slate-800">
                  {{ formatForsitHubCurrency(forsitHubDemoTotals.currSales) }}
                </p>
              </div>
              <div
                ref="chartSurfaceRef"
                class="relative"
                @mousemove="updateActivePoint"
                @mouseleave="clearActivePoint"
              >
                <svg
                  :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
                  class="h-40 w-full cursor-crosshair"
                  role="img"
                  aria-label="Total sales trend chart"
                >
                  <path
                    :d="areaPath"
                    fill="#A7F3D0"
                  />
                  <path
                    :d="linePath"
                    fill="none"
                    stroke="#10B981"
                    stroke-width="2.5"
                  />
                  <template v-if="activePoint">
                    <line
                      :x1="activePoint.x"
                      :x2="activePoint.x"
                      y1="0"
                      :y2="chartHeight"
                      stroke="#10B981"
                      stroke-opacity="0.25"
                      stroke-width="1"
                    />
                    <circle
                      :cx="activePoint.x"
                      :cy="activePoint.y"
                      r="4.5"
                      fill="#10B981"
                      stroke="#ffffff"
                      stroke-width="2"
                    />
                  </template>
                </svg>

                <div
                  v-if="activePoint"
                  class="pointer-events-none absolute z-10 min-w-[148px] rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-md"
                  :style="{
                    left: `${(activePoint.x / chartWidth) * 100}%`,
                    top: `${(activePoint.y / chartHeight) * 100}%`,
                    transform: 'translate(-50%, calc(-100% - 12px))',
                  }"
                >
                  <p class="text-xs text-slate-400">
                    {{ activePoint.date }}
                  </p>
                  <div class="mt-1 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-1.5">
                      <span class="h-0.5 w-3 rounded-full bg-[#10B981]" />
                      <span class="text-xs text-slate-500">Sales</span>
                    </div>
                    <span class="text-sm font-semibold text-slate-700">
                      {{ formatForsitHubCurrency(activePoint.sales) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-2 flex justify-between text-[10px] text-slate-400">
                <span
                  v-for="point in forsitHubDemoChart.filter((_, index) => index % 3 === 0)"
                  :key="point.date"
                >
                  {{ point.date }}
                </span>
              </div>
            </div>

            <div class="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-3">
              <p class="text-base font-medium text-slate-800">
                Total
              </p>
              <p class="mt-1 text-xs text-slate-500">
                vs previous period
              </p>

              <div class="mt-4 space-y-4">
                <div>
                  <p class="text-xs text-slate-500">
                    Sales
                  </p>
                  <p class="text-base font-bold text-slate-800">
                    {{ formatForsitHubCurrency(forsitHubDemoTotals.currSales) }}
                  </p>
                  <p
                    class="text-xs font-semibold"
                    :class="totalsSalesDelta.positive ? 'text-[#22C55E]' : 'text-[#DC2626]'"
                  >
                    {{ totalsSalesDelta.positive ? '▲' : '▼' }}
                    {{ formatForsitHubCurrency(totalsSalesDelta.absolute) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-slate-500">
                    Orders
                  </p>
                  <p class="text-base font-bold text-slate-800">
                    {{ formatForsitHubNumber(forsitHubDemoTotals.currOrders) }}
                  </p>
                  <p
                    class="text-xs font-semibold"
                    :class="totalsOrdersDelta.positive ? 'text-[#22C55E]' : 'text-[#DC2626]'"
                  >
                    {{ totalsOrdersDelta.positive ? '▲' : '▼' }}
                    {{ formatForsitHubNumber(totalsOrdersDelta.absolute) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-slate-500">
                    Units sold
                  </p>
                  <p class="text-base font-bold text-slate-800">
                    {{ formatForsitHubNumber(forsitHubDemoTotals.currUnits) }}
                  </p>
                  <p
                    class="text-xs font-semibold"
                    :class="totalsUnitsDelta.positive ? 'text-[#22C55E]' : 'text-[#DC2626]'"
                  >
                    {{ totalsUnitsDelta.positive ? '▲' : '▼' }}
                    {{ formatForsitHubNumber(totalsUnitsDelta.absolute) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Platform cards -->
          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="platform in forsitHubDemoPlatforms"
              :key="platform.id"
              class="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div class="mb-4 flex items-center gap-2">
                <span
                  class="inline-flex h-4 w-4 rounded-full"
                  :style="{ backgroundColor: forsitHubPlatformAccent(platform.platform) }"
                />
                <span
                  v-if="platform.country"
                  class="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {{ platform.country }}
                </span>
                <p class="font-medium text-slate-700">
                  {{ platform.name }}
                </p>
              </div>

              <div class="space-y-3">
                <div
                  v-for="metric in [
                    { label: 'Sales', current: platform.metrics.currSales, previous: platform.metrics.prevSales, currency: true },
                    { label: 'Orders', current: platform.metrics.currOrders, previous: platform.metrics.prevOrders, currency: false },
                    { label: 'Units', current: platform.metrics.currUnits, previous: platform.metrics.prevUnits, currency: false },
                  ]"
                  :key="metric.label"
                  class="flex items-center justify-between gap-3"
                >
                  <span class="text-xs text-slate-500">{{ metric.label }}</span>
                  <div class="text-right">
                    <p class="text-sm font-bold text-slate-700">
                      {{ metric.currency ? formatForsitHubCurrency(metric.current) : formatForsitHubNumber(metric.current) }}
                    </p>
                    <p
                      class="text-[11px] font-semibold"
                      :class="forsitHubDelta(metric.current, metric.previous).positive ? 'text-[#22C55E]' : 'text-[#DC2626]'"
                    >
                      {{ forsitHubDelta(metric.current, metric.previous).positive ? '▲' : '▼' }}
                      {{
                        metric.currency
                          ? formatForsitHubCurrency(forsitHubDelta(metric.current, metric.previous).absolute)
                          : formatForsitHubNumber(forsitHubDelta(metric.current, metric.previous).absolute)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PPC -->
          <div>
            <p class="mb-2 text-sm font-medium text-slate-800">
              Ads
            </p>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="card in ppcCards"
                :key="card.label"
                class="rounded-xl border border-slate-200 bg-white px-4 py-5 text-center"
              >
                <p class="mb-2 text-sm font-medium text-slate-600">
                  {{ card.label }}
                </p>
                <p class="text-base font-bold text-slate-800">
                  {{ card.value }}
                </p>
              </div>
            </div>
          </div>

          <!-- Rank tables -->
          <div class="grid gap-4 xl:grid-cols-2">
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div class="border-b border-slate-200 px-4 py-3">
                <p class="text-sm font-medium text-slate-800">
                  Top SKUs
                </p>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full text-left text-xs">
                  <thead class="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <tr>
                      <th class="px-4 py-2 font-medium">
                        #
                      </th>
                      <th class="px-4 py-2 font-medium">
                        SKU
                      </th>
                      <th class="px-4 py-2 font-medium">
                        Sales
                      </th>
                      <th class="px-4 py-2 font-medium">
                        Ad sales
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr
                      v-for="row in forsitHubDemoSkus"
                      :key="row.sku"
                    >
                      <td class="px-4 py-3 text-slate-500">
                        {{ row.rank }}
                      </td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-slate-700">
                          {{ row.title }}
                        </p>
                        <p class="text-slate-400">
                          {{ row.sku }} · {{ row.brand }}
                        </p>
                      </td>
                      <td class="px-4 py-3 font-medium text-slate-700">
                        {{ formatForsitHubCurrency(row.sales) }}
                      </td>
                      <td class="px-4 py-3 text-slate-600">
                        {{ formatForsitHubCurrency(row.adSales) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div class="border-b border-slate-200 px-4 py-3">
                <p class="text-sm font-medium text-slate-800">
                  Top brands
                </p>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full text-left text-xs">
                  <thead class="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <tr>
                      <th class="px-4 py-2 font-medium">
                        #
                      </th>
                      <th class="px-4 py-2 font-medium">
                        Brand
                      </th>
                      <th class="px-4 py-2 font-medium">
                        Sales
                      </th>
                      <th class="px-4 py-2 font-medium">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr
                      v-for="row in forsitHubDemoBrands"
                      :key="row.brand"
                    >
                      <td class="px-4 py-3 text-slate-500">
                        {{ row.rank }}
                      </td>
                      <td class="px-4 py-3 font-medium text-slate-700">
                        {{ row.brand }}
                      </td>
                      <td class="px-4 py-3 font-medium text-slate-700">
                        {{ formatForsitHubCurrency(row.currSales) }}
                      </td>
                      <td class="px-4 py-3">
                        <p
                          class="font-semibold"
                          :class="forsitHubBrandChange(row).positive ? 'text-[#22C55E]' : 'text-[#DC2626]'"
                        >
                          {{ forsitHubBrandChange(row).positive ? '+' : '-' }}{{ formatForsitHubCurrency(forsitHubBrandChange(row).amount) }}
                        </p>
                        <p
                          class="text-[11px]"
                          :class="forsitHubBrandChange(row).positive ? 'text-[#22C55E]' : 'text-[#DC2626]'"
                        >
                          {{ forsitHubBrandChange(row).percent }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DemoScrollArea>
    </div>
  </div>
</template>
