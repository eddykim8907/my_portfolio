import type { Component } from 'vue'

import CompassDailyDemo from '~/components/demos/CompassDailyDemo.vue'
import ForsitHubDashboardDemo from '~/components/demos/ForsitHubDashboardDemo.vue'

const demoRegistry: Record<string, Component> = {
  'compass-daily': CompassDailyDemo,
  'forsit-hub-dashboard': ForsitHubDashboardDemo,
}

export function resolveProjectDemo(demoId: string | null | undefined): Component | null {
  if (!demoId) {
    return null
  }

  return demoRegistry[demoId] ?? null
}
