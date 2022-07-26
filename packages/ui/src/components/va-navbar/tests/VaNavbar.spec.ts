import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaNavbar from '../VaNavbar.vue'
import {
  createGlobalConfig,
  GLOBAL_CONFIG,
} from '../../../services/global-config/global-config'

describe('VaNavbar', () => {
  it('should render without an error', () => {
    const wrapper = mount(
      VaNavbar,
      {
        global: {
          provide: {
            [GLOBAL_CONFIG]: createGlobalConfig(),
          },
        },
      },
    )
    expect(wrapper.findComponent('VaNavbar')).toBeTruthy()
  })
})
