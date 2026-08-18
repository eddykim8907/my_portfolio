<script setup lang="ts">
const { site } = useSite()

usePortfolioSeo({
  title: site.name,
  description: `${site.bio} Projects across GS Land and Forsit, from B2C launches to full-stack product systems.`,
})
</script>

<template>
  <div>
    <HomeHero />
    <FeaturedProjects />
  </div>
</template>
