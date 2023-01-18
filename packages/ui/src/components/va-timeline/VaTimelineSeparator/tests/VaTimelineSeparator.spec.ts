import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../../utils/unit-test-utils'

import VaTimelineSeparator from '../VaTimelineSeparator.vue'

describe('VaTimelineSeparator', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaTimelineSeparator)
    expect(wrapper.exists()).toBeTruthy()
  })
})
