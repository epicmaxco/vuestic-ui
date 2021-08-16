import { mount } from '@vue/test-utils'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
import VaImage from '../VaImage.vue'

describe('VaImage', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaImage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is contextable', () => {
    const componentProps = {
      src: 'https://picsum.photos/510/300?random',
    }
    const props = {
      ratio: 4 / 3,
      contain: true,
    }
    expect(() => testIsContextableComponent(VaImage, props, componentProps)).not.toThrow()
  })
})
