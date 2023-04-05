import { PropType, Ref, computed, ExtractPropTypes, toRef } from 'vue'

import { usePlacementAliases, placementsPositionsWithAliases, useParsableMeasure } from '../../../composables'

import type { PlacementAlignment, PlacementPosition, PlacementWithAlias } from '../../../composables'
type AlignComplianceTable = Record<PlacementPosition, Record<PlacementAlignment, string> & { multiplier: number }>

const { isParsableMeasure, parseSizeValue } = useParsableMeasure()

export const useFloatingPositionProps = {
  overlap: { type: Boolean, default: false },
  placement: {
    type: String as PropType<PlacementWithAlias>,
    default: 'top-end',
    validator: (position: PlacementWithAlias) => placementsPositionsWithAliases.includes(position),
  },
  offset: {
    type: [Number, String] as PropType<string | number>,
    default: 0,
    validator: (value: string | number) => {
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
  const alignOptions = {
    start: '-100%',
    center: '-50%',
    end: '0%',
  }

  const getOverlapMargin = computed(() => {
    if (!props.overlap) { return {} }

    const result = { [`margin-${position.value}`]: 'var(--va-badge-overlap)' }

    const alignComplianceTable = {
      top: { end: 'left', multiplier: -1 },
      bottom: { start: 'left', multiplier: 1 },
    } as AlignComplianceTable

    const alignComplianceValue = alignComplianceTable[position.value]?.[align.value]
    if (alignComplianceValue) {
      Object.assign(result, {
        [`margin-${alignComplianceValue}`]: `calc(${alignComplianceTable[position.value].multiplier} * var(--va-badge-overlap))`,
      })
    }

    return result
  })

  const getAlignment = computed(() => {
    const baseSide = ['left', 'right'].includes(position.value) ? 'top' : 'left'
    const alignmentOptions = {
      start: { [baseSide]: 0 },
      center: { [baseSide]: '50%' },
      end: { [baseSide]: '100%' },
    }
    return alignmentOptions[align.value]
  })

  const offset = toRef(props, 'offset')

  const alignmentComputed = computed(() => {
    const mainAxis = ['left', 'right'].includes(position.value) ? 'top' : 'left'
    const crossAxis = mainAxis === 'top' ? 'left' : 'top'
    let shiftValue: number | string = 0

    if (crossAxis === 'top' && position.value === 'bottom') {
      shiftValue = '100%'
    }

    if (crossAxis === 'left' && position.value === 'right') {
      shiftValue = '100%'
    }

    const alignmentOptions = {
      start: {
        [mainAxis]: 0,
        [crossAxis]: shiftValue,
      },
      center: {
        [mainAxis]: '50%',
        [crossAxis]: shiftValue,
      },
      end: {
        [mainAxis]: '100%',
        [crossAxis]: shiftValue,
      },
    }

    return alignmentOptions[align.value]
  })

  const transformComputed = computed(() => {
    const transformOptions = {
      top: { transform: `translateX(${alignOptions[align.value]}) translateY(-100%)` },
      bottom: { transform: `translateX(${alignOptions[align.value]}) translateY(0%)` },
      left: { transform: `translateX(-100%) translateY(${alignOptions[align.value]})` },
      right: { transform: `translateX(0%) translateY(${alignOptions[align.value]})` },
    }

    return transformOptions[position.value]
  })

  return computed(() => ({
    ...alignmentComputed.value,
    ...transformComputed.value,
  }))
}
