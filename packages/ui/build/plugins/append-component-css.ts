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
 * Checks if file is Vuestic component script source
 * Component always have script which is stored in file with name like Va[ComponentName].vue_vue_type_script_lang
 */
const isVuesticComponent = (filename: string) => {
  // Va[ComponentName].vue_vue_type_script_lang
  return /Va\w*.vue_vue_type_script_lang.*\.mjs$/.test(filename)
}

const extractVuesticComponentName = (filename: string) => {
  return filename.match(/(Va\w*).vue_vue_type_script_lang.*/)?.[1]
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
