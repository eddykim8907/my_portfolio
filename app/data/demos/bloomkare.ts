export type BloomkareQueueTab = 'applications' | 'submissions' | 'risk'
export type BloomkareActivityFilter = 'all' | 'applications' | 'videos' | 'shipments'
export type BloomkareCreatorRisk = 'low' | 'medium' | 'high'

export interface BloomkareActionStats {
  pendingApplications: number
  videosInReview: number
  atRiskCreators: number
  shipmentsNeedingAction: number
  openSupportTickets: number
}

export interface BloomkareQueueApplication {
  id: string
  displayName: string
  handle: string
  campaignName: string
  followers: number
  risk: BloomkareCreatorRisk
  niche: string
  initials: string
  avatarTone: string
  appliedAt: string
}

export interface BloomkareQueueSubmission {
  id: string
  displayName: string
  handle: string
  campaignName: string
  platform: string
  initials: string
  avatarTone: string
  submittedAt: string
}

export interface BloomkareQueueRisk {
  id: string
  displayName: string
  handle: string
  risk: BloomkareCreatorRisk
  reason: string
  initials: string
  avatarTone: string
}

export interface BloomkareActivityItem {
  id: string
  message: string
  type: 'applications' | 'videos' | 'shipments'
  timestamp: string
  accent: string
}

export interface BloomkareActiveCampaign {
  id: string
  name: string
  brand: string
  status: string
  pendingApplications: number
  pendingSubmissions: number
  fillRatePct: number
  totalViews: number
}

export type BloomkareQueueItem =
  | { kind: 'application', row: BloomkareQueueApplication }
  | { kind: 'submission', row: BloomkareQueueSubmission }
  | { kind: 'risk', row: BloomkareQueueRisk }

export const bloomkareActionStats: BloomkareActionStats = {
  pendingApplications: 12,
  videosInReview: 7,
  atRiskCreators: 4,
  shipmentsNeedingAction: 9,
  openSupportTickets: 3,
}

