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

  const stdout = process.stdout.write

  process.stdout.write = (buffer, cb: any): boolean => {
    // suppress nuxt logs
    if (buffer.toString().includes('Building vuestic-ui')) return true
    if (buffer.toString().includes('Build succeeded for vuestic-ui')) return true
    if (buffer.toString().includes('(total size: ')) return true
    if (buffer.toString().includes('Σ Total dist size')) return true
    if (buffer.toString() === '') return true
    return stdout.call(process.stdout, buffer, cb)
  }

  await buildNuxtModule({
    nuxtDir: nuxtModulePath,
    outDir: join(cwd, outDir, '/nuxt'),
    entry,
    cwd,
  })

  process.stdout.write = stdout
}
