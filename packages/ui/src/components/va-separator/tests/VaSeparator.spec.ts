import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSeparator from '../VaSeparator.vue'

describe('VaSeparator', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSeparator)
    expect(wrapper.exists()).toBeTruthy()
  })
})
