import { CreateElement } from 'vue'
import { Vue, Component, Provide, Mixins } from 'vue-property-decorator'
import { mount } from '@vue/test-utils'
import LocalConfigMixin, { LocalConfigProviderKey, CONFIGS_DEFAULT } from './LocalConfigMixin'

@Component
class ExampleComponent extends Mixins(LocalConfigMixin) {
  render () {
    return null
  }
}

const providedValue = [{ context: { value: 'value' } }]

@Component
class Provider extends Vue {
  @Provide(LocalConfigProviderKey) providedValue = providedValue

  render () {
    return this.$slots.default || null
  }
}

describe('ContextMixin', () => {
  it('should return the default configs array outside of provider', () => {
    const wrapper = mount(ExampleComponent)
    expect(wrapper.vm._$configs).toStrictEqual(CONFIGS_DEFAULT)
  })

  it('should return the configs array from the context', () => {
    const wrapper = mount({
      render (h: CreateElement) {
        return h(Provider, [h(ExampleComponent)])
      },
    })

    expect((wrapper.find(ExampleComponent).vm as any)._$configs).toStrictEqual(providedValue)
  })
})
