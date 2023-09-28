import { createDistTransformPlugin } from './fabrics/create-dist-transform-plugin'

/** Returns list of child components names */
const getComponentsList = (text: string) => {
  // TODO: Replace Regex with ast parser
  const declaration = text.match(/^\s\scomponents:\s?{([^}]*)}/gms)
  if (!declaration) { return [] }

  // There might be only on `components` declaration for one file
  const oneLineDeclaration = declaration[0].replace(/\n/g, '')
  return oneLineDeclaration
    .replace('components: {', '')
    .replace('}', '')
    .split(',')
    .map((item) => {
      /*
      Can be one of two way to register component
      ```
      components: {
        VaDatePicker: _VaDatePicker,
        VaInput,
      }
      ```

      So we need _VaDatePicker or if not, just component name
      */
      return item.split(':')[1] || item
    })
}

/** .styles returns component styles, that will be injected inside Web Component shadow dom */
const generateComponentStylesAccessCode = (list: string[]) => {
  return list.map((name) => [`...(${name}.styles || [])`]).join(', ')
}

const generateComponentStyles = (sfcMain: string) => {
  return `...(${sfcMain}.components ? Object.values(${sfcMain}.components) : []).map((c) => c.styles || []).flat()`
}

/** Merge styles to custom element from child components */
export const webComponentsNestedStyles = createDistTransformPlugin({
  name: 'vuestic:web-components-nested-styles',

  dir: (outDir) => `${outDir}/src/components`,

  transform: async (componentContent) => {
    // /** Component store own styles from `<style>` in variables with `_style_` prefix */
    const vars = [...componentContent.matchAll(/[const|var] (_style_.*) = /gm)].map(([a, b]) => b)

    // const componentList = getComponentsList(componentContent)

    // if (componentList.length === 0) { return }

    return componentContent
      // _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [/* variables */]]])
      .replace(/_export_sfc\((\w*).*, \["styles", \[(.*)\]\]\]\)/, (str, sfcMain, substr) => {
        return str.replace(substr, generateComponentStyles(sfcMain) + ', ' + vars.join(', '))
      })
      // _export_sfc(_sfc_main, [["render", _sfc_render]])
      .replace(/_export_sfc\((\w*).*(\[\["render", _sfc_render\]\])\)/, (str, sfcMain, substr) => {
        return str.replace(substr, `[["render", _sfc_render], ["styles", [${generateComponentStyles(sfcMain)}]]]`)
      })
      // // Might be with styles or without styles
      // // _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [/* variables */]]])
      // .replace(/_export_sfc\(.*, \["styles", \[(.*)\]\]\]\)/, (str, substr) => {
      //   return str.replace(substr, generateComponentStylesAccessCode(componentList) + ', ' + vars.join(', '))
      // })
      // // _export_sfc(_sfc_main, [["render", _sfc_render]])
      // .replace(/_export_sfc\(.*(\[\["render", _sfc_render\]\])\)/, (str, substr) => {
      //   return str.replace(substr, `[["render", _sfc_render], ["styles", [${generateComponentStylesAccessCode(componentList)}, ${vars.join(', ')}]]]`)
      // })
  },
})
