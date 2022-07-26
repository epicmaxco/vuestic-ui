import { existsSync, readdirSync, readFileSync, writeFileSync, lstatSync } from 'fs'
import { extname, dirname, basename } from 'path'

const parsePath = (path) => {
  const ext = extname(path).replace('.', '')

  return {
    ext,
    dir: dirname(path),
    name: basename(path, `.${ext}`),
  }
}

const isVuesticComponent = (filename) => {
  return /^Va.*\.(js|mjs)$/.test(filename)
}

const SOURCE_MAP_COMMENT_FRAGMENT = '//# sourceMappingURL='

const appendBeforeSourceMapComment = (content, append) => {
  return content.replace(SOURCE_MAP_COMMENT_FRAGMENT, `${append}\n${SOURCE_MAP_COMMENT_FRAGMENT}`)
}

const appendCssImportToComponent = (componentPath) => {
  if (!existsSync(componentPath)) { return }

  const { name, dir } = parsePath(componentPath)

  const cssFilePath = `${dir}/${name}.css`
  if (!existsSync(cssFilePath)) { return }

  const componentContent = readFileSync(componentPath, 'utf8')

  writeFileSync(componentPath, appendBeforeSourceMapComment(componentContent, `\nimport './${name}.css';`))
}

export const appendCssImportToComponentsDir = (componentsDir) => {
  readdirSync(componentsDir)
    .forEach((entryName) => {
      const currentPath = `${componentsDir}/${entryName}`

      if (lstatSync(currentPath).isDirectory()) {
        return appendCssImportToComponentsDir(currentPath)
      }

      if (!isVuesticComponent(entryName)) { return }

      appendCssImportToComponent(currentPath)
    })
}

export const appendComponentCss = () => {
  let outDir = ''

  return {
    name: 'vuestic:append-component-css',

    configResolved (config) {
      outDir = config.build.outDir
    },

    closeBundle (err) {
      if (err) { return }

      appendCssImportToComponentsDir(`${outDir}/src/components`)
    },
  }
}
