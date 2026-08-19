<script setup lang="ts">
const { featuredProjects } = useProjects();
</script>

<template>
  <section id="projects" class="py-20 sm:py-24">
    <UContainer>
      <div class="mx-auto max-w-4xl space-y-12">
        <div class="space-y-3 text-center sm:text-left">
          <h2 class="text-3xl font-bold text-white sm:text-4xl">
            Project timeline
          </h2>
        </div>

        <ProjectTimeline :projects="featuredProjects" />
      </div>
    </UContainer>
  </section>
</template>
