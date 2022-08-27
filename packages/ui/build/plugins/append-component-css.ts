import { existsSync, readdirSync, readFileSync, writeFileSync, lstatSync } from 'fs'
import { extname, dirname, basename } from 'path'
import { Plugin } from 'vite'

const parsePath = (path: string) => {
  const ext = extname(path).replace('.', '')

  return {
    ext,
    dir: dirname(path),
    name: basename(path, `.${ext}`),
  }
}

const isVuesticComponent = (filename: string) => {
  return /^Va.*\.(js|mjs)$/.test(filename)
}

const SOURCE_MAP_COMMENT_FRAGMENT = '//# sourceMappingURL='

const appendBeforeSourceMapComment = (content: string, append: string): string => {
  return content.replace(SOURCE_MAP_COMMENT_FRAGMENT, `${append}\n${SOURCE_MAP_COMMENT_FRAGMENT}`)
}

const appendCssImportToComponent = (componentPath: string) => {
  if (!existsSync(componentPath)) { return }

  const { name, dir } = parsePath(componentPath)

  const cssFilePath = `${dir}/${name}.css`
  if (!existsSync(cssFilePath)) { return }

  const componentContent = readFileSync(componentPath, 'utf8')

  writeFileSync(componentPath, appendBeforeSourceMapComment(componentContent, `\nimport './${name}.css';`))
}

export const appendCssImportToComponentsDir = (componentsDir: string) => {
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

export const appendComponentCss = (): Plugin => {
  let outDir = ''

  return {
    name: 'vuestic:append-component-css',
    configResolved: (config) => {
      outDir = config.build.outDir
    },
    closeBundle: () => {
      appendCssImportToComponentsDir(`${outDir}/src/components`)
    },
  }
}
