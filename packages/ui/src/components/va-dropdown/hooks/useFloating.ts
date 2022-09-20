import { computed, onMounted, onUpdated, ExtractPropTypes, ShallowRef, WritableComputedRef } from 'vue'
import { computePosition, flip, offset, shift } from '@floating-ui/dom'
import { VaDropdown } from '../index'

const useFloating = (anchor: WritableComputedRef<HTMLElement | undefined>, tooltip: ShallowRef<HTMLElement | undefined>, props: ExtractPropTypes<typeof VaDropdown.props>) => {
  const offsetComputed = computed(() => {
    if (Array.isArray(props.offset)) {
      const [mainAxis, crossAxis, alignmentAxis] = props.offset

      return { mainAxis, crossAxis, alignmentAxis }
    }

    return props.offset
  })

  const useComputePosition = () => {
    if (anchor.value && tooltip.value) {
      computePosition(
        anchor.value,
        tooltip.value,
        {
          strategy: 'absolute',
          placement: props.placement || 'bottom',
          middleware: [offset(offsetComputed.value), shift(), flip()],
        },
      ).then(({ x, y }) => {
        if (anchor.value && tooltip.value) {
          let widthStyles = { width: 'max-content' } as { width: string, maxWidth?: string }

          if (props.keepAnchorWidth) {
            const width = anchor.value.offsetWidth

            widthStyles = { width: `${width}px`, maxWidth: `${width}px` }
          }

          Object.assign(tooltip.value.style, {
            left: `${x}px`,
            top: `${y}px`,
            ...widthStyles,
          })
        }
      })
    }
  }

  onMounted(useComputePosition)
  onUpdated(useComputePosition)
}

export default useFloating
