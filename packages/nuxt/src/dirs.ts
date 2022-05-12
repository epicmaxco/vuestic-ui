import { fileURLToPath } from 'url'
import { dirname } from 'pathe'

export const distDir = dirname(fileURLToPath(import.meta.url))
