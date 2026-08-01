<script setup lang="ts">
const sidebarCollapsed = ref(false)
const paidMenuOpen = ref(true)
const paidFlyoutOpen = ref(false)

const sidebarRef = ref<HTMLElement | null>(null)
const paidMenuRef = ref<HTMLElement | null>(null)
const flyoutRef = ref<HTMLElement | null>(null)

const flyoutPosition = ref({ top: 0, left: 0 })

const sidebarMenu = [
  {
    icon: 'user',
    label: 'Creators',
  },
  {
    icon: 'dollar',
    label: 'Paid',
    subItems: [
      { label: 'Matchmaking', icon: 'file', active: false },
      { label: 'Dealmaking', icon: 'comments', active: false },
      { label: 'Partner Pairing', icon: 'link', active: true },
    ],
  },
] as const

const paidItem = computed(() => sidebarMenu.find((item) => item.label === 'Paid'))
const paidIsActive = computed(() =>
  paidItem.value?.subItems?.some((subItem) => subItem.active) ?? false,
)

function toggleSidebarCollapse() {
  sidebarCollapsed.value = !sidebarCollapsed.value

  if (sidebarCollapsed.value) {
    paidMenuOpen.value = false
  } else {
    paidFlyoutOpen.value = false
    paidMenuOpen.value = true
  }
}

function resolveMenuElement(
  element: Element | ComponentPublicInstance | null,
): HTMLElement | null {
  if (!element) {
    return null
  }

  return element instanceof HTMLElement ? element : null
}

function updateFlyoutPosition() {
  const element = paidMenuRef.value
  if (!element) {
    return
  }

  const rect = element.getBoundingClientRect()
  flyoutPosition.value = {
    top: rect.top,
    left: rect.right + 8,
  }
}

function handlePaidMenuClick() {
  if (sidebarCollapsed.value) {
    updateFlyoutPosition()
    paidFlyoutOpen.value = !paidFlyoutOpen.value
    return
  }

  paidMenuOpen.value = !paidMenuOpen.value
}

function setPaidMenuRef(element: Element | ComponentPublicInstance | null) {
  paidMenuRef.value = resolveMenuElement(element)
}

