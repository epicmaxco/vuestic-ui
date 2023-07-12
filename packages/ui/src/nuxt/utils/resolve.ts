import { existsSync } from 'fs'
import { parse, resolve } from 'pathe'
import { distDir } from '../dirs'

/**
 * Resolve path in `node_modules/@vuestic/nuxt/dist`.
 */
export const resolveInRuntime = (path: string) => {
  const { ext, name, dir } = parse(path)

  // Hack for our dev monorepo - try to find .ts file in source.
  if (ext === '.mjs') {
    const r = resolve(distDir, `${dir}/${name}.ts`)
    if (existsSync(r)) { return r }
  }

  return resolve(distDir, path)
}
