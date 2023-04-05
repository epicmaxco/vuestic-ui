import { $ } from 'deploy/execute'
import { existsSync, rmSync, writeFileSync, mkdirSync, openSync } from 'fs'
import * as process from 'process'

(async () => {
  const isFullAnalysis = process.argv.includes('full')
  const forceRebuild = !process.argv.includes('--use-cache')
  const outputDir = process.argv.find((arg) => arg.startsWith('./') || arg.startsWith('../'))

  const distPath = './dist'
  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true })
  }

  const analyticsStorePath = './analysis'
  if (!existsSync(analyticsStorePath)) {
    mkdirSync(analyticsStorePath, { recursive: true })
    openSync(`${analyticsStorePath}/.keep`, 'a')
  }

  const bundleSizesCachePath = `./${analyticsStorePath}/bundle-sizes.js`
  const vuesticDistPath = '../ui/dist'

  if (forceRebuild) {
    if (existsSync(bundleSizesCachePath)) {
      rmSync(bundleSizesCachePath)
    }

    if (!existsSync(vuesticDistPath)) {
      console.warn(`[bundle analysis] Vuestic dist wasn't found in ${vuesticDistPath}. Proceeding new build...`)
      await $('yarn workspace vuestic-ui build', {})
    }

    await Promise.all([
      $('vite build --config ./configs/vite/vite.empty.ts', { successMessage: 'Empty config was built.' }),
      $('vite build --config ./configs/vite/vite.button.ts', { successMessage: 'Config with button was built.' }),
      $('vite build --config ./configs/vite/vite.full.ts', { successMessage: 'Full config was built.' }),
      $('vite build --config ./configs/vite/vite.button-select.ts', { successMessage: 'Config with button and select was built.' }),
    ])
  }

  const baseOutputPath = outputDir || analyticsStorePath
  const mdFilePath = `${baseOutputPath}/tree-shaking.md`
  const devMdFilePath = `${baseOutputPath}/dev-tree-shaking.md`

  if (existsSync(bundleSizesCachePath)) {
    const VUETIFY_VERSION = '3.0.3'
    const VUETIFY_FULL_SIZE = 781
    const VUETIFY_BUTTON_SIZE = 112
    const VUETIFY_BUTTON_SELECT_SIZE = 380
    const NAIVE_VERSION = '2.34.2'
    const NAIVE_FULL_SIZE = 3037
    const NAIVE_BUTTON_SIZE = 181
    const NAIVE_BUTTON_SELECT_SIZE = 607

    const bundleSizes = await (async () => await require('../analysis/bundle-sizes.js'))()
    const { empty, button, buttonSelect, full } = bundleSizes

    const getOutputBundleSize = (v: number) => Math.trunc((v - empty) / 1000)

    writeFileSync(mdFilePath, `
| Bundle                     | Vuestic UI                                |
| -------------------------- | :---------------------------------------: |
| Full                       | ~ ${getOutputBundleSize(full)} Kb         |
| Core + VaButton            | ~ ${getOutputBundleSize(button)} Kb       |
| Core + VaButton + VaSelect | ~ ${getOutputBundleSize(buttonSelect)} Kb |
    `)
    console.warn(`[bundle analysis] Result was successfully written to ${mdFilePath}.`)

    if (isFullAnalysis) {
      writeFileSync(devMdFilePath, `
| Bundle                 | Vuestic UI                                | Vuetify UI (${VUETIFY_VERSION}) | Naive UI (${NAIVE_VERSION}) |
| ---------------------- | :---------------------------------------: | :-----------------------------: | :-------------------------: |
| Full                   | ~ ${getOutputBundleSize(full)} Kb         | ~ ${VUETIFY_FULL_SIZE} Kb       | ~ ${NAIVE_FULL_SIZE} Kb     |
| Core + Button          | ~ ${getOutputBundleSize(button)} Kb       | ~ ${VUETIFY_BUTTON_SIZE} Kb     | ~ ${NAIVE_BUTTON_SIZE} Kb   |
| Core + Button + Select | ~ ${getOutputBundleSize(buttonSelect)} Kb | ~ ${VUETIFY_BUTTON_SELECT_SIZE} Kb | ~ ${NAIVE_BUTTON_SELECT_SIZE} Kb |
    `)

      console.warn(`[bundle analysis] Result was successfully written to ${devMdFilePath}.`)
    }
  } else {
    writeFileSync(mdFilePath, 'No cache was found. Please, run `yarn build:analysis && nuxt dev` if you want to have bundle size data in dev.')
    console.warn(`[bundle analysis] Blank file was written to ${mdFilePath}.`)
  }
})()
