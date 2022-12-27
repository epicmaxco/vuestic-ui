import { PropType, ExtractPropTypes, Ref, toRef } from 'vue'

type verticalPlacement = 'top' | 'bottom'
type horizontalPlacement = 'left' | 'right'
type PlacementAlias = `${verticalPlacement}-${horizontalPlacement}` | `${horizontalPlacement}-${verticalPlacement}`

export type PlacementPosition = horizontalPlacement | verticalPlacement
type PlacementPositionWithDefault = PlacementPosition | 'auto'

export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPositionWithDefault | `${PlacementPosition}-${PlacementAlignment}`
export type PlacementWithAlias = Placement | PlacementAlias
export type ParsedPlacement = { position: PlacementPosition, align: PlacementAlignment }

const verticalPlacement: verticalPlacement[] = ['top', 'bottom']
const horizontalPlacement: horizontalPlacement[] = ['left', 'right']
const placementPosition = [...verticalPlacement, ...horizontalPlacement] as PlacementPosition[]
const placementAlignment = ['start', 'end', 'center'] as PlacementAlignment[]

export const placementsPositions = placementPosition
  .reduce((acc, position) => {
    acc.push(position)
    placementAlignment.forEach((alignment) => acc.push(`${position}-${alignment}`))
    return acc
  }, ['auto'] as Placement[])

export const placementAliasesPositions = verticalPlacement
  .reduce((acc, yPosition) => {
    horizontalPlacement.forEach((xPosition) => {
      acc.push(`${yPosition}-${xPosition}`)
      acc.push(`${xPosition}-${yPosition}`)
    })
    return acc
  }, [] as PlacementAlias[])

export const placementsPositionsWithAliases: PlacementWithAlias[] = [...placementsPositions, ...placementAliasesPositions]

// TODO: may be rewrite this const, it's not very flexible
export const aliasToPlacement: Record<PlacementAlias, Placement> = {
  'top-left': 'top-start',
  'left-top': 'top-start',
  'top-right': 'top-end',
  'right-top': 'top-end',
  'bottom-left': 'bottom-start',
  'left-bottom': 'bottom-start',
  'bottom-right': 'bottom-end',
  'right-bottom': 'bottom-end',
}

const parsePlacementWithAlias = (placementWithAlias: Ref<PlacementAlias | PlacementWithAlias>): ParsedPlacement => {
  const placement = aliasToPlacement[placementWithAlias.value as PlacementAlias] || placementWithAlias.value as PlacementWithAlias
  const [position, align = 'center' as PlacementAlignment] = placement.split('-') as [PlacementPositionWithDefault, PlacementAlignment]
  return { position: position === 'auto' ? 'bottom' : position, align }
}

export const usePlacementAliasesProps = {
  placement: {
    type: String as PropType<PlacementWithAlias>,
    default: 'auto',
    validator: (position: PlacementWithAlias) => placementsPositionsWithAliases.includes(position),
  },
}

export type UsePlacementAliasesProps = ExtractPropTypes<typeof usePlacementAliasesProps>

export const usePlacementAliases = (props: UsePlacementAliasesProps) => {
  const placement = toRef(props, 'placement')
  return { ...parsePlacementWithAlias(placement) }
}
