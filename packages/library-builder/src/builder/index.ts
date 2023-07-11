import { LibraryFormat } from "../types/vite"
import { build as viteBuild } from 'vite'
import { createViteConfig } from "../vite/config-fabric"
import { withCwd } from "../utils/with-cwd"
import { cleanDist } from './clean-dist';
import { createWebComponentsViteConfig } from "../vite/web-components";
import { buildTypes } from "./build-types";
import { postBuild } from "./post-build";

export const build = async (options: {
  targets: (LibraryFormat | 'esm-node' | 'web-components' | 'types')[],
  cwd: string,
  outDir?: string,
  entry?: string,
}) => {
  return withCwd(options.cwd, async () => {
    console.log('Building...')

    const outDir = options.outDir || 'dist'
    cleanDist(outDir)

    const tasks: Promise<unknown>[] = []
  
    if (options.targets.includes('es')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'es',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.targets.includes('esm-node')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'esm-node',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.targets.includes('cjs')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'cjs',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.targets.includes('iife')) {
      tasks.push(
        viteBuild(createViteConfig({
          format: 'iife',
          entry: options.entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.targets.includes('web-components')) {
      console.warn('Web components build is experimental')

      tasks.push(
        viteBuild(createWebComponentsViteConfig({
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (options.targets.includes('types')) {
      tasks.push(
        buildTypes({
          cwd: options.cwd,
          outDir: outDir,
        })
      )
    }

    return Promise.all(tasks).then((r) =>{
      console.log('Build finished')
      postBuild({
        cwd: options.cwd,
        entry: options.entry,
      })
    }).catch((error) => {
      console.error(error)
    })
  })
}