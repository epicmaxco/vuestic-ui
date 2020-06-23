import { mount } from '@vue/test-utils'
import VaCard from '../VaCard.vue'

import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'

describe('VaCard', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaCard)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is contextable', () => {
    const props = {
      tag: 'a',
      square: true,
      outlined: true,
      bordered: false,
      disabled: true,
      href: 'example.com',
      target: '_blank',
      stripe: true,
      stripeColor: 'purple',
      gradient: true,
    }
    expect(() => testIsContextableComponent(VaCard, props)).not.toThrow()
  })
})
