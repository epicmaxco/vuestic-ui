import { convertValueToString } from './helpers/helpers'
import { proceedBreakpoint } from './modules/breakpoint'
import { proceedColors } from './modules/colors'

const path = require('path')
const fs = require('fs')

const vuesticConfigFilename = 'vuestic.config.ts'
const vuesticConfigPath = path.resolve(process.cwd(), vuesticConfigFilename)

export const tailwindConfigFilename = fs.readdirSync('.').find((fileName: string) => fileName.startsWith('tailwind.config.'))
const tailwindConfigPath = path.resolve(process.cwd(), tailwindConfigFilename)

/**
 * @description writes vuestic config to file
 * @param config vuestic config in raw string format
 */
const updateVuesticConfig = (config?: string) => {
  try {
    const vuesticConfig = " // Do not insert custom values to the colors or breakpoints Vuestic UI config or they will be overwritten! Use Tailwind CSS config instead."
      + `\n\nexport const config = ${config ?? '{}'}`

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
    if (!fs.existsSync(vuesticConfigFilename)) { updateVuesticConfig() }

    const tailwindConfig = fs.existsSync(tailwindConfigFilename) && require(tailwindConfigPath)
    const tailwindColors = proceedColors(tailwindConfig)
    const tailwindThresholds = proceedBreakpoint(tailwindConfig)

    const vuesticConfig = (await (() => import(vuesticConfigPath))()).config

    vuesticConfig.breakpoint ||= {}
    vuesticConfig.breakpoint.thresholds = tailwindThresholds

    vuesticConfig.colors ||= {}
    vuesticConfig.colors.variables = tailwindColors

    updateVuesticConfig(convertValueToString(vuesticConfig))
    delete require.cache[require.resolve(tailwindConfigPath)]
  }

;(async () => { await integrateTailwindConfig() })()
