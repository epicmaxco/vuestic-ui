import { Ref, computed, toRef, ComputedRef } from 'vue'
import { useDebounceFn, useEvent, useNumericProp } from '../../../composables'
import { debounce } from '../../../utils/debounce'

const isTyping = (e: Event) => {
  const target = e.target as HTMLElement
  if (!(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) { return false }
  if (target.attributes.getNamedItem('readonly')) { return false }
  return true
}

const isReadonlyArray = (arr: any): arr is readonly any[] => {
  return Array.isArray(arr)
}

export type Trigger = 'click' | 'hover' | 'right-click' | 'dblclick' | 'space' | 'enter' | 'arrow-down' | 'arrow-up' | 'none'

export const useNavigation = (
  isOpen: Ref<boolean>,
  anchorRef: Ref<HTMLElement | undefined>,
  contentRef: Ref<HTMLElement | undefined>,
  props: {
    trigger: Trigger | readonly Trigger[],
    disabled: boolean,
    closeOnAnchorClick: boolean,
    closeOnContentClick: boolean,
    isContentHoverable: boolean,
    cursor: any,
    hoverOverTimeout: number | string,
    hoverOutTimeout: number | string,
  },
) => {
  const normalizeTriggerName = (t: string) => {
    t = t.replace(/-/g, '').toLowerCase()

    if (t === 'space') { return ' ' }
    if (t === 'rightclick') { return 'contextmenu' }

    return t
  }

  const normalizedTriggers = computed(() => {
    if (isReadonlyArray(props.trigger)) {
      return props.trigger.map((t) => normalizeTriggerName(t))
    }

    // TODO: Include keyboard navigation for mouse events
    return [normalizeTriggerName(props.trigger)]
  })

  // Keyboard
  useEvent('keydown', (e) => {
    if (props.disabled) { return }

    if (e.key === 'Escape' && isOpen.value) {
      isOpen.value = false
      e.preventDefault()
    }

    if (isTyping(e)) { return }

    if (normalizedTriggers.value.includes(normalizeTriggerName(e.key))) {
      isOpen.value = !isOpen.value
      e.preventDefault()
    }
  }, anchorRef)

  useEvent('keydown', (e) => {
    if (props.disabled) { return }

    if (e.key === 'Escape' && isOpen.value) {
      isOpen.value = false
      e.preventDefault()
    }
  }, contentRef)

  // Click
  useEvent(['click', 'contextmenu', 'dblclick'], (e) => {
    if (props.disabled) { return }

    if (isTyping(e)) { return }

    if (normalizedTriggers.value.includes(normalizeTriggerName(e.type))) {
      e.preventDefault()

      if (isOpen.value && props.closeOnAnchorClick) {
        isOpen.value = false

        if (props.cursor) {
          // When cursor we need to re-open the dropdown, similar to context menu
          setTimeout(() => {
            isOpen.value = true
          }, 16)
        }
      } else {
        isOpen.value = true
      }
    }
  }, anchorRef)

  useEvent(['click', 'contextmenu', 'dblclick'], (e) => {
    if (props.closeOnContentClick) {
      isOpen.value = false
    }
  }, contentRef)

  // Hover
  const debounceHover = useDebounceFn(() => { isOpen.value = true }, useNumericProp('hoverOverTimeout'))
  const debounceUnHover = useDebounceFn(() => { isOpen.value = false }, useNumericProp('hoverOutTimeout'))

  const onMouseHover = (e: Event) => {
    if (props.disabled) { return }

    if (!normalizedTriggers.value.includes('hover')) { return }

    if (e.type === 'mouseleave') {
      debounceHover.cancel()

      if (!props.isContentHoverable) {
        isOpen.value = false
        return
      }

      debounceUnHover()
    } else {
      debounceUnHover.cancel()
      debounceHover()
    }
  }

  useEvent(['mouseleave', 'mouseenter'], onMouseHover, anchorRef)
  useEvent(['mouseleave', 'mouseenter'], onMouseHover, contentRef)
}
