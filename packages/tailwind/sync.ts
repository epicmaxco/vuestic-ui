import { convertValueToString } from './helpers/helpers'
import { proceedBreakpoint } from './modules/breakpoint'
import { proceedColors } from './modules/colors'

const path = require('path')
const fs = require('fs')

export const tailwindConfigFilename = fs.readdirSync('.').find((fileName: string) => fileName.startsWith('tailwind.config.'))
const tailwindConfigPath = tailwindConfigFilename ? path.resolve(process.cwd(), tailwindConfigFilename) : undefined
const vuesticConfigFilename = 'vuestic.config.js'

/**
 * @description writes vuestic config to the file
 * @param config vuestic config in raw string format
 */
const updateVuesticConfig = (config?: string) => {
  try {
    const vuesticConfig = '// Do not insert custom values to the colors or breakpoints Vuestic UI config\n' +
      '// or they will be overwritten! Use Tailwind CSS config instead.' +
      `\n\nexport const config = ${config ?? '{}'}`

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

    const tailwindColors = proceedColors(tailwindConfig)
    const tailwindThresholds = proceedBreakpoint(tailwindConfig)

    const vuesticConfig = {
      breakpoints: {
        thresholds: tailwindThresholds,
      },
      colors: {
        variables: tailwindColors,
      },
    }
    updateVuesticConfig(convertValueToString(vuesticConfig))
  }

;(async () => { await integrateTailwindConfig() })()
