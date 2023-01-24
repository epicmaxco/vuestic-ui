import { existsSync } from 'fs'
import { exec } from 'child_process'

if (!existsSync('../ui/dist')) {
  console.log('Build Vuestic UI first to build Tailwind CSS package!')
  process.exit(0)
}

console.log('Building Tailwind CSS integration package...')
exec('yarn run build:vite', (error) => {
  if (error) {
    console.error(`Build error: ${error}`)
  }
})
