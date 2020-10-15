import { mount } from '@vue/test-utils'

import VaBacktop from '../VaBacktop.vue'
import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'

describe('VaBacktop', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBacktop)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is configurable', () => {
    const props = {
      target: 'body',
      visibilityHeight: 0,
      speed: 50,
      verticalOffset: '1rem',
      horizontalOffset: '1rem',
      color: '',
      horizontalPosition: 'left',
      verticalPosition: 'right',
    }
    expect(() => testIsConfigProvidedComponent(VaBacktop, props)).not.toThrow()
  })
})
