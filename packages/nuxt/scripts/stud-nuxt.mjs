import { writeFileSync, mkdirSync, existsSync } from 'fs'

if (existsSync('./playground/.nuxt/tsconfig.json')) {
  process.exit()
}

mkdirSync('./playground/.nuxt', { recursive: true })
writeFileSync('./playground/.nuxt/tsconfig.json', '{}', { flag: 'wx' })
