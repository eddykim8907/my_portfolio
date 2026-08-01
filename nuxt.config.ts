import { fileURLToPath } from "node:url";

import { siteConfig } from "./app/config/site";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "@content": fileURLToPath(new URL("./content", import.meta.url)),
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/sitemap"],

  css: ["~/assets/css/main.css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      path: "~/components/demos",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  site: {
    url: siteUrl,
    name: siteConfig.name,
    description: siteConfig.bio,
    defaultLocale: "en",
  },

  app: {
    head: {
      title: siteConfig.name,
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: siteConfig.bio },
        { name: "author", content: siteConfig.name },
        { name: "theme-color", content: "#0a0a0a" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.svg" },
      ],
    },
  },

  sitemap: {
    exclude: ["/200.html", "/404.html"],
  },

  nitro: {
    preset: "static",
    prerender: {
      routes: [
        "/projects/bloomkare",
        "/projects/compass",
        "/projects/forsit-hub",
        "/projects/viralhook",
      ],
      crawlLinks: true,
    },
  },

  image: {
    format: ["webp"],
  },
});
