import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaImage from '../VaImage.vue'

describe('VaImage', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaImage)
    expect(wrapper.exists()).toBeTruthy()
  })
})
