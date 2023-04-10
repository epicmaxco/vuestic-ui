import type { ExtractPropTypes, PropType, Ref } from 'vue'

import type { PlacementWithAlias } from '../../../composables'
import type { BadgeOffsetProp } from '../types'

import { computed } from 'vue'

import { usePlacementAliases, placementsPositionsWithAliases, useParsableMeasure } from '../../../composables'

const { isParsableMeasure, parseSizeValue } = useParsableMeasure()

export const useFloatingPositionProps = {
  overlap: { type: Boolean, default: false },
  placement: {
    type: String as PropType<PlacementWithAlias>,
    default: 'top-end',
    validator: (position: PlacementWithAlias) => placementsPositionsWithAliases.includes(position),
  },
  offset: {
    type: [Number, String, Array] as PropType<BadgeOffsetProp>,
    default: 0,
    validator: (value: keyof BadgeOffsetProp) => {
      if (Array.isArray(value)) {
        return value.every(isParsableMeasure)
      }

      if (typeof value === 'string') {
        return isParsableMeasure(value)
      }

      return !isNaN(value)
    },
  },
}

export const useFloatingPosition = (
  props: ExtractPropTypes<typeof useFloatingPositionProps>,
  floating: Ref<boolean>,
) => {
  if (!floating.value) { return {} }

  const { position, align } = usePlacementAliases(props)

  const alignmentShiftComputed = computed(() => {
    const alignOptions = {
      start: props.overlap ? '-50%' : '-100%',
      center: '-50%',
      end: props.overlap ? '-50%' : '0%',
    }

    return alignOptions[align.value]
  })

  const offsetMarginComputed = computed(() => {
    if (!props.offset) { return {} }

    const mainAxis = ['left', 'right'].includes(position.value) ? 'top' : 'left'
    const crossAxis = mainAxis === 'top' ? 'left' : 'top'

    if (Array.isArray(props.offset)) {
      const [x, y] = props.offset.map(parseSizeValue)

      return {
        [`margin-${mainAxis}`]: `${x}px`,
        [`margin-${crossAxis}`]: `${y}px`,
      }
    }

    const offset = parseSizeValue(props.offset)

    return {
      [`margin-${crossAxis}`]: `${offset}px`,
    }
  })

  const alignmentComputed = computed(() => {
    const mainAxis = ['left', 'right'].includes(position.value) ? 'top' : 'left'
    const crossAxis = mainAxis === 'top' ? 'left' : 'top'
    let shiftValue = '0%'

    if (crossAxis === 'top' && position.value === 'bottom') {
      shiftValue = '100%'
    }

    if (crossAxis === 'left' && position.value === 'right') {
      shiftValue = '100%'
    }

    const alignmentOptions = {
      start: { [mainAxis]: '0%', [crossAxis]: shiftValue },
      center: { [mainAxis]: '50%', [crossAxis]: shiftValue },
      end: { [mainAxis]: '100%', [crossAxis]: shiftValue },
    }

    return alignmentOptions[align.value]
  })

  const transformComputed = computed(() => {
    const coords = {
      top: {
        x: alignmentShiftComputed.value,
        y: props.overlap ? '-50%' : '-100%',
      },
      bottom: {
        x: alignmentShiftComputed.value,
        y: props.overlap ? '-50%' : '0%',
      },
      left: {
        x: props.overlap ? '-50%' : '-100%',
        y: alignmentShiftComputed.value,
      },
      right: {
        x: props.overlap ? '-50%' : '0%',
        y: alignmentShiftComputed.value,
      },
    }

    const { x, y } = coords[position.value]

    return { transform: `translate(${x}, ${y})` }
  })

  return computed(() => ({
    ...alignmentComputed.value,
    ...transformComputed.value,
    ...offsetMarginComputed.value,
  }))
}
