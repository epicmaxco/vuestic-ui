import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaAvatarGroup from '../VaAvatarGroup.vue'

describe('VaAvatarGroup', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaAvatarGroup)
    expect(wrapper.exists()).toBeTruthy()
  })
})
