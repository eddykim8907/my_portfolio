import { siteConfig } from '~/config/site'

interface PortfolioSeoOptions {
  title?: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string>
  ogImage?: MaybeRefOrGetter<string | null | undefined>
}

export function usePortfolioSeo(options: PortfolioSeoOptions = {}) {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = (runtimeConfig.public.siteUrl as string).replace(/\/$/, '')

  const pageTitle = computed(() => toValue(options.title) ?? siteConfig.name)
  const description = computed(() => toValue(options.description) ?? siteConfig.bio)

  const path = computed(() => {
    const current = route.path
    return current.endsWith('/') && current.length > 1
      ? current.slice(0, -1)
      : current
  })

  const canonical = computed(() =>
    path.value === '/' ? siteUrl : `${siteUrl}${path.value}`,
  )

  const ogImage = computed(() => {
    const imagePath = toValue(options.ogImage) ?? '/og-image.svg'
    if (!imagePath) {
      return `${siteUrl}/og-image.svg`
    }
    return imagePath.startsWith('http') ? imagePath : `${siteUrl}${imagePath}`
  })

  const fullTitle = computed(() =>
    pageTitle.value === siteConfig.name
      ? `${siteConfig.name} | ${siteConfig.title}`
      : `${pageTitle.value} | ${siteConfig.name}`,
  )

  useSeoMeta({
    title: () => fullTitle.value,
    description: () => description.value,
    ogTitle: () => fullTitle.value,
    ogDescription: () => description.value,
    ogImage: () => ogImage.value,
    ogUrl: () => canonical.value,
    ogType: 'website',
    ogSiteName: siteConfig.name,
    twitterCard: 'summary_large_image',
    twitterTitle: () => fullTitle.value,
    twitterDescription: () => description.value,
    twitterImage: () => ogImage.value,
  })

  useHead({
    link: [{ rel: 'canonical', href: () => canonical.value }],
  })

  return {
    title: fullTitle,
    description,
    canonical,
    ogImage,
  }
}
