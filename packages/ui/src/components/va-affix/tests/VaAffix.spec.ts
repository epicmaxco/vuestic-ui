import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaAffix from '../VaAffix.vue'

describe('VaAffix', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaAffix)
    expect(wrapper.exists()).toBeTruthy()
  })
})
