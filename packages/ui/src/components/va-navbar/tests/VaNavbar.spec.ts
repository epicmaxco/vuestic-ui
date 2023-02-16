import noop from 'lodash/noop.js'
import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaNavbar from '../VaNavbar.vue'

describe('VaNavbar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaNavbar)
    expect(wrapper.exists()).toBeTruthy()
  })
})
