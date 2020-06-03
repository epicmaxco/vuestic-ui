import { CreateElement } from 'vue'
import { Vue, Component, Provide, Mixins } from 'vue-property-decorator'
import { mount } from '@vue/test-utils'
import ContextMixin, { ContextProviderKey, CONFIGS_DEFAULT } from './ContextMixin'

@Component
class ExampleComponent extends Mixins(ContextMixin) {
  render () {
    return null
  }
}

const providedValue = [{ context: { value: 'value' } }]

@Component
class Provider extends Vue {
  @Provide(ContextProviderKey) providedValue = providedValue

  render () {
    return this.$slots.default || null
  }
}

describe('ContextMixin', () => {
  it('should return the default configs set value', () => {
    const wrapper = mount(ExampleComponent)
    expect(wrapper.vm._$configs).toStrictEqual(CONFIGS_DEFAULT)
  })

  it('should return the configs set value', () => {
    const wrapper = mount({
      render (h: CreateElement) {
        return h(Provider, [h(ExampleComponent)])
      },
    })

    expect((wrapper.find(ExampleComponent).vm as any)._$configs).toStrictEqual(providedValue)
  })
})
