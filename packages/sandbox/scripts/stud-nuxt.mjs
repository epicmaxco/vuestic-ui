import { writeFileSync, mkdirSync, existsSync } from 'fs'

if (existsSync('./src/.nuxt/tsconfig.json')) {
  process.exit()
}

mkdirSync('./src/.nuxt', { recursive: true })
writeFileSync('./src/.nuxt/tsconfig.json', '{}', { flag: 'wx' })
