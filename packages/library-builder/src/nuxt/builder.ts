import { promises, existsSync } from 'fs';
import { join, resolve } from 'pathe';
import { findExports } from 'mlly';
import { buildVite } from '../builder/build-vite';
import { nuxtRuntimeDirViteConfig } from './runtime-builder';
import { readPackage } from '../utils/read-package';
import { buildModule } from './module-builder';

export async function buildNuxtModule(options: {
  cwd: string,
  entry: string,
  nuxtDir: string,
  outDir?: string,
}) {
  const outDir = options.outDir || "dist";

  const packageJson = readPackage(join(options.cwd, 'package.json'))
  const dependencies = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ]

  console.log('Building Nuxt module...', packageJson.name)

  if (packageJson.name) {
    dependencies.push(packageJson.name);
  }

  await buildModule({
    cwd: options.cwd,
    rootDir: options.nuxtDir,
    outDir: outDir,
    externals: dependencies,
    paths: packageJson.name ? {
      [packageJson.name]: [join(options.cwd, options.entry)],
    } : {}
  })
  await buildVite(nuxtRuntimeDirViteConfig({
    entryDir: resolve(options.cwd, options.nuxtDir, "runtime"),
    outDir: join(outDir, "runtime"),
    external: dependencies,
  }))
}
