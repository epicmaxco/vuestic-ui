import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaBadge from '../VaBadge.vue'

describe('VaBadge', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaBadge)
    expect(wrapper.exists()).toBeTruthy()
  })
})
