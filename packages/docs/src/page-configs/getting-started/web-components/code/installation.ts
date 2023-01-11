export const installationCode = `
import { registerVuesticWebComponents, VaButton, VaSelect, VaTab, VaTabs, VaConfig } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'

registerVuesticWebComponents({
  components: {
    VaButton,
    VaSelect,
    VaTab,
    VaTabs,
    VaConfig,
  },
})
`

// TODO: Check if Font Awesome is correct font
export const installationCssCode = `
const fas = \`
.fas {
  font-family: 'Font Awesome';
}
\`

registerVuesticWebComponents({
  components: {
    // ...
  },

  css: fas
})
`
