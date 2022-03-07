import { getConfig } from '~/page-configs'
import { DocsBlock } from '~/types/docs-blocks'

export const usePageConfig = () => {
  const getConfigAsync = (configName: string) => {
    return getConfig(configName)
    // const promise = getConfig(configName)
  
    // const isLoading = ref(true)
    // promise.finally(() => isLoading.value = false)
  
    // const config = ref<DocsBlock[] | null>(null)
    // promise.then((imported) => config.value = imported)
  
    // return {
    //   isLoading,
    //   config,
    //   promise
    // }
  }

  return {
    getConfigAsync
  }
}
