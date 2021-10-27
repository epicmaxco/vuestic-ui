export const useInRuntimeCode = `
import { useGlobalConfig } from 'vuestic-ui'
import { computed } from 'vue'

export default {
  setup () {
    const { getGlobalConfig } = useGlobalConfig()

    const config = computed(() => getGlobalConfig())

    console.log(config.value)

    return { config }
  }
}
`
