import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaListLabel from '../VaListLabel.vue'

describe('VaListLabel', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaListLabel)
    expect(wrapper.exists()).toBeTruthy()
  })
})
