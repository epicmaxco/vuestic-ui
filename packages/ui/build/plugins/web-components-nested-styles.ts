import { Plugin } from 'vite'
import { existsSync, readdirSync, readFileSync, writeFileSync, lstatSync } from 'fs'

const getComponentsList = (text: string) => {
  const declaration = text.match(/components: {(\w|\s|\n|,)*}/gm)
  if (!declaration) { return [] }

  const oneLineDeclaration = declaration[0].replace(/\n/g, '')
  return oneLineDeclaration.replace(/components: {/, '').replace(/}/, '').split(',').map((item) => item.trim())
}

const listToStyles = (list: string[]) => {
  return list.map((name) => [`...(${name}.styles || [])`]).join(', ')
}

const processFile = (componentPath) => {
  if (!existsSync(componentPath)) { return }

  const componentContent = readFileSync(componentPath, 'utf8')

  const vars = [...componentContent.matchAll(/[const|var] (_style_.*) = /gm)].map(([a, b]) => b)

  const componentList = getComponentsList(componentContent)

  if (componentList.length === 0) { return }

  writeFileSync(componentPath, componentContent
    // _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [/* variables */]]])
    .replace(/_export_sfc\(.*, \["styles", \[(.*)\]\]\]\)/, (str, substr) => {
      return str.replace(substr, listToStyles(componentList) + ', ' + vars.join(', '))
    })
    // _export_sfc(_sfc_main, [["render", _sfc_render]])
    .replace(/_export_sfc\(.*(\[\["render", _sfc_render\]\])\)/, (str, substr) => {
      return str.replace(substr, `[["render", _sfc_render], ["styles", [${listToStyles(componentList)}, ${vars.join(', ')}]]]`)
    }),
  )
}

export const processFiles = (componentsDir) => {
  readdirSync(componentsDir)
    .forEach((entryName) => {
      const currentPath = `${componentsDir}/${entryName}`

      if (lstatSync(currentPath).isDirectory()) {
        return processFiles(currentPath)
      }

      processFile(currentPath)
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

    closeBundle: () => {
      processFiles(`${outDir}`)
    },
  }
}
