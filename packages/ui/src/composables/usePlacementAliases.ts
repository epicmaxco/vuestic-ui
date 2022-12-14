export type PlacementPosition = 'top' | 'bottom' | 'left' | 'right'
export type PlacementAlignment = 'start' | 'end' | 'center'
export type Placement = PlacementPosition | 'auto' | `${PlacementPosition}-${PlacementAlignment}`
export type PlacementAlias = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type PlacementWithAlias = Placement | PlacementAlias

export const placementsPositions = ['top', 'bottom', 'left', 'right']
  .reduce((acc, position) => [...acc, position, `${position}-start`, `${position}-end`, `${position}-center`], ['auto'] as string[])

export const placementAliasesPositions = ['top', 'bottom']
  .flatMap(position => [`${position}-left`, `${position}-right`])

export const placementsPositionsWithAliases = [...placementsPositions, ...placementAliasesPositions]

export const aliasToPlacement: Record<string, Placement> = {
  'top-left': 'top-start',
  'top-right': 'top-end',
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end',
}

export const parsePlacementWithAlias = (placementWithAlias: PlacementWithAlias) => {
  const placement = aliasToPlacement[placementWithAlias] || placementWithAlias
  return parsePlacement(placement)
}

const parsePlacement = (placement: Placement) => {
  let [position, align] = placement.split('-') as [PlacementPosition | 'auto', PlacementAlignment | undefined]
  if (position === 'auto') {
    position = 'bottom'
  }

  return { position, align: align || 'center' }
}

export const usePlacementAliases = () => {
  return {
    placementsPositionsWithAliases,
    aliasToPlacement,
    parsePlacementWithAlias,
  }
}
