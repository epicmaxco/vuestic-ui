import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { GlobalConfig, PartialGlobalConfig, createVuestic } from '../../main'

export type Composable = (...args: any[]) => any

/**
 * Most of the composables are not going to work outside a setup script.
 * This function creates a wrapper component to use composables in a tests
 * environment.
 * If you want two or more composables to share the same state, pass them
 * as an array.
 * Keep in mind that calling this function two times with a different
 * composables as parameter won't make those composables share the state.
 * @param composables a composable or an array of composables
 * @returns { composableWrapper } a composableWrapper object containing the values returned by the composables
 */
export function createTestComposable (composables: Composable | Composable[], globalConfig?: PartialGlobalConfig) {
  const App = defineComponent({
    setup () {
      if (!Array.isArray(composables)) {
        composables = [composables]
      }

      const composableResults = composables.reduce<Record<string, any>>((acc, composable) => {
        const result = composable()
        return {
          ...acc,
          ...result,
        }
      }, {})
      const getComposableResults = () => composableResults

      return {
        getComposableResults,
      }
    },
    render () {
      return h('div')
    },
  })

  const appWrapper = mount(App, {
    global: {
      plugins: [createVuestic({
        config: globalConfig,
      }) as any],
    },
  })

  return {
    composableWrapper: appWrapper.vm.getComposableResults(),
  }
}
