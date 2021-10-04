export const reactiveUpdateExampleCode = `
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { mergeGlobalConfig } = useGlobalConfig()

    const setNewLookForOurApplication = () => {
      mergeGlobalConfig({
        icons: [{ name: 'phone', to: 'fas-phone' }],
        components: { VaButton: { ... } },
        componentsAll: { color: 'secondary' },
        colors: { 'primary': '#ff0', 'secondary': '#d91698' },
      })
    }

    return { setNewLookForOurApplication }
  }
}
`