export const bloomkareActionKpis: {
  key: keyof BloomkareActionStats
  label: string
  queue?: BloomkareQueueTab
  iconBg: string
  iconColor: string
}[] = [
  {
    key: 'pendingApplications',
    label: 'Pending applications',
    queue: 'applications',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    key: 'videosInReview',
    label: 'Videos in review',
    queue: 'submissions',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    key: 'atRiskCreators',
    label: 'At-risk creators',
    queue: 'risk',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    key: 'shipmentsNeedingAction',
    label: 'Shipments need action',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    key: 'openSupportTickets',
    label: 'Open support tickets',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
]

export const bloomkareQueueApplications: BloomkareQueueApplication[] = [
  {
    id: 'qa-1',
    displayName: 'Mina Park',
    handle: '@mina.glow',
    campaignName: 'Glow Serum Launch',
    followers: 128400,
    risk: 'low',
    niche: 'Beauty',
    initials: 'MP',
    avatarTone: 'bg-rose-100 text-rose-700',
    appliedAt: '2026-08-09T14:20:00Z',
  },
  {
    id: 'qa-2',
    displayName: 'Jordan Lee',
    handle: '@jordanlee.tt',
    campaignName: 'Glow Serum Launch',
    followers: 86200,
    risk: 'medium',
    niche: 'Beauty',
    initials: 'JL',
    avatarTone: 'bg-sky-100 text-sky-700',
    appliedAt: '2026-08-09T11:05:00Z',
  },
  {
    id: 'qa-3',
    displayName: 'Sora Kim',
    handle: '@sorakim',
    campaignName: 'Overnight Repair Mask',
    followers: 241000,
    risk: 'high',
    niche: 'Lifestyle',
    initials: 'SK',
    avatarTone: 'bg-violet-100 text-violet-700',
    appliedAt: '2026-08-08T19:40:00Z',
  },
  {
    id: 'qa-4',
    displayName: 'Ava Chen',
    handle: '@ava.skin',
    campaignName: 'Daily Hydration Kit',
    followers: 95400,
    risk: 'low',
    niche: 'Wellness',
    initials: 'AC',
    avatarTone: 'bg-emerald-100 text-emerald-700',
    appliedAt: '2026-08-08T09:15:00Z',
  },
]

export const bloomkareQueueSubmissions: BloomkareQueueSubmission[] = [
  {
    id: 'qs-1',
    displayName: 'Noah Rivera',
    handle: '@noah.rv',
    campaignName: 'Matcha Ritual Bundle',
    platform: 'TikTok',
    initials: 'NR',
    avatarTone: 'bg-amber-100 text-amber-800',
    submittedAt: '2026-08-10T08:40:00Z',
  },
  {
    id: 'qs-2',
    displayName: 'Ellie Cho',
    handle: '@elliecho',
    campaignName: 'Glow Serum Launch',
    platform: 'Instagram',
    initials: 'EC',
    avatarTone: 'bg-orange-100 text-orange-700',
    submittedAt: '2026-08-09T21:10:00Z',
  },
  {
    id: 'qs-3',
    displayName: 'Kai Nakamura',
    handle: '@kai.n',
    campaignName: 'Ceramic Pour-Over Set',
    platform: 'YouTube',
    initials: 'KN',
    avatarTone: 'bg-neutral-200 text-neutral-700',
    submittedAt: '2026-08-09T16:25:00Z',
  },
]

export const bloomkareQueueRisk: BloomkareQueueRisk[] = [
  {
    id: 'qr-1',
    displayName: 'Sora Kim',
    handle: '@sorakim',
    risk: 'high',
    reason: 'Elevated ghost rate on last 3 campaigns',
    initials: 'SK',
    avatarTone: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'qr-2',
    displayName: 'Jordan Lee',
    handle: '@jordanlee.tt',
    risk: 'medium',
    reason: 'Late submissions on 2 active campaigns',
    initials: 'JL',
    avatarTone: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'qr-3',
    displayName: 'Riley Han',
    handle: '@riley.han',
    risk: 'high',
    reason: 'Visibility policy flags on recent posts',
    initials: 'RH',
    avatarTone: 'bg-red-100 text-red-700',
  },
]

export const bloomkareRecentActivity: BloomkareActivityItem[] = [
  {
    id: 'act-1',
    message: 'Mina Park applied to Glow Serum Launch',
    type: 'applications',
    timestamp: '2026-08-10T10:12:00Z',
    accent: 'bg-amber-500',
  },
  {
    id: 'act-2',
    message: 'Noah Rivera submitted a TikTok video for review',
    type: 'videos',
    timestamp: '2026-08-10T08:40:00Z',
    accent: 'bg-sky-500',
  },
  {
    id: 'act-3',
    message: 'Shipment BK-88421 marked In Transit',
    type: 'shipments',
    timestamp: '2026-08-10T07:55:00Z',
    accent: 'bg-violet-500',
  },
  {
    id: 'act-4',
    message: 'Ava Chen marked approved on Daily Hydration Kit',
    type: 'applications',
    timestamp: '2026-08-09T22:18:00Z',
    accent: 'bg-amber-500',
  },
  {
    id: 'act-5',
    message: 'Ellie Cho video moved to Videos in Review',
    type: 'videos',
    timestamp: '2026-08-09T21:10:00Z',
    accent: 'bg-sky-500',
  },
  {
    id: 'act-6',
    message: 'Address update requested on shipment BK-88390',
    type: 'shipments',
    timestamp: '2026-08-09T18:02:00Z',
    accent: 'bg-violet-500',
  },
]

export const bloomkareActiveCampaigns: BloomkareActiveCampaign[] = [
  {
    id: 'ac-1',
    name: 'Glow Serum Launch',
    brand: 'Lumina Beauty',
    status: 'Active',
    pendingApplications: 8,
    pendingSubmissions: 3,
    fillRatePct: 62,
    totalViews: 1_240_000,
  },
  {
    id: 'ac-2',
    name: 'Daily Hydration Kit',
    brand: 'AquaBloom',
    status: 'Active',
    pendingApplications: 2,
    pendingSubmissions: 4,
    fillRatePct: 81,
    totalViews: 640_000,
  },
  {
    id: 'ac-3',
    name: 'Matcha Ritual Bundle',
    brand: 'Verdant Co.',
    status: 'Seeding',
    pendingApplications: 5,
    pendingSubmissions: 1,
    fillRatePct: 44,
    totalViews: 210_000,
  },
]

export function bloomkareRiskClass(risk: BloomkareCreatorRisk): string {
  const base =
    'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold leading-none'

  switch (risk) {
    case 'high':
      return `${base} border-red-200 bg-red-50 text-red-700`
    case 'medium':
      return `${base} border-amber-200 bg-amber-50 text-amber-700`
    default:
      return `${base} border-green-200 bg-green-50 text-green-700`
  }
}

export function formatBloomkareFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`
  }

  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`
  }

  return String(count)
}

export function formatBloomkareViews(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`
  }

  if (count >= 1_000) {
    return `${Math.round(count / 1_000)}K`
  }

  return String(count)
}

export function formatBloomkareRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)))

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.round(hours / 24)
  return `${days}d ago`
}

export function filterBloomkareActivity(
  items: BloomkareActivityItem[],
  filter: BloomkareActivityFilter,
): BloomkareActivityItem[] {
  if (filter === 'all') {
    return items
  }

  return items.filter((item) => item.type === filter)
}
