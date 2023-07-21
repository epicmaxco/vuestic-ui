import { existsSync } from 'fs'
import { join } from 'pathe'
import { buildNuxtModule } from '../nuxt/builder'
import { strictResolve } from '../utils/strict-resolve'


export const buildNuxt = async (options: {
  cwd: string,
  outDir: string,
  nuxtDir: string,
  entry: string,
}) => {
  const { cwd, outDir, nuxtDir, entry } = options

  const nuxtModulePath = strictResolve(cwd, nuxtDir)

  if (!nuxtModulePath) {
    console.warn('Skipping building nuxt module, because it does not exist in ' + nuxtModulePath)
    return
  }

  return buildNuxtModule({
    nuxtDir: nuxtModulePath,
    outDir: join(cwd, outDir, '/nuxt'),
    entry,
    cwd,
  })
}