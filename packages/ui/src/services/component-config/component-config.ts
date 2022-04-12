import { useLocalConfig } from '../../components/va-config/VaConfig'
import { useGlobalConfig } from '../global-config/global-config'
import { computed, DefineComponent, ref } from 'vue'

export type Props = { [propName: string]: any }
export type ComponentConfig = { [componentName: string]: Props }

export const useComponentConfigProps = <T extends DefineComponent>(component: T) => {
  const localConfig = useLocalConfig()
  const { globalConfig } = useGlobalConfig()

  return computed(() => {
    const globalConfigProps = {
      ...globalConfig.value.componentsAll,
      ...globalConfig.value.components?.[component.name],
    }

    const localConfigProps = localConfig.value
      .reduce((finalConfig, config) => config[component.name] ? { ...finalConfig, ...config[component.name] } : finalConfig, {})

    const props = { ...globalConfigProps, ...localConfigProps }

    return props
  })
}
