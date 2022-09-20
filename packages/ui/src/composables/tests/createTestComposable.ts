import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createGlobalConfig, GLOBAL_CONFIG } from '../../services/global-config/global-config'

export type Composable = (...args: any[]) => any

export function createTestComposable (composable: Composable) {
  const App = defineComponent({
    setup () {
      const composableResult = composable()
      const getComposableResult = () => composableResult

      return {
        getComposableResult,
      }
    },
    render () {
      return h('div')
    },
  })

  const appWrapper = mount(App, {
    global: {
      provide: {
        [GLOBAL_CONFIG]: createGlobalConfig(),
      },
    },
  })

  return {
    composableWrapper: appWrapper.vm.getComposableResult(),
  }
}
