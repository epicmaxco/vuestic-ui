import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaDropdown from '../VaDropdown.vue'

describe('VaDropdown', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaDropdown)
    expect(wrapper.exists()).toBeTruthy()
  })
})
