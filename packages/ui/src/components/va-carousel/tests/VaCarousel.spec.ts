import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaCarousel from '../VaCarousel.vue'
import {
  GLOBAL_CONFIG,
  createGlobalConfig,
} from '../../../services/global-config/global-config'

// TODO Test broken. Getting error.
describe.skip('VaCarousel', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaCarousel, {
      global: {
        provide: {
          [GLOBAL_CONFIG]: createGlobalConfig(),
        },
      },
    })
    expect(wrapper.findComponent('VaCarousel')).toBeTruthy()
  })
})
