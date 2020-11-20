import { mount } from '@vue/test-utils'
import VaFileUpload from '../index'

describe('VaFileUpload', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaFileUpload as any)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
