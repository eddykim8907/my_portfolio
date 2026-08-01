export interface CompassDailyPoint {
  label: string
  value: number
}

export interface CompassAccountRow {
  id: string
  platform: 'Amazon' | 'TikTok Shop' | 'Shopify'
  account: string
  country: string
  sales: number
  salesPrev: number
  orders: number
  ordersPrev: number
  units: number
  unitsPrev: number
  adSales: number
  adSalesPrev: number
  pageViews: number
  sessions: number
  conversionRate: number
  trend: CompassDailyPoint[]
}

export interface CompassSkuRow {
  account: string
  product: string
  sku: string
  sales: number
  salesPrev: number
  orders: number
  ordersPrev: number
  available: number
  inbound: number
  dailyVelocity: number
  pageViews: number
  sessions: number
  conversionRate: number
  trend: CompassDailyPoint[]
}

export type CompassDemoSelection =
  | { type: 'account'; row: CompassAccountRow }
  | { type: 'sku'; row: CompassSkuRow }

export const compassDemoDate = 'Aug 1, 2026'

export const compassDemoTotals = {
  sales: 142_580,
  salesPrev: 126_940,
  orders: 4_812,
  ordersPrev: 4_390,
  units: 6_204,
  unitsPrev: 5_880,
  trend: [
    { label: 'Jul 26', value: 18_200 },
    { label: 'Jul 27', value: 19_400 },
    { label: 'Jul 28', value: 20_100 },
    { label: 'Jul 29', value: 21_300 },
    { label: 'Jul 30', value: 22_800 },
    { label: 'Jul 31', value: 23_600 },
    { label: 'Aug 1', value: 24_900 },
  ] satisfies CompassDailyPoint[],
}

export const compassDemoAccounts: CompassAccountRow[] = [
  {
    id: 'northwind-us',
    platform: 'Amazon',
    account: 'Northwind US',
    country: 'US',
    sales: 84_320,
    salesPrev: 76_100,
    orders: 2_640,
    ordersPrev: 2_410,
    units: 3_420,
    unitsPrev: 3_180,
    adSales: 21_480,
    adSalesPrev: 19_200,
    pageViews: 48_200,
    sessions: 31_600,
    conversionRate: 8.2,
    trend: [
      { label: 'D1', value: 10_200 },
      { label: 'D2', value: 11_400 },
      { label: 'D3', value: 12_100 },
      { label: 'D4', value: 13_800 },
      { label: 'D5', value: 14_200 },
    ],
  },
  {
    id: 'lumen-tiktok',
    platform: 'TikTok Shop',
    account: 'LumenCare TikTok',
    country: 'US',
    sales: 38_960,
    salesPrev: 34_220,
    orders: 1_420,
    ordersPrev: 1_280,
    units: 1_860,
    unitsPrev: 1_720,
    adSales: 9_840,
    adSalesPrev: 8_960,
    pageViews: 22_400,
    sessions: 15_800,
    conversionRate: 6.4,
    trend: [
      { label: 'D1', value: 4_800 },
      { label: 'D2', value: 5_200 },
      { label: 'D3', value: 5_900 },
      { label: 'D4', value: 6_400 },
      { label: 'D5', value: 6_900 },
    ],
  },
]

export const compassDemoSkus: CompassSkuRow[] = [
  {
    account: 'Northwind US',
    product: 'Hydrating Serum 30ml',
    sku: 'LC-001',
    sales: 18_420.5,
    salesPrev: 16_200,
    orders: 612,
    ordersPrev: 540,
    available: 842,
    inbound: 200,
    dailyVelocity: 12.4,
    pageViews: 12_400,
    sessions: 9_200,
    conversionRate: 6.65,
    trend: [
      { label: 'D1', value: 2_100 },
      { label: 'D2', value: 2_450 },
      { label: 'D3', value: 2_680 },
      { label: 'D4', value: 2_890 },
      { label: 'D5', value: 3_000 },
    ],
  },
  {
    account: 'Northwind US',
    product: 'Daily SPF 50',
    sku: 'LC-014',
    sales: 12_880,
    salesPrev: 13_640,
    orders: 488,
    ordersPrev: 512,
    available: 1_120,
    inbound: 0,
    dailyVelocity: 9.8,
    pageViews: 9_600,
    sessions: 7_100,
    conversionRate: 5.9,
    trend: [
      { label: 'D1', value: 2_200 },
      { label: 'D2', value: 2_050 },
      { label: 'D3', value: 1_980 },
      { label: 'D4', value: 1_920 },
      { label: 'D5', value: 1_860 },
    ],
  },
  {
    account: 'LumenCare TikTok',
    product: 'Night Repair Cream',
    sku: 'LC-022',
    sales: 9_640,
    salesPrev: 8_120,
    orders: 356,
    ordersPrev: 318,
    available: 560,
    inbound: 120,
    dailyVelocity: 7.2,
    pageViews: 6_800,
    sessions: 5_200,
    conversionRate: 6.1,
    trend: [
      { label: 'D1', value: 1_400 },
      { label: 'D2', value: 1_520 },
      { label: 'D3', value: 1_680 },
      { label: 'D4', value: 1_820 },
      { label: 'D5', value: 1_960 },
    ],
  },
]

export function formatCompassCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value)
}

export function formatCompassNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function compassDelta(current: number, previous: number): {
  label: string
  positive: boolean
} {
  if (previous === 0) {
    return { label: '—', positive: true }
  }

  const pct = ((current - previous) / previous) * 100
  const positive = pct >= 0

  return {
    label: `${positive ? '+' : ''}${pct.toFixed(1)}%`,
    positive,
  }
}

export function compassSparklinePath(
  points: CompassDailyPoint[],
  width: number,
  height: number,
): string {
  if (points.length === 0) {
    return ''
  }

  const values = points.map((point) => point.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * width
      const y = height - ((point.value - min) / range) * (height - 4) - 2
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

export function compassAreaPath(
  points: CompassDailyPoint[],
  width: number,
  height: number,
): string {
  const line = compassSparklinePath(points, width, height)
  if (!line) {
    return ''
  }

  return `${line} L ${width} ${height} L 0 ${height} Z`
}
