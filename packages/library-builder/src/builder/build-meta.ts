import { join, resolve } from "pathe"
import { fineComponents } from "../generator/generate-components-exports"
import { writeFile, mkdir } from 'fs/promises'
import { exists } from "../utils/exists"

export const buildMeta = async (options: {
  cwd: string,
  outDir: string,
  entry: string,
  componentsNamePattern?: string,
  componentsPathPattern?: string,
  composablesNamePattern?: string,
  composablesPathPattern?: string,
}) => {
  const { cwd, entry, outDir } = options

  const exports = await fineComponents(resolve(cwd, entry))

  const componentsNameRegex = new RegExp(options.componentsNamePattern || '\w*')
  const composablesNameRegex = new RegExp(options.composablesNamePattern || 'use\w*')
  const componentsPathRegex = new RegExp(options.componentsPathPattern || '/components/')
  const composablesPathRegex = new RegExp(options.composablesPathPattern || '/composables/')

  const components = exports
    .filter(e => e.name && componentsNameRegex.test(e.name) && componentsPathRegex.test(e.path))
    .map(e => e.name)

  const composables = exports
    .filter(e => e.name && composablesNameRegex.test(e.name) && composablesPathRegex.test(e.path))
    .map(e => e.name)

  const meta = {
    components,
    composables,
  }

  if (!await exists(resolve(join(cwd, outDir)))) {
    await mkdir(resolve(join(cwd, outDir)))
  }
  
  await writeFile(resolve(join(cwd, outDir, '/meta.json')), JSON.stringify(meta, null, 2), {
    encoding: 'utf-8',
    flag: 'w',
  })
}
