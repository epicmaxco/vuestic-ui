import { mount } from '@vue/test-utils'
import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'
import VaImage from '../VaImage.vue'

describe('VaImage', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaImage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is configurable', () => {
    const componentProps = {
      src: 'https://picsum.photos/510/300?random',
    }
    const props = {
      ratio: 4 / 3,
      contain: true,
    }
    expect(() => testIsConfigProvidedComponent(VaImage, props, componentProps)).not.toThrow()
  })
})
