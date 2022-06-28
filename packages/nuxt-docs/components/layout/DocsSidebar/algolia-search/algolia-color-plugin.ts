import { useColors } from 'vuestic-ui/src/composables'
import { addOrUpdateStyleElement } from '../../../../../ui/src/services/dom-functions'
import { getHoverColor } from '../../../../../ui/src/services/color-config/color-functions'
import { App, ref, watch } from 'vue'

const createThemeColorStyles = (themes: Record<string, string>): string => {
  let result = ''

  result += `.algolia-docsearch-suggestion--highlight { background-color: ${getHoverColor(themes.primary)} !important; }`
  result += `.algolia-docsearch-suggestion--highlight { color: ${themes.primary} !important; }`

  return result
}

const AlgoliaColorPlugin = {
  install (app: App) {
    app.mixin({
      setup () {
        const colors = ref(useColors().getColors().colors)
        return { colors }
      },
      created () {
        watch(() => this.colors, (colors) => {
          addOrUpdateStyleElement('va-algolia-styles', () => createThemeColorStyles(colors))
        })
      },
    })
  },
}

export default AlgoliaColorPlugin
