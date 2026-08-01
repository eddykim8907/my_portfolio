export type ViralHookPairingStatus =
  | 'Pairing Confirm'
  | 'Pending'
  | 'On Campaign'
  | 'Reject'
  | null

export type ViralHookPairingType = 'Dedicated' | 'Integration' | 'Affiliate'

export type ViralHookPlatform = 'tiktok' | 'instagram' | 'youtube'

export type ViralHookCreatorTier = 'Nano' | 'Micro 1' | 'Micro 2' | 'Macro 1'

export interface ViralHookPairingItem {
  item_id: string
  pairing_item_no?: string
  status: ViralHookPairingStatus
  pairing_type: ViralHookPairingType
  product_info: {
    product_name: string
    asin: string
    brand: string
    color: string
  }
  decision_info: {
    decision_channel: ViralHookPlatform
    decision_content: string
  }
  added_at: string
  added_by?: string
}

export interface ViralHookPartnerPairingRow {
  id: string
  creator_code: string
  creator_first_name: string
  tiktok_handle: string
  tiktok_follower: number
  tiktok_tier: ViralHookCreatorTier
  dealmaking_code: string
  per_post: number
  dedicated: number
  integration: number
  affiliate: number
  pairing_items: ViralHookPairingItem[]
  added_at: string
  added_by?: string
  updated_at: string
  updated_by?: string
}

export interface ViralHookPairingStatusStyle {
  bg: string
  border: string
  text: string
  label: string
  strokeColor: string
}

export interface ViralHookTierStyle {
  bg: string
  starFilled: boolean
}

