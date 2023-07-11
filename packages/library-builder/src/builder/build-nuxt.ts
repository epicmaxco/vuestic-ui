import { existsSync } from 'fs'
import { buildVite } from './build-vite'
import { dirname, join } from 'pathe'

export const buildNuxt = (options: {
  cwd: string,
  entry: string,
}) => {
  const { cwd, entry } = options

  const nuxtModulePath = join(cwd, dirname(entry), './nuxt-module')

  if (!existsSync(nuxtModulePath)) {
    console.warn('Skipping building nuxt module, because it does not exist')
    return
  }

  
}