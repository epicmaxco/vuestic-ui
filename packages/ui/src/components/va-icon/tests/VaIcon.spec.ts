import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaIcon from '../VaIcon.vue'

describe('VaIcon', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaIcon)
    expect(wrapper.exists()).toBeTruthy()
  })
})
