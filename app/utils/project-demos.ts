import type { Component } from 'vue'

import CompassDailyDemo from '~/components/demos/CompassDailyDemo.vue'

const demoRegistry: Record<string, Component> = {
  'compass-daily': CompassDailyDemo,
}

export function resolveProjectDemo(demoId: string | null | undefined): Component | null {
  if (!demoId) {
    return null
  }

  return demoRegistry[demoId] ?? null
}
