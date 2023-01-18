import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaAvatar from '../VaAvatar.vue'

describe('VaAvatar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaAvatar)
    expect(wrapper.exists()).toBeTruthy()
  })
})
