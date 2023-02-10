import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaTimePicker from '../VaTimePicker.vue'

describe('VaTimePicker', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaTimePicker)
    expect(wrapper.exists()).toBeTruthy()
  })
})
