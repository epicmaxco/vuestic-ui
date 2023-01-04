import { createDistTransformPlugin } from './fabrics/create-dist-transform-plugin'

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

/** Merge styles to custom element from child components */
export const webComponentsNestedStyles = createDistTransformPlugin({
  name: 'vuestic:web-components-nested-styles',

  dir: (outDir) => `${outDir}/src/components`,

  transform: async (componentContent) => {
    /** Component store own styles from `<style>` in variables with `_style_` prefix */
    const vars = [...componentContent.matchAll(/[const|var] (_style_.*) = /gm)].map(([a, b]) => b)

    const componentList = getComponentsList(componentContent)

    if (componentList.length === 0) { return }

    return componentContent
      // Might be with styles or without styles
      // _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [/* variables */]]])
      .replace(/_export_sfc\(.*, \["styles", \[(.*)\]\]\]\)/, (str, substr) => {
        return str.replace(substr, generateComponentStylesAccessCode(componentList) + ', ' + vars.join(', '))
      })
      // _export_sfc(_sfc_main, [["render", _sfc_render]])
      .replace(/_export_sfc\(.*(\[\["render", _sfc_render\]\])\)/, (str, substr) => {
        return str.replace(substr, `[["render", _sfc_render], ["styles", [${generateComponentStylesAccessCode(componentList)}, ${vars.join(', ')}]]]`)
      })
  },
})
