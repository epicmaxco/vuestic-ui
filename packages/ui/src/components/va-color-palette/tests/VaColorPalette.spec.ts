import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaColorPalette from '../VaColorPalette.vue'

describe('VaColorPalette', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaColorPalette)
    expect(wrapper.exists()).toBeTruthy()
  })
})
