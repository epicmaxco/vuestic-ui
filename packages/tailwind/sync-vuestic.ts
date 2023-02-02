import {
  convertValueToString,
  tailwindConfigPath,
  tailwindConfigFilename,
  defaultTailwindConfigFilename,
} from './helpers/helpers'
import { convertVuesticThresholds } from './modules/breakpoint'
import { convertVuesticColors } from './modules/colors'

const fs = require('fs')

const defaultTailwindConfig = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/**
 * @description writes tailwind config to the file
 * @param config tailwind config in raw string format
 */
const updateTailwindConfig = (config?: string) => {
  try {
    const tailwindConfig = `module.exports = ${config ?? convertValueToString(defaultTailwindConfig)}`

    fs.writeFileSync(tailwindConfigFilename || defaultTailwindConfigFilename, tailwindConfig)

    console.log(`${tailwindConfigFilename || defaultTailwindConfigFilename} was successfully synchronized with Vuestic UI config!`)
  } catch (e) {
    console.log(e)
  }
}

/**
 * @description forming tailwind config file from vuestic default presets
 */
export const integrateVuesticConfig = async () => {
    if (!tailwindConfigPath) { console.log('Tailwind CSS config file not found. Proceeding with default config.') }
    const tailwindConfig = tailwindConfigPath ? (await (() => import(tailwindConfigPath))()).default : defaultTailwindConfig

    tailwindConfig.theme ||= {}
    tailwindConfig.theme.extend ||= {}
    tailwindConfig.theme.extend.colors ||= {}
    tailwindConfig.theme.extend.screens ||= {}

    tailwindConfig.theme.extend.colors = convertVuesticColors(tailwindConfig)
    tailwindConfig.theme.extend.screens = convertVuesticThresholds(tailwindConfig)

    updateTailwindConfig(convertValueToString(tailwindConfig))
  }
