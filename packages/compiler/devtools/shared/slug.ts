import { PREFIX } from "./CONST"

const knownPaths = new Map<string, string>()

export const minifyPath = (path: string) => {
  if (knownPaths.has(path)) {
    return knownPaths.get(path)!
  }

  const minified = `${PREFIX}:${knownPaths.size}`

  knownPaths.set(path, minified)

  return minified
}

export const unminifyPath = (minified: string) => {
  for (const [path, minifiedPath] of knownPaths.entries()) {
    if (minifiedPath === minified) {
      return path
    }
  }

  return null
}
