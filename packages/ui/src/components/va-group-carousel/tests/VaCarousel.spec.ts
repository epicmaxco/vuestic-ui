import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaCarousel from '../VaCarousel.vue'

describe('VaCarousel', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCarousel, {
      propsData: {
        options: [],
        items: [],
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})
