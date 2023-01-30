import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaInput from '../VaInput.vue'

describe('VaInput', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaInput)
    expect(wrapper.exists()).toBeTruthy()
  })
})
