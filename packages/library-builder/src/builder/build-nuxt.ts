import { existsSync } from 'fs'
import { join } from 'pathe'
import { buildNuxtModule } from '../nuxt/builder'


export const buildNuxt = async (options: {
  cwd: string,
  outDir: string,
  nuxtDir: string,
}) => {
  const { cwd, outDir, nuxtDir } = options

  const nuxtModulePath = join(cwd, nuxtDir)

  if (!existsSync(nuxtModulePath)) {
    console.warn('Skipping building nuxt module, because it does not exist')
    return
  }

  return buildNuxtModule({
    rootDir: nuxtModulePath,
    outDir: join(cwd, outDir, '/nuxt'),
    cwd,
  })
}