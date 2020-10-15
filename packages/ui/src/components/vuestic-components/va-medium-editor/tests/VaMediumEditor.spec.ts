import { mount } from '@vue/test-utils'

import VaMediumEditor from '../VaMediumEditor.vue'

jest.mock('medium-editor')

describe('VaMediumEditor', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaMediumEditor)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
