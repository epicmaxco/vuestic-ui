export type PlacementPosition = 'top' | 'bottom' | 'left' | 'right'
export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPosition | 'auto' | `${PlacementPosition}-${PlacementAlignment}`
export type PlacementAlias = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type PlacementWithAlias = Placement | PlacementAlias

export const placementsPositions = ['top', 'bottom', 'left', 'right']
  .reduce((acc, position) => [...acc, position, `${position}-start`, `${position}-end`, `${position}-center`], ['auto'] as string[])

export const placementAliasesPositions = ['top', 'bottom']
  .flatMap(position => [`${position}-left`, `${position}-right`, `left-${position}`, `right-${position}`])

export const placementsPositionsWithAliases = [...placementsPositions, ...placementAliasesPositions]

export const aliasToPlacement: Record<string, Placement> = {
  'top-left': 'top-start',
  'left-top': 'top-start',
  'top-right': 'top-end',
  'right-top': 'top-end',
  'bottom-left': 'bottom-start',
  'left-bottom': 'bottom-start',
  'bottom-right': 'bottom-end',
  'right-bottom': 'bottom-end',
}

export const parsePlacementWithAlias = (placementWithAlias: PlacementWithAlias) =>
  parsePlacement(aliasToPlacement[placementWithAlias] || placementWithAlias)

const parsePlacement = (placement: Placement) => {
  let [position, align = 'center'] = placement.split('-') as [PlacementPosition | 'auto', PlacementAlignment | undefined]
  if (position === 'auto') {
    position = 'bottom'
  }

  return { position, align }
}

export const usePlacementAliases = () => {
  return {
    placementsPositionsWithAliases,
    aliasToPlacement,
    parsePlacementWithAlias,
  }
}
