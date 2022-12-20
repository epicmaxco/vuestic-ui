type YPlacementPosition = 'top' | 'bottom'
type XPlacementPosition = 'left' | 'right'
type PlacementPosition = XPlacementPosition | YPlacementPosition
type PlacementPositionWithDefault = PlacementPosition | 'auto'
type PlacementAlias = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom'

export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPositionWithDefault | `${PlacementPosition}-${PlacementAlignment}`
export type PlacementWithAlias = Placement | PlacementAlias

const yPlacementPosition: YPlacementPosition[] = ['top', 'bottom']
const xPlacementPosition: XPlacementPosition[] = ['left', 'right']
const placementPosition = [...yPlacementPosition, ...xPlacementPosition] as PlacementPosition[]
const placementAlignment = ['start', 'end', 'center'] as PlacementAlignment[]

export const placementsPositions = placementPosition
  .reduce((acc, position) => {
    acc.push(position)
    placementAlignment.forEach((alignment) => acc.push(`${position}-${alignment}`))
    return acc
  }, ['auto'] as Placement[])

export const placementAliasesPositions = yPlacementPosition
  .reduce((acc, yPosition) => {
    xPlacementPosition.forEach((xPosition) => {
      acc.push(`${yPosition}-${xPosition}`)
      acc.push(`${xPosition}-${yPosition}`)
    })
    return acc
  }, [] as PlacementAlias[])

export const placementsPositionsWithAliases: PlacementWithAlias[] = [...placementsPositions, ...placementAliasesPositions]

const aliasToPlacement: Record<PlacementAlias, Placement> = {
  'top-left': 'top-start',
  'left-top': 'top-start',
  'top-right': 'top-end',
  'right-top': 'top-end',
  'bottom-left': 'bottom-start',
  'left-bottom': 'bottom-start',
  'bottom-right': 'bottom-end',
  'right-bottom': 'bottom-end',
}

const getPlacementName = (placementWithAlias: PlacementAlias | PlacementWithAlias) =>
  aliasToPlacement[placementWithAlias as PlacementAlias] || placementWithAlias as PlacementWithAlias

const parsePlacementWithAlias = (placementWithAlias: PlacementAlias | PlacementWithAlias) => {
  const placement = getPlacementName(placementWithAlias)
  const [position, align = 'center' as PlacementAlignment] = placement.split('-') as [PlacementPositionWithDefault, PlacementAlignment]
  return { position: position === 'auto' ? 'bottom' : position, align }
}

export const usePlacementAliases = () => ({ parsePlacementWithAlias, getPlacementName })
