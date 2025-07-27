import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { executeTsModule } from './ts'
import { type GlobalConfig } from 'vuestic-ui'
import { watchFileChangeOnce } from './fs'

const POSSIBLE_CONFIG_FILES = [
  './vuestic.config.ts',
  './vuestic.config.js',
  './vuestic.config.mjs',
  './vuestic.config.cjs',
  './vuestic.config.mts',
]

export const resolveVuesticConfigPath = () => {
  for (const file of POSSIBLE_CONFIG_FILES) {
    const absolutePath = resolve(file)
    if (existsSync(absolutePath)) {
      return absolutePath
    }
  }
}

export const tryToReadConfig = async (path: string | undefined = resolveVuesticConfigPath()) => {
  if (path && existsSync(path)) {
    const absolutePath = resolve(path)
    const source = await readFile(absolutePath)
    const { default: config } = await executeTsModule<{ default: GlobalConfig }>(source.toString(), absolutePath) ?? {}

    return config
  }

  return null
}

export const watchVuesticConfigOnce = async (onChange: () => void) => {
  let config = await tryToReadConfig()

  for (const file of POSSIBLE_CONFIG_FILES) {
    const absolutePath = resolve(file)

    watchFileChangeOnce(absolutePath, () => {
      onChange()
    })
  }

  return config
}
