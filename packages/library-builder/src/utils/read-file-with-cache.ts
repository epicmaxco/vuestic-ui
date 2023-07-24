import { readFile } from 'fs/promises';

const cache = new Map<string, string>()

export const readFileWithCache = async (path: string) => {
  if (cache.has(path)) {
    return cache.get(path)!
  }

  const content = await readFile(path)

  cache.set(path, content.toString('utf-8'))

  return cache.get(path)!
}