import { describe, it, expect } from 'vitest'
import VaCarousel from '../VaCarousel.vue'
import { mountWithGlobalConfig } from '../../../composables/tests/mountWithGlobalConfig'

describe('VaCarousel', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCarousel, {
      props: {
        items: [],
      },
    })
    expect(wrapper.findComponent('VaCarousel')).toBeTruthy()
  })
})
