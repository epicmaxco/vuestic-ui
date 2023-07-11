import { existsSync } from 'fs'
import { join } from 'pathe'
import { buildModule } from '../nuxt/module-builder'


export const buildNuxt = async (options: {
  cwd: string,
  outDir: string,
  nuxtDir: string,
}) => {
  const { cwd, outDir, nuxtDir } = options

  const nuxtModulePath = join(cwd, nuxtDir)

  console.log(nuxtDir, nuxtModulePath)

  if (!existsSync(nuxtModulePath)) {
    console.warn('Skipping building nuxt module, because it does not exist')
    return
  }

  return buildModule({
    rootDir: nuxtModulePath,
    outDir: join(cwd, outDir, '/nuxt'),
    cwd,
  })
}