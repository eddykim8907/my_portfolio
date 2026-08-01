<template>
  <div class="flex min-h-dvh flex-col bg-neutral-950 text-neutral-100">
    <ContactSidebar />
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
