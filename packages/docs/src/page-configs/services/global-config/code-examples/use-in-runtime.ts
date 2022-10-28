export const useInRuntimeCode = `
import { useGlobalConfig } from 'vuestic-ui'
import { computed } from 'vue'

export default {
  setup () {
    const { globalConfig } = useGlobalConfig()

    console.log(globalConfig.value)

    return { globalConfig }
  }
}
`
