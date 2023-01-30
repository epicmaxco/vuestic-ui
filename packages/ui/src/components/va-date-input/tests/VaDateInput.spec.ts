import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaDateInput from '../VaDateInput.vue'

describe('VaDateInput', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaDateInput)
    expect(wrapper.exists()).toBeTruthy()
  })
})
