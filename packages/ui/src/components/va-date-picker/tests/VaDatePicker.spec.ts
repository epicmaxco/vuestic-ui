import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaDatePicker from '../VaDatePicker.vue'

describe('VaDatePicker', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDatePicker)
    expect(wrapper.findComponent(VaDatePicker)).toBeTruthy()
  })
})
