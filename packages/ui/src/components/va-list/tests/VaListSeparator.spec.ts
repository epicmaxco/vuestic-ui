import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaListSeparator from '../VaListSeparator.vue'

describe('VaListSeparator', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaListSeparator)
    expect(wrapper.exists()).toBeTruthy()
  })
})
