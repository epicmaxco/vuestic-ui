import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSkipLink from '../VaSkipLink.vue'

describe('VaSkipLink', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSkipLink)
    expect(wrapper.exists()).toBeTruthy()
  })
})
