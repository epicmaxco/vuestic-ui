import { existsSync } from 'fs'
import { extname, dirname, basename } from 'path'
import { createDistTransformPlugin } from './fabrics/create-dist-transform-plugin'

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

export const appendComponentCss = createDistTransformPlugin({
  name: 'vuestic:append-component-css',

  dir: (outDir) => `${outDir}/src/components`,

  transform: (componentContent, path) => {
    if (!isVuesticComponent(path)) { return }

    const { name, dir } = parsePath(path)

    const cssFilePath = `${dir}/${name}.css`

    if (!existsSync(cssFilePath)) { return }

    return appendBeforeSourceMapComment(componentContent, `\nimport './${name}.css';`)
  },
})
