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

  const parsedPlacementAlias = usePlacementAliases(props)
  const centerAlignment = computed(() => parsedPlacementAlias.value.align === 'center' ? '-50%' : '0%')
  const transformComputed = computed(() => {
    const options = {
      top: { transform: `translateX(${centerAlignment.value}) translateY(-100%)` },
      bottom: { transform: 'translateX(0) translateY(100%)' },
      left: { transform: 'translateX(-100%) translateY(-50%)' },
      right: { transform: `translateX(100%) translateY(${centerAlignment.value})` },
    }

    return options[parsedPlacementAlias.value.position]
  })

  const getOverlapMargin = computed(() => {
    if (!props.overlap) { return {} }

    const result = { [`margin-${parsedPlacementAlias.value.position}`]: 'var(--va-badge-overlap)' }

    const alignComplianceTable = {
      top: { end: 'left', multiplier: -1 },
      bottom: { start: 'left', multiplier: 1 },
    } as AlignComplianceTable

    const alignComplianceValue = alignComplianceTable[parsedPlacementAlias.value.position]?.[parsedPlacementAlias.value.align]
    if (alignComplianceValue) {
      Object.assign(result, {
        [`margin-${alignComplianceValue}`]: `calc(${alignComplianceTable[parsedPlacementAlias.value.position].multiplier} * var(--va-badge-overlap))`,
      })
    }

    return result
  })

  const getAlignment = computed(() => {
    const baseSide = ['left', 'right'].includes(parsedPlacementAlias.value.position) ? 'top' : 'left'
    const alignmentOptions = { start: { [baseSide]: 0 }, center: { [baseSide]: '50%' }, end: { [baseSide]: '100%' } }
    return alignmentOptions[parsedPlacementAlias.value.align]
  })

  const offset = toRef(props, 'offset')

  return computed(() => ({
    [parsedPlacementAlias.value.position]: `${parseSizeValue(offset)}px`,
    ...transformComputed.value,
    ...getAlignment.value,
    ...getOverlapMargin.value,
  }))
}
