import { rmSync, existsSync } from 'fs';

export const cleanDist = (dir: string) => {
  if (existsSync(dir)) {
    console.log('Clearing output directory...')
    rmSync(dir, { recursive: true })
  }
}