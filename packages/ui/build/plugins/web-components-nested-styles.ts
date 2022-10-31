import { Plugin } from 'vite'
import { existsSync } from 'fs'
import { readdir, readFile, writeFile, lstat } from 'fs/promises'

/** Returns list of child components names */
const getComponentsList = (text: string) => {
  const declaration = text.match(/components: {(\w|\s|\n|,)*}/gm)
  if (!declaration) { return [] }

  const oneLineDeclaration = declaration[0].replace(/\n/g, '')
  return oneLineDeclaration.replace(/components: {/, '').replace(/}/, '').split(',').map((item) => item.trim())
}

/** .styles returns component styles, that will be injected inside Web Component shadow dom */
const generateComponentStylesAccessCode = (list: string[]) => {
  return list.map((name) => [`...(${name}.styles || [])`]).join(', ')
}

const injectNestedComponentsStyle = async (componentPath) => {
  if (!existsSync(componentPath)) { return }

  const componentContent = await readFile(componentPath, 'utf8')

  /** Component store own styles from `<style>` in variables with `_style_` prefix */
  const vars = [...componentContent.matchAll(/[const|var] (_style_.*) = /gm)].map(([a, b]) => b)

  const componentList = getComponentsList(componentContent)

  if (componentList.length === 0) { return }

  writeFile(componentPath, componentContent
    // Might be with styles or without styles
    // _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [/* variables */]]])
    .replace(/_export_sfc\(.*, \["styles", \[(.*)\]\]\]\)/, (str, substr) => {
      return str.replace(substr, generateComponentStylesAccessCode(componentList) + ', ' + vars.join(', '))
    })
    // _export_sfc(_sfc_main, [["render", _sfc_render]])
    .replace(/_export_sfc\(.*(\[\["render", _sfc_render\]\])\)/, (str, substr) => {
      return str.replace(substr, `[["render", _sfc_render], ["styles", [${generateComponentStylesAccessCode(componentList)}, ${vars.join(', ')}]]]`)
    }),
  )
}

// TODO: Move processFiles to some helper. The same code used in different plugins.
export const processFiles = async (componentsDir: string) => {
  (await readdir(componentsDir))
    .map(async (entryName) => {
      const currentPath = `${componentsDir}/${entryName}`

      if ((await lstat(currentPath)).isDirectory()) {
        return processFiles(currentPath)
      }

      injectNestedComponentsStyle(currentPath)
    })
}

/** Merge styles to custom element from child components */
export const webComponentsNestedStyles = (): Plugin => {
  let outDir = ''

  return {
    name: 'vuestic:web-components-nested-styles',

    configResolved: (config) => {
      outDir = config.build.outDir
    },

    /**
     * We need to process all components, look for it child components and inject their styles into parent component.
     * In other way, component will be rendered without child component styles.
     */
    closeBundle: async () => {
      return processFiles(`${outDir}`)
    },
  }
}
