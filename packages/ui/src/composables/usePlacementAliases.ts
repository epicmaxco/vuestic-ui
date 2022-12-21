type verticalPlacement = 'top' | 'bottom'
type horizontalPlacement = 'left' | 'right'
type PlacementPosition = horizontalPlacement | verticalPlacement
type PlacementPositionWithDefault = PlacementPosition | 'auto'
type PlacementAlias = `${verticalPlacement}-${horizontalPlacement}` | `${horizontalPlacement}-${verticalPlacement}`

export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPositionWithDefault | `${PlacementPosition}-${PlacementAlignment}`
export type PlacementWithAlias = Placement | PlacementAlias

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
