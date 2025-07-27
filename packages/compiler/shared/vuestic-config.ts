import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { executeTsModule } from './ts'
import { type GlobalConfig } from 'vuestic-ui'

export const resolveVuesticConfigPath = () => {
  if (existsSync('./vuestic.config.ts')) {
    return './vuestic.config.ts'
  } else if (existsSync('./vuestic.config.js')) {
    return './vuestic.config.js'
  } else if (existsSync('./vuestic.config.mjs')) {
    return './vuestic.config.mjs'
  } else if (existsSync('./vuestic.config.cjs')) {
    return './vuestic.config.cjs'
  } else if (existsSync('./vuestic.config.mts')) {
    return './vuestic.config.mts'
  } else {
    return undefined
  }
}

export const tryToReadConfig = async (path: string | undefined = resolveVuesticConfigPath()) => {
  if (path && existsSync(path)) {
    const absolutePath = resolve(path)
    const { default: config } = await executeTsModule<{ default: GlobalConfig }>((await readFile(absolutePath)).toString(), absolutePath) ?? {}

    return config
  }

  return null
}
