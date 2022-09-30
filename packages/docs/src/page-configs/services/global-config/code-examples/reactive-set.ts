export const reactiveSetExampleCode = `
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { setGlobalConfig } = useGlobalConfig()

    const setNewLookForOurApplication = () => {
      setGlobalConfig({
        icons: [...],
        components: {
          ...,
          all: { ... },
          presets: { ... },
        },
        colors: { ... },
      })
    }

    return { setNewLookForOurApplication }
  }
}
`
