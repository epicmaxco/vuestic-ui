import { tailwindConfigFilename, integrateTailwindConfig } from './sync'

const fs = require('fs')

/**
 * watches tailwind config file and syncing it with vuestic config file on change
 */
const watchTailwindConfigFile = () => {
  fs.watch(tailwindConfigFilename, async () => { await integrateTailwindConfig() })
}

;(() => { watchTailwindConfigFile() })()
