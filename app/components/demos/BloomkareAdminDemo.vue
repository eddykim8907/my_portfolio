<script setup lang="ts">
import type {
  BloomkareActivityFilter,
  BloomkareQueueItem,
  BloomkareQueueTab,
} from '~/data/demos/bloomkare'
import {
  bloomkareActionKpis,
  bloomkareActionStats,
  bloomkareActiveCampaigns,
  bloomkareQueueApplications,
  bloomkareQueueRisk,
  bloomkareQueueSubmissions,
  bloomkareRecentActivity,
  bloomkareRiskClass,
  filterBloomkareActivity,
  formatBloomkareFollowers,
  formatBloomkareRelativeTime,
  formatBloomkareViews,
} from '~/data/demos/bloomkare'

const activeQueue = ref<BloomkareQueueTab>('applications')
const activityFilter = ref<BloomkareActivityFilter>('all')
const selected = ref<BloomkareQueueItem | null>(null)

const sidebarItems = [
  { label: 'Home', active: true },
  { label: 'Campaigns', active: false },
  { label: 'Creators', active: false },
  { label: 'Shipments', active: false },
  { label: 'Rewards', active: false },
] as const

const queueTabs: { id: BloomkareQueueTab, label: string, count: number }[] = [
  { id: 'applications', label: 'Applications', count: bloomkareActionStats.pendingApplications },
  { id: 'submissions', label: 'Submissions', count: bloomkareActionStats.videosInReview },
  { id: 'risk', label: 'Creator risk', count: bloomkareActionStats.atRiskCreators },
]

const activityFilters: { id: BloomkareActivityFilter, label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'applications', label: 'Apps' },
  { id: 'videos', label: 'Videos' },
  { id: 'shipments', label: 'Shipments' },
]

const filteredActivity = computed(() =>
  filterBloomkareActivity(bloomkareRecentActivity, activityFilter.value),
)

function focusQueue(tab?: BloomkareQueueTab) {
  if (tab) {
    activeQueue.value = tab
  }
}

function openApplication(row: (typeof bloomkareQueueApplications)[number]) {
  selected.value = { kind: 'application', row }
}

function openSubmission(row: (typeof bloomkareQueueSubmissions)[number]) {
  selected.value = { kind: 'submission', row }
}

function openRisk(row: (typeof bloomkareQueueRisk)[number]) {
  selected.value = { kind: 'risk', row }
}

function closeDetail() {
  selected.value = null
}
</script>

