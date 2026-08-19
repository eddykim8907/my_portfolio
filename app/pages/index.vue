<script setup lang="ts">
const { site } = useSite()

usePortfolioSeo({
  title: site.name,
  description: `${site.bio} Projects at GS Land and Forsit, including B2C launches and full-stack product work.`,
})
</script>

<template>
  <div>
    <HomeHero />
    <FeaturedProjects />
  </div>
</template>
