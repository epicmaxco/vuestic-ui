import { existsSync } from 'fs'
import { execSync } from 'child_process'

if (!existsSync('../ui/dist')) {
  console.log('Build Vuestic UI first to build Tailwind CSS package!')
  process.exit(0)
}

console.log('Building Tailwind CSS integration package...')
execSync('yarn run build:vite', (error) => {
  if (error) {
    console.error(`Build error: ${error}`)
  }
})
