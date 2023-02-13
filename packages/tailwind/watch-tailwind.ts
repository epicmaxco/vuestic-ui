import { tailwindConfigFilename } from "./helpers/helpers";
import { integrateTailwindConfig } from './sync-tailwind'

const fs = require('fs')

/**
 * watches tailwind config file and syncing it with vuestic config file on change
 */
export const watchTailwindConfigFile = () => {
  console.log(`Watching ${tailwindConfigFilename}...`)

  fs.watch(tailwindConfigFilename, async () => { await integrateTailwindConfig() })
}