function handleClickOutside(event: MouseEvent) {
  if (!sidebarCollapsed.value || !paidFlyoutOpen.value) {
    return
  }

  const target = event.target as Node
  if (sidebarRef.value?.contains(target) || flyoutRef.value?.contains(target)) {
    return
  }

  paidFlyoutOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <aside
    ref="sidebarRef"
    class="vh-sidebar relative hidden min-h-0 shrink-0 self-stretch transition-all duration-300 ease-in-out sm:flex"
    :class="sidebarCollapsed ? 'w-[60px]' : 'w-[280px]'"
  >
    <div class="flex h-full min-h-0 w-full flex-col">
    <button
      type="button"
      class="absolute top-4 -right-3 z-20 flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-500 shadow-md transition-colors hover:bg-zinc-800 hover:text-zinc-300"
      :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="toggleSidebarCollapse"
    >
      <svg
        class="h-2.5 w-2.5 transition-transform duration-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          v-if="sidebarCollapsed"
          d="M9 18l6-6-6-6"
        />
        <path
          v-else
          d="M15 18l-6-6 6-6"
        />
      </svg>
    </button>

    <div
      class="vh-sidebar-logo flex shrink-0 items-center py-4"
      :class="sidebarCollapsed ? 'justify-center px-2' : 'gap-3.5 px-4'"
    >
      <img
        src="/projects/viralhook/logo-white.svg"
        alt="ViralHook"
        class="h-8 w-8 shrink-0"
      >
      <img
        v-if="!sidebarCollapsed"
        src="/projects/viralhook/logo-text-white.svg"
        alt=""
        class="h-[18px] w-auto shrink-0"
      >
    </div>

    <nav class="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-2 pb-3">
      <div
        v-for="item in sidebarMenu"
        :key="item.label"
        class="relative"
      >
        <button
          v-if="item.label === 'Creators'"
          type="button"
          class="vh-menu-item group flex w-full items-center rounded-lg border border-transparent text-left text-zinc-300 transition-all duration-150 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-white"
          :class="sidebarCollapsed ? 'justify-center p-2' : 'gap-2 p-3'"
          :title="sidebarCollapsed ? item.label : undefined"
        >
          <span class="vh-menu-icon">
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <span
            v-if="!sidebarCollapsed"
            class="flex-1 truncate text-sm font-medium leading-tight"
          >
            {{ item.label }}
          </span>
        </button>

        <template v-else-if="item.subItems">
          <button
            :ref="setPaidMenuRef"
            type="button"
            class="vh-menu-item group flex w-full items-center rounded-lg border text-left transition-all duration-150"
            :class="[
              sidebarCollapsed ? 'justify-center p-2' : 'gap-2 p-3',
              !sidebarCollapsed && paidMenuOpen
                ? 'border-zinc-700/60 bg-zinc-900/80 text-white shadow-sm'
                : paidIsActive && sidebarCollapsed
                  ? 'border-zinc-700/60 bg-zinc-900/80 text-white shadow-sm'
                  : 'border-transparent text-zinc-300 hover:border-zinc-700/50 hover:bg-zinc-900/50 hover:text-white',
            ]"
            :title="sidebarCollapsed ? item.label : undefined"
            @click="handlePaidMenuClick"
          >
            <span class="vh-menu-icon">
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
            <span
              v-if="!sidebarCollapsed"
              class="flex-1 truncate text-sm font-medium leading-tight"
            >
              {{ item.label }}
            </span>
            <svg
              v-if="!sidebarCollapsed"
              class="h-2.5 w-2.5 shrink-0 text-zinc-500 transition-transform duration-200"
              :class="paidMenuOpen ? 'rotate-90 text-zinc-300' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            v-if="!sidebarCollapsed && paidMenuOpen"
            class="mt-1 ml-5 space-y-0.5 border-l border-zinc-800/80 pl-2"
          >
            <div
              v-for="subItem in item.subItems"
              :key="subItem.label"
              class="vh-submenu-item flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm leading-tight transition-all duration-150"
              :class="subItem.active
                ? 'vh-submenu-item--active border-zinc-600/70 bg-zinc-800/90 text-white shadow-sm'
                : 'border-transparent text-zinc-400 hover:border-zinc-700/40 hover:bg-zinc-900/60 hover:text-zinc-200'"
            >
              <span
                class="vh-menu-icon vh-menu-icon--sm"
                :class="subItem.active ? 'text-white' : ''"
              >
                <svg
                  v-if="subItem.icon === 'file'"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <svg
                  v-else-if="subItem.icon === 'comments'"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <svg
                  v-else
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </span>
              <span class="truncate font-medium">
                {{ subItem.label }}
              </span>
              <span
                v-if="subItem.active"
                class="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
              />
            </div>
          </div>
        </template>
      </div>
    </nav>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 translate-x-1"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-1"
      >
        <div
          v-if="sidebarCollapsed && paidFlyoutOpen && paidItem?.subItems"
          ref="flyoutRef"
          class="fixed z-[200] w-[200px] rounded-lg border border-zinc-700 bg-zinc-950 p-1 shadow-xl shadow-black/40"
          :style="{
            top: `${flyoutPosition.top}px`,
            left: `${flyoutPosition.left}px`,
          }"
        >
          <div
            v-for="subItem in paidItem.subItems"
            :key="subItem.label"
            class="vh-submenu-item flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm leading-tight transition-all duration-150"
            :class="subItem.active
              ? 'vh-submenu-item--active border-zinc-600/70 bg-zinc-800/90 text-white shadow-sm'
              : 'border-transparent text-zinc-400 hover:border-zinc-700/40 hover:bg-zinc-900/60 hover:text-zinc-200'"
          >
            <span
              class="vh-menu-icon vh-menu-icon--sm"
              :class="subItem.active ? 'text-white' : ''"
            >
              <svg
                v-if="subItem.icon === 'file'"
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <svg
                v-else-if="subItem.icon === 'comments'"
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <svg
                v-else
                class="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <span class="truncate font-medium">
              {{ subItem.label }}
            </span>
          </div>
        </div>
      </Transition>
    </Teleport>
  </aside>
</template>

<style scoped>
.vh-sidebar {
  background: linear-gradient(180deg, rgb(12 12 14) 0%, rgb(9 9 11) 100%);
  border-right: 1px solid rgb(63 63 70 / 0.65);
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.03);
}

.vh-sidebar-logo {
  border-bottom: 1px solid rgb(39 39 42 / 0.9);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.04);
}

.vh-menu-icon {
  display: flex;
  height: 21px;
  width: 21px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid rgb(63 63 70 / 0.8);
  background: rgb(24 24 27);
  color: rgb(161 161 170);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.vh-menu-item:hover .vh-menu-icon,
.vh-submenu-item:hover .vh-menu-icon {
  color: rgb(228 228 231);
  border-color: rgb(82 82 91 / 0.8);
}

.vh-menu-icon--sm {
  height: 18px;
  width: 18px;
  border-radius: 5px;
}

.vh-submenu-item--active .vh-menu-icon {
  color: white;
  border-color: rgb(82 82 91);
  background: rgb(39 39 42);
}
</style>
