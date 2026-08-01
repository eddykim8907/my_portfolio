/**
 * Forwards wheel events to the page when a scroll container cannot scroll further
 * (or has no overflow), so nested demo panes do not trap page scroll on hover.
 */
export function useScrollChain(target: Ref<HTMLElement | null | undefined>) {
  let detach: (() => void) | undefined

  const attach = (element: HTMLElement) => {
    const onWheel = (event: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = element
      const { deltaY, deltaX } = event
      const noOverflow = scrollHeight <= clientHeight + 1
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      const scrollingUp = deltaY < 0
      const scrollingDown = deltaY > 0

      const shouldChain = noOverflow
        || (scrollingUp && atTop)
        || (scrollingDown && atBottom)

      if (!shouldChain) {
        return
      }

      event.preventDefault()
      window.scrollBy({
        top: deltaY,
        left: deltaX,
        behavior: 'auto',
      })
    }

    element.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      element.removeEventListener('wheel', onWheel)
    }
  }

  watch(
    target,
    (element) => {
      detach?.()
      detach = element ? attach(element) : undefined
    },
    { immediate: true },
  )

  onUnmounted(() => {
    detach?.()
  })
}
