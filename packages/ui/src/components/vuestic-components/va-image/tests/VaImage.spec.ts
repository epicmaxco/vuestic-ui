import { mount } from '@vue/test-utils'
import VaImage from '../VaImage.vue'

describe('VaImage', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaImage, { propsData: { src: '' } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
