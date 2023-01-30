export const installationCode = `
import { registerVuesticWebComponents } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'

registerVuesticWebComponents()
`

// TODO: Check if Font Awesome is correct font
export const installationCssCode = `
const fas = \`
.fas {
  font-family: 'Font Awesome';
}
\`

registerVuesticWebComponents({
  css: fas
})
`
