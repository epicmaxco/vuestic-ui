import { exec } from 'node:child_process';
import { existsSync } from 'fs'
import { mkdtemp, mkdir, cp, rm, writeFile } from 'fs/promises'
import { dirname, join } from 'pathe'
import { buildModule } from '../nuxt/module-builder'
import { readPackage } from '../utils/read-package';

const createNuxtModuleTemplate = async (sources: string) => {
  const template = await mkdtemp(join(sources, '..'))
  
  const src = join(template, 'src')
  await mkdir(src)

  await Promise.all([
    cp(sources, src, { recursive: true }),
    writeFile(join(template, 'package.json'), JSON.stringify({
      name: 'nuxt-module',
    }))
  ])
}

const withNuxtModuleTemplate = async (sources: string, cb: (root: string) => Promise<any>) => {
  const root = join(sources, '..')
  const src = join(root, 'src')
  const packageJson = join(root, 'package.json')
  await mkdir(src, { recursive: true })

  const packageJsonContent = await readPackage()

  delete (packageJsonContent as any).exports
  delete (packageJsonContent as any).main
  delete (packageJsonContent as any).module
  delete (packageJsonContent as any).types

  await Promise.all([
    cp(sources, src, { recursive: true }),
    writeFile(packageJson, JSON.stringify(packageJsonContent))
  ])

  try {
    await cb(root)
  } 
  catch (e) {
    console.warn('Failed to build nuxt module', e)
  }
  finally {
    // await rm(src, { recursive: true, force: true })
    // await rm(packageJson, { force: true })
  }
}

export const buildNuxt = async (options: {
  cwd: string,
  entry: string,
  outDir: string,
}) => {
  const { cwd, entry, outDir } = options

  const nuxtModulePath = join(cwd, dirname(entry), './nuxt-module')

  if (!existsSync(nuxtModulePath)) {
    console.warn('Skipping building nuxt module, because it does not exist')
    return
  }

  withNuxtModuleTemplate(nuxtModulePath, async (root) => {
    return buildModule({
      rootDir: root,
      outDir: join(cwd, outDir, '/nuxt'),
      cwd,
      // stub: false,
    })
  })
}