export const viralhookDemoCreators: ViralHookPartnerPairingRow[] = [
  {
    id: 'pp-001',
    creator_code: 'CR-A104',
    creator_first_name: 'Jordan',
    tiktok_handle: '@studio.j',
    tiktok_follower: 84_200,
    tiktok_tier: 'Micro 1',
    dealmaking_code: 'DM-2408',
    per_post: 1200,
    dedicated: 2,
    integration: 1,
    affiliate: 0,
    added_at: '2025-11-12',
    added_by: 'Ops Lead',
    updated_at: '2025-12-10',
    updated_by: 'Ops Lead',
    pairing_items: [
      {
        item_id: 'pi-1',
        pairing_item_no: 'PP-2408-01',
        status: 'Pairing Confirm',
        pairing_type: 'Dedicated',
        product_info: {
          product_name: 'Hydrating Face Serum',
          asin: 'B0DEMO001',
          brand: 'Lumen Skin',
          color: '#BFDBFE',
        },
        decision_info: { decision_channel: 'tiktok', decision_content: 'Dedicated' },
        added_at: '2025-11-12',
        added_by: 'Ops Lead',
      },
      {
        item_id: 'pi-2',
        pairing_item_no: 'PP-2408-02',
        status: 'Pending',
        pairing_type: 'Integration',
        product_info: {
          product_name: 'Daily SPF 50',
          asin: 'B0DEMO002',
          brand: 'Lumen Skin',
          color: '#FDE68A',
        },
        decision_info: { decision_channel: 'tiktok', decision_content: 'Integration' },
        added_at: '2025-12-01',
        added_by: 'AM Team',
      },
      {
        item_id: 'pi-3',
        pairing_item_no: 'PP-2408-03',
        status: 'On Campaign',
        pairing_type: 'Dedicated',
        product_info: {
          product_name: 'Night Recovery Cream',
          asin: 'B0DEMO003',
          brand: 'Lumen Skin',
          color: '#C4B5FD',
        },
        decision_info: { decision_channel: 'instagram', decision_content: 'Dedicated' },
        added_at: '2025-12-10',
        added_by: 'Ops Lead',
      },
    ],
  },
  {
    id: 'pp-002',
    creator_code: 'CR-B218',
    creator_first_name: 'Maya',
    tiktok_handle: '@mayacreates',
    tiktok_follower: 312_000,
    tiktok_tier: 'Macro 1',
    dealmaking_code: 'DM-2411',
    per_post: 2800,
    dedicated: 1,
    integration: 0,
    affiliate: 1,
    added_at: '2025-11-28',
    added_by: 'Campaign Ops',
    updated_at: '2025-12-05',
    updated_by: 'AM Team',
    pairing_items: [
      {
        item_id: 'pi-4',
        pairing_item_no: 'PP-2411-01',
        status: 'On Campaign',
        pairing_type: 'Dedicated',
        product_info: {
          product_name: 'Protein Starter Kit',
          asin: 'B0DEMO004',
          brand: 'North Peak',
          color: '#BBF7D0',
        },
        decision_info: { decision_channel: 'tiktok', decision_content: 'Dedicated' },
        added_at: '2025-11-28',
        added_by: 'Campaign Ops',
      },
      {
        item_id: 'pi-5',
        pairing_item_no: 'PP-2411-02',
        status: 'Reject',
        pairing_type: 'Affiliate',
        product_info: {
          product_name: 'Electrolyte Mix',
          asin: 'B0DEMO005',
          brand: 'North Peak',
          color: '#FECACA',
        },
        decision_info: { decision_channel: 'youtube', decision_content: 'Affiliate' },
        added_at: '2025-12-05',
        added_by: 'AM Team',
      },
    ],
  },
  {
    id: 'pp-003',
    creator_code: 'CR-C077',
    creator_first_name: 'Alex',
    tiktok_handle: '@alex.unbox',
    tiktok_follower: 18_400,
    tiktok_tier: 'Nano',
    dealmaking_code: 'DM-2415',
    per_post: 450,
    dedicated: 1,
    integration: 1,
    affiliate: 1,
    added_at: '2025-12-08',
    added_by: 'Ops Lead',
    updated_at: '2025-12-16',
    updated_by: 'Campaign Ops',
    pairing_items: [
      {
        item_id: 'pi-6',
        pairing_item_no: 'PP-2415-01',
        status: 'Pending',
        pairing_type: 'Integration',
        product_info: {
          product_name: 'Smart Desk Lamp',
          asin: 'B0DEMO006',
          brand: 'Arc Home',
          color: '#E2E8F0',
        },
        decision_info: { decision_channel: 'tiktok', decision_content: 'Integration' },
        added_at: '2025-12-08',
        added_by: 'Ops Lead',
      },
      {
        item_id: 'pi-7',
        pairing_item_no: 'PP-2415-02',
        status: 'Pairing Confirm',
        pairing_type: 'Dedicated',
        product_info: {
          product_name: 'Cable Organizer Set',
          asin: 'B0DEMO007',
          brand: 'Arc Home',
          color: '#DDD6FE',
        },
        decision_info: { decision_channel: 'tiktok', decision_content: 'Dedicated' },
        added_at: '2025-12-14',
        added_by: 'Campaign Ops',
      },
      {
        item_id: 'pi-8',
        pairing_item_no: 'PP-2415-03',
        status: 'Pending',
        pairing_type: 'Affiliate',
        product_info: {
          product_name: 'Monitor Light Bar',
          asin: 'B0DEMO008',
          brand: 'Arc Home',
          color: '#FBCFE8',
        },
        decision_info: { decision_channel: 'instagram', decision_content: 'Affiliate' },
        added_at: '2025-12-16',
      },
    ],
  },
  {
    id: 'pp-004',
    creator_code: 'CR-D033',
    creator_first_name: 'Sam',
    tiktok_handle: '@sam.reviews',
    tiktok_follower: 56_800,
    tiktok_tier: 'Micro 2',
    dealmaking_code: 'DM-2418',
    per_post: 900,
    dedicated: 0,
    integration: 1,
    affiliate: 0,
    added_at: '2025-12-12',
    added_by: 'AM Team',
    updated_at: '2025-12-12',
    updated_by: 'AM Team',
    pairing_items: [
      {
        item_id: 'pi-9',
        pairing_item_no: 'PP-2418-01',
        status: 'On Campaign',
        pairing_type: 'Integration',
        product_info: {
          product_name: 'Travel Coffee Press',
          asin: 'B0DEMO009',
          brand: 'Brew Co.',
          color: '#FED7AA',
        },
        decision_info: { decision_channel: 'youtube', decision_content: 'Integration' },
        added_at: '2025-12-12',
        added_by: 'AM Team',
      },
    ],
  },
]

export function formatViralHookFollowers(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  }

  return String(value)
}

