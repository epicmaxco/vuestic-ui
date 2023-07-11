import { LibraryFormat } from "../types/vite"
import { build as viteBuild } from 'vite'
import { createViteConfig } from "../vite/config-fabric"
import { withCwd } from "../utils/with-cwd"
import { cleanDist } from './clean-dist';
import { createWebComponentsViteConfig } from "../vite/web-components";
import { buildTypes } from "./build-types";
import { postBuild } from "./post-build";
import { generateExports } from "../generator/generate-exports";

export const build = async (options: {
  cwd: string,
  /** @deprecated not ready to use */
  targets?: (LibraryFormat | 'esm-node' | 'web-components' | 'types')[],
  outDir?: string,
  entry?: string,
}) => {
  return withCwd(options.cwd, async () => {
    console.log('Building...')

    const {
      cwd,
      outDir = 'dist',
      // TODO: Make it possible to build without web-components
      targets = ['es', 'esm-node', 'cjs', 'iife', 'web-components', 'types'],
      entry = 'src/main.ts',
    } = options

    cleanDist(outDir)

    const tasks: Promise<unknown>[] = []
  
    if (targets.includes('es')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'es',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('esm-node')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'esm-node',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('cjs')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'cjs',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('iife')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'iife',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('web-components')) {
      console.warn('Web components build is experimental')

      tasks.push(
        viteBuild(createWebComponentsViteConfig({
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('types')) {
      tasks.push(
        buildTypes({
          cwd: options.cwd,
          outDir: outDir,
        })
      )
    }

    return Promise.all(tasks).then((r) =>{
      generateExports({ cwd, entry, outDir, targets, append: true })

      postBuild({
        cwd: options.cwd,
        entry: options.entry,
        outDir: outDir,
        targets: targets,
      })

      console.log('Build finished')
    }).catch((error) => {
      console.error(error)
    })
  })
}