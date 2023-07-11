import { buildVite } from './build-vite'
import { createViteConfig } from "../vite/config-fabric"
import { withCwd } from "../utils/with-cwd"
import { cleanDist } from './clean-dist';
import { createWebComponentsViteConfig } from "../vite/web-components";
import { buildTypes } from "./build-types";
import { postBuild } from "./post-build";
import { generateExports } from "../generator/generate-exports";
import { buildNuxt } from "./build-nuxt";
import { BuildTarget } from "../types/targets";

export const build = async (options: {
  cwd: string,
  /** @deprecated not ready to use */
  targets?: BuildTarget[],
  outDir?: string,
  entry?: string,
}) => {
  return withCwd(options.cwd, async () => {
    console.log('Building...')

    const {
      cwd = process.cwd(),
      outDir = 'dist',
      // TODO: Make it possible to build without web-components
      targets = ['nuxt', 'esm-node', 'cjs', 'iife', 'web-components', 'types', 'es'],
      entry = 'src/main.ts',
    } = options

    cleanDist(outDir)

    const tasks: Promise<unknown>[] = []
  
    if (targets.includes('es')) {
      tasks.push(
        buildVite(createViteConfig({
          format: 'es',
          entry: entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('esm-node')) {
      tasks.push(
        buildVite(createViteConfig({
          format: 'esm-node',
          entry: entry,
          cwd: options.cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('cjs')) {
      tasks.push(
        buildVite(createViteConfig({
          format: 'cjs',
          entry: entry,
          cwd: cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('iife')) {
      tasks.push(
        buildVite(createViteConfig({
          format: 'iife',
          entry: entry,
          cwd: cwd,
          outDir: outDir,
        }))
      )
    }

    if (targets.includes('web-components')) {
      console.log('Web components build is experimental')

      tasks.push(
        buildVite(createWebComponentsViteConfig({
          cwd: cwd,
          outDir: outDir,
          entry: entry,
        }))
      )
    }

    if (targets.includes('types')) {
      tasks.push(
        buildTypes({
          cwd: cwd,
          outDir: outDir,
        })
      )
    }

    if (targets.includes('nuxt')) {
      tasks.push(
        buildNuxt({
          cwd, 
          outDir,
          entry
        })
      )
    }

    return Promise.all(tasks)
      .then((r) =>{
        generateExports({ cwd, entry, outDir, targets, append: true })

        postBuild({
          cwd: cwd,
          entry: entry,
          outDir: outDir,
          targets: targets,
        })

        console.log('Build finished')
      }).catch((error) => {
        console.log('Build failed')
        console.error(error)
        // TODO: handle error?
      })
  })
}