import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaBacktop from '../VaBacktop.vue'

describe('VaBacktop', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaBacktop)
    expect(wrapper.exists()).toBeTruthy()
  })
})
