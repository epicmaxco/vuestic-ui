import { promises, existsSync } from 'fs';
import { join, resolve } from 'pathe';
import { findExports } from 'mlly';
import { buildVite } from '../builder/build-vite';
import { nuxtRuntimeDirViteConfig } from './runtime-builder';
import { readPackage } from '../utils/read-package';
import { buildModule } from './module.builder';

export async function buildNuxtModule(options: {
  cwd: string,
  rootDir: string,
  outDir?: string,
}) {
  const outDir = options.outDir || "dist";

  const packageJson = readPackage(join(options.cwd, 'package.json'))
  const dependencies = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ]

  if (packageJson.name) {
    dependencies.push(packageJson.name);
  }

  return Promise.all([
    buildVite(nuxtRuntimeDirViteConfig({
      entryDir: join(options.rootDir, "runtime"),
      outDir: join(outDir, "runtime"),
      external: dependencies,
    })),

    buildModule({
      cwd: options.cwd,
      rootDir: options.rootDir,
      outDir: outDir,
    })
  ])
}
