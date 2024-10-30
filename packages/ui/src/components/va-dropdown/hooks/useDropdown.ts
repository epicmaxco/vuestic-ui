import { computed, ref, Ref } from 'vue'
import {
  autoUpdate,
  flip,
  offset, Placement,
  shift,
  size,
  useFloating,
} from '@floating-ui/vue'
import { CursorAnchor, DropdownOffsetProp } from '../types'
import { PlacementWithAlias, usePlacementAliases } from '../../../composables'

type useDropdownOptions = {
  placement: PlacementWithAlias,
  offset: DropdownOffsetProp,
  autoPlacement: boolean,
  stickToEdges: boolean,
  keepAnchorWidth: boolean,
  verticalScrollOnOverflow: boolean,
}

export const useDropdown = (
  anchorComputed: Ref<HTMLElement| CursorAnchor | undefined>,
  floating: Ref<HTMLElement | undefined>,
  target: Ref<HTMLElement | undefined>,
  options: Ref<useDropdownOptions>,
) => {
  const placementComputed = computed(() => {
    const { position, align } = usePlacementAliases({ placement: options.value.placement })

    return `${position.value}-${align.value}` as Placement
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
    const { autoPlacement, stickToEdges, keepAnchorWidth, verticalScrollOnOverflow } = options.value
    const result = [
      offset(offsetComputed.value),
    ]

    if (autoPlacement) {
      result.push(
        // boundary doesn't work with ssr (trying to access document)
        flip({
          boundary: target.value ?? 'clippingAncestors',
        }),
      )
    }

    if (stickToEdges) {
      result.push(
        shift(),
      )
    }

    if (keepAnchorWidth || verticalScrollOnOverflow) {
      result.push(size({
        apply ({ elements, availableHeight }) {
          if (keepAnchorWidth) {
            const reference = elements.reference
            const availableWidth = reference.getBoundingClientRect().width
            Object.assign(elements.floating.style, {
              // Don't set width here, because some plugin applies width 100% and it breaks layout
              maxWidth: `${availableWidth}px`,
              minWidth: `${availableWidth}px`,
            })
          }

          if (verticalScrollOnOverflow) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
            })
          }
        },
      }))
    }

    return result
  })

  const { floatingStyles, isPositioned } = typeof document === 'undefined'
    ? { floatingStyles: {}, isPositioned: ref(false) }
    : useFloating(anchorComputed, floating, {
      placement: placementComputed,
      whileElementsMounted: autoUpdate,
      middleware: middlewareComputed,
      transform: true,
    })

  return {
    // Because floating ui by default set top and left to 0 before position calculated, dropdown jumps to the left top corner
    // If user wants to make focus on el as soon as Dropdown is opened, page will be scrolled on the left top corner
    floatingStyles: computed(() => {
      // If position is not calculated yet, we need to set position to fixed to prevent page scrolling
      if (!isPositioned.value) {
        return {
          position: 'fixed',
        }
      }

      return floatingStyles.value
    }),

    isPositioned,
  }
}
