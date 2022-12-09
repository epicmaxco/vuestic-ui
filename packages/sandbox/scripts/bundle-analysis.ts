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
  ])

  if (existsSync(bundleSizesPath)) {
    const VUETIFY_VERSION = '3.0.3'
    const VUETIFY_SIZE = 112.497
    const NAIVE_VERSION = '2.34.2'
    const NAIVE_SIZE = 291.000

    const bundleSizes = await (async () => await require('../bundle-sizes.js'))()
    const { empty, button } = bundleSizes
    const vuesticSize = button - empty

    const mdFilePath = './tree-shaking.md'
    writeFileSync(mdFilePath, `
| Vuestic UI + VaButton | Vuetify UI (${VUETIFY_VERSION}) + VBtn | Naive UI (${NAIVE_VERSION}) + NButton |
| :-------------------: | :------------------------------------: | :-----------------------------------: |
| ${vuesticSize / 1000} Kb | ${VUETIFY_SIZE} Kb | ${NAIVE_SIZE} Kb |
    `)

    console.warn(`Result was successfully written to ${mdFilePath}.`)
    return
  }

  console.warn(`${bundleSizesPath} file wasn't found. Bundle size analysis was terminated.`)
})()
