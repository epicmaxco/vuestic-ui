import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaButtonDropdown from '../VaButtonDropdown.vue'

describe('VaButtonDropdown', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaButtonDropdown)
    expect(wrapper.exists()).toBeTruthy()
  })
})
