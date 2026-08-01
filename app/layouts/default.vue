<template>
  <div class="flex min-h-dvh flex-col bg-neutral-950 text-neutral-100">
    <ContactSidebar />
    <AppHeader />
    <main class="flex-1 pt-[calc(3.75rem+3px+env(safe-area-inset-top,0px))]">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
