<script setup lang="ts">
import type { SiteSocialIcon } from '~/config/site'

const { site } = useSite()

const iconPaths: Record<SiteSocialIcon, string> = {
  github: 'M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 21.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  email: 'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.828 6.042a1.5 1.5 0 001.344 0L22.5 6.908z',
}

function linkTarget(href: string) {
  return href.startsWith('mailto:') ? undefined : '_blank'
}

function linkRel(href: string) {
  return href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
}
</script>

<template>
  <aside
    class="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 md:flex md:flex-col md:items-center md:gap-3"
    aria-label="Contact links"
  >
    <div
      class="h-12 w-px bg-gradient-to-b from-transparent via-neutral-700/80 to-neutral-600/60"
      aria-hidden="true"
    />

    <nav class="flex flex-col gap-2.5">
      <a
        v-for="link in site.social"
        :key="link.label"
        :href="link.href"
        :target="linkTarget(link.href)"
        :rel="linkRel(link.href)"
        :aria-label="link.label"
        class="group flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800/90 bg-neutral-950/70 text-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white hover:shadow-md hover:shadow-neutral-950/50"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-[18px] w-[18px] fill-current transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        >
          <path :d="iconPaths[link.icon]" />
        </svg>
      </a>
    </nav>

    <div
      class="h-12 w-px bg-gradient-to-b from-neutral-600/60 via-neutral-700/80 to-transparent"
      aria-hidden="true"
    />
  </aside>

  <!-- Compact mobile strip — bottom-left, always reachable -->
  <nav
    class="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-50 flex gap-2 md:hidden"
    aria-label="Contact links"
  >
    <a
      v-for="link in site.social"
      :key="`mobile-${link.label}`"
      :href="link.href"
      :target="linkTarget(link.href)"
      :rel="linkRel(link.href)"
      :aria-label="link.label"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800/90 bg-neutral-950/85 text-neutral-400 shadow-lg backdrop-blur-md transition hover:border-neutral-600 hover:text-white"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-[18px] w-[18px] fill-current"
        aria-hidden="true"
      >
        <path :d="iconPaths[link.icon]" />
      </svg>
    </a>
  </nav>
</template>
