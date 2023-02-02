import { convertValueToString, tailwindConfigPath } from './helpers/helpers'
import { tailwindThresholdsSync } from './modules/breakpoint'
import { tailwindColorsSync } from './modules/colors'

const fs = require('fs')

const vuesticConfigFilename = 'vuestic.config.js'

/**
 * @description writes vuestic config to the file
 * @param config vuestic config in raw string format
 */
const updateVuesticConfig = (config?: string) => {
  try {
    const vuesticConfig = '// Do not insert custom values to the colors or breakpoints Vuestic UI config\n' +
      '// or they will be overwritten! Use Tailwind CSS config instead.' +
      `\n\nexport default ${config ?? '{}'}`

    fs.writeFileSync(vuesticConfigFilename, vuesticConfig)

    console.log(`${vuesticConfigFilename} was successfully synchronized with Tailwind CSS config!`)
  } catch (e) {
    console.log(e)
  }
}

/**
 * @description forming vuestic config from tailwind configuration (custom or default)
 */
export const integrateTailwindConfig = async () => {
    if (!tailwindConfigPath) { console.log('Tailwind CSS config file not found. Proceeding with default Tailwind CSS settings.') }
    const tailwindConfig = tailwindConfigPath ? await (() => import(tailwindConfigPath))() : undefined

    const tailwindColors = tailwindColorsSync(tailwindConfig)
    const tailwindThresholds = tailwindThresholdsSync(tailwindConfig)

    const vuesticConfig = {
      breakpoints: {
        thresholds: tailwindThresholds,
      },
      colors: {
        variables: tailwindColors,
      },
    }

    updateVuesticConfig(convertValueToString(vuesticConfig))

    tailwindConfigPath && delete require.cache[require.resolve(tailwindConfigPath)]
  }
