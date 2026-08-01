export interface ForsitHubChartPoint {
  date: string
  sales: number
}

export interface ForsitHubPlatformMetrics {
  currSales: number
  prevSales: number
  currOrders: number
  prevOrders: number
  currUnits: number
  prevUnits: number
}

export interface ForsitHubPlatform {
  id: string
  name: string
  platform: 'amazon' | 'qoo10' | 'tiktok'
  country?: 'US' | 'JP'
  metrics: ForsitHubPlatformMetrics
}

export interface ForsitHubPpcTotals {
  currSales: number
  prevSales: number
  currSpends: number
  prevSpends: number
}

export interface ForsitHubSkuRow {
  rank: number
  sku: string
  asin: string
  title: string
  brand: string
  sales: number
  adSales: number
}

export interface ForsitHubBrandRow {
  rank: number
  brand: string
  currSales: number
  prevSales: number
}

export const forsitHubDemoDate = 'Aug 1, 2026'

export const forsitHubDemoChart: ForsitHubChartPoint[] = [
  { date: '07-18', sales: 18_420 },
  { date: '07-19', sales: 19_880 },
  { date: '07-20', sales: 20_140 },
  { date: '07-21', sales: 21_560 },
  { date: '07-22', sales: 22_100 },
  { date: '07-23', sales: 21_840 },
  { date: '07-24', sales: 22_920 },
  { date: '07-25', sales: 23_480 },
  { date: '07-26', sales: 22_760 },
  { date: '07-27', sales: 23_900 },
  { date: '07-28', sales: 24_120 },
  { date: '07-29', sales: 23_680 },
  { date: '07-30', sales: 24_540 },
  { date: '07-31', sales: 25_100 },
  { date: '08-01', sales: 24_650 },
]

export const forsitHubDemoTotals: ForsitHubPlatformMetrics = {
  currSales: 142_580,
  prevSales: 126_940,
  currOrders: 4_812,
  prevOrders: 4_390,
  currUnits: 6_204,
  prevUnits: 5_880,
}

export const forsitHubDemoPlatforms: ForsitHubPlatform[] = [
  {
    id: 'amazon-us',
    name: 'Amazon US',
    platform: 'amazon',
    country: 'US',
    metrics: {
      currSales: 84_320,
      prevSales: 76_100,
      currOrders: 2_640,
      prevOrders: 2_410,
      currUnits: 3_420,
      prevUnits: 3_180,
    },
  },
  {
    id: 'amazon-jp',
    name: 'Amazon JP',
    platform: 'amazon',
    country: 'JP',
    metrics: {
      currSales: 28_400,
      prevSales: 26_200,
      currOrders: 980,
      prevOrders: 910,
      currUnits: 1_240,
      prevUnits: 1_180,
    },
  },
  {
    id: 'qoo10',
    name: 'Qoo10',
    platform: 'qoo10',
    metrics: {
      currSales: 18_260,
      prevSales: 16_840,
      currOrders: 720,
      prevOrders: 680,
      currUnits: 890,
      prevUnits: 820,
    },
  },
  {
    id: 'tiktok-us',
    name: 'TikTok Shop',
    platform: 'tiktok',
    country: 'US',
    metrics: {
      currSales: 11_600,
      prevSales: 7_800,
      currOrders: 472,
      prevOrders: 390,
      currUnits: 654,
      prevUnits: 700,
    },
  },
]

export const forsitHubDemoPpc: ForsitHubPpcTotals = {
  currSales: 38_420,
  prevSales: 34_100,
  currSpends: 9_860,
  prevSpends: 9_200,
}

