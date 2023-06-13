import { computed, Ref } from 'vue'
import {
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  size,
  useFloating,
} from '@floating-ui/vue'
import { CursorAnchor, DropdownOffsetProp } from '../types'

type useDropdownOptions = {
  placement: Placement | 'auto',
  offset: DropdownOffsetProp,
  autoPlacement: boolean,
  stickToEdges: boolean,
  keepAnchorWidth: boolean,
}

export const useDropdown = (
  anchorComputed: Ref<HTMLElement| CursorAnchor | undefined>,
  floating: Ref<HTMLElement | undefined>,
  target: Ref<HTMLElement | undefined>,
  options: Ref<useDropdownOptions>,
) => {
  const placementComputed = computed(() => {
    if (options.value.placement === 'auto') {
      return 'bottom'
    }

    return options.value.placement
  })

  const offsetComputed = computed(() => {
    const dropdownOffset = options.value.offset
    const result = { mainAxis: 0, crossAxis: 0 }
    if (Array.isArray(dropdownOffset)) {
      result.mainAxis = dropdownOffset[0]
      result.crossAxis = dropdownOffset[1]
    }

    if (typeof dropdownOffset === 'number') {
      result.mainAxis = dropdownOffset
    }

    return result
  })

  const middlewareComputed = computed(() => {
    const { autoPlacement, stickToEdges, keepAnchorWidth } = options.value
    const result = [
      offset(offsetComputed.value),
    ]

    if (autoPlacement) {
      result.push(
        // boundary doesn't work with ssr (trying to access document)
        flip({
          boundary: typeof document === undefined ? target.value : undefined,
        }),
      )
    }

    if (stickToEdges) {
      result.push(
        shift(),
      )
    }

    if (keepAnchorWidth) {
      result.push(size({
        apply ({ elements }) {
          const reference = elements.reference
          const availableWidth = reference.getBoundingClientRect().width
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
          })
        },
      }))
    }

    return result
  })

  const { floatingStyles } = useFloating(anchorComputed, floating, {
    placement: placementComputed,
    whileElementsMounted: autoUpdate,
    middleware: middlewareComputed,
  })

  return {
    floatingStyles,
  }
}
