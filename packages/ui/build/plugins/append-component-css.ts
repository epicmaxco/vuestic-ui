import { existsSync } from 'fs'
import { extname, dirname, basename, relative, resolve } from 'pathe'
import { createDistTransformPlugin } from './fabrics/create-dist-transform-plugin'

const parsePath = (path: string) => {
  const ext = extname(path).replace('.', '')

  return {
    ext,
    dir: dirname(path),
    name: basename(path, `.${ext}`),
  }
}

/**
 * Checks if file is Vuestic component template source
 * If file is script source, but there is not template then add css to script.
 * Component usually have script which is stored in file with name like Va[ComponentName].vue_vue_type_script_lang
 *
 * @notice Component can have render function without template block. It also can have only template without script block.
 */
const isVuesticComponent = (filename: string) => {
  // Va[ComponentName].vue_vue_type_script_lang.mjs
  // Va[ComponentName].vue_vue_type_script_setup_true_lang.mjs
  const isScriptFile = /Va\w*.vue_vue_type_script\w*_lang.m?js$/.test(filename)
  if (isScriptFile) {
    return true
  }

  // Va[ComponentName].mjs
  const isTemplateFile = /Va\w*\.m?js$/.test(filename)

  // Va[ComponentName].vue_vue_type_script_lang.mjs
  const scriptFilePath = filename.replace(/\.(mjs|js)/, '.vue_vue_type_script_lang.mjs')
  const scriptSetupFilePath = filename.replace(/\.(mjs|js)/, '.vue_vue_type_script_setup_true_lang.mjs')

  const haveScript = existsSync(scriptFilePath) || existsSync(scriptSetupFilePath)

  if (isTemplateFile && !haveScript) {
    return true
  }

  return false
}

const extractVuesticComponentName = (filename: string) => {
  return filename.match(/(Va\w*)/)?.[1]
}

const SOURCE_MAP_COMMENT_FRAGMENT = '//# sourceMappingURL='

const appendBeforeSourceMapComment = (content: string, append: string): string => {
  return content.replace(SOURCE_MAP_COMMENT_FRAGMENT, `${append}\n${SOURCE_MAP_COMMENT_FRAGMENT}`)
}

export const appendComponentCss = createDistTransformPlugin({
  name: 'vuestic:append-component-css',

  dir: (outDir) => `${outDir}/src/components`,

  transform (componentContent, path) {
    if (!isVuesticComponent(path)) { return }

    const { name, dir } = parsePath(path)

    const componentName = extractVuesticComponentName(name)

    if (!componentName) {
      throw new Error(`Can't extract component name from ${name}`)
    }

    const distPath = resolve(this.outDir, '..', '..')
    const relativeDistPath = relative(dir, distPath)
    const relativeFilePath = relativeDistPath + '/' + componentName.replace(/-.*$/, '') + '.css'

    // There are few cases how vite can store css files (depends on vite version, but we handle both for now):
    // CSS stored in dist folder (root)
    if (existsSync(resolve(dir, relativeFilePath))) {
      return appendBeforeSourceMapComment(componentContent, `\nimport '${relativeFilePath}';`)
    }

    // CSS stored in component folder
    const cssFilePath = `${dir}/${componentName}.css`

    if (existsSync(cssFilePath)) {
      return appendBeforeSourceMapComment(componentContent, `\nimport './${componentName}.css';`)
    }
  },
})
