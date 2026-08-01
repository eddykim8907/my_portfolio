<script setup lang="ts">
const { site } = useSite()

usePortfolioSeo({
  title: site.name,
  description: `${site.bio} Projects: Bloomkare, Compass, ForsitHub, and ViralHook.`,
})
</script>

<template>
  <div>
    <HomeHero />
    <FeaturedProjects />
  </div>
</template>
