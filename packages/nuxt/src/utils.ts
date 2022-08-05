import { existsSync } from 'fs'
import { parse, resolve as resolvePath } from 'pathe'
import { distDir } from './dirs'

/**
 * Resolve path in `node_modules/@vuestic/nuxt/dist`.
 */
export const resolve = (path: string) => {
  const { ext, name, dir } = parse(path)

  // Hack for our dev monorepo - try to find .ts file in source.
  if (ext === '.mjs') {
    const r = resolvePath(distDir, `${dir}/${name}.ts`)
    if (existsSync(r)) { return r }
  }

  return resolvePath(distDir, path)
}
