<script setup lang="ts">
const { site } = useSite()
const route = useRoute()

const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
] as const

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b border-neutral-800/90 bg-neutral-950/90 pt-[env(safe-area-inset-top,0px)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
  >
    <!-- Forsit product palette — ties the nav to the work on the site -->
    <div
      class="header-accent-stripe h-[3px]"
      aria-hidden="true"
    />

    <UContainer class="flex h-[3.75rem] items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="group flex min-w-0 items-center gap-3"
        aria-label="Home — Edward Kim portfolio"
      >
        <span
          class="h-7 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#EE5FA4] via-[#29AAE1] to-[#6366F1] transition duration-200 group-hover:brightness-110"
          aria-hidden="true"
        />

        <span class="flex min-w-0 flex-col">
          <span class="truncate text-base font-semibold tracking-tight text-white transition group-hover:text-neutral-100">
            {{ site.name }}
          </span>
          <span class="truncate text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 transition group-hover:text-neutral-400">
            Portfolio
          </span>
        </span>
      </NuxtLink>

      <div class="flex items-center gap-2 sm:gap-3">
        <nav
          class="flex items-center gap-0.5 rounded-lg bg-neutral-900/70 p-1 ring-1 ring-neutral-800/90"
          aria-label="Main"
        >
          <NuxtLink
            to="/"
            class="rounded-md px-3 py-1.5 text-sm font-medium transition duration-150"
            :class="isActive('/') && route.path === '/'
              ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-white/10'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200'"
          >
            Home
          </NuxtLink>
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-1.5 text-sm font-medium transition duration-150"
            :class="isActive(link.to)
              ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-white/10'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <a
          :href="site.resume"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden rounded-lg bg-gradient-to-r from-[#29AAE1] to-[#6366F1] px-3.5 py-1.5 text-sm font-medium text-white shadow-md shadow-[#29AAE1]/15 transition duration-200 hover:brightness-110 sm:inline-flex"
        >
          Resume
        </a>
      </div>
    </UContainer>
  </header>
</template>

<style scoped>
.header-accent-stripe {
  background: linear-gradient(
    90deg,
    #ee5fa4,
    #29aae1,
    #10b981,
    #6366f1,
    #ee5fa4
  );
  background-size: 200% 100%;
  animation: header-accent-flow 10s ease-in-out infinite;
}

@keyframes header-accent-flow {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-accent-stripe {
    animation: none;
    background-size: 100% 100%;
  }
}
</style>
