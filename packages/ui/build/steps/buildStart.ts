import { existsSync, rmSync } from 'fs'

export const buildStart = () => {
  if (existsSync('./dist')) {
    rmSync('./dist', { recursive: true })
  }
}
