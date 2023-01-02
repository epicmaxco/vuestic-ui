import { readFile, writeFile } from 'fs/promises';

import { resolvePath } from './../../utils/resolve-path';
import { useUserAnswers } from './../../composables/useUserAnswers';
import { usePackageJson } from '../../composables/usePackageJson';
import { insertHead } from './insert-head';
import { insertImport } from './insert-import';
import { insertVuesticPlugin } from './insert-plugin';
import { useVuesticConfig } from '../../composables/useVuesticConfig';

export const addVuesticToVue3App = async () => {
  const { projectName } = await useUserAnswers()

  // Install vuestic-ui
  const { addDependency } = await usePackageJson()
  addDependency('vuestic-ui', 'latest')

  // Add plugin
  const mainPath = resolvePath(process.cwd(), projectName, 'src/main.js') || resolvePath(process.cwd(), projectName, 'src/main.ts')

  if (!mainPath) {
    throw new Error('Unexpected error: Could not find main.js or main.ts')
  }

  const config = await useVuesticConfig()

  const css = config.css.map((css) => `import '${css}'`)

  let mainSource = await readFile(mainPath, 'utf-8')
  mainSource = insertVuesticPlugin(mainSource, config.plugin)
  mainSource = insertImport(mainSource, [
    ...config.import,
    ...css,
  ])
  await writeFile(mainPath, mainSource)

  // Add fonts

  const htmlPath = resolvePath(process.cwd(), projectName, 'index.html')!
  let htmlSource = await readFile(htmlPath, 'utf-8')
  htmlSource = insertHead(htmlSource, [
    `<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">`,
    `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
  ])
  await writeFile(htmlPath, htmlSource)
}
