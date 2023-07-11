import { LibraryFormat } from "../types/vite"
import { build as viteBuild } from 'vite'
import { createViteConfig } from "../vite/config-fabric"
import { withCwd } from "../utils/with-cwd"
import { cleanDist } from './clean-dist';
import { createWebComponentsViteConfig } from "../vite/web-components";

export const build = async (options: {
  formats: (LibraryFormat | 'esm-node' | 'web-components')[],
  cwd: string,
  outDir?: string,
  entry?: string,
}) => {
  return withCwd(options.cwd, async () => {
    console.log('Building...')

    const outDir = options.outDir || 'dist'
    cleanDist(outDir)

    const tasks: Promise<unknown>[] = []
  
    if (options.formats.includes('es')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'es',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.formats.includes('esm-node')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'esm-node',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.formats.includes('cjs')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'cjs',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.formats.includes('iife')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'iife',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.formats.includes('web-components')) {
      console.warn('Web components build is experimental')

      tasks.push(
        viteBuild(createWebComponentsViteConfig({
          cwd: options.cwd,
        }))
      )
    }

    return Promise.all(tasks).then((r) =>{
      console.log(r)
      console.log('Build finished')
    }).catch((error) => {
      console.error(error)
    })
  })
}