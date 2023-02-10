import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaDatePicker from '../VaDatePicker.vue'

describe('VaDatePicker', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaDatePicker)
    expect(wrapper.exists()).toBeTruthy()
  })
})
