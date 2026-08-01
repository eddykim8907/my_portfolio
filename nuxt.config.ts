// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/image'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Eddy Portfolio',
    description:
      'Portfolio showcasing Bloomkare, Compass, ForsitHub, and ViralHook — full-stack product work at Forsit.',
    defaultLocale: 'en',
  },

  app: {
    head: {
      title: 'Eddy Portfolio',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio showcasing Bloomkare, Compass, ForsitHub, and ViralHook.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  nitro: {
    preset: 'static',
  },

  image: {
    format: ['webp'],
  },
})
