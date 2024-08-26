import { PREFIX } from "./CONST"

type Path = `${string}:${string}:${string}` | string
type MinifiedPath = `${typeof PREFIX}:${string}` | string
const knownPaths = new Map<MinifiedPath, Path>()

export const minifyPath = (path: Path) => {
  const minified = `${PREFIX}-${knownPaths.size}` as const

  knownPaths.set(minified, path)

  return minified
}

export const unminifyPath = (minified: MinifiedPath) => {
  if (knownPaths.has(minified)) {
    return knownPaths.get(minified)!
  }

  return null
}

export const replacePath = (minified: MinifiedPath, path: Path) => {
  knownPaths.set(minified, path)
  return minified
}
