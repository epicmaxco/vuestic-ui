import { mount, shallowMount } from '@vue/test-utils'

import VaBacktop from '../VaBacktop.vue'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'

describe('VaBacktop', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBacktop)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is contextable', () => {
    const props = {
      target: 'body',
      visibilityHeight: 0,
      speed: 50,
      top: 'auto',
      left: 'auto',
      right: '40px',
      bottom: '40px',
    }
    expect(() => testIsContextableComponent(VaBacktop, props)).not.toThrow()
  })
})
