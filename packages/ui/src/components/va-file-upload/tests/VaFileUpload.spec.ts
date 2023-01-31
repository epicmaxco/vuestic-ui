import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaFileUpload from '../VaFileUpload.vue'

describe('VaFileUpload', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaFileUpload)
    expect(wrapper.exists()).toBeTruthy()
  })
})
