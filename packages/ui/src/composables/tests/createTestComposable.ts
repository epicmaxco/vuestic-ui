import { createApp, defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createVuestic } from '../../main'

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
      plugins: [createVuestic()],
    },
  })

  return {
    composableWrapper: appWrapper.vm.getComposableResult(),
  }
}
