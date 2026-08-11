import type { Component } from 'vue'

import BloomkareAdminDemo from '~/components/demos/BloomkareAdminDemo.vue'
import CompassDailyDemo from '~/components/demos/CompassDailyDemo.vue'
import ForsitHubDashboardDemo from '~/components/demos/ForsitHubDashboardDemo.vue'
import ViralHookPartnerPairingDemo from '~/components/demos/ViralHookPartnerPairingDemo.vue'

const demoRegistry: Record<string, Component> = {
  'bloomkare-admin': BloomkareAdminDemo,
  'compass-daily': CompassDailyDemo,
  'forsit-hub-dashboard': ForsitHubDashboardDemo,
  'viralhook-partner-pairing': ViralHookPartnerPairingDemo,
}

export function resolveProjectDemo(demoId: string | null | undefined): Component | null {
  if (!demoId) {
    return null
  }

  return demoRegistry[demoId] ?? null
}
