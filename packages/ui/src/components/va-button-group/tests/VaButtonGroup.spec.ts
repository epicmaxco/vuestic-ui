import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaButtonGroup from '../VaButtonGroup.vue'

describe('VaButtonGroup', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaButtonGroup)
    expect(wrapper.exists()).toBeTruthy()
  })
})
