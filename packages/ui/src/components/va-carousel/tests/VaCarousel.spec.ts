import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaCarousel from '../VaCarousel.vue'
import {
  GLOBAL_CONFIG,
  createGlobalConfig,
} from '../../../services/global-config/global-config'
import { mountWithGlobalConfig } from '../../../composables/tests/mountWithGlobalConfig'

// TODO Test broken. Getting error.
describe('VaCarousel', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCarousel, {
      props: {
        items: [],
      },
    })
    // const wrapper = mount(VaCarousel, {
    //   global: {
    //     provide: {
    //       [GLOBAL_CONFIG]: createGlobalConfig(),
    //     },
    //   },
    // })
    expect(wrapper.findComponent('VaCarousel')).toBeTruthy()
  })
})
