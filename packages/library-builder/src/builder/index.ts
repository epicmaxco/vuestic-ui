import { join, dirname } from 'pathe';
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
import { promiseSequence } from '../utils/promise-sequence';
import { createStylesViteConfig } from '../vite/styles';

export const build = async (options: {
  cwd?: string,
  /** @deprecated not ready to use */
  targets?: BuildTarget[],
  outDir?: string,
  entry?: string,
  nuxtDir?: string,
}) => {
  return withCwd(options.cwd || process.cwd(), async () => {
    console.log('Building...')

    const {
      cwd = process.cwd(),
      outDir = 'dist',
      // TODO: Make it possible to build without web-components
      targets = ['nuxt', 'esm-node', 'cjs', 'iife', 'web-components', 'types', 'es', 'styles'],
      entry = 'src/main.ts',
      nuxtDir = join(dirname(entry), 'nuxt'),
    } = options

    cleanDist(outDir)

    const tasks: Promise<unknown>[] = []
  
    if (targets.includes('es')) {
      // tasks.push(
        console.log('Building ES module')
        await buildVite(createViteConfig({
          format: 'es',
          entry: entry,
          cwd: cwd,
          outDir: outDir,
        }))
      // )
    }

    if (targets.includes('esm-node')) {
      // tasks.push(
        console.log('Building ESM node module')
        await buildVite(createViteConfig({
          format: 'esm-node',
          entry: entry,
          cwd: cwd,
          outDir: outDir,
        }))
      // )
    }

    if (targets.includes('cjs')) {
      // tasks.push(
        console.log('Building CommonJS module')
        await buildVite(createViteConfig({
          format: 'cjs',
          entry: entry,
          cwd: cwd,
          outDir: outDir,
        }))
      // )
    }

    if (targets.includes('iife')) {
      // tasks.push(
        console.log('Building IIFE module')
        await buildVite(createViteConfig({
          format: 'iife',
          entry: entry,
          cwd: cwd,
          outDir: outDir,
        }))
      // )
    }

    if (targets.includes('web-components')) {
      console.log('Web components build is experimental')
      console.log('Building web components')

      // tasks.push(
        await buildVite(createWebComponentsViteConfig({
          cwd: cwd,
          outDir: outDir,
          entry: entry,
        }))
      // )
    }

    if (targets.includes('types')) {
      console.log('Building types')
      // tasks.push(
        await buildTypes({
          cwd: cwd,
          outDir: outDir,
        })
      // )
    }

    if (targets.includes('nuxt')) {
      console.log('Building Nuxt module')
      // tasks.push(
        await buildNuxt({
          cwd,
          entry,
          outDir,
          nuxtDir
        })
      // )
    }

    if (targets.includes('styles')) {
      console.log('Building styles')

      await buildVite(
        createStylesViteConfig({
          cwd: cwd,
          entry: entry,
          outDir: outDir,
        })
      )
    }

    // return promiseSequence(tasks)
    //   .then((r) =>{
        await generateExports({ cwd, entry, outDir, targets, append: true })

        await postBuild({
          cwd: cwd,
          entry: entry,
          outDir: outDir,
          targets: targets,
        })

        console.log('Build finished')
      // }).catch((error) => {
      //   console.log('Build failed')
      //   console.error(error)
      //   // TODO: handle error?
      // })
  })
}