import Vue, { CreateElement, ComponentOptions } from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'

import { ContextPlugin, setRef, ContextConfig, TRY_SETTING_CONTEXT_CONFIG_LOCALLY } from './ContextPlugin'

function mountWithPlugin (
  component: ComponentOptions<Vue>,
  options: ContextConfig,
) {
  const _Vue = createLocalVue()
  _Vue.use(ContextPlugin, options)

  return mount(component, {
    localVue: _Vue,
  })
}

test('ContextPlugin', () => {
  const wrapper = mountWithPlugin(
    {
      computed: {
        internalValue (): any {
          return this.$vaContextConfig
        },
      },
      methods: {
        tryToSetRefLocally (value) {
          this.$vaContextConfig = value
        },
      },
      render (h: CreateElement) {
        return h('')
      },
    },
    {
      context: { value: 'value' },
    },
  )

  const instance = wrapper.vm as any

  expect(instance.internalValue.context.value).toBe('value')

  setRef({
    context: {
      value: 'newValue',
    },
  })

  expect(instance.internalValue.context.value).toBe('newValue')

  setRef(config => ({
    ...config,
    context: { value: config.context.value + 'AndOneMoreNewValue' },
  }))

  expect(instance.internalValue.context.value).toBe('newValueAndOneMoreNewValue')

  expect(() => instance.tryToSetRefLocally({})).toThrow(TRY_SETTING_CONTEXT_CONFIG_LOCALLY)
})