export function formatViralHookCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatViralHookMonth(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${year}/${month}`
}

export function viralHookPairingStatusStyle(
  status: ViralHookPairingStatus,
): ViralHookPairingStatusStyle {
  switch (status) {
    case 'Pairing Confirm':
      return {
        bg: 'bg-blue-500/20',
        border: 'border-blue-300',
        text: 'text-blue-300',
        label: 'Pairing Confirm',
        strokeColor: '#3B82F680',
      }
    case 'Pending':
      return {
        bg: 'bg-orange-500/20',
        border: 'border-orange-300',
        text: 'text-orange-300',
        label: 'Pending',
        strokeColor: '#F9731680',
      }
    case 'On Campaign':
      return {
        bg: 'bg-green-500/20',
        border: 'border-green-300',
        text: 'text-green-300',
        label: 'On Campaign',
        strokeColor: '#10B98180',
      }
    case 'Reject':
      return {
        bg: 'bg-red-500/20',
        border: 'border-red-300',
        text: 'text-red-300',
        label: 'Reject',
        strokeColor: '#EF444480',
      }
    default:
      return {
        bg: 'bg-zinc-500/20',
        border: 'border-zinc-100',
        text: 'text-white',
        label: 'Unassigned',
        strokeColor: '#D2D5DA80',
      }
  }
}

export function viralHookTierStyle(tier: ViralHookCreatorTier): ViralHookTierStyle {
  switch (tier) {
    case 'Nano':
      return { bg: 'bg-gray-500', starFilled: false }
    case 'Micro 1':
      return { bg: 'bg-[#0EA5E9]', starFilled: false }
    case 'Micro 2':
      return { bg: 'bg-[#0EA5E9]', starFilled: true }
    case 'Macro 1':
      return { bg: 'bg-[#EF4444]', starFilled: false }
    default:
      return { bg: 'bg-gray-500', starFilled: false }
  }
}

export function viralHookPlatformIcon(platform: ViralHookPlatform): string {
  const icons: Record<ViralHookPlatform, string> = {
    tiktok: '/projects/viralhook/platform/tiktok_small.svg',
    instagram: '/projects/viralhook/platform/insta_small.svg',
    youtube: '/projects/viralhook/platform/youtube_small.svg',
  }

  return icons[platform]
}

export function viralHookDecisionContentLabel(content: string): string {
  const map: Record<string, string> = {
    dedicated: 'Dedicated',
    integration: 'Integration',
    affiliate: 'Affiliate',
  }

  return map[content.toLowerCase()] ?? content
}

export function viralHookMissingProductSvg(strokeColor: string): string {
  return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.42871 0.5H25.5713C28.8455 0.5 31.5 3.15445 31.5 6.42871V25.5713C31.5 28.8455 28.8455 31.5 25.5713 31.5H6.42871C3.15445 31.5 0.5 28.8455 0.5 25.5713V6.42871C0.5 3.15445 3.15445 0.5 6.42871 0.5Z" stroke="${strokeColor}"/>
    <g clip-path="url(#clip0_missing_product)">
      <path d="M11.0057 26.0059C11.0057 27.1082 13.0871 28 16.0028 28C18.9186 28 21 27.1082 21 26.0059V13.6978C21 12.0356 19.7044 10.6844 18.1042 10.6844H18.0957C18.3861 10.6844 18.6224 10.4385 18.6224 10.1363L18.3377 7.15852C18.3377 6.8563 18.1014 6.61037 17.8109 6.61037H17.754L18.0387 4.84149L18.7136 4.54519C19.2716 3.89334 18.7136 4.00889 18.7136 4.00889L15.1002 4.60149C14.6276 4.60149 14.246 4.99852 14.246 5.49037V6.61037H14.1891C13.8986 6.61037 13.6623 6.8563 13.6623 7.15852L13.3776 10.1363C13.3776 10.4385 13.6139 10.6844 13.9043 10.6844H13.8958C12.2984 10.6844 11 12.0326 11 13.6978V26.0059H11.0057Z" fill="${strokeColor}"/>
    </g>
    <defs>
      <clipPath id="clip0_missing_product">
        <rect width="10" height="24" fill="white" transform="translate(11 4)"/>
      </clipPath>
    </defs>
  </svg>`
}

export function viralHookTotalPairings(creators: ViralHookPartnerPairingRow[]): number {
  return creators.reduce((total, creator) => total + creator.pairing_items.length, 0)
}

export function viralHookPairingStatusCounts(
  creator: ViralHookPartnerPairingRow,
): Partial<Record<NonNullable<ViralHookPairingStatus>, number>> {
  const counts: Partial<Record<NonNullable<ViralHookPairingStatus>, number>> = {}

  for (const item of creator.pairing_items) {
    if (!item.status) {
      continue
    }

    counts[item.status] = (counts[item.status] ?? 0) + 1
  }

  return counts
}

export function viralHookProfileInitials(name: string | undefined): string {
  if (!name) {
    return ''
  }

  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
  }

  return parts[0]!.slice(0, 1).toUpperCase()
}