export const forsitHubDemoSkus: ForsitHubSkuRow[] = [
  { rank: 1, sku: 'NW-001-BLK', asin: 'B0XXXX001', title: 'Northwind Daily Serum', brand: 'Northwind', sales: 12_480, adSales: 4_220 },
  { rank: 2, sku: 'CL-204-WHT', asin: 'B0XXXX002', title: 'Cedar Labs Moisture Cream', brand: 'Cedar Labs', sales: 9_840, adSales: 3_180 },
  { rank: 3, sku: 'HB-118-GRN', asin: 'B0XXXX003', title: 'Harbor Bloom Face Mask', brand: 'Harbor Bloom', sales: 8_260, adSales: 2_640 },
  { rank: 4, sku: 'NW-014-TRV', asin: 'B0XXXX004', title: 'Northwind Travel Kit', brand: 'Northwind', sales: 6_920, adSales: 1_980 },
  { rank: 5, sku: 'SL-302-RED', asin: 'B0XXXX005', title: 'Summit Lane Lip Tint', brand: 'Summit Lane', sales: 5_740, adSales: 1_420 },
]

export const forsitHubDemoBrands: ForsitHubBrandRow[] = [
  { rank: 1, brand: 'Northwind', currSales: 42_800, prevSales: 38_200 },
  { rank: 2, brand: 'Cedar Labs', currSales: 31_400, prevSales: 29_100 },
  { rank: 3, brand: 'Harbor Bloom', currSales: 24_680, prevSales: 22_940 },
  { rank: 4, brand: 'Summit Lane', currSales: 18_920, prevSales: 17_600 },
  { rank: 5, brand: 'Blue Ridge Co.', currSales: 14_780, prevSales: 15_100 },
]

export function formatForsitHubCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value)
}

export function formatForsitHubNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function forsitHubDelta(current: number, previous: number): {
  label: string
  positive: boolean
  absolute: number
} {
  if (previous === 0) {
    return { label: '—', positive: true, absolute: 0 }
  }

  const diff = current - previous
  const pct = (diff / previous) * 100
  const positive = diff >= 0

  return {
    label: `${positive ? '+' : ''}${pct.toFixed(1)}%`,
    positive,
    absolute: Math.abs(diff),
  }
}

export function forsitHubChartPlotPoints(
  points: ForsitHubChartPoint[],
  width: number,
  height: number,
): Array<ForsitHubChartPoint & { x: number; y: number }> {
  if (points.length === 0) {
    return []
  }

  const values = points.map((point) => point.sales)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  return points.map((point, index) => ({
    ...point,
    x: (index / (points.length - 1 || 1)) * width,
    y: height - ((point.sales - min) / range) * (height - 8) - 4,
  }))
}

export function forsitHubSparklinePath(
  points: ForsitHubChartPoint[],
  width: number,
  height: number,
): string {
  const plotPoints = forsitHubChartPlotPoints(points, width, height)
  if (plotPoints.length === 0) {
    return ''
  }

  return plotPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ')
}

export function forsitHubAreaPath(
  points: ForsitHubChartPoint[],
  width: number,
  height: number,
): string {
  const line = forsitHubSparklinePath(points, width, height)
  if (!line) {
    return ''
  }

  return `${line} L ${width} ${height} L 0 ${height} Z`
}

export function forsitHubAcos(spends: number, sales: number): string {
  if (sales === 0) {
    return '—'
  }

  return `${((spends / sales) * 100).toFixed(1)}%`
}

export function forsitHubRoas(sales: number, spends: number): string {
  if (spends === 0) {
    return '—'
  }

  return `${(sales / spends).toFixed(2)}x`
}

export function forsitHubBrandChange(row: ForsitHubBrandRow): {
  amount: number
  percent: string
  positive: boolean
} {
  const amount = row.currSales - row.prevSales
  const positive = amount >= 0
  const percent = row.prevSales === 0
    ? '—'
    : `${positive ? '+' : ''}${((amount / row.prevSales) * 100).toFixed(2)}%`

  return { amount: Math.abs(amount), positive, percent }
}

export function forsitHubPlatformAccent(platform: ForsitHubPlatform['platform']): string {
  if (platform === 'amazon') {
    return '#FF9900'
  }

  if (platform === 'qoo10') {
    return '#E4002B'
  }

  return '#111827'
}
