import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaRadio from '../VaRadio.vue'

describe('VaRadio', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaRadio)
    expect(wrapper.exists()).toBeTruthy()
  })
})
