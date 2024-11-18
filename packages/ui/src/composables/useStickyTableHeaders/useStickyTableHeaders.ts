import { Ref, computed, watchEffect, type ComponentPublicInstance } from 'vue'
import { useEvent } from '../'
import { useElementBackground } from '../std/browser/useElementBackground'
import { isServer } from '../../utils/ssr'

const syncTh = (thead1: HTMLElement, thead2: HTMLElement) => {
  const ths1 = thead1.querySelectorAll('th')
  const ths2 = thead2.querySelectorAll('th')

  ths1.forEach((th, index) => {
    const th2 = ths2[index]

    th2.style.width = `${th.getBoundingClientRect().width}px`
  })
}

const recursiveGetOffset = (el: HTMLElement, offset = 0): number => {
  if (!el) { return offset }

  return recursiveGetOffset(el.offsetParent as HTMLElement, offset + el.offsetTop)
}

/**
 * Creates virtual table headers, that are sticky when you scroll the table with position fixed.
 * When standard table headers are visible, the virtual headers are hidden.
 */
export const useStickyTableHeaders = (tableEl: Ref<HTMLTableElement | ComponentPublicInstance | undefined | null>, offset = 0) => {
  if (isServer()) {
    return
  }

  let mutationObserver: MutationObserver | null = null
  let headClone: HTMLElement | null = null
  let head: HTMLElement | null = null
  let table: HTMLTableElement | null = null

  let headOffset = 0
  let hasTransform = false
  let tableHeight = 0
  let headHeight = 0

  const htmlTable = computed(() => {
    if (!tableEl.value) { return null }

    const el = '$el' in tableEl.value ? tableEl.value.$el as HTMLElement : tableEl.value

    return el.tagName === 'TABLE' ? el as HTMLTableElement : el.querySelector('table') as HTMLTableElement
  })

  const htmlTableHead = computed(() => {
    if (!htmlTable.value) { return null }

    return htmlTable.value.querySelector('thead') as HTMLElement
  })

  const bg = useElementBackground(htmlTableHead)

  watchEffect(() => {
    if (!tableEl.value) { return }

    const rootEl = htmlTable.value

    if (!rootEl) { return }

    table = htmlTable.value
    head = htmlTableHead.value

    if (!head) { return }

    table.style.position = 'relative'

    headClone = head.cloneNode(true) as HTMLElement

    headClone.style.position = 'fixed'
    headClone.style.top = '0px'
    headClone.style.width = `${table.clientWidth}px`
    headClone.style.zIndex = '1'
    headClone.style.backgroundColor = bg.value!
    headClone.style.display = 'none'

    table.appendChild(headClone)

    syncTh(head, headClone)
    headOffset = recursiveGetOffset(head)
    hasTransform = window.getComputedStyle(table).transform !== 'none'
    tableHeight = table.clientHeight
    headHeight = head.clientHeight

    mutationObserver = new MutationObserver(() => {
      if (!headClone) { return }
      if (!head) { return }
      if (!table) { return }

      headClone.style.width = `${table.clientWidth}px`
      syncTh(head, headClone)
      headOffset = recursiveGetOffset(head)
      tableHeight = table.clientHeight
      headHeight = head.clientHeight
    })

    mutationObserver.observe(table, {
      childList: true,
      subtree: true,
      attributes: true,
    })
  })

  // TODO: Maybe optimize it with IntersectionObserver
  useEvent('scroll', () => {
    if (!headClone) { return }

    const y = window.scrollY

    if (y > headOffset - offset && y < headOffset + tableHeight - offset - headHeight) {
      headClone.style.display = 'block'

      // Somehow transform prevents fixed positioning.
      if (hasTransform) {
        headClone.style.top = `${y - headOffset + offset - 2}px`
      } else {
        headClone.style.top = `${offset}px`
      }
    } else {
      headClone.style.top = '0px'
      headClone.style.display = 'none'
    }
  })
}
