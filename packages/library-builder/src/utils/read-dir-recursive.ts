import { readdirSync, lstatSync } from 'fs';

export const readDirRecursive = (path: string): string[] => {
  return readdirSync(path)
    .reduce<string[]>((acc, entry) => {
      const p = `${path}/${entry}`

      if (lstatSync(p).isDirectory()) {
        return [...acc, ...readDirRecursive(p)]
      }

      return [...acc, p]
    }, [])
}