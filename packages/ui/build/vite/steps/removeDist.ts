import { existsSync, rmSync } from 'fs'

export const removeDist = () => {
  if (existsSync('./dist')) {
    rmSync('./dist', { recursive: true })
  }
}