<template>
  <div
    class="bk-demo relative flex h-[min(720px,75vh)] min-h-0 overflow-hidden rounded-xl border border-neutral-200 bg-[#FAFAFA] text-sm text-neutral-700 shadow-xl shadow-black/15"
    style="font-family: Inter, ui-sans-serif, system-ui, sans-serif"
  >
    <aside class="hidden w-40 shrink-0 flex-col border-r border-neutral-200 bg-white sm:flex">
      <div class="flex h-12 items-center gap-2 border-b border-neutral-200 px-3">
        <img
          src="/projects/bloomkare/logo.png"
          alt=""
          class="h-7 w-7 rounded-md object-contain"
        >
        <img
          src="/projects/bloomkare/logo-text.svg"
          alt="Bloomkare"
          class="h-3 w-auto"
        >
      </div>
      <nav class="space-y-0.5 p-2">
        <div
          v-for="item in sidebarItems"
          :key="item.label"
          class="rounded-lg px-3 py-2 text-xs font-medium"
          :class="item.active
            ? 'bg-[#FFF0F9] text-[#EE5FA4]'
            : 'text-neutral-500'"
        >
          {{ item.label }}
        </div>
      </nav>
      <p class="mt-auto px-3 pb-3 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
        Admin
      </p>
    </aside>

    <div class="relative flex min-h-0 min-w-0 flex-1 flex-col">
      <header class="flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4">
        <div>
          <p class="text-xs text-neutral-500 sm:hidden">
            Bloomkare Admin
          </p>
          <h3 class="text-sm font-semibold text-neutral-900">
            Operations
          </h3>
        </div>
        <span class="rounded-md bg-[#FFF0F9] px-2 py-0.5 text-[11px] font-medium text-[#B64378]">
          Demo · sample data
        </span>
      </header>

      <DemoScrollArea>
        <div class="space-y-4 p-4">
          <p class="text-xs text-neutral-500">
            Triage pending work, track shipments, and monitor platform health. Click a KPI or queue row.
          </p>

          <!-- Action KPIs -->
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-5">
            <button
              v-for="kpi in bloomkareActionKpis"
              :key="kpi.key"
              type="button"
              class="rounded-xl border border-neutral-200 bg-white p-3 text-left transition hover:border-[#EE5FA4]/40 hover:bg-[#FFF0F9]/40"
              :class="kpi.queue && activeQueue === kpi.queue ? 'ring-2 ring-[#EE5FA4]/35' : ''"
              @click="focusQueue(kpi.queue)"
            >
              <div class="flex items-center gap-2.5">
                <span
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  :class="kpi.iconBg"
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="kpi.iconColor.replace('text-', 'bg-')"
                  />
                </span>
                <div class="min-w-0">
                  <p class="text-lg font-bold leading-none text-neutral-900 tabular-nums">
                    {{ bloomkareActionStats[kpi.key] }}
                  </p>
                  <p class="mt-1 truncate text-xs text-neutral-500">
                    {{ kpi.label }}
                  </p>
                </div>
              </div>
            </button>
          </div>

          <!-- Work queues + recent activity -->
          <div class="grid min-h-0 gap-4 lg:grid-cols-2">
            <section class="flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div class="flex shrink-0 items-center justify-between border-b border-neutral-200 px-3 py-2.5">
                <h4 class="text-sm font-semibold text-neutral-900">
                  Work queues
                </h4>
              </div>
              <div class="flex shrink-0 gap-1 border-b border-neutral-100 px-2 py-2">
                <button
                  v-for="tab in queueTabs"
                  :key="tab.id"
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition"
                  :class="activeQueue === tab.id
                    ? 'bg-[#FFF0F9] text-[#EE5FA4]'
                    : 'text-neutral-500 hover:bg-neutral-50'"
                  @click="activeQueue = tab.id"
                >
                  {{ tab.label }}
                  <span
                    class="rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
                    :class="activeQueue === tab.id ? 'bg-[#EE5FA4] text-white' : 'bg-neutral-100 text-neutral-500'"
                  >
                    {{ tab.count }}
                  </span>
                </button>
              </div>

              <div class="min-h-0 flex-1 overflow-y-auto p-2">
                <template v-if="activeQueue === 'applications'">
                  <button
                    v-for="row in bloomkareQueueApplications"
                    :key="row.id"
                    type="button"
                    class="flex w-full items-center gap-2 rounded-lg border border-transparent p-2 text-left transition hover:border-neutral-200 hover:bg-neutral-50"
                    @click="openApplication(row)"
                  >
                    <span
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                      :class="row.avatarTone"
                    >
                      {{ row.initials }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center gap-2">
                        <p class="truncate text-sm font-medium text-[#EE5FA4]">
                          {{ row.displayName }}
                        </p>
                        <span :class="bloomkareRiskClass(row.risk)">
                          {{ row.risk }}
                        </span>
                      </div>
                      <p class="truncate text-xs text-neutral-400">
                        {{ row.campaignName }} · {{ formatBloomkareFollowers(row.followers) }}
                      </p>
                    </div>
                  </button>
                </template>

                <template v-else-if="activeQueue === 'submissions'">
                  <button
                    v-for="row in bloomkareQueueSubmissions"
                    :key="row.id"
                    type="button"
                    class="flex w-full items-center gap-2 rounded-lg border border-transparent p-2 text-left transition hover:border-neutral-200 hover:bg-neutral-50"
                    @click="openSubmission(row)"
                  >
                    <span
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                      :class="row.avatarTone"
                    >
                      {{ row.initials }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-medium text-[#EE5FA4]">
                        {{ row.displayName }}
                      </p>
                      <p class="truncate text-xs text-neutral-400">
                        {{ row.campaignName }} · {{ row.platform }}
                      </p>
                    </div>
                  </button>
                </template>

                <template v-else>
                  <button
                    v-for="row in bloomkareQueueRisk"
                    :key="row.id"
                    type="button"
                    class="flex w-full items-center gap-2 rounded-lg border border-transparent p-2 text-left transition hover:border-neutral-200 hover:bg-neutral-50"
                    @click="openRisk(row)"
                  >
                    <span
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                      :class="row.avatarTone"
                    >
                      {{ row.initials }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center gap-2">
                        <p class="truncate text-sm font-medium text-[#EE5FA4]">
                          {{ row.displayName }}
                        </p>
                        <span :class="bloomkareRiskClass(row.risk)">
                          {{ row.risk }}
                        </span>
                      </div>
                      <p class="truncate text-xs text-neutral-400">
                        {{ row.reason }}
                      </p>
                    </div>
                  </button>
                </template>
              </div>
            </section>

            <section class="flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div class="flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 px-3 py-2.5">
                <h4 class="text-sm font-semibold text-neutral-900">
                  Recent activity
                </h4>
                <div class="flex gap-1">
                  <button
                    v-for="filter in activityFilters"
                    :key="filter.id"
                    type="button"
                    class="rounded-md px-2 py-1 text-[11px] font-medium transition"
                    :class="activityFilter === filter.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-500 hover:bg-neutral-100'"
                    @click="activityFilter = filter.id"
                  >
                    {{ filter.label }}
                  </button>
                </div>
              </div>
              <div class="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
                <div
                  v-for="item in filteredActivity"
                  :key="item.id"
                  class="flex gap-2.5 rounded-lg p-2"
                >
                  <span
                    class="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    :class="item.accent"
                  />
                  <div class="min-w-0">
                    <p class="text-sm leading-snug text-neutral-700">
                      {{ item.message }}
                    </p>
                    <p class="mt-0.5 text-[11px] text-neutral-400">
                      {{ formatBloomkareRelativeTime(item.timestamp) }}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Active campaigns -->
          <section>
            <h4 class="mb-2 text-sm font-semibold text-neutral-900">
              Active campaigns
            </h4>
            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="campaign in bloomkareActiveCampaigns"
                :key="campaign.id"
                class="rounded-xl border border-neutral-200 bg-white p-3"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="truncate font-semibold text-neutral-900">
                      {{ campaign.name }}
                    </p>
                    <p class="truncate text-xs text-[#EE5FA4]">
                      {{ campaign.brand }}
                    </p>
                  </div>
                  <span class="shrink-0 rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                    {{ campaign.status }}
                  </span>
                </div>
                <div class="mt-3 grid grid-cols-2 gap-2 text-xs text-neutral-500">
                  <p>
                    <span class="font-semibold text-neutral-800">{{ campaign.pendingApplications }}</span> apps
                  </p>
                  <p>
                    <span class="font-semibold text-neutral-800">{{ campaign.pendingSubmissions }}</span> videos
                  </p>
                  <p>
                    <span class="font-semibold text-neutral-800">{{ campaign.fillRatePct }}%</span> fill
                  </p>
                  <p>
                    <span class="font-semibold text-neutral-800">{{ formatBloomkareViews(campaign.totalViews) }}</span> views
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DemoScrollArea>
    </div>

    <BloomkareDemoDetailDrawer
      :item="selected"
      @close="closeDetail"
    />
  </div>
</template>
