import { $ } from 'deploy/execute'
import { existsSync, rmSync, writeFileSync } from 'fs'

(async () => {
  const distPath = './dist'
  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true })
  }

  const bundleSizesPath = './bundle-sizes.js'
  if (existsSync(bundleSizesPath)) {
    rmSync(bundleSizesPath)
  }

  await Promise.all([
    $('vite build --config ./configs/vite/vite.empty.ts', { successMessage: 'Empty config was built.' }),
    $('vite build --config ./configs/vite/vite.button.ts', { successMessage: 'Config with button was built.' }),
    $('vite build --config ./configs/vite/vite.full.ts', { successMessage: 'Full config was built.' }),
    $('vite build --config ./configs/vite/vite.button-select.ts', { successMessage: 'Config with button and select was built.' }),
  ])

  if (existsSync(bundleSizesPath)) {
    const VUETIFY_VERSION = '3.0.3'
    const VUETIFY_FULL_SIZE = 781
    const VUETIFY_BUTTON_SIZE = 112
    const VUETIFY_BUTTON_SELECT_SIZE = 380
    const NAIVE_VERSION = '2.34.2'
    const NAIVE_FULL_SIZE = 3037
    const NAIVE_BUTTON_SIZE = 181
    const NAIVE_BUTTON_SELECT_SIZE = 607

    const bundleSizes = await (async () => await require('../bundle-sizes.js'))()
    const { empty, button, buttonSelect, full } = bundleSizes

    const getOutputBundleSize = (v: number) => Math.trunc((v - empty) / 1000)

    const mdFilePath = './tree-shaking.md'
    writeFileSync(mdFilePath, `
| Bundle                     | Vuestic UI                                |
| -------------------------- | :---------------------------------------: |
| Full                       | ~ ${getOutputBundleSize(full)} Kb         |
| Core + VaButton            | ~ ${getOutputBundleSize(button)} Kb       |
| Core + VaButton + VaSelect | ~ ${getOutputBundleSize(buttonSelect)} Kb |
    `)

    const devMdFilePath = './dev-tree-shaking.md'
    writeFileSync(devMdFilePath, `
| Bundle                 | Vuestic UI                                | Vuetify UI (${VUETIFY_VERSION}) | Naive UI (${NAIVE_VERSION}) |
| ---------------------- | :---------------------------------------: | :-----------------------------: | :-------------------------: |
| Full                   | ~ ${getOutputBundleSize(full)} Kb         | ~ ${VUETIFY_FULL_SIZE} Kb       | ~ ${NAIVE_FULL_SIZE} Kb     |
| Core + Button          | ~ ${getOutputBundleSize(button)} Kb       | ~ ${VUETIFY_BUTTON_SIZE} Kb     | ~ ${NAIVE_BUTTON_SIZE} Kb   |
| Core + Button + Select | ~ ${getOutputBundleSize(buttonSelect)} Kb | ~ ${VUETIFY_BUTTON_SELECT_SIZE} Kb | ~ ${NAIVE_BUTTON_SELECT_SIZE} Kb |
    `)

    console.warn(`Result was successfully written to ${mdFilePath} and ${devMdFilePath}.`)
    return
  }

  console.warn(`${bundleSizesPath} file wasn't found. Bundle size analysis was terminated.`)
})()
