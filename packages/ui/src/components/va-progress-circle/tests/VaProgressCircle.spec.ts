import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaProgressCircle from '../VaProgressCircle.vue'

describe('VaProgressCircle', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaProgressCircle)
    expect(wrapper.exists()).toBeTruthy()
  })
})
