import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaScrollbar from '../VaScrollbar.vue'

describe('VaScrollbar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaScrollbar)
    expect(wrapper.exists()).toBeTruthy()
  })
})
