<script setup lang="ts">
import type { CompassDailyPoint } from '~/data/demos/compass'
import {
  compassAreaPath,
  compassChartPlotPoints,
  compassSparklinePath,
  formatCompassCurrency,
} from '~/data/demos/compass'

const props = withDefaults(
  defineProps<{
    points: CompassDailyPoint[]
    width: number
    height: number
    stroke?: string
    accent?: string
    showArea?: boolean
    areaFill?: string
    areaOpacity?: number
    strokeWidth?: number
    valueLabel?: string
  }>(),
  {
    stroke: '#29AAE1',
    accent: '#29AAE1',
    showArea: false,
    areaFill: '#06B6D4',
    areaOpacity: 0.18,
    strokeWidth: 2,
    valueLabel: 'Sales',
  },
)

const chartSurfaceRef = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)
const tooltipPosition = ref<{ left: number; top: number } | null>(null)

const plotPoints = computed(() =>
  compassChartPlotPoints(props.points, props.width, props.height),
)

const areaPath = computed(() =>
  props.showArea ? compassAreaPath(props.points, props.width, props.height) : '',
)

const linePath = computed(() =>
  compassSparklinePath(props.points, props.width, props.height),
)

const activePoint = computed(() => {
  if (activeIndex.value === null) {
    return null
  }

  return plotPoints.value[activeIndex.value] ?? null
})

function updateTooltipPosition(
  surface: HTMLElement,
  point: { x: number; y: number },
) {
  const rect = surface.getBoundingClientRect()
  tooltipPosition.value = {
    left: rect.left + (point.x / props.width) * rect.width,
    top: rect.top + (point.y / props.height) * rect.height,
  }
}

function updateActivePoint(event: MouseEvent) {
  const surface = chartSurfaceRef.value
  if (!surface || props.points.length === 0) {
    return
  }

  const rect = surface.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  const index = Math.round(ratio * (props.points.length - 1))

  activeIndex.value = Math.max(0, Math.min(props.points.length - 1, index))

  const point = plotPoints.value[activeIndex.value]
  if (point) {
    updateTooltipPosition(surface, point)
  }
}

function clearActivePoint() {
  activeIndex.value = null
  tooltipPosition.value = null
}
</script>

<template>
  <div
    ref="chartSurfaceRef"
    class="relative"
    @mousemove="updateActivePoint"
    @mouseleave="clearActivePoint"
  >
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      class="h-full w-full cursor-crosshair"
      role="img"
      :aria-label="`${valueLabel} trend chart`"
    >
      <path
        v-if="showArea && areaPath"
        :d="areaPath"
        :fill="areaFill"
        :fill-opacity="areaOpacity"
      />
      <path
        :d="linePath"
        fill="none"
        :stroke="stroke"
        :stroke-width="strokeWidth"
      />
      <template v-if="activePoint">
        <line
          :x1="activePoint.x"
          :x2="activePoint.x"
          y1="0"
          :y2="height"
          :stroke="accent"
          stroke-opacity="0.25"
          stroke-width="1"
        />
        <circle
          :cx="activePoint.x"
          :cy="activePoint.y"
          r="4.5"
          :fill="accent"
          stroke="#ffffff"
          stroke-width="2"
        />
      </template>
    </svg>

    <Teleport to="body">
      <div
        v-if="activePoint && tooltipPosition"
        class="pointer-events-none fixed z-[200] min-w-[148px] rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-md"
        :style="{
          left: `${tooltipPosition.left}px`,
          top: `${tooltipPosition.top}px`,
          transform: 'translate(-50%, calc(-100% - 12px))',
        }"
      >
        <p class="text-xs text-slate-400">
          {{ activePoint.label }}
        </p>
        <div class="mt-1 flex items-center justify-between gap-4">
          <div class="flex items-center gap-1.5">
            <span
              class="h-0.5 w-3 rounded-full"
              :style="{ backgroundColor: accent }"
            />
            <span class="text-xs text-slate-500">{{ valueLabel }}</span>
          </div>
          <span class="text-sm font-semibold text-slate-700">
            {{ formatCompassCurrency(activePoint.value) }}
          </span>
        </div>
      </div>
    </Teleport>
  </div>
</template>
