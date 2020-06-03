import Vue, { CreateElement, ComponentOptions } from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'

import { ContextPlugin, setRef, ContextConfig } from './ContextPlugin'

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
      render (h: CreateElement) {
        return h('')
      },
    },
    {
      context: { value: 'value' },
    },
  )

  expect((wrapper.vm as any).internalValue.context.value).toBe('value')

  setRef({
    context: {
      value: 'newValue',
    },
  })

  expect((wrapper.vm as any).internalValue.context.value).toBe('newValue')

  setRef(config => ({
    ...config,
    context: { value: config.context.value + 'AndOneMoreNewValue' },
  }))

  expect((wrapper.vm as any).internalValue.context.value).toBe('newValueAndOneMoreNewValue')
})
