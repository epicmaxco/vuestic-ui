import { PREFIX } from "./CONST"

type Path = `${string}:${string}:${string}`
type MinifiedPath = `${typeof PREFIX}:${string}`
const knownPaths = new Map<MinifiedPath, Path>()

export const minifyPath = (path: Path) => {
  for (const [p, minifiedPath] of knownPaths.entries()) {
    if (p === path) {
      return minifiedPath
    }
  }

  const minified = `${PREFIX}:${knownPaths.size}`

  knownPaths.set(minified, path)

  return minified
}

export const unminifyPath = (minified: MinifiedPath) => {
  if (knownPaths.has(minified)) {
    return knownPaths.get(minified)!
  }

  return null
}

export const replacePath = (minified: string, path: string) => {
  knownPaths.set(minified, path)
  return minified
}
