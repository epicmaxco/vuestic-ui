import { PropType, computed, ExtractPropTypes } from 'vue'

import { usePlacementAliases, placementsPositionsWithAliases } from '../../../composables'

import type { PlacementAlignment, PlacementPosition, PlacementWithAlias } from '../../../composables'

export const useFloatingPositionProps = {
  overlap: { type: Boolean, default: false },
  placement: {
    type: String as PropType<PlacementWithAlias>,
    default: 'top-end',
    validator: (position: PlacementWithAlias) => placementsPositionsWithAliases.includes(position),
  },
  // TODO: remove `left` and `bottom` props in 1.6.0
  left: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
}

export const useFloatingPosition = (props: ExtractPropTypes<typeof useFloatingPositionProps>) => {
  let { position, align } = usePlacementAliases(props)

  // TODO: remove `left` and `bottom` props in 1.6.0
  if (props.left) {
    position = 'left'
    align = 'start'
  }
  if (props.bottom) {
    position = 'bottom'
    align = 'start'
  }

  const getTransform = () => {
    const options = {
      top: { transform: `translateX(${align === 'center' ? '-50' : '0'}%) translateY(-100%)` },
      bottom: { transform: 'translateX(-100%) translateY(100%)' },
      left: { transform: 'translateX(-100%) translateY(-50%)' },
      right: { transform: 'translateX(100%) translateY(0%)' },
    }

    console.log(123, options[position])
    return options[position]
  }

  const getOverlapMargin = () => {
    if (!props.overlap) { return {} }

    const result = { [`margin-${position}`]: 'var(--va-badge-overlap)' }

    const alignComplianceTable = {
      top: { end: 'left', multiplier: -1 },
      bottom: { start: 'left', multiplier: 1 },
    } as Record<PlacementPosition, Record<PlacementAlignment, string> & { multiplier: number }>

    const alignComplianceValue = alignComplianceTable[position]?.[align]
    if (alignComplianceValue) {
      Object.assign(result, {
        [`margin-${alignComplianceValue}`]: `calc(${alignComplianceTable[position].multiplier} * var(--va-badge-overlap))`,
      })
    }

    return result
  }

  const getAlignment = () => {
    const baseSide = ['left', 'right'].includes(position) ? 'top' : 'left'
    const alignmentOptions = { start: { [baseSide]: 0 }, center: { [baseSide]: '50%' }, end: { [baseSide]: '100%' } }
    return alignmentOptions[align]
  }

  return computed(() => ({
    [position]: 0,
    ...getTransform,
    ...getAlignment(),
    ...getOverlapMargin(),
  }))
}